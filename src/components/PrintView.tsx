import React from 'react';
import {
  IndicatorRow,
  ActivityBudgetRow,
  SchoolProfile,
} from '../data/bspData';
import { StrategicDocument } from '../data/reportData';
import { formatRiel, computeTable1Summaries, computeTable2Summaries } from '../utils/bspUtils';
import { PrintSettings, DEFAULT_PRINT_SETTINGS } from './PrintSettingsModal';
import { FormattedKhmerText } from './FormattedKhmerText';

import { AopIndicatorRow } from '../data/aopData';

interface PrintViewProps {
  table1Rows: IndicatorRow[];
  table2Rows: ActivityBudgetRow[];
  aopRows?: AopIndicatorRow[];
  schoolProfile: SchoolProfile;
  doc: StrategicDocument;
  settings?: PrintSettings;
}

export const PrintView: React.FC<PrintViewProps> = ({
  table1Rows,
  table2Rows,
  aopRows = [],
  schoolProfile,
  doc,
  settings = DEFAULT_PRINT_SETTINGS,
}) => {
  const t1Summaries = computeTable1Summaries(table1Rows);
  const t2Summaries = computeTable2Summaries(table2Rows);

  const showDoc = settings.printScope === 'all' || settings.printScope === 'doc_only';
  const showTable1 =
    settings.printScope === 'all' ||
    settings.printScope === 'tables_only' ||
    settings.printScope === 'table1_only';
  const showTable2 =
    settings.printScope === 'all' ||
    settings.printScope === 'tables_only' ||
    settings.printScope === 'table2_only';
  const showAop = settings.printScope === 'all' || settings.printScope === 'aop_only';

  // Dynamic font sizing classes based on user settings
  const fontClass =
    settings.fontSize === 'xs'
      ? 'text-[8px] leading-tight'
      : settings.fontSize === 'sm'
      ? 'text-[9.5px] leading-snug'
      : settings.fontSize === 'lg'
      ? 'text-[12px] leading-normal'
      : 'text-[10.5px] leading-snug';

  const tableHeaderClass =
    settings.fontSize === 'xs'
      ? 'text-[8.5px]'
      : settings.fontSize === 'sm'
      ? 'text-[9.5px]'
      : settings.fontSize === 'lg'
      ? 'text-[11.5px]'
      : 'text-[10px]';

  const tableCellClass =
    settings.fontSize === 'xs'
      ? 'px-1 py-0.5 text-[8px]'
      : settings.fontSize === 'sm'
      ? 'px-1.5 py-1 text-[9px]'
      : settings.fontSize === 'lg'
      ? 'px-2 py-1.5 text-[11px]'
      : 'px-1.5 py-1 text-[10px]';

  // Dynamic margin padding
  const marginClass =
    settings.margin === 'none'
      ? 'p-0'
      : settings.margin === 'narrow'
      ? 'p-3'
      : settings.margin === 'wide'
      ? 'p-8'
      : 'p-5';

  return (
    <>
      {/* Inject custom @page CSS based on user settings */}
      <style>{`
        @media print {
          @page {
            size: ${settings.paperSize} ${settings.orientation};
            margin: ${
              settings.margin === 'none'
                ? '0mm'
                : settings.margin === 'narrow'
                ? '6mm'
                : settings.margin === 'wide'
                ? '18mm'
                : '12mm'
            };
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            background: #ffffff !important;
          }
          thead {
            ${settings.repeatHeaders ? 'display: table-header-group;' : 'display: table-row-group;'}
          }
          tr {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .break-before-page {
            page-break-before: always;
            break-before: page;
          }
        }
      `}</style>

      <div
        className={`print-only-container hidden print:block max-w-full text-slate-900 bg-white font-sans ${marginClass} ${fontClass}`}
      >
        {/* Official MoEYS Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-300 mb-5">
          <div className="text-left space-y-0.5">
            <div className="font-moul text-xs sm:text-sm text-slate-900">
              ក្រសួងអប់រំ យុវជន និងកីឡា
            </div>
            <div>មន្ទីរអប់រំ យុវជន និងកីឡា {schoolProfile.province || '..........'}</div>
            <div>ការិយាល័យអប់រំ យុវជន និងកីឡា {schoolProfile.district || '..........'}</div>
            <div className="font-bold text-slate-900">{schoolProfile.schoolName}</div>
            <div className="text-[9px] text-slate-600 font-mono">
              លេខកូដសាលា៖ {schoolProfile.schoolCode}
            </div>
          </div>

          <div className="text-center space-y-0.5">
            <div className="font-moul text-xs sm:text-sm text-slate-900">ព្រះរាជាណាចក្រកម្ពុជា</div>
            <div className="font-moul text-[10px] sm:text-xs text-slate-800">
              ជាតិ សាសនា ព្រះមហាក្សត្រ
            </div>
            <div className="font-mono text-xs text-slate-600">***</div>
          </div>
        </div>

        {/* Main Document Title */}
        <div className="text-center my-4">
          <h1 className="font-moul text-sm sm:text-base text-slate-900 leading-relaxed">
            ផែនការយុទ្ធសាស្ត្រថវិកា (BSP) និងសំណើគម្រោងវិនិយោគសាលារៀន (CIP)
          </h1>
          <h2 className="text-xs sm:text-sm font-bold mt-1 text-slate-700">
            សម្រាប់កៀរគរការវិនិយោគជាមួយរដ្ឋបាលឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ និងសហគមន៍ (BSP {schoolProfile.yearN1} - {schoolProfile.yearN3})
          </h2>
          <div className="mt-1 text-[10px] text-slate-500 font-medium">
            វដ្តឆ្នាំថវិកា៖ ឆ្នាំ N ({schoolProfile.yearN}) ➔ ឆ្នាំ N+1 ({schoolProfile.yearN1}) ដល់ ឆ្នាំ N+3 ({schoolProfile.yearN3})
          </div>
        </div>

        {/* SECTION: DOCUMENT CHAPTERS (1, 2, 3) */}
        {showDoc && (
          <div className="space-y-5 my-5">
            {/* Chapter 1: សេចក្តីផ្តើម */}
            <div className="space-y-2.5">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 border-b border-slate-800 pb-1 flex items-center justify-between">
                <span>ជំពូកទី ១៖ សេចក្តីផ្តើម និងសាវតារបស់សាលារៀន</span>
                <span className="text-[10px] font-normal text-slate-500">MoEYS Policy Framework</span>
              </h3>
              <div>
                <h4 className="font-bold text-xs text-slate-800">១.១ ក្របខ័ណ្ឌគោលនយោបាយជាតិ</h4>
                <p className="leading-relaxed whitespace-pre-line mt-1 text-slate-800">
                  {doc.nationalFramework}
                </p>
              </div>
              <div className="mt-2.5">
                <h4 className="font-bold text-xs text-slate-800">១.២ សាវតារបស់សាលារៀន</h4>
                <div className="mt-1 leading-relaxed text-slate-800">
                  <FormattedKhmerText text={doc.schoolBackground.history} mode="full" />
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 border border-slate-300 p-2 bg-slate-50 text-center rounded">
                  <div>
                    សិស្សសរុប៖ <strong>{doc.schoolBackground.studentCount.total}</strong> (ស្រី {doc.schoolBackground.studentCount.female})
                  </div>
                  <div>
                    គ្រូបង្រៀន៖ <strong>{doc.schoolBackground.teacherCount.total}</strong> (ស្រី {doc.schoolBackground.teacherCount.female})
                  </div>
                  <div>
                    ថ្នាក់រៀន៖ <strong>{doc.schoolBackground.classCount}</strong> (បន្ទប់ {doc.schoolBackground.roomsCount})
                  </div>
                  <div>
                    ភូមិគ្របដណ្តប់៖ <strong>{doc.schoolBackground.villagesCovered}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter 2: វឌ្ឍនភាព និងបញ្ហាប្រឈម តាម ៥ ស្តង់ដា */}
            <div className="space-y-2.5 break-before-page">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 border-b border-slate-800 pb-1">
                ជំពូកទី ២៖ វឌ្ឍនភាព បញ្ហាប្រឈម និងសំណើវិនិយោគជាមួយឃុំ (៥ ស្តង់ដា)
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {doc.standardsEvaluation.map((std) => (
                  <div
                    key={std.standardId}
                    className="border border-slate-300 p-2.5 rounded space-y-1.5 bg-white text-slate-800"
                  >
                    <div className="font-bold text-xs bg-slate-100 p-1 rounded text-slate-900">
                      {std.standardTitle}
                    </div>
                    <div>
                      <strong>វឌ្ឍនភាពសម្រេចបាន៖</strong>
                      <ul className="list-disc pl-5 mt-0.5 space-y-0.5">
                        {std.progressItems.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong>បញ្ហាប្រឈម (មិនទាន់បានជោគជ័យ)៖</strong>
                      <ul className="list-disc pl-5 mt-0.5 space-y-0.5 text-slate-700">
                        {std.challengeItems.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    {std.communeInvestmentNeed && (
                      <div className="bg-sky-50 p-1.5 rounded border border-sky-200">
                        <strong>សំណើវិនិយោគជាមួយឃុំ/សង្កាត់ (CIP)៖</strong> {std.communeInvestmentNeed}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chapter 3: គោលបំណង និងយុទ្ធសាស្ត្រ */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 border-b border-slate-800 pb-1">
                ជំពូកទី ៣៖ គោលបំណង និងយុទ្ធសាស្ត្រគន្លឹះ ៣ ឆ្នាំ
              </h3>
              <p className="leading-relaxed whitespace-pre-line text-slate-800">
                {doc.strategicObjectives}
              </p>
            </div>
          </div>
        )}

        {/* SECTION: TABLE 1 - INDICATORS (តារាងទី១) */}
        {showTable1 && (
          <div className="break-before-page my-6 space-y-3">
            <div className="flex justify-between items-end border-b-2 border-slate-800 pb-1">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                  ជំពូកទី ៤៖ សូចនាករ និងគោលដៅសមិទ្ធកម្មរបស់សាលារៀន (Table 1)
                </h3>
                <div className="text-[10px] text-slate-600">
                  ៥ ស្តង់ដាជាតិ (២៦ សូចនាករគន្លឹះ + ៧០ សូចនាកររង = ៩៦ សូចនាករ)
                </div>
              </div>
              <div className="text-[10px] text-right font-mono font-semibold">
                ថវិកា N+1: {formatRiel(t1Summaries.grandTotalBudgetN1)} រៀល | គោលដៅ N+1: {formatRiel(t1Summaries.grandTotalTargetN1)} រៀល
              </div>
            </div>

            <table className="w-full border-collapse border border-slate-800">
              <thead className={`bg-slate-100 font-bold text-slate-900 ${tableHeaderClass}`}>
                <tr>
                  <th rowSpan={2} className="border border-slate-800 px-1 py-1 text-center w-10">
                    ល.រ
                  </th>
                  <th rowSpan={2} className="border border-slate-800 px-2 py-1 text-left min-w-[140px]">
                    ស្តង់ដា និងសូចនាករ
                  </th>
                  <th rowSpan={2} className="border border-slate-800 px-1 py-1 text-center w-20 bg-indigo-50">
                    ថវិកា N+1 ({schoolProfile.yearN1})
                  </th>
                  <th colSpan={6} className="border border-slate-800 px-1 py-0.5 text-center bg-slate-200">
                    គោលដៅសូចនាករសមិទ្ធកម្ម (Targets)
                  </th>
                </tr>
                <tr>
                  <th className="border border-slate-800 px-1 py-1 text-center w-12">N-1</th>
                  <th className="border border-slate-800 px-1 py-1 text-center w-12">N</th>
                  <th className="border border-slate-800 px-1 py-1 text-center w-16 bg-amber-50">
                    គោលដៅ N+1
                  </th>
                  <th className="border border-slate-800 px-1.5 py-1 text-left min-w-[160px] bg-amber-50">
                    មូលហេតុនៃការផ្លាស់ប្តូរ
                  </th>
                  <th className="border border-slate-800 px-1 py-1 text-center w-12">N+2</th>
                  <th className="border border-slate-800 px-1 py-1 text-center w-12">N+3</th>
                </tr>
              </thead>
              <tbody>
                {table1Rows.map((row) => {
                  if (row.category === 'GRAND_TOTAL') {
                    return (
                      <tr
                        key={row.id}
                        className={`font-bold ${
                          settings.highlightTotals ? 'bg-amber-100' : 'bg-slate-200'
                        } border-y-2 border-slate-800`}
                      >
                        <td colSpan={2} className={`${tableCellClass} border border-slate-800 text-center font-moul`}>
                          សរុបរួម (Grand Total)
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>
                          {formatRiel(t1Summaries.grandTotalBudgetN1 || row.budgetYearN1)}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>
                          {formatRiel(t1Summaries.grandTotalTargetN1 || row.targetNPlus1)}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-slate-700 italic`}>
                          សរុបថវិកា និងគោលដៅសមិទ្ធកម្មទាំង ៥ ស្តង់ដា
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                      </tr>
                    );
                  }

                  if (row.category === 'STANDARD_HEADER') {
                    const stdSubtotal = t1Summaries.standardTotals[row.standardId]?.budgetN1 || 0;
                    const stdTargetSub = t1Summaries.standardTotals[row.standardId]?.targetN1Budget || 0;
                    return (
                      <tr
                        key={row.id}
                        className={`font-bold ${
                          settings.highlightTotals ? 'bg-slate-200' : 'bg-slate-100'
                        } border-y border-slate-700`}
                      >
                        <td colSpan={2} className={`${tableCellClass} border border-slate-800 text-left`}>
                          {row.title}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>
                          {formatRiel(stdSubtotal || row.budgetYearN1)}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>
                          {formatRiel(stdTargetSub || row.targetNPlus1)}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-slate-600 italic`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                      </tr>
                    );
                  }

                  const isKey = row.category === 'KEY_INDICATOR';
                  const isDisagg = row.category === 'DISAGGREGATION';

                  return (
                    <tr
                      key={row.id}
                      className={
                        isKey
                          ? 'font-semibold bg-indigo-50/40'
                          : isDisagg
                          ? 'text-slate-600 bg-slate-50/50'
                          : 'bg-white'
                      }
                    >
                      <td className={`${tableCellClass} border border-slate-400 text-center font-mono`}>
                        {row.code}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 ${isDisagg ? 'pl-4' : ''}`}>
                        {row.title}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.budgetYearN1 || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-center font-mono`}>
                        {row.targetNMinus1 || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-center font-mono`}>
                        {row.targetN || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono font-semibold`}>
                        {row.targetNPlus1 || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 align-top`}>
                        {row.reasonChangeNPlus1 ? (
                          <FormattedKhmerText
                            text={row.reasonChangeNPlus1}
                            mode="table-cell"
                            className="text-slate-700"
                          />
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-center font-mono`}>
                        {row.targetNPlus2 || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-center font-mono`}>
                        {row.targetNPlus3 || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* SECTION: TABLE 2 - BUDGET PLAN & CREDIT REQUIREMENTS (តារាងទី២) */}
        {showTable2 && (
          <div className="break-before-page my-6 space-y-3">
            <div className="flex justify-between items-end border-b-2 border-slate-800 pb-1">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                  ជំពូកទី ៥៖ គម្រោងតម្រូវការឥណទាន និងប្រភពថវិកា ៣ ឆ្នាំ (Table 2)
                </h3>
                <div className="text-[10px] text-slate-600">
                  តម្រូវការឥណទាន ៤ ប្រភព៖ រដ្ឋ (SIG), ដៃគូអភិវឌ្ឍន៍, សហគមន៍, និងផ្សេងៗ
                </div>
              </div>
              <div className="text-[10px] text-right font-mono font-semibold">
                រដ្ឋ N: {formatRiel(t2Summaries.grandTotal.yearN.state)} | រដ្ឋ N+1: {formatRiel(t2Summaries.grandTotal.yearN1.state)} រៀល
              </div>
            </div>

            <table className="w-full border-collapse border border-slate-800">
              <thead className={`bg-slate-100 font-bold text-slate-900 ${tableHeaderClass}`}>
                <tr>
                  <th rowSpan={2} className="border border-slate-800 px-1 py-1 text-center w-8">
                    ល.រ
                  </th>
                  <th rowSpan={2} className="border border-slate-800 px-2 py-1 text-left min-w-[140px]">
                    សកម្មភាព
                  </th>
                  <th colSpan={4} className="border border-slate-800 px-1 py-0.5 text-center bg-sky-50">
                    ឆ្នាំ N ({schoolProfile.yearN})
                  </th>
                  <th colSpan={4} className="border border-slate-800 px-1 py-0.5 text-center bg-indigo-50">
                    ឆ្នាំ N+1 ({schoolProfile.yearN1})
                  </th>
                  <th colSpan={4} className="border border-slate-800 px-1 py-0.5 text-center bg-emerald-50">
                    ឆ្នាំ N+2 ({schoolProfile.yearN2})
                  </th>
                  <th colSpan={4} className="border border-slate-800 px-1 py-0.5 text-center bg-purple-50">
                    ឆ្នាំ N+3 ({schoolProfile.yearN3})
                  </th>
                </tr>
                <tr className="text-[8px] sm:text-[8.5px]">
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center bg-sky-100/60">រដ្ឋ</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">ដៃគូ</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">សហគមន៍</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">ផ្សេងៗ</th>

                  <th className="border border-slate-800 px-0.5 py-0.5 text-center bg-indigo-100/60">រដ្ឋ</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">ដៃគូ</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">សហគមន៍</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">ផ្សេងៗ</th>

                  <th className="border border-slate-800 px-0.5 py-0.5 text-center bg-emerald-100/60">រដ្ឋ</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">ដៃគូ</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">សហគមន៍</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">ផ្សេងៗ</th>

                  <th className="border border-slate-800 px-0.5 py-0.5 text-center bg-purple-100/60">រដ្ឋ</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">ដៃគូ</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">សហគមន៍</th>
                  <th className="border border-slate-800 px-0.5 py-0.5 text-center">ផ្សេងៗ</th>
                </tr>
              </thead>
              <tbody>
                {table2Rows.map((row) => {
                  if (row.category === 'GRAND_TOTAL') {
                    const gt = t2Summaries.grandTotal;
                    return (
                      <tr
                        key={row.id}
                        className={`font-bold ${
                          settings.highlightTotals ? 'bg-amber-100' : 'bg-slate-200'
                        } border-y-2 border-slate-800`}
                      >
                        <td colSpan={2} className={`${tableCellClass} border border-slate-800 text-center font-moul`}>
                          សរុបរួម (Grand Total)
                        </td>
                        {/* Year N */}
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold bg-sky-100/60`}>
                          {formatRiel(gt.yearN.state)}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN.partner)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN.community)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN.other)}</td>

                        {/* Year N+1 */}
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold bg-indigo-100/60`}>
                          {formatRiel(gt.yearN1.state)}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN1.partner)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN1.community)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN1.other)}</td>

                        {/* Year N+2 */}
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold bg-emerald-100/60`}>
                          {formatRiel(gt.yearN2.state)}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN2.partner)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN2.community)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN2.other)}</td>

                        {/* Year N+3 */}
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold bg-purple-100/60`}>
                          {formatRiel(gt.yearN3.state)}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN3.partner)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN3.community)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(gt.yearN3.other)}</td>
                      </tr>
                    );
                  }

                  if (row.category === 'STANDARD_HEADER') {
                    const st = t2Summaries.standardTotals[row.standardId];
                    return (
                      <tr
                        key={row.id}
                        className={`font-bold ${
                          settings.highlightTotals ? 'bg-slate-200' : 'bg-slate-100'
                        } border-y border-slate-700`}
                      >
                        <td colSpan={2} className={`${tableCellClass} border border-slate-800 text-left`}>
                          {row.activity}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>{formatRiel(st?.yearN.state)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN.partner)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN.community)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN.other)}</td>

                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>{formatRiel(st?.yearN1.state)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN1.partner)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN1.community)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN1.other)}</td>

                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>{formatRiel(st?.yearN2.state)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN2.partner)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN2.community)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN2.other)}</td>

                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>{formatRiel(st?.yearN3.state)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN3.partner)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN3.community)}</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono`}>{formatRiel(st?.yearN3.other)}</td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={row.id} className="bg-white">
                      <td className={`${tableCellClass} border border-slate-400 text-center font-mono`}>
                        {row.code || '•'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 font-medium`}>
                        {row.activity}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono font-semibold bg-sky-50/40`}>
                        {row.yearN.state || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN.partner || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN.community || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN.other || '-'}
                      </td>

                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono font-semibold bg-indigo-50/40`}>
                        {row.yearN1.state || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN1.partner || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN1.community || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN1.other || '-'}
                      </td>

                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono bg-emerald-50/40`}>
                        {row.yearN2.state || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN2.partner || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN2.community || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN2.other || '-'}
                      </td>

                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono bg-purple-50/40`}>
                        {row.yearN3.state || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN3.partner || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN3.community || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono`}>
                        {row.yearN3.other || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* SECTION: AOP INDICATOR TABLE (ផែនការប្រតិបត្តិ AOP ឆ្នាំ N+1) */}
        {showAop && aopRows.length > 0 && (
          <div className="break-before-page my-6 space-y-3">
            <div className="flex justify-between items-end border-b-2 border-slate-800 pb-1">
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                  ផែនការប្រតិបត្តិប្រចាំឆ្នាំ (AOP {schoolProfile.yearN1})៖ តារាងសូចនាករ និងថវិកា
                </h3>
                <div className="text-[10px] text-slate-600">
                  ៥ ស្តង់ដាជាតិ (២៦ គន្លឹះ + ៧០ រង) • លទ្ធផលឆ្នាំបច្ចុប្បន្ន (N), គោលដៅ (N+1) និងថវិកា ៣ ប្រភព
                </div>
              </div>
              <div className="text-[10px] text-right font-mono font-semibold">
                ឆ្នាំគ្រោងថវិកា N+1: {schoolProfile.yearN1}
              </div>
            </div>

            <table className="w-full border-collapse border border-slate-800">
              <thead className={`bg-slate-100 font-bold text-slate-900 ${tableHeaderClass}`}>
                <tr>
                  <th rowSpan={2} className="border border-slate-800 px-1 py-1 text-center w-8">
                    ល.រ
                  </th>
                  <th rowSpan={2} className="border border-slate-800 px-2 py-1 text-left min-w-[140px]">
                    ស្តង់ដា និងសូចនាករ
                  </th>
                  <th rowSpan={2} className="border border-slate-800 px-1 py-1 text-center w-12">
                    ឯកតា
                  </th>
                  <th rowSpan={2} className="border border-slate-800 px-1 py-1 text-center w-20">
                    <div>លទ្ធផលសូចនាករ</div>
                    <div className="text-[9px] font-normal font-mono text-slate-600">ឆ្នាំ N ({schoolProfile.yearN})</div>
                  </th>
                  <th rowSpan={2} className="border border-slate-800 px-1 py-1 text-center w-20 bg-amber-50">
                    <div>គោលដៅសូចនាករ</div>
                    <div className="text-[9px] font-normal font-mono text-amber-800">គ្រោង (N+1: {schoolProfile.yearN1})</div>
                  </th>
                  <th colSpan={3} className="border border-slate-800 px-1 py-0.5 text-center bg-emerald-100/70">
                    ឆ្នាំគ្រោងថវិកា (ឆ្នាំ N+1: {schoolProfile.yearN1}) (រៀល)
                  </th>
                </tr>
                <tr className="text-[8px] sm:text-[8.5px]">
                  <th className="border border-slate-800 px-1 py-0.5 text-center bg-sky-50">ថវិការដ្ឋ</th>
                  <th className="border border-slate-800 px-1 py-0.5 text-center bg-amber-50">ថវិកាក្រៅពីរដ្ឋ</th>
                  <th className="border border-slate-800 px-1 py-0.5 text-center bg-emerald-50">ថវិកាសរុប</th>
                </tr>
              </thead>
              <tbody>
                {aopRows.map((row) => {
                  if (row.category === 'GRAND_TOTAL') {
                    return (
                      <tr
                        key={row.id}
                        className={`font-bold ${
                          settings.highlightTotals ? 'bg-amber-100' : 'bg-slate-200'
                        } border-y-2 border-slate-800`}
                      >
                        <td colSpan={2} className={`${tableCellClass} border border-slate-800 text-center font-moul`}>
                          សរុប (Grand Total)
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold bg-sky-50`}>
                          {row.stateBudgetN1 || '13,953,100'}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold bg-amber-50`}>
                          {row.nonStateBudgetN1 || '-'}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold bg-emerald-100/70`}>
                          {row.totalBudgetN1 || row.stateBudgetN1 || '13,953,100'}
                        </td>
                      </tr>
                    );
                  }

                  if (row.category === 'STANDARD_HEADER') {
                    return (
                      <tr
                        key={row.id}
                        className={`font-bold ${
                          settings.highlightTotals ? 'bg-slate-200' : 'bg-slate-100'
                        } border-y border-slate-700`}
                      >
                        <td colSpan={2} className={`${tableCellClass} border border-slate-800 text-left`}>
                          {row.title}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-center`}>-</td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>
                          {row.stateBudgetN1 || '-'}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>
                          {row.nonStateBudgetN1 || '-'}
                        </td>
                        <td className={`${tableCellClass} border border-slate-800 text-right font-mono font-bold`}>
                          {row.totalBudgetN1 || row.stateBudgetN1 || '-'}
                        </td>
                      </tr>
                    );
                  }

                  const isKey = row.category === 'KEY_INDICATOR';
                  const isDisagg = row.category === 'DISAGGREGATION';

                  return (
                    <tr
                      key={row.id}
                      className={
                        isKey
                          ? 'font-semibold bg-indigo-50/40'
                          : isDisagg
                          ? 'text-slate-600 bg-slate-50/50'
                          : 'bg-white'
                      }
                    >
                      <td className={`${tableCellClass} border border-slate-400 text-center font-mono`}>
                        {row.code}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 ${isDisagg ? 'pl-4' : ''}`}>
                        {row.title}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-center`}>
                        {row.unit || (isDisagg ? '%' : '-')}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-center font-mono`}>
                        {row.currentResultN || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-center font-mono font-semibold`}>
                        {row.targetBudgetN1 || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono bg-sky-50/30`}>
                        {row.stateBudgetN1 || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono bg-amber-50/20`}>
                        {row.nonStateBudgetN1 || '-'}
                      </td>
                      <td className={`${tableCellClass} border border-slate-400 text-right font-mono font-semibold bg-emerald-50/30`}>
                        {row.totalBudgetN1 || row.stateBudgetN1 || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* SECTION: CHAPTER 6 - CONCLUSION & CIP CALL */}
        {showDoc && (
          <div className="my-6 space-y-3">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 border-b border-slate-800 pb-1">
              ជំពូកទី ៦៖ សម្មតិកម្ម និងសេចក្តីសន្និដ្ឋានអំពាវនាវវិនិយោគ
            </h3>
            <div>
              <strong>សម្មតិកម្មចម្បង៖</strong>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                {doc.assumptions.map((ass, i) => (
                  <li key={i}>{ass}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2.5 p-3 border border-slate-300 rounded leading-relaxed bg-slate-50">
              <strong>សេចក្តីអំពាវនាវដល់រដ្ឋបាលឃុំ/សង្កាត់ និងសហគមន៍ (Commune Call to Action)៖</strong>
              <p className="mt-1">{doc.communeCallToAction}</p>
            </div>
          </div>
        )}

        {/* Official Signatures & Seal Block */}
        <div className="mt-8 pt-4 border-t border-slate-300 grid grid-cols-3 text-center gap-4 break-inside-avoid">
          <div>
            <div className="font-semibold text-slate-800">បានឃើញ និងឯកភាព</div>
            <div className="font-bold mt-1 text-slate-900">ប្រធានគណៈកម្មការគ្រប់គ្រងសាលា</div>
            <div className="h-16 flex items-center justify-center text-[10px] text-slate-400 italic">
              (ហត្ថលេខា និងត្រា)
            </div>
            <div className="font-bold text-slate-900">{schoolProfile.committeeChair}</div>
          </div>

          <div>
            <div className="text-slate-600">
              {schoolProfile.province || '..........'}, {schoolProfile.approvalDate || 'ថ្ងៃទី... ខែ... ឆ្នាំ២០២៥'}
            </div>
            <div className="font-bold mt-1 text-slate-900">នាយក/នាយិកាសាលា</div>
            <div className="h-16 flex items-center justify-center text-[10px] text-slate-400 italic">
              (ហត្ថលេខា និងត្រា)
            </div>
            <div className="font-bold text-slate-900">{schoolProfile.principalName}</div>
          </div>

          <div>
            <div className="text-slate-600">{schoolProfile.approvalDate || 'ថ្ងៃទី... ខែ... ឆ្នាំ២០២៥'}</div>
            <div className="font-bold mt-1 text-slate-900">អ្នករៀបចំផែនការថវិកា</div>
            <div className="h-16 flex items-center justify-center text-[10px] text-slate-400 italic">
              (ហត្ថលេខា)
            </div>
            <div className="font-bold text-slate-900">{schoolProfile.preparedBy}</div>
          </div>
        </div>
      </div>
    </>
  );
};
