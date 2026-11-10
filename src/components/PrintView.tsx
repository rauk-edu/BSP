import React from 'react';
import {
  IndicatorRow,
  ActivityBudgetRow,
  SchoolProfile,
} from '../data/bspData';
import { StrategicDocument } from '../data/reportData';
import { formatRiel, computeTable1Summaries, computeTable2Summaries } from '../utils/bspUtils';

interface PrintViewProps {
  table1Rows: IndicatorRow[];
  table2Rows: ActivityBudgetRow[];
  schoolProfile: SchoolProfile;
  doc: StrategicDocument;
}

export const PrintView: React.FC<PrintViewProps> = ({
  table1Rows,
  table2Rows,
  schoolProfile,
  doc,
}) => {
  const t1Summaries = computeTable1Summaries(table1Rows);
  const t2Summaries = computeTable2Summaries(table2Rows);

  return (
    <div className="hidden print:block p-6 max-w-full text-black bg-white font-sans text-xs">
      {/* Official MoEYS Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="text-left text-xs space-y-1">
          <div className="font-moul text-sm text-slate-900">ក្រសួងអប់រំ យុវជន និងកីឡា</div>
          <div>មន្ទីរអប់រំ យុវជន និងកីឡា {schoolProfile.province || '..........'}</div>
          <div>ការិយាល័យអប់រំ យុវជន និងកីឡា {schoolProfile.district || '..........'}</div>
          <div className="font-bold text-slate-900">{schoolProfile.schoolName}</div>
          <div className="text-[10px]">កូដសាលា៖ {schoolProfile.schoolCode}</div>
        </div>

        <div className="text-center space-y-1">
          <div className="font-moul text-sm text-slate-900">ព្រះរាជាណាចក្រកម្ពុជា</div>
          <div className="font-moul text-xs text-slate-800">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
          <div className="font-mono text-xs">***</div>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center my-6">
        <h1 className="font-moul text-base text-slate-900 leading-relaxed">
          ផែនការយុទ្ធសាស្ត្រថវិកា (BSP) និងសំណើគម្រោងវិនិយោគសាលារៀន
        </h1>
        <h2 className="text-sm font-bold mt-1">
          សម្រាប់កៀរគរការវិនិយោគជាមួយរដ្ឋបាលឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ និងសហគមន៍ ({schoolProfile.yearN1} - {schoolProfile.yearN3})
        </h2>
      </div>

      {/* Chapter 1: សេចក្តីផ្តើម */}
      <div className="my-6 space-y-3">
        <h3 className="font-bold text-sm text-slate-900 border-b border-black pb-1">
          ជំពូកទី ១៖ សេចក្តីផ្តើម និងសាវតារបស់សាលារៀន
        </h3>
        <div>
          <h4 className="font-bold text-xs">១.១ ក្របខ័ណ្ឌគោលនយោបាយជាតិ</h4>
          <p className="text-[11px] leading-relaxed whitespace-pre-line mt-1">
            {doc.nationalFramework}
          </p>
        </div>
        <div className="mt-3">
          <h4 className="font-bold text-xs">១.២ សាវតារបស់សាលារៀន</h4>
          <p className="text-[11px] leading-relaxed mt-1">
            {doc.schoolBackground.history}
          </p>
          <div className="mt-2 text-[10px] grid grid-cols-4 gap-2 border border-black p-2 bg-slate-50 text-center">
            <div>សិស្សសរុប៖ <strong>{doc.schoolBackground.studentCount.total}</strong> (ស្រី {doc.schoolBackground.studentCount.female})</div>
            <div>គ្រូបង្រៀន៖ <strong>{doc.schoolBackground.teacherCount.total}</strong> (ស្រី {doc.schoolBackground.teacherCount.female})</div>
            <div>ថ្នាក់រៀន៖ <strong>{doc.schoolBackground.classCount}</strong> (បន្ទប់ {doc.schoolBackground.roomsCount})</div>
            <div>ភូមិគ្របដណ្តប់៖ <strong>{doc.schoolBackground.villagesCovered}</strong></div>
          </div>
        </div>
      </div>

      {/* Chapter 2: វឌ្ឍនភាព និងបញ្ហាប្រឈម តាម ៥ ស្តង់ដា */}
      <div className="my-6 space-y-3 break-before-page">
        <h3 className="font-bold text-sm text-slate-900 border-b border-black pb-1">
          ជំពូកទី ២៖ វឌ្ឍនភាព បញ្ហាប្រឈម និងសំណើវិនិយោគជាមួយឃុំ (៥ ស្តង់ដា)
        </h3>

        {doc.standardsEvaluation.map((std) => (
          <div key={std.standardId} className="border border-black p-2.5 rounded space-y-1.5 my-2 text-[10px]">
            <div className="font-bold text-xs bg-slate-100 p-1">
              {std.standardTitle}
            </div>
            <div>
              <strong>វឌ្ឍនភាពសម្រេចបាន៖</strong>
              <ul className="list-disc pl-5 mt-0.5">
                {std.progressItems.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>បញ្ហាប្រឈម (មិនទាន់បានជោគជ័យ)៖</strong>
              <ul className="list-disc pl-5 mt-0.5">
                {std.challengeItems.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="mt-1 pt-1 border-t border-dashed border-slate-400 font-bold text-slate-900">
              សំណើសុំមូលនិធិឃុំ/សហគមន៍វិនិយោគ៖ {std.communeInvestmentNeed}
            </div>
          </div>
        ))}
      </div>

      {/* Chapter 3: ចក្ខុវិស័យ និងគោលបំណង */}
      <div className="my-6 space-y-2">
        <h3 className="font-bold text-sm text-slate-900 border-b border-black pb-1">
          ជំពូកទី ៣៖ ចក្ខុវិស័យ បេសកកម្ម និងគោលបំណងយុទ្ធសាស្ត្រ
        </h3>
        <p className="text-[11px]"><strong>ចក្ខុវិស័យ៖</strong> {doc.vision}</p>
        <p className="text-[11px] whitespace-pre-line"><strong>បេសកកម្ម៖</strong> {doc.mission}</p>
        <div className="text-[11px]">
          <strong>គោលបំណងយុទ្ធសាស្ត្រ៖</strong>
          <ul className="list-decimal pl-5 mt-1">
            {doc.strategicObjectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chapter 4: Table 1 */}
      <div className="break-before-page my-6">
        <h3 className="font-bold text-sm text-center mb-3">
          ជំពូកទី ៤៖ សូចនាករ និងគោលដៅសមិទ្ធកម្មរបស់សាលារៀន (Table 1)
        </h3>

        <table className="w-full text-[8.5px] border-collapse border border-black">
          <thead>
            <tr className="bg-slate-100 font-bold">
              <th rowSpan={3} className="border border-black px-1.5 py-1 text-center w-8">ល.រ</th>
              <th rowSpan={3} className="border border-black px-2 py-1 text-center">ស្តង់ដា និងសូចនាករ</th>
              <th rowSpan={3} className="border border-black px-1.5 py-1 text-center w-24">
                <div>ឆ្នាំគ្រោងថវិកា</div>
                <div>(N+1: {schoolProfile.yearN1})</div>
              </th>
              <th colSpan={6} className="border border-black px-1 py-1 text-center">គោលដៅសូចនាករសមិទ្ធកម្ម</th>
            </tr>
            <tr className="bg-slate-100 font-bold">
              <th rowSpan={2} className="border border-black px-1 py-1 text-center">N-1</th>
              <th rowSpan={2} className="border border-black px-1 py-1 text-center">N</th>
              <th colSpan={2} className="border border-black px-1 py-1 text-center">N+1 ({schoolProfile.yearN1})</th>
              <th rowSpan={2} className="border border-black px-1 py-1 text-center">N+2</th>
              <th rowSpan={2} className="border border-black px-1 py-1 text-center">N+3</th>
            </tr>
            <tr className="bg-slate-100 font-bold">
              <th className="border border-black px-1 py-1 text-center">គោលដៅ</th>
              <th className="border border-black px-1.5 py-1 text-left min-w-[120px]">មូលហេតុនៃការផ្លាស់ប្តូរ</th>
            </tr>
          </thead>
          <tbody>
            {table1Rows.map((row) => {
              if (row.category === 'GRAND_TOTAL') {
                return (
                  <tr key={row.id} className="font-bold bg-slate-200">
                    <td colSpan={2} className="border border-black px-2 py-1 text-center">សរុប</td>
                    <td className="border border-black px-1 py-1 text-right font-mono">
                      {formatRiel(t1Summaries.grandTotalBudgetN1 || row.budgetYearN1)}
                    </td>
                    <td className="border border-black text-center">-</td>
                    <td className="border border-black text-center">-</td>
                    <td className="border border-black px-1 py-1 text-right font-mono">
                      {formatRiel(t1Summaries.grandTotalTargetN1 || row.targetNPlus1)}
                    </td>
                    <td className="border border-black"></td>
                    <td className="border border-black text-center">-</td>
                    <td className="border border-black text-center">-</td>
                  </tr>
                );
              }

              if (row.category === 'STANDARD_HEADER') {
                const stdSubtotal = t1Summaries.standardTotals[row.standardId]?.budgetN1 || 0;
                const stdTargetSub = t1Summaries.standardTotals[row.standardId]?.targetN1Budget || 0;
                return (
                  <tr key={row.id} className="font-bold bg-slate-100">
                    <td colSpan={2} className="border border-black px-2 py-1 text-left">{row.title}</td>
                    <td className="border border-black px-1 py-1 text-right font-mono">{formatRiel(stdSubtotal || row.budgetYearN1)}</td>
                    <td className="border border-black text-center">-</td>
                    <td className="border border-black text-center">-</td>
                    <td className="border border-black px-1 py-1 text-right font-mono">{formatRiel(stdTargetSub || row.targetNPlus1)}</td>
                    <td className="border border-black"></td>
                    <td className="border border-black text-center">-</td>
                    <td className="border border-black text-center">-</td>
                  </tr>
                );
              }

              return (
                <tr key={row.id} className={row.category === 'KEY_INDICATOR' ? 'font-semibold bg-slate-50' : ''}>
                  <td className="border border-black px-1 py-0.5 text-center font-mono">{row.code}</td>
                  <td className="border border-black px-1.5 py-0.5">{row.title}</td>
                  <td className="border border-black px-1 py-0.5 text-right font-mono">{row.budgetYearN1}</td>
                  <td className="border border-black px-1 py-0.5 text-center font-mono">{row.targetNMinus1}</td>
                  <td className="border border-black px-1 py-0.5 text-center font-mono">{row.targetN}</td>
                  <td className="border border-black px-1 py-0.5 text-right font-mono">{row.targetNPlus1}</td>
                  <td className="border border-black px-1 py-0.5 text-[8px]">{row.reasonChangeNPlus1}</td>
                  <td className="border border-black px-1 py-0.5 text-center font-mono">{row.targetNPlus2}</td>
                  <td className="border border-black px-1 py-0.5 text-center font-mono">{row.targetNPlus3}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Chapter 5: Table 2 */}
      <div className="break-before-page my-6">
        <h3 className="font-bold text-sm text-center mb-3">
          ជំពូកទី ៥៖ គម្រោងតម្រូវការឥណទាន និងប្រភពថវិកា ៣ ឆ្នាំ (Table 2)
        </h3>

        <table className="w-full text-[8px] border-collapse border border-black">
          <thead>
            <tr className="bg-slate-100 font-bold">
              <th rowSpan={2} className="border border-black px-1 py-1 text-center w-8">ល.រ</th>
              <th rowSpan={2} className="border border-black px-2 py-1 text-center">សកម្មភាព</th>
              <th colSpan={4} className="border border-black px-1 py-1 text-center">ឆ្នាំ N ({schoolProfile.yearN})</th>
              <th colSpan={4} className="border border-black px-1 py-1 text-center">ឆ្នាំ N+1 ({schoolProfile.yearN1})</th>
              <th colSpan={4} className="border border-black px-1 py-1 text-center">ឆ្នាំ N+2 ({schoolProfile.yearN2})</th>
              <th colSpan={4} className="border border-black px-1 py-1 text-center">ឆ្នាំ N+3 ({schoolProfile.yearN3})</th>
            </tr>
            <tr className="bg-slate-50 font-bold text-[7.5px]">
              <th className="border border-black">រដ្ឋ</th><th className="border border-black">ដៃគូ</th><th className="border border-black">សហគមន៍</th><th className="border border-black">ផ្សេងៗ</th>
              <th className="border border-black">រដ្ឋ</th><th className="border border-black">ដៃគូ</th><th className="border border-black">សហគមន៍</th><th className="border border-black">ផ្សេងៗ</th>
              <th className="border border-black">រដ្ឋ</th><th className="border border-black">ដៃគូ</th><th className="border border-black">សហគមន៍</th><th className="border border-black">ផ្សេងៗ</th>
              <th className="border border-black">រដ្ឋ</th><th className="border border-black">ដៃគូ</th><th className="border border-black">សហគមន៍</th><th className="border border-black">ផ្សេងៗ</th>
            </tr>
          </thead>
          <tbody>
            {table2Rows.map((row) => {
              if (row.category === 'GRAND_TOTAL') {
                const gt = t2Summaries.grandTotal;
                return (
                  <tr key={row.id} className="font-bold bg-slate-200">
                    <td colSpan={2} className="border border-black px-2 py-1 text-center">សរុប</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN.state)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN.partner)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN.community)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN.other)}</td>

                    <td className="border border-black text-right">{formatRiel(gt.yearN1.state)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN1.partner)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN1.community)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN1.other)}</td>

                    <td className="border border-black text-right">{formatRiel(gt.yearN2.state)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN2.partner)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN2.community)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN2.other)}</td>

                    <td className="border border-black text-right">{formatRiel(gt.yearN3.state)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN3.partner)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN3.community)}</td>
                    <td className="border border-black text-right">{formatRiel(gt.yearN3.other)}</td>
                  </tr>
                );
              }

              if (row.category === 'STANDARD_HEADER') {
                const st = t2Summaries.standardTotals[row.standardId];
                return (
                  <tr key={row.id} className="font-bold bg-slate-100">
                    <td colSpan={2} className="border border-black px-2 py-1 text-left">{row.activity}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN.state)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN.partner)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN.community)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN.other)}</td>

                    <td className="border border-black text-right">{formatRiel(st?.yearN1.state)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN1.partner)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN1.community)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN1.other)}</td>

                    <td className="border border-black text-right">{formatRiel(st?.yearN2.state)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN2.partner)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN2.community)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN2.other)}</td>

                    <td className="border border-black text-right">{formatRiel(st?.yearN3.state)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN3.partner)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN3.community)}</td>
                    <td className="border border-black text-right">{formatRiel(st?.yearN3.other)}</td>
                  </tr>
                );
              }

              return (
                <tr key={row.id}>
                  <td className="border border-black px-1 py-0.5 text-center font-mono">{row.code || '•'}</td>
                  <td className="border border-black px-1.5 py-0.5">{row.activity}</td>
                  <td className="border border-black text-right">{row.yearN.state}</td>
                  <td className="border border-black text-right">{row.yearN.partner}</td>
                  <td className="border border-black text-right">{row.yearN.community}</td>
                  <td className="border border-black text-right">{row.yearN.other}</td>

                  <td className="border border-black text-right">{row.yearN1.state}</td>
                  <td className="border border-black text-right">{row.yearN1.partner}</td>
                  <td className="border border-black text-right">{row.yearN1.community}</td>
                  <td className="border border-black text-right">{row.yearN1.other}</td>

                  <td className="border border-black text-right">{row.yearN2.state}</td>
                  <td className="border border-black text-right">{row.yearN2.partner}</td>
                  <td className="border border-black text-right">{row.yearN2.community}</td>
                  <td className="border border-black text-right">{row.yearN2.other}</td>

                  <td className="border border-black text-right">{row.yearN3.state}</td>
                  <td className="border border-black text-right">{row.yearN3.partner}</td>
                  <td className="border border-black text-right">{row.yearN3.community}</td>
                  <td className="border border-black text-right">{row.yearN3.other}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Chapter 6: សេចក្តីសន្និដ្ឋាន និងសម្មតិកម្ម */}
      <div className="my-6 space-y-3">
        <h3 className="font-bold text-sm text-slate-900 border-b border-black pb-1">
          ជំពូកទី ៦៖ សម្មតិកម្ម និងសេចក្តីសន្និដ្ឋានអំពាវនាវវិនិយោគ
        </h3>
        <div className="text-[11px]">
          <strong>សម្មតិកម្មចម្បង៖</strong>
          <ul className="list-disc pl-5 mt-1">
            {doc.assumptions.map((ass, i) => (
              <li key={i}>{ass}</li>
            ))}
          </ul>
        </div>
        <div className="mt-3 p-3 border border-black rounded text-[11px] leading-relaxed bg-slate-50">
          <strong>សេចក្តីអំពាវនាវដល់រដ្ឋបាលឃុំ/សង្កាត់ និងសហគមន៍៖</strong>
          <p className="mt-1">{doc.communeCallToAction}</p>
        </div>
      </div>

      {/* Official Signatures & Seal Block */}
      <div className="mt-10 grid grid-cols-3 text-center text-xs gap-4 pt-4">
        <div>
          <div className="font-semibold">បានឃើញ និងឯកភាព</div>
          <div className="font-bold mt-1">ប្រធានគណៈកម្មការគ្រប់គ្រងសាលា</div>
          <div className="h-20"></div>
          <div className="font-bold">{schoolProfile.committeeChair}</div>
        </div>

        <div>
          <div>{schoolProfile.province || '..........'}, {schoolProfile.approvalDate || 'ថ្ងៃទី... ខែ... ឆ្នាំ២០២៥'}</div>
          <div className="font-bold mt-1">នាយកសាលា</div>
          <div className="h-20"></div>
          <div className="font-bold">{schoolProfile.principalName}</div>
        </div>

        <div>
          <div>{schoolProfile.approvalDate || 'ថ្ងៃទី... ខែ... ឆ្នាំ២០២៥'}</div>
          <div className="font-bold mt-1">អ្នករៀបចំផែនការ</div>
          <div className="h-20"></div>
          <div className="font-bold">{schoolProfile.preparedBy}</div>
        </div>
      </div>
    </div>
  );
};
