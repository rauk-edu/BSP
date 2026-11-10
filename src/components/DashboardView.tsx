import React from 'react';
import {
  IndicatorRow,
  ActivityBudgetRow,
  STANDARDS_META,
  SchoolProfile,
} from '../data/bspData';
import {
  computeTable1Summaries,
  computeTable2Summaries,
  formatRiel,
  parseNumber,
} from '../utils/bspUtils';
import {
  GraduationCap,
  BookOpen,
  Users,
  Building2,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  PieChart,
  CheckCircle,
  Award,
  ArrowUpRight,
  FileSpreadsheet,
} from 'lucide-react';

interface DashboardViewProps {
  table1Rows: IndicatorRow[];
  table2Rows: ActivityBudgetRow[];
  schoolProfile: SchoolProfile;
  onNavigateToTable1: () => void;
  onNavigateToTable2: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  table1Rows,
  table2Rows,
  schoolProfile,
  onNavigateToTable1,
  onNavigateToTable2,
}) => {
  const t1Summaries = computeTable1Summaries(table1Rows);
  const t2Summaries = computeTable2Summaries(table2Rows);

  const iconsMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-5 h-5 text-emerald-600" />,
    BookOpen: <BookOpen className="w-5 h-5 text-indigo-600" />,
    Users: <Users className="w-5 h-5 text-amber-600" />,
    Building2: <Building2 className="w-5 h-5 text-blue-600" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-rose-600" />,
  };

  // Find key milestone indicators from Table 1
  const enrollmentIndicator = table1Rows.find((r) => r.code === '១.១');
  const dropoutIndicator = table1Rows.find((r) => r.code === '២.១');
  const khmerGradeIndicator = table1Rows.find((r) => r.code === '៣.១');
  const mathGradeIndicator = table1Rows.find((r) => r.code === '៣.២');
  const readingG3Indicator = table1Rows.find((r) => r.code === '៣.៣');
  const readingG6Indicator = table1Rows.find((r) => r.code === '៣.៤');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-sky-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Award className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-800/80 text-amber-300 text-xs px-3 py-1 rounded-full font-medium mb-3 border border-indigo-700">
            <Award className="w-3.5 h-3.5" />
            <span>ក្របខ័ណ្ឌស្តង់ដាសាលារៀនគំរូទាំង ៥ របស់ MoEYS</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-moul tracking-wide text-amber-200">
            {schoolProfile.schoolName}
          </h2>
          <p className="text-sm text-slate-200 mt-2 leading-relaxed">
            ផ្ទាំងទិដ្ឋភាពទូទៅនៃផែនការយុទ្ធសាស្ត្រថវិកា ៣ ឆ្នាំ (BSP 3-Years) សម្រាប់ឆ្នាំ {schoolProfile.yearN1} ដល់ {schoolProfile.yearN3}។ គ្រប់គ្រងសូចនាករគន្លឹះ ចំណាយថវិកា និងប្រភពហិរញ្ញប្បទានដោយតម្លាភាព និងប្រសិទ្ធភាព។
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={onNavigateToTable1}
              className="flex items-center gap-2 bg-white text-indigo-950 hover:bg-slate-100 text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
              <span>ពិនិត្យសូចនាករ (តារាងទី១)</span>
            </button>
            <button
              onClick={onNavigateToTable2}
              className="flex items-center gap-2 bg-indigo-800/80 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl border border-indigo-600 transition-colors cursor-pointer"
            >
              <DollarSign className="w-4 h-4 text-amber-300" />
              <span>ពិនិត្យប្រភពថវិកា (តារាងទី២)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">ថវិកាគ្រោងសរុប (N+1: {schoolProfile.yearN1})</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-indigo-950">
            {formatRiel(t1Summaries.grandTotalBudgetN1)} <span className="text-xs font-normal text-slate-500">រៀល</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>បែងចែកលើ ៥ ស្តង់ដាសាលារៀន</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">គោលដៅថវិកា (N+1 Target)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-950">
            {formatRiel(t1Summaries.grandTotalTargetN1)} <span className="text-xs font-normal text-slate-500">រៀល</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-2">
            <span>ឯកតារៀលគត់</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">សូចនាករសរុប</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">
            96 <span className="text-xs font-normal text-slate-500">សូចនាករ</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-2">
            ២៦ គន្លឹះ + ៧០ រង (+២០ បំបែកភេទ)
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">សកម្មភាពគម្រោង (តារាងទី២)</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-sky-950">
            {table2Rows.filter((r) => r.category === 'ACTIVITY').length} <span className="text-xs font-normal text-slate-500">សកម្មភាព</span>
          </div>
          <div className="text-[11px] text-sky-700 font-medium mt-2">
            ៤ ប្រភពហិរញ្ញប្បទាន
          </div>
        </div>
      </div>

      {/* Main Grid: Standards Budget Distribution & Key Target Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2 Cols: Standards Budget Allocation Progress */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                ការបែងចែកថវិកាគ្រោងតាមស្តង់ដា (Budget by Standard - N+1)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                ភាគរយ និងទំហំថវិកាសម្រាប់ស្តង់ដានីមួយៗនៃឆ្នាំ {schoolProfile.yearN1}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              សរុប: {formatRiel(t1Summaries.grandTotalBudgetN1)} រៀល
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {STANDARDS_META.map((std) => {
              const budget = t1Summaries.standardTotals[std.id]?.budgetN1 || 0;
              const total = t1Summaries.grandTotalBudgetN1 || 1;
              const percent = Math.round((budget / total) * 100);

              return (
                <div key={std.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-100">
                        {iconsMap[std.iconName]}
                      </div>
                      <span className="font-semibold text-slate-800">{std.title}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-slate-900">{formatRiel(budget)} រៀល</span>
                      <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                        {percent}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        std.id === 1
                          ? 'bg-emerald-500'
                          : std.id === 2
                          ? 'bg-indigo-500'
                          : std.id === 3
                          ? 'bg-amber-500'
                          : std.id === 4
                          ? 'bg-blue-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 pl-8">
                    {std.indicatorsSummary}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 1 Col: Key Learning & School Targets */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              សូចនាករគន្លឹះសំខាន់ៗ (Key Targets)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              ការប្រៀបធៀបគោលដៅឆ្នាំបច្ចុប្បន្ន ធៀបនឹង ឆ្នាំគ្រោង N+1
            </p>
          </div>

          <div className="space-y-3">
            {/* Enrollment */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="text-[11px] text-slate-500 font-medium">
                ១.១ ភាគរយកុមារថ្នាក់ទី១ ចូលរៀនតាមអាយុ
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-600">
                  ឆ្នាំ N: <strong className="font-mono text-slate-800">{enrollmentIndicator?.targetN || '100%'}</strong>
                </span>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded">
                  គោលដៅ N+1: <strong className="font-mono">{enrollmentIndicator?.targetNPlus1 || '100%'}</strong>
                </span>
              </div>
            </div>

            {/* Dropout */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="text-[11px] text-slate-500 font-medium">
                ២.១ អត្រាបោះបង់ការសិក្សាបានថយចុះ
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-600">
                  ឆ្នាំ N: <strong className="font-mono text-slate-800">{dropoutIndicator?.targetN || '3%'}</strong>
                </span>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded">
                  គោលដៅ N+1: <strong className="font-mono">{dropoutIndicator?.targetNPlus1 || '2%'}</strong>
                </span>
              </div>
            </div>

            {/* Reading G3 */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="text-[11px] text-slate-500 font-medium">
                ៣.៣ សមត្ថភាពអានថ្នាក់ទី៣ តាមស្តង់ដា
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-600">
                  ឆ្នាំ N: <strong className="font-mono text-slate-800">{readingG3Indicator?.targetN || '47.5%'}</strong>
                </span>
                <span className="text-xs text-indigo-700 font-semibold bg-indigo-100/70 px-2 py-0.5 rounded">
                  គោលដៅ N+1: <strong className="font-mono">{readingG3Indicator?.targetNPlus1 || '50%'}</strong>
                </span>
              </div>
            </div>

            {/* Reading G6 */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="text-[11px] text-slate-500 font-medium">
                ៣.៤ សមត្ថភាពអានថ្នាក់ទី៦ តាមស្តង់ដា
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-600">
                  ឆ្នាំ N: <strong className="font-mono text-slate-800">{readingG6Indicator?.targetN || '55%'}</strong>
                </span>
                <span className="text-xs text-indigo-700 font-semibold bg-indigo-100/70 px-2 py-0.5 rounded">
                  គោលដៅ N+1: <strong className="font-mono">{readingG6Indicator?.targetNPlus1 || '60%'}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Standards Summary Cards */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-3">
          ទិដ្ឋភាពទូទៅនៃស្តង់ដាទាំង ៥ (Overview of 5 Standards)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STANDARDS_META.map((std) => {
            const budgetN1 = t1Summaries.standardTotals[std.id]?.budgetN1 || 0;
            const targetN1 = t1Summaries.standardTotals[std.id]?.targetN1Budget || 0;

            return (
              <div
                key={std.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${std.badgeBg}`}>
                      ស្តង់ដាទី {std.id}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-50">
                      {iconsMap[std.iconName]}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">
                    {std.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {std.indicatorsSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400">ថវិកាគ្រោង (N+1)</div>
                    <div className="text-xs font-bold font-mono text-slate-900">
                      {formatRiel(budgetN1)} រៀល
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">គោលដៅថវិកា (N+1)</div>
                    <div className="text-xs font-bold font-mono text-emerald-700">
                      {formatRiel(targetN1)} រៀល
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
