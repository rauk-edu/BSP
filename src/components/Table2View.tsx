import React, { useState, useMemo } from 'react';
import {
  ActivityBudgetRow,
  BudgetYearSource,
  STANDARDS_META,
  SchoolProfile,
} from '../data/bspData';
import {
  Search,
  DollarSign,
  Layers,
  Sparkles,
  PieChart,
  HelpCircle,
  X,
  Zap,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { parseNumber, formatRiel, computeTable2Summaries } from '../utils/bspUtils';

interface Table2ViewProps {
  rows: ActivityBudgetRow[];
  onUpdateActivityBudget: (
    id: string,
    yearKey: 'yearN' | 'yearN1' | 'yearN2' | 'yearN3',
    sourceKey: keyof BudgetYearSource,
    value: string
  ) => void;
  schoolProfile: SchoolProfile;
  onSyncFromTable1?: () => void;
  onOpenAICopilot?: () => void;
}

export const Table2View: React.FC<Table2ViewProps> = ({
  rows,
  onUpdateActivityBudget,
  schoolProfile,
  onSyncFromTable1,
  onOpenAICopilot,
}) => {
  const [selectedStandard, setSelectedStandard] = useState<number | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically compute summaries
  const summaries = useMemo(() => computeTable2Summaries(rows), [rows]);

  // Filter rows
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (row.category === 'GRAND_TOTAL') {
        return selectedStandard === 'ALL' && !searchQuery.trim();
      }

      if (selectedStandard !== 'ALL' && row.standardId !== selectedStandard) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchAct = row.activity.toLowerCase().includes(query);
        const matchCode = row.code.toLowerCase().includes(query);
        if (!matchAct && !matchCode) return false;
      }

      return true;
    });
  }, [rows, selectedStandard, searchQuery]);

  // Calculate row total across all 4 funding sources for a year
  const getYearTotal = (source: BudgetYearSource) => {
    return (
      parseNumber(source.state) +
      parseNumber(source.partner) +
      parseNumber(source.community) +
      parseNumber(source.other)
    );
  };

  // Calculate full row total across all 4 years
  const getActivityGrandTotal = (row: ActivityBudgetRow) => {
    return (
      getYearTotal(row.yearN) +
      getYearTotal(row.yearN1) +
      getYearTotal(row.yearN2) +
      getYearTotal(row.yearN3)
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Controls & Metrics */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 space-y-4">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-sky-600 rounded-full inline-block"></span>
              <h2 className="text-base md:text-lg font-bold text-slate-900">
                គម្រោងតម្រូវការឥណទាន និងប្រភពថវិកា ៣ ឆ្នាំ (Table 2)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-4.5">
              ការបែងចែកថវិកាតាមសកម្មភាព និងប្រភពហិរញ្ញប្បទាន (ថវិការដ្ឋ ដៃគូ សហគមន៍ និងផ្សេងៗ)
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-sky-50 border border-sky-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-sky-600" />
              <div>
                <div className="text-[10px] text-sky-700 font-medium">ឆ្នាំ N ({schoolProfile.yearN})</div>
                <div className="text-xs font-bold text-sky-950 font-mono">
                  {formatRiel(summaries.grandTotal.yearN.total)} <span className="text-[10px] font-normal">រៀល</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-indigo-600" />
              <div>
                <div className="text-[10px] text-indigo-700 font-medium">ឆ្នាំ N+1 ({schoolProfile.yearN1})</div>
                <div className="text-xs font-bold text-indigo-950 font-mono">
                  {formatRiel(summaries.grandTotal.yearN1.total)} <span className="text-[10px] font-normal">រៀល</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-[10px] text-emerald-700 font-medium">ឆ្នាំ N+2 ({schoolProfile.yearN2})</div>
                <div className="text-xs font-bold text-emerald-950 font-mono">
                  {formatRiel(summaries.grandTotal.yearN2.total)} <span className="text-[10px] font-normal">រៀល</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <div>
                <div className="text-[10px] text-purple-700 font-medium">ឆ្នាំ N+3 ({schoolProfile.yearN3})</div>
                <div className="text-xs font-bold text-purple-950 font-mono">
                  {formatRiel(summaries.grandTotal.yearN3.total)} <span className="text-[10px] font-normal">រៀល</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Sync Notification Banner for the 2 circled columns */}
        <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-amber-50 border border-sky-300/80 rounded-xl p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Zap className="w-4.5 h-4.5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900">
                  សមកាលកម្មថវិកាស្វ័យប្រវត្តិតាមតារាងទី៤ (Auto-Synced from Table 4)
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  ភ្ជាប់ស្វ័យប្រវត្តិ
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                ជួរទាំង២ ធ្លាក់ចូលស្វ័យប្រវត្តិ៖ <strong>ច្បាប់ហិរញ្ញវត្ថុ (ថវិការដ្ឋ)</strong> ធ្លាក់ពី <em>ឆ្នាំគ្រោងថវិកា N+1</em> និង <strong>គម្រោងតម្រូវការឥណទាន N+1</strong> ធ្លាក់ពី <em>ថវិកាគោលដៅ</em> នៃតារាងទី៤។
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end flex-wrap">
            <div className="bg-white/90 border border-sky-300 rounded-lg px-2.5 py-1 text-right">
              <div className="text-[9px] text-sky-700 font-medium">ច្បាប់ហិរញ្ញវត្ថុ ឆ្នាំ N (រដ្ឋ)</div>
              <div className="text-xs font-bold text-sky-950 font-mono">
                {formatRiel(summaries.grandTotal.yearN.state)} <span className="text-[10px] font-normal">រៀល</span>
              </div>
            </div>

            <div className="bg-white/90 border border-indigo-300 rounded-lg px-2.5 py-1 text-right">
              <div className="text-[9px] text-indigo-700 font-medium">តម្រូវការឥណទាន N+1 (រដ្ឋ)</div>
              <div className="text-xs font-bold text-indigo-950 font-mono">
                {formatRiel(summaries.grandTotal.yearN1.state)} <span className="text-[10px] font-normal">រៀល</span>
              </div>
            </div>

            {onSyncFromTable1 && (
              <button
                onClick={onSyncFromTable1}
                title="ទាញទិន្នន័យពីតារាងទី១ មកបំពេញឡើងវិញភ្លាមៗ"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ធ្វើសមកាលកម្ម</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Standard Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedStandard('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedStandard === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ទាំងអស់ ({rows.filter((r) => r.category === 'ACTIVITY').length} សកម្មភាព)
            </button>

            {STANDARDS_META.map((std) => {
              const isSelected = selectedStandard === std.id;
              const stdTotalN1 = summaries.standardTotals[std.id]?.yearN1.total || 0;
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
                  {stdTotalN1 > 0 && (
                    <span className="text-[10px] opacity-75 font-mono">
                      ({formatRiel(stdTotalN1)})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search & AI */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ស្វែងរកតាមឈ្មោះសកម្មភាព..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {onOpenAICopilot && (
              <button
                onClick={onOpenAICopilot}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-700 hover:to-sky-700 text-white shadow-xs cursor-pointer transition-all"
                title="ជំនួយការ AI សកម្មភាព និងថវិកា ៣ ឆ្នាំ"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>ជំនួយការ AI ថវិកា</span>
              </button>
            )}
          </div>
        </div>

        {/* Legend for Funding Sources */}
        <div className="flex items-center gap-4 text-[11px] text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
          <span className="font-semibold text-slate-700">សម្គាល់ប្រភពថវិកា៖</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-sky-500"></span>
            <span>ថវិការដ្ឋ</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
            <span>ថវិកាដៃគូ</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
            <span>ថវិកាសហគមន៍</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-purple-500"></span>
            <span>ថវិកាផ្សេងៗ</span>
          </span>
        </div>
      </div>

      {/* Table 2 Container */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-300">
            {/* Multi-Row Header */}
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-300 select-none">
              {/* Row 0 of Header */}
              <tr>
                <th
                  rowSpan={2}
                  className="border border-slate-300 px-2 py-2.5 text-center align-middle w-12 bg-slate-100"
                >
                  ល.រ
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-300 px-3 py-2.5 align-middle min-w-[260px] bg-slate-100"
                >
                  សកម្មភាព
                </th>
                <th
                  colSpan={4}
                  className="border border-slate-300 px-2 py-2 text-center bg-sky-100/90 text-sky-950"
                >
                  <div className="flex items-center justify-center gap-1.5 font-bold">
                    <span>ច្បាប់ហិរញ្ញវត្ថុ ឆ្នាំ N</span>
                    <span className="text-[9px] bg-sky-600 text-white px-1.5 py-0.2 rounded font-normal font-sans shadow-2xs">
                      ⚡ ធ្លាក់ពីឆ្នាំគ្រោង N+1
                    </span>
                  </div>
                  <div className="text-[10px] font-mono font-normal text-sky-700">({schoolProfile.yearN})</div>
                </th>
                <th
                  colSpan={4}
                  className="border border-slate-300 px-2 py-2 text-center bg-indigo-100/90 text-indigo-950"
                >
                  <div className="flex items-center justify-center gap-1.5 font-bold">
                    <span>គម្រោងតម្រូវការឥណទាន ឆ្នាំ N+1</span>
                    <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.2 rounded font-normal font-sans shadow-2xs">
                      ⚡ ធ្លាក់ពីគោលដៅ N+1
                    </span>
                  </div>
                  <div className="text-[10px] font-mono font-normal text-indigo-700">({schoolProfile.yearN1})</div>
                </th>
                <th
                  colSpan={4}
                  className="border border-slate-300 px-2 py-2 text-center bg-emerald-100/70 text-emerald-900"
                >
                  <div>គម្រោងតម្រូវការឥណទាន ឆ្នាំ N+2</div>
                  <div className="text-[10px] font-mono font-normal text-emerald-700">({schoolProfile.yearN2})</div>
                </th>
                <th
                  colSpan={4}
                  className="border border-slate-300 px-2 py-2 text-center bg-purple-100/70 text-purple-900"
                >
                  <div>គម្រោងតម្រូវការឥណទាន ឆ្នាំ N+3</div>
                  <div className="text-[10px] font-mono font-normal text-purple-700">({schoolProfile.yearN3})</div>
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-300 px-2 py-2.5 text-center align-middle w-24 bg-amber-100/60 text-amber-950 font-bold"
                >
                  សរុប (រៀល)
                </th>
              </tr>

              {/* Row 1 of Header: 4 Columns per Year */}
              <tr className="text-[10px]">
                {/* Year N */}
                <th className="border-x-2 border-t border-b border-sky-400 px-1 py-1 text-center bg-sky-200 text-sky-950 w-20 font-bold">
                  <div className="flex items-center justify-center gap-0.5">
                    <Zap className="w-2.5 h-2.5 text-amber-600" />
                    <span>រដ្ឋ</span>
                  </div>
                </th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-emerald-50 text-emerald-900 w-16">ដៃគូ</th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-amber-50 text-amber-900 w-16">សហគមន៍</th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-purple-50 text-purple-900 w-16">ផ្សេងៗ</th>

                {/* Year N+1 */}
                <th className="border-x-2 border-t border-b border-indigo-400 px-1 py-1 text-center bg-indigo-200 text-indigo-950 w-20 font-bold">
                  <div className="flex items-center justify-center gap-0.5">
                    <Zap className="w-2.5 h-2.5 text-amber-600" />
                    <span>រដ្ឋ</span>
                  </div>
                </th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-emerald-50 text-emerald-900 w-16">ដៃគូ</th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-amber-50 text-amber-900 w-16">សហគមន៍</th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-purple-50 text-purple-900 w-16">ផ្សេងៗ</th>

                {/* Year N+2 */}
                <th className="border border-slate-300 px-1 py-1 text-center bg-sky-50 text-sky-900 w-16">រដ្ឋ</th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-emerald-50 text-emerald-900 w-16">ដៃគូ</th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-amber-50 text-amber-900 w-16">សហគមន៍</th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-purple-50 text-purple-900 w-16">ផ្សេងៗ</th>

                {/* Year N+3 */}
                <th className="border border-slate-300 px-1 py-1 text-center bg-sky-50 text-sky-900 w-16">រដ្ឋ</th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-emerald-50 text-emerald-900 w-16">ដៃគូ</th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-amber-50 text-amber-900 w-16">សហគមន៍</th>
                <th className="border border-slate-300 px-1 py-1 text-center bg-purple-50 text-purple-900 w-16">ផ្សេងៗ</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200">
              {filteredRows.map((row) => {
                // 1. GRAND TOTAL ROW
                if (row.category === 'GRAND_TOTAL') {
                  const gt = summaries.grandTotal;
                  const totalAll = gt.yearN.total + gt.yearN1.total + gt.yearN2.total + gt.yearN3.total;

                  return (
                    <tr
                      key={row.id}
                      className="bg-amber-100/90 font-bold text-slate-900 border-y-2 border-amber-400"
                    >
                      <td
                        colSpan={2}
                        className="border border-slate-300 px-3 py-2 text-center text-xs font-moul text-amber-950"
                      >
                        សរុបរួម (Grand Total)
                      </td>
                      {/* Year N */}
                      <td className="border-x-2 border-y border-sky-400 px-1 py-1 text-right font-mono text-[11px] font-bold bg-sky-200/80 text-sky-950">
                        {formatRiel(gt.yearN.state)}
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px]">{formatRiel(gt.yearN.partner)}</td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px]">{formatRiel(gt.yearN.community)}</td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px]">{formatRiel(gt.yearN.other)}</td>

                      {/* Year N+1 */}
                      <td className="border-x-2 border-y border-indigo-400 px-1 py-1 text-right font-mono text-[11px] font-bold bg-indigo-200/80 text-indigo-950">
                        {formatRiel(gt.yearN1.state)}
                      </td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-indigo-100/50">{formatRiel(gt.yearN1.partner)}</td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-indigo-100/50">{formatRiel(gt.yearN1.community)}</td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-indigo-100/50">{formatRiel(gt.yearN1.other)}</td>

                      {/* Year N+2 */}
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-emerald-100/50">{formatRiel(gt.yearN2.state)}</td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-emerald-100/50">{formatRiel(gt.yearN2.partner)}</td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-emerald-100/50">{formatRiel(gt.yearN2.community)}</td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-emerald-100/50">{formatRiel(gt.yearN2.other)}</td>

                      {/* Year N+3 */}
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-purple-100/50">{formatRiel(gt.yearN3.state)}</td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-purple-100/50">{formatRiel(gt.yearN3.partner)}</td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-purple-100/50">{formatRiel(gt.yearN3.community)}</td>
                      <td className="border border-slate-300 px-1 py-1 text-right font-mono text-[11px] bg-purple-100/50">{formatRiel(gt.yearN3.other)}</td>

                      {/* Row Total */}
                      <td className="border border-slate-300 px-2 py-1 text-right font-mono font-bold text-amber-950 bg-amber-200/60">
                        {formatRiel(totalAll)}
                      </td>
                    </tr>
                  );
                }

                // 2. STANDARD HEADER ROW
                if (row.category === 'STANDARD_HEADER') {
                  const st = summaries.standardTotals[row.standardId];
                  const stdTotal =
                    (st?.yearN.total || 0) +
                    (st?.yearN1.total || 0) +
                    (st?.yearN2.total || 0) +
                    (st?.yearN3.total || 0);

                  return (
                    <tr
                      key={row.id}
                      className="bg-slate-800 text-white font-bold border-y border-slate-700"
                    >
                      <td
                        colSpan={2}
                        className="border border-slate-600 px-3 py-2 text-left"
                      >
                        <span className="text-amber-300 text-xs md:text-sm">
                          {row.activity}
                        </span>
                      </td>

                      {/* Year N */}
                      <td className="border-x-2 border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-sky-300 font-bold bg-sky-950/60">{formatRiel(st?.yearN.state)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-slate-300">{formatRiel(st?.yearN.partner)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-slate-300">{formatRiel(st?.yearN.community)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-slate-300">{formatRiel(st?.yearN.other)}</td>

                      {/* Year N+1 */}
                      <td className="border-x-2 border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-indigo-300 font-bold bg-indigo-950/60">{formatRiel(st?.yearN1.state)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-indigo-300 font-semibold">{formatRiel(st?.yearN1.partner)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-indigo-300 font-semibold">{formatRiel(st?.yearN1.community)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-indigo-300 font-semibold">{formatRiel(st?.yearN1.other)}</td>

                      {/* Year N+2 */}
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-emerald-300">{formatRiel(st?.yearN2.state)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-emerald-300">{formatRiel(st?.yearN2.partner)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-emerald-300">{formatRiel(st?.yearN2.community)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-emerald-300">{formatRiel(st?.yearN2.other)}</td>

                      {/* Year N+3 */}
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-purple-300">{formatRiel(st?.yearN3.state)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-purple-300">{formatRiel(st?.yearN3.partner)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-purple-300">{formatRiel(st?.yearN3.community)}</td>
                      <td className="border border-slate-600 px-1 py-1 text-right font-mono text-[11px] text-purple-300">{formatRiel(st?.yearN3.other)}</td>

                      {/* Row Total */}
                      <td className="border border-slate-600 px-2 py-1 text-right font-mono font-bold text-amber-300">
                        {formatRiel(stdTotal)}
                      </td>
                    </tr>
                  );
                }

                // 3. ACTIVITY ROW
                const rowTotal = getActivityGrandTotal(row);

                return (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50 transition-colors text-slate-800"
                  >
                    <td className="border border-slate-300 px-2 py-1 text-center font-mono text-slate-500 text-[11px] bg-slate-50/50">
                      {row.code || '•'}
                    </td>
                    <td className="border border-slate-300 px-3 py-1 font-medium text-slate-800">
                      {row.activity}
                    </td>

                    {/* Year N - State (Auto-synced from Table 4 ឆ្នាំគ្រោងថវិកា N+1 = ច្បាប់ហិរញ្ញវត្ថុ) */}
                    <td className="border-x-2 border-slate-300 p-0.5 bg-sky-50/50">
                      <input
                        type="text"
                        value={row.yearN.state}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN', 'state', e.target.value)}
                        placeholder="0"
                        title="ច្បាប់ហិរញ្ញវត្ថុ ធ្លាក់ស្វ័យប្រវត្តិតាមឆ្នាំគ្រោងថវិកា N+1 នៃតារាងទី៤"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] font-semibold text-sky-950 bg-sky-100/60 rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5">
                      <input
                        type="text"
                        value={row.yearN.partner}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN', 'partner', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5">
                      <input
                        type="text"
                        value={row.yearN.community}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN', 'community', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5">
                      <input
                        type="text"
                        value={row.yearN.other}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN', 'other', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </td>

                    {/* Year N+1 - State (Auto-synced from Table 4 ថវិកាគោលដៅ = គម្រោងតម្រូវការឥណទាន N+1) */}
                    <td className="border-x-2 border-slate-300 p-0.5 bg-indigo-50/60">
                      <input
                        type="text"
                        value={row.yearN1.state}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN1', 'state', e.target.value)}
                        placeholder="0"
                        title="គម្រោងតម្រូវការ N+1 ធ្លាក់ស្វ័យប្រវត្តិតាមថវិកាគោលដៅ នៃតារាងទី៤"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] font-semibold text-indigo-950 bg-indigo-100/60 rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5 bg-indigo-50/20">
                      <input
                        type="text"
                        value={row.yearN1.partner}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN1', 'partner', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5 bg-indigo-50/20">
                      <input
                        type="text"
                        value={row.yearN1.community}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN1', 'community', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5 bg-indigo-50/20">
                      <input
                        type="text"
                        value={row.yearN1.other}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN1', 'other', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </td>

                    {/* Year N+2 */}
                    <td className="border border-slate-300 p-0.5 bg-emerald-50/20">
                      <input
                        type="text"
                        value={row.yearN2.state}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN2', 'state', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5 bg-emerald-50/20">
                      <input
                        type="text"
                        value={row.yearN2.partner}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN2', 'partner', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5 bg-emerald-50/20">
                      <input
                        type="text"
                        value={row.yearN2.community}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN2', 'community', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5 bg-emerald-50/20">
                      <input
                        type="text"
                        value={row.yearN2.other}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN2', 'other', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </td>

                    {/* Year N+3 */}
                    <td className="border border-slate-300 p-0.5 bg-purple-50/20">
                      <input
                        type="text"
                        value={row.yearN3.state}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN3', 'state', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5 bg-purple-50/20">
                      <input
                        type="text"
                        value={row.yearN3.partner}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN3', 'partner', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5 bg-purple-50/20">
                      <input
                        type="text"
                        value={row.yearN3.community}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN3', 'community', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                    <td className="border border-slate-300 p-0.5 bg-purple-50/20">
                      <input
                        type="text"
                        value={row.yearN3.other}
                        onChange={(e) => onUpdateActivityBudget(row.id, 'yearN3', 'other', e.target.value)}
                        placeholder="-"
                        className="w-full text-right px-1 py-0.5 font-mono text-[11px] bg-transparent rounded hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </td>

                    {/* Row Grand Total */}
                    <td className="border border-slate-300 px-2 py-1 text-right font-mono font-semibold text-slate-900 bg-amber-50/30">
                      {formatRiel(rowTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
