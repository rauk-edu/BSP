import React, { useState, useMemo } from 'react';
import { AopIndicatorRow } from '../data/aopData';
import { STANDARDS_META, SchoolProfile, IndicatorRow, ActivityBudgetRow } from '../data/bspData';
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  Sparkles,
  DollarSign,
  TrendingUp,
  Layers,
  CheckCircle2,
  Calendar,
  Building,
  HelpCircle,
  FileSpreadsheet,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Info,
} from 'lucide-react';
import { parseNumber, formatRiel } from '../utils/bspUtils';

interface AopTable1ViewProps {
  rows: AopIndicatorRow[];
  onUpdateRow: (id: string, field: keyof AopIndicatorRow, value: string) => void;
  schoolProfile: SchoolProfile;
  onSyncFromBsp: () => void;
  onOpenAICopilot?: () => void;
}

export const AopTable1View: React.FC<AopTable1ViewProps> = ({
  rows,
  onUpdateRow,
  schoolProfile,
  onSyncFromBsp,
  onOpenAICopilot,
}) => {
  const [selectedStandard, setSelectedStandard] = useState<number | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDisaggregation, setShowDisaggregation] = useState(true);
  const [collapsedStandards, setCollapsedStandards] = useState<Record<number, boolean>>({});
  const [syncToast, setSyncToast] = useState(false);

  const toggleStandard = (id: number) => {
    setCollapsedStandards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Summaries computation
  const summaries = useMemo(() => {
    let grandState = 0;
    let grandNonState = 0;
    let grandTotal = 0;

    const standardTotals: Record<
      number,
      { state: number; nonState: number; total: number }
    > = {};

    for (let i = 1; i <= 5; i++) {
      standardTotals[i] = { state: 0, nonState: 0, total: 0 };
    }

    rows.forEach((r) => {
      if (r.category === 'KEY_INDICATOR') {
        const s = parseNumber(r.stateBudgetN1);
        const ns = parseNumber(r.nonStateBudgetN1);
        const t = s + ns;

        grandState += s;
        grandNonState += ns;
        grandTotal += t;

        if (r.standardId >= 1 && r.standardId <= 5) {
          standardTotals[r.standardId].state += s;
          standardTotals[r.standardId].nonState += ns;
          standardTotals[r.standardId].total += t;
        }
      }
    });

    // Check if GRAND_TOTAL row exists with explicit state budget
    const gtRow = rows.find((r) => r.category === 'GRAND_TOTAL');
    if (gtRow && parseNumber(gtRow.stateBudgetN1) > 0) {
      grandState = parseNumber(gtRow.stateBudgetN1);
      grandNonState = parseNumber(gtRow.nonStateBudgetN1);
      grandTotal = grandState + grandNonState;
    }

    return { grandState, grandNonState, grandTotal, standardTotals };
  }, [rows]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (row.category === 'DISAGGREGATION' && !showDisaggregation) return false;

      if (row.category === 'GRAND_TOTAL') {
        return selectedStandard === 'ALL' && !searchQuery.trim();
      }

      if (selectedStandard !== 'ALL' && row.standardId !== selectedStandard) {
        return false;
      }

      if (collapsedStandards[row.standardId] && row.category !== 'STANDARD_HEADER') {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          row.code.toLowerCase().includes(q) ||
          row.title.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [rows, selectedStandard, showDisaggregation, collapsedStandards, searchQuery]);

  const handleSyncClick = () => {
    onSyncFromBsp();
    setSyncToast(true);
    setTimeout(() => setSyncToast(false), 2500);
  };

  const handleBudgetChange = (
    id: string,
    field: 'stateBudgetN1' | 'nonStateBudgetN1',
    value: string
  ) => {
    onUpdateRow(id, field, value);

    // Auto calculate total
    const targetRow = rows.find((r) => r.id === id);
    if (targetRow) {
      const stateVal = field === 'stateBudgetN1' ? parseNumber(value) : parseNumber(targetRow.stateBudgetN1);
      const nonStateVal = field === 'nonStateBudgetN1' ? parseNumber(value) : parseNumber(targetRow.nonStateBudgetN1);
      const totalVal = stateVal + nonStateVal;
      onUpdateRow(id, 'totalBudgetN1', totalVal > 0 ? formatRiel(totalVal) : '');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-800 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-medium border border-emerald-500/30">
              <Calendar className="w-3.5 h-3.5" />
              <span>ផែនការប្រតិបត្តិប្រចាំឆ្នាំ (AOP - Annual Operational Plan)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-moul tracking-wide text-amber-300">
              តារាងសូចនាករ និងថវិកាប្រចាំឆ្នាំ (AOP {schoolProfile.yearN1})
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              ចម្លង និងតភ្ជាប់ដោយស្វ័យប្រវត្តិចេញពីផែនការយុទ្ធសាស្ត្រថវិកា ៣ ឆ្នាំ (BSP) ដោយបង្ហាញលទ្ធផលឆ្នាំបច្ចុប្បន្ន (N), 
              គោលដៅឆ្នាំគ្រោងថវិកា (N+1) និងការបែងចែកថវិការដ្ឋ ថវិកាក្រៅពីរដ្ឋ និងថវិកាសរុប។
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSyncClick}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 shadow-sm transition backdrop-blur-xs cursor-pointer"
              title="ចម្លង និងទាញយកទិន្នន័យថ្មីៗពីផែនការ ៣ ឆ្នាំ (BSP Table 1 & Table 2)"
            >
              <RefreshCw className="w-4 h-4 text-amber-300" />
              <span>ចម្លងទិន្នន័យពី BSP ៣ ឆ្នាំ</span>
            </button>

            {onOpenAICopilot && (
              <button
                onClick={onOpenAICopilot}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white text-xs font-semibold shadow-md transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>ជំនួយការ AI AOP</span>
              </button>
            )}
          </div>
        </div>

        {syncToast && (
          <div className="absolute top-3 right-4 z-20 flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-lg animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>បានចម្លង និងធ្វើសមកាលកម្មទិន្នន័យពី BSP ៣ ឆ្នាំជោគជ័យ!</span>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">សូចនាករតាមគោលការណ៍</div>
          <div className="text-base sm:text-lg font-bold font-mono text-slate-900 mt-1">
            <span className="text-indigo-700">២៦ គន្លឹះ</span> + <span className="text-emerald-700">៧០ រង</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">៥ ស្តង់ដាជាតិ (សរុប ៩៦)</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-sky-100 bg-sky-50/30 shadow-2xs">
          <div className="text-[11px] text-sky-800 font-medium">ថវិការដ្ឋ ឆ្នាំ N+1</div>
          <div className="text-base sm:text-lg font-bold font-mono text-sky-950 mt-1">
            {formatRiel(summaries.grandState)} <span className="text-xs font-normal text-sky-700">រៀល</span>
          </div>
          <div className="text-[10px] text-sky-600 mt-0.5">ច្បាប់ហិរញ្ញវត្ថុ / SIG-PB</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-100 bg-amber-50/30 shadow-2xs">
          <div className="text-[11px] text-amber-800 font-medium">ថវិកាក្រៅពីរដ្ឋ ឆ្នាំ N+1</div>
          <div className="text-base sm:text-lg font-bold font-mono text-amber-950 mt-1">
            {formatRiel(summaries.grandNonState)} <span className="text-xs font-normal text-amber-700">រៀល</span>
          </div>
          <div className="text-[10px] text-amber-600 mt-0.5">ដៃគូ + សហគមន៍ + CIP</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-100 bg-emerald-50/40 shadow-2xs">
          <div className="text-[11px] text-emerald-800 font-medium">ថវិកាសរុប ឆ្នាំ N+1</div>
          <div className="text-base sm:text-lg font-bold font-mono text-emerald-950 mt-1">
            {formatRiel(summaries.grandTotal)} <span className="text-xs font-normal text-emerald-700">រៀល</span>
          </div>
          <div className="text-[10px] text-emerald-600 mt-0.5">រដ្ឋ + ក្រៅពីរដ្ឋ</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedStandard('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedStandard === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ទាំងអស់ (២៦ គន្លឹះ + ៧០ រង)
            </button>

            {STANDARDS_META.map((std) => {
              const isSelected = selectedStandard === std.id;
              const stdTotal = summaries.standardTotals[std.id]?.total || 0;
              return (
                <button
                  key={std.id}
                  onClick={() => setSelectedStandard(std.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-colors ${
                    isSelected
                      ? `${std.badgeBg} font-semibold ring-1 ring-current`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{std.shortTitle}</span>
                  {stdTotal > 0 && (
                    <span className="text-[10px] opacity-75 font-mono">({formatRiel(stdTotal)})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search & Gender filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ស្វែងរកតាមលេខកូដ ឬឈ្មោះសូចនាករ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <button
              onClick={() => setShowDisaggregation(!showDisaggregation)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                showDisaggregation
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showDisaggregation ? 'បំបែកភេទ: បើក' : 'បំបែកភេទ: បិទ'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main AOP Table (Matching attached _._AOP_7ed8adce.html structure) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-300">
            {/* Header: Exact match to User's AOP Template */}
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-300 select-none">
              <tr>
                <th
                  rowSpan={2}
                  className="border border-slate-300 px-2.5 py-3 text-center align-middle w-12 bg-slate-100"
                >
                  ល.រ
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-300 px-3 py-3 align-middle min-w-[280px] bg-slate-100"
                >
                  ស្តង់ដា និងសូចនាករ
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-300 px-2 py-3 text-center align-middle w-16 bg-slate-100"
                >
                  ឯកតា
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-300 px-2 py-3 text-center align-middle w-28 bg-slate-50 text-slate-700"
                >
                  <div>លទ្ធផលសូចនាករ</div>
                  <div className="text-[11px] font-mono text-slate-500 font-normal">
                    ឆ្នាំបច្ចុប្បន្ន (N: {schoolProfile.yearN})
                  </div>
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-300 px-2 py-3 text-center align-middle w-32 bg-amber-50 text-amber-950 font-bold"
                >
                  <div>គោលដៅសូចនាករ</div>
                  <div className="text-[11px] font-mono text-amber-800 font-bold">
                    គ្រោងថវិកា (N+1: {schoolProfile.yearN1})
                  </div>
                </th>
                <th
                  colSpan={3}
                  className="border border-slate-300 px-2 py-1.5 text-center bg-emerald-100/70 text-emerald-950 font-bold"
                >
                  <div>ឆ្នាំគ្រោងថវិកា (ឆ្នាំ N+1: {schoolProfile.yearN1})</div>
                  <div className="text-[10px] text-emerald-800 font-normal">(គិតជារៀល)</div>
                </th>
              </tr>

              {/* Sub-header for 3 Budget Columns */}
              <tr>
                <th className="border border-slate-300 px-2 py-2 text-center w-28 bg-sky-50 text-sky-950 font-bold text-[11px]">
                  ថវិការដ្ឋ
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center w-28 bg-amber-50 text-amber-950 font-bold text-[11px]">
                  ថវិកាក្រៅពីរដ្ឋ
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center w-32 bg-emerald-50 text-emerald-950 font-bold text-[11px]">
                  ថវិកាសរុប
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200">
              {filteredRows.map((row) => {
                // 1. GRAND TOTAL ROW
                if (row.category === 'GRAND_TOTAL') {
                  return (
                    <tr
                      key={row.id}
                      className="bg-amber-100/90 font-bold text-slate-900 border-y-2 border-amber-400"
                    >
                      <td
                        colSpan={2}
                        className="border border-slate-300 px-3 py-2.5 text-center text-sm font-moul text-amber-950"
                      >
                        សរុប (Grand Total)
                      </td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400 font-mono">
                        -
                      </td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400 font-mono">
                        -
                      </td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400 font-mono">
                        -
                      </td>
                      <td className="border border-slate-300 px-2 py-2 text-right font-mono text-sm text-sky-950 font-bold bg-sky-100/60">
                        {formatRiel(summaries.grandState || row.stateBudgetN1)}
                      </td>
                      <td className="border border-slate-300 px-2 py-2 text-right font-mono text-sm text-amber-950 font-bold bg-amber-100/60">
                        {formatRiel(summaries.grandNonState || row.nonStateBudgetN1)}
                      </td>
                      <td className="border border-slate-300 px-2 py-2 text-right font-mono text-sm text-emerald-950 font-bold bg-emerald-100/70">
                        {formatRiel(summaries.grandTotal || row.totalBudgetN1)}
                      </td>
                    </tr>
                  );
                }

                // 2. STANDARD HEADER ROW
                if (row.category === 'STANDARD_HEADER') {
                  const meta = STANDARDS_META.find((s) => s.id === row.standardId);
                  const isCollapsed = collapsedStandards[row.standardId];
                  const stdState = summaries.standardTotals[row.standardId]?.state || 0;
                  const stdNonState = summaries.standardTotals[row.standardId]?.nonState || 0;
                  const stdTotal = summaries.standardTotals[row.standardId]?.total || 0;

                  return (
                    <tr
                      key={row.id}
                      className="bg-slate-800 text-white font-bold border-y-2 border-slate-700 select-none cursor-pointer hover:bg-slate-750 transition"
                      onClick={() => toggleStandard(row.standardId)}
                    >
                      <td
                        colSpan={2}
                        className="border border-slate-700 px-3 py-2 text-left text-xs font-semibold"
                      >
                        <div className="flex items-center gap-2">
                          {isCollapsed ? (
                            <ChevronRight className="w-4 h-4 text-emerald-300 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-emerald-300 shrink-0" />
                          )}
                          <span className="text-amber-300 font-bold">{meta?.shortTitle || row.title}</span>
                          <span className="text-[11px] text-slate-300 font-normal">
                            ({meta?.indicatorsSummary})
                          </span>
                        </div>
                      </td>
                      <td className="border border-slate-700 px-2 py-1 text-center font-mono text-slate-400">
                        -
                      </td>
                      <td className="border border-slate-700 px-2 py-1 text-center font-mono text-slate-400">
                        -
                      </td>
                      <td className="border border-slate-700 px-2 py-1 text-center font-mono text-slate-400">
                        -
                      </td>
                      <td className="border border-slate-700 px-2 py-1 text-right font-mono text-sky-200">
                        {stdState > 0 ? formatRiel(stdState) : '-'}
                      </td>
                      <td className="border border-slate-700 px-2 py-1 text-right font-mono text-amber-200">
                        {stdNonState > 0 ? formatRiel(stdNonState) : '-'}
                      </td>
                      <td className="border border-slate-700 px-2 py-1 text-right font-mono text-emerald-300 font-bold">
                        {stdTotal > 0 ? formatRiel(stdTotal) : '-'}
                      </td>
                    </tr>
                  );
                }

                // 3. KEY INDICATOR ROW
                if (row.category === 'KEY_INDICATOR') {
                  return (
                    <tr
                      key={row.id}
                      className="bg-indigo-50/30 hover:bg-indigo-50/60 font-semibold text-slate-900 border-t border-slate-300"
                    >
                      <td className="border border-slate-300 px-2.5 py-2 text-center font-bold text-indigo-700 bg-indigo-100/40 font-mono">
                        {row.code}
                      </td>
                      <td className="border border-slate-300 px-3 py-2 text-slate-900 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                          <span>{row.title}</span>
                        </div>
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-center">
                        <input
                          type="text"
                          value={row.unit}
                          onChange={(e) => onUpdateRow(row.id, 'unit', e.target.value)}
                          placeholder="%"
                          className="w-full text-center px-1 py-1 text-xs text-slate-700 bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-center font-mono">
                        <input
                          type="text"
                          value={row.currentResultN}
                          onChange={(e) => onUpdateRow(row.id, 'currentResultN', e.target.value)}
                          placeholder="-"
                          className="w-full text-center px-1 py-1 text-xs font-mono text-slate-700 bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-center font-mono bg-amber-50/30">
                        <input
                          type="text"
                          value={row.targetBudgetN1}
                          onChange={(e) => onUpdateRow(row.id, 'targetBudgetN1', e.target.value)}
                          placeholder="-"
                          className="w-full text-center px-1 py-1 text-xs font-mono font-bold text-amber-900 bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono bg-sky-50/40">
                        <input
                          type="text"
                          value={row.stateBudgetN1}
                          onChange={(e) => handleBudgetChange(row.id, 'stateBudgetN1', e.target.value)}
                          placeholder="0"
                          className="w-full text-right px-1.5 py-1 text-xs font-mono font-semibold text-sky-950 bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono bg-amber-50/30">
                        <input
                          type="text"
                          value={row.nonStateBudgetN1}
                          onChange={(e) => handleBudgetChange(row.id, 'nonStateBudgetN1', e.target.value)}
                          placeholder="0"
                          className="w-full text-right px-1.5 py-1 text-xs font-mono font-semibold text-amber-950 bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-2 py-1 text-right font-mono font-bold text-emerald-950 bg-emerald-50/50">
                        {row.totalBudgetN1 || '-'}
                      </td>
                    </tr>
                  );
                }

                // 4. SUB-INDICATOR ROW
                if (row.category === 'SUB_INDICATOR') {
                  return (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors text-slate-800">
                      <td className="border border-slate-300 px-2.5 py-1.5 text-center text-slate-600 font-mono text-[11px] bg-slate-50/50">
                        {row.code}
                      </td>
                      <td className="border border-slate-300 px-3 py-1.5 text-slate-800 align-top">
                        <span className="inline-block pl-1 font-medium leading-snug">{row.title}</span>
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-center">
                        <input
                          type="text"
                          value={row.unit}
                          onChange={(e) => onUpdateRow(row.id, 'unit', e.target.value)}
                          placeholder=""
                          className="w-full text-center px-1 py-0.5 text-xs text-slate-600 bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-center font-mono">
                        <input
                          type="text"
                          value={row.currentResultN}
                          onChange={(e) => onUpdateRow(row.id, 'currentResultN', e.target.value)}
                          placeholder=""
                          className="w-full text-center px-1 py-0.5 text-xs font-mono text-slate-700 bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-center font-mono bg-amber-50/20">
                        <input
                          type="text"
                          value={row.targetBudgetN1}
                          onChange={(e) => onUpdateRow(row.id, 'targetBudgetN1', e.target.value)}
                          placeholder=""
                          className="w-full text-center px-1 py-0.5 text-xs font-mono font-medium text-amber-900 bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono bg-sky-50/30">
                        <input
                          type="text"
                          value={row.stateBudgetN1}
                          onChange={(e) => handleBudgetChange(row.id, 'stateBudgetN1', e.target.value)}
                          placeholder=""
                          className="w-full text-right px-1.5 py-0.5 text-xs font-mono text-slate-800 bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono bg-amber-50/20">
                        <input
                          type="text"
                          value={row.nonStateBudgetN1}
                          onChange={(e) => handleBudgetChange(row.id, 'nonStateBudgetN1', e.target.value)}
                          placeholder=""
                          className="w-full text-right px-1.5 py-0.5 text-xs font-mono text-slate-800 bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-2 py-1 text-right font-mono text-xs font-semibold text-emerald-950 bg-emerald-50/30">
                        {row.totalBudgetN1 || '-'}
                      </td>
                    </tr>
                  );
                }

                // 5. DISAGGREGATION ROW (- ស្រី, - ប្រុស)
                if (row.category === 'DISAGGREGATION') {
                  const isFemale = row.title.includes('ស្រី');
                  return (
                    <tr
                      key={row.id}
                      className={`text-[11px] ${
                        isFemale ? 'bg-pink-50/20 text-pink-900' : 'bg-blue-50/20 text-blue-900'
                      }`}
                    >
                      <td className="border border-slate-300 px-2 py-1 text-center text-slate-400 font-mono text-[10px]">
                        -
                      </td>
                      <td className="border border-slate-300 px-3 py-1 font-medium pl-6">
                        <span className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isFemale ? 'bg-pink-400' : 'bg-blue-400'
                            }`}
                          ></span>
                          <span>{row.title}</span>
                        </span>
                      </td>
                      <td className="border border-slate-300 px-1 py-0.5 text-center text-slate-400 font-mono">
                        {row.unit || '%'}
                      </td>
                      <td className="border border-slate-300 px-1 py-0.5 text-center font-mono">
                        <input
                          type="text"
                          value={row.currentResultN}
                          onChange={(e) => onUpdateRow(row.id, 'currentResultN', e.target.value)}
                          placeholder="-"
                          className="w-full text-center px-1 py-0.5 text-[11px] font-mono bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-1 py-0.5 text-center font-mono bg-amber-50/20">
                        <input
                          type="text"
                          value={row.targetBudgetN1}
                          onChange={(e) => onUpdateRow(row.id, 'targetBudgetN1', e.target.value)}
                          placeholder="-"
                          className="w-full text-center px-1 py-0.5 text-[11px] font-mono bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="border border-slate-300 px-1 py-0.5 text-right font-mono text-slate-400">
                        {row.stateBudgetN1 || '-'}
                      </td>
                      <td className="border border-slate-300 px-1 py-0.5 text-right font-mono text-slate-400">
                        {row.nonStateBudgetN1 || '-'}
                      </td>
                      <td className="border border-slate-300 px-1 py-0.5 text-right font-mono text-slate-400">
                        {row.totalBudgetN1 || '-'}
                      </td>
                    </tr>
                  );
                }

                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
