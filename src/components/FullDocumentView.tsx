import React, { useState } from 'react';
import {
  StrategicDocument,
  StandardEvaluation,
} from '../data/reportData';
import {
  IndicatorRow,
  ActivityBudgetRow,
  SchoolProfile,
} from '../data/bspData';
import {
  formatRiel,
  computeTable1Summaries,
  computeTable2Summaries,
} from '../utils/bspUtils';
import {
  FileText,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Target,
  DollarSign,
  TrendingUp,
  Award,
  Edit3,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  AlignLeft,
  Check,
} from 'lucide-react';
import { FormattedKhmerText } from './FormattedKhmerText';
import { normalizeKhmerBulletString } from '../utils/khmerTextFormatter';

interface FullDocumentViewProps {
  doc: StrategicDocument;
  onUpdateDoc: (updated: Partial<StrategicDocument>) => void;
  schoolProfile: SchoolProfile;
  table1Rows: IndicatorRow[];
  table2Rows: ActivityBudgetRow[];
  onNavigateToTable1: () => void;
  onNavigateToTable2: () => void;
  onOpenAICopilot?: () => void;
}

export const FullDocumentView: React.FC<FullDocumentViewProps> = ({
  doc,
  onUpdateDoc,
  schoolProfile,
  table1Rows,
  table2Rows,
  onNavigateToTable1,
  onNavigateToTable2,
  onOpenAICopilot,
}) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isEditingHistory, setIsEditingHistory] = useState<boolean>(false);
  const t1Summaries = computeTable1Summaries(table1Rows);
  const t2Summaries = computeTable2Summaries(table2Rows);

  const updateEvaluation = (
    stdId: number,
    field: 'progressItems' | 'challengeItems' | 'communeInvestmentNeed',
    value: string[] | string
  ) => {
    const updated = doc.standardsEvaluation.map((s) =>
      s.standardId === stdId ? { ...s, [field]: value } : s
    );
    onUpdateDoc({ standardsEvaluation: updated });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Document Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
              <h2 className="text-base md:text-lg font-bold text-slate-900">
                ឯកសារផែនការយុទ្ធសាស្ត្រថវិកា និងសំណើវិនិយោគសាលារៀន (Report & Proposal)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-4.5">
              ឯកសារពេញលេញតាមលំនាំរចនាសម្ព័ន្ធជាតិ សម្រាប់កៀរគរការវិនិយោគជាមួយរដ្ឋបាលឃុំ ស្រុក និងសហគមន៍
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              ៦ ជំពូកស្តង់ដាជាតិ
            </span>
          </div>
        </div>

        {/* Quick Chapter Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 mt-3 border-t border-slate-100 text-xs">
          {[
            { id: 1, title: '១. សេចក្តីផ្តើម' },
            { id: 2, title: '២. វឌ្ឍនភាព & បញ្ហាប្រឈម' },
            { id: 3, title: '៣. គោលបំណង' },
            { id: 4, title: '៤. គោលដៅសមិទ្ធកម្ម (តារាង១)' },
            { id: 5, title: '៥. សកម្មភាព & ថវិកា (តារាង២)' },
            { id: 6, title: '៦. សេចក្តីសន្និដ្ឋាន' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.title}
            </button>
          ))}

          {onOpenAICopilot && (
            <button
              onClick={onOpenAICopilot}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xs cursor-pointer transition-all shrink-0"
              title="ជំនួយការ AI កែលម្អឯកសារជាតិ"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ជំនួយការ AI ឯកសារ</span>
            </button>
          )}
        </div>
      </div>

      {/* CHAPTER 1: សេចក្តីផ្តើម */}
      {activeTab === 1 && (
        <div className="space-y-6">
          {/* ១.១ ក្របខ័ណ្ឌជាតិ */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-bold text-slate-900 text-sm">
              <Award className="w-5 h-5 text-indigo-600" />
              <span>១.១ ក្របខ័ណ្ឌគោលនយោបាយថ្នាក់ជាតិ (MoEYS Policy Framework)</span>
            </div>
            <p className="text-xs text-slate-500">
              ខ្លឹមសារគោលនយោបាយជាតិ យុទ្ធសាស្ត្របញ្ចកោណ និងវិធានការគន្លឹះ ៤ របស់ក្រសួងអប់រំ យុវជន និងកីឡា៖
            </p>
            <textarea
              rows={8}
              value={doc.nationalFramework}
              onChange={(e) => onUpdateDoc({ nationalFramework: e.target.value })}
              className="w-full p-3 text-xs border border-slate-300 rounded-xl leading-relaxed focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* ១.២ សាវតារបស់សាលារៀន */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Building2 className="w-5 h-5 text-sky-600" />
                <span>១.២ សាវតារបស់សាលារៀន និងទិន្នន័យជាក់ស្តែង (School Background & Profile)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const cleaned = normalizeKhmerBulletString(doc.schoolBackground.history);
                    if (cleaned && cleaned !== doc.schoolBackground.history) {
                      onUpdateDoc({
                        schoolBackground: { ...doc.schoolBackground, history: cleaned },
                      });
                    }
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
                  title="បំបែកសញ្ញាដក (-) ជាប់គ្នា ឱ្យចុះបន្ទាត់ថ្មីដោយស្វ័យប្រវត្តិ"
                >
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>ទម្លាក់បន្ទាត់សញ្ញា (-) ស្វ័យប្រវត្តិ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingHistory(!isEditingHistory)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors cursor-pointer ${
                    isEditingHistory
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {isEditingHistory ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>មើលទម្រង់ស្អាត</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3 h-3 text-slate-500" />
                      <span>កែសម្រួលអត្ថបទ</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-slate-700 font-semibold">
                    ប្រវត្តិ និងការវិវត្តរបស់សាលារៀន (ចូលកថាខណ្ឌ & ទម្លាក់សញ្ញា - មិនឱ្យស្មើគ្នា)
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {isEditingHistory ? 'កំពុងកែសម្រួល...' : 'ទិដ្ឋភាពទម្រង់ស្អាត'}
                  </span>
                </div>

                {isEditingHistory ? (
                  <div className="space-y-2">
                    <textarea
                      rows={8}
                      value={doc.schoolBackground.history}
                      onChange={(e) =>
                        onUpdateDoc({
                          schoolBackground: { ...doc.schoolBackground, history: e.target.value },
                        })
                      }
                      placeholder="បញ្ចូលប្រវត្តិសាលា... (ប្រើសញ្ញា - សម្រាប់ព្រឹត្តិការណ៍នីមួយៗ)"
                      className="w-full p-3 text-xs border border-slate-300 rounded-xl leading-relaxed focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none font-sans"
                    />
                    <p className="text-[11px] text-slate-500 italic">
                      ចំណាំ៖ អ្នកអាចចុចប៊ូតុង «ទម្លាក់បន្ទាត់សញ្ញា (-) ស្វ័យប្រវត្តិ» ខាងលើ ដើម្បីបំបែកចំណុចដកដែលជាប់គ្នាជាបន្ទាត់ដាច់ដោយឡែក។
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl">
                    <FormattedKhmerText
                      text={doc.schoolBackground.history}
                      mode="full"
                      paragraphClassName="text-slate-800 leading-relaxed text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">សិស្សសរុប (ស្រី)</div>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={doc.schoolBackground.studentCount.total}
                      onChange={(e) =>
                        onUpdateDoc({
                          schoolBackground: {
                            ...doc.schoolBackground,
                            studentCount: {
                              ...doc.schoolBackground.studentCount,
                              total: parseInt(e.target.value) || 0,
                            },
                          },
                        })
                      }
                      className="w-16 px-1.5 py-1 text-xs border border-slate-300 rounded font-mono font-bold"
                    />
                    <span className="text-[11px] text-slate-500">ស្រី:</span>
                    <input
                      type="number"
                      value={doc.schoolBackground.studentCount.female}
                      onChange={(e) =>
                        onUpdateDoc({
                          schoolBackground: {
                            ...doc.schoolBackground,
                            studentCount: {
                              ...doc.schoolBackground.studentCount,
                              female: parseInt(e.target.value) || 0,
                            },
                          },
                        })
                      }
                      className="w-16 px-1.5 py-1 text-xs border border-slate-300 rounded font-mono text-emerald-700 font-bold"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">គ្រូបង្រៀនសរុប (ស្រី)</div>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={doc.schoolBackground.teacherCount.total}
                      onChange={(e) =>
                        onUpdateDoc({
                          schoolBackground: {
                            ...doc.schoolBackground,
                            teacherCount: {
                              ...doc.schoolBackground.teacherCount,
                              total: parseInt(e.target.value) || 0,
                            },
                          },
                        })
                      }
                      className="w-16 px-1.5 py-1 text-xs border border-slate-300 rounded font-mono font-bold"
                    />
                    <span className="text-[11px] text-slate-500">ស្រី:</span>
                    <input
                      type="number"
                      value={doc.schoolBackground.teacherCount.female}
                      onChange={(e) =>
                        onUpdateDoc({
                          schoolBackground: {
                            ...doc.schoolBackground,
                            teacherCount: {
                              ...doc.schoolBackground.teacherCount,
                              female: parseInt(e.target.value) || 0,
                            },
                          },
                        })
                      }
                      className="w-16 px-1.5 py-1 text-xs border border-slate-300 rounded font-mono text-emerald-700 font-bold"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">ថ្នាក់រៀន / បន្ទប់</div>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={doc.schoolBackground.classCount}
                      onChange={(e) =>
                        onUpdateDoc({
                          schoolBackground: {
                            ...doc.schoolBackground,
                            classCount: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-16 px-1.5 py-1 text-xs border border-slate-300 rounded font-mono font-bold"
                    />
                    <span className="text-[11px] text-slate-500">បន្ទប់:</span>
                    <input
                      type="number"
                      value={doc.schoolBackground.roomsCount}
                      onChange={(e) =>
                        onUpdateDoc({
                          schoolBackground: {
                            ...doc.schoolBackground,
                            roomsCount: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-16 px-1.5 py-1 text-xs border border-slate-300 rounded font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">ភូមិទទួលសេវាអប់រំ</div>
                  <input
                    type="text"
                    value={doc.schoolBackground.villagesCovered}
                    onChange={(e) =>
                      onUpdateDoc({
                        schoolBackground: {
                          ...doc.schoolBackground,
                          villagesCovered: e.target.value,
                        },
                      })
                    }
                    className="w-full mt-1 px-2 py-1 text-xs border border-slate-300 rounded font-medium text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 2: វឌ្ឍនភាព និងបញ្ហាប្រឈម តាមស្តង់ដាទាំង ៥ */}
      {activeTab === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm">
              ២. វឌ្ឍនភាព និងបញ្ហាប្រឈមដែលបានអនុវត្តកន្លងមក (Progress & Challenges by 5 Standards)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ការបកស្រាយលម្អិតតាមស្តង់ដាសាលារៀនគំរូទាំង ៥ រួមទាំងសំណើវិនិយោគជាក់លាក់ដែលស្នើសុំរដ្ឋបាលឃុំ និងសហគមន៍ជួយឧបត្ថម្ភ
            </p>
          </div>

          {doc.standardsEvaluation.map((std) => (
            <div
              key={std.standardId}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-sm">
                  {std.standardTitle}
                </span>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                  ស្តង់ដាទី {std.standardId}
                </span>
              </div>

              {/* Progress Box */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>វឌ្ឍនភាពដែលសម្រេចបាន៖</span>
                </div>
                <textarea
                  rows={3}
                  value={std.progressItems.join('\n')}
                  onChange={(e) =>
                    updateEvaluation(
                      std.standardId,
                      'progressItems',
                      e.target.value.split('\n').filter((l) => l.trim())
                    )
                  }
                  className="w-full p-2.5 text-xs bg-white border border-emerald-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
                />
              </div>

              {/* Challenges Box */}
              <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-950">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>បញ្ហាប្រឈម និងការលំបាក (ធ្វើមិនទាន់បានជោគជ័យ)៖</span>
                </div>
                <textarea
                  rows={3}
                  value={std.challengeItems.join('\n')}
                  onChange={(e) =>
                    updateEvaluation(
                      std.standardId,
                      'challengeItems',
                      e.target.value.split('\n').filter((l) => l.trim())
                    )
                  }
                  className="w-full p-2.5 text-xs bg-white border border-rose-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 leading-relaxed"
                />
              </div>

              {/* Commune Investment Need */}
              <div className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
                  <DollarSign className="w-4 h-4 text-indigo-600" />
                  <span>សំណើវិនិយោគស្នើសុំរដ្ឋបាលឃុំ/សង្កាត់ និងសហគមន៍ជួយឧបត្ថម្ភ៖</span>
                </div>
                <input
                  type="text"
                  value={std.communeInvestmentNeed}
                  onChange={(e) =>
                    updateEvaluation(std.standardId, 'communeInvestmentNeed', e.target.value)
                  }
                  className="w-full p-2.5 text-xs bg-white border border-indigo-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-indigo-900"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CHAPTER 3: ចក្ខុវិស័យ និងគោលបំណង */}
      {activeTab === 3 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 font-bold text-slate-900 text-sm">
            ៣. ចក្ខុវិស័យ បេសកកម្ម និងគោលបំណងយុទ្ធសាស្ត្រ
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                ៣.១ ចក្ខុវិស័យ (Vision)
              </label>
              <textarea
                rows={3}
                value={doc.vision}
                onChange={(e) => onUpdateDoc({ vision: e.target.value })}
                className="w-full p-3 text-xs border border-slate-300 rounded-xl leading-relaxed focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                ៣.២ បេសកកម្ម (Mission)
              </label>
              <textarea
                rows={4}
                value={doc.mission}
                onChange={(e) => onUpdateDoc({ mission: e.target.value })}
                className="w-full p-3 text-xs border border-slate-300 rounded-xl leading-relaxed focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                ៣.៣ គោលបំណងយុទ្ធសាស្ត្រគន្លឹះ (Strategic Objectives)
              </label>
              <textarea
                rows={5}
                value={doc.strategicObjectives.join('\n')}
                onChange={(e) =>
                  onUpdateDoc({
                    strategicObjectives: e.target.value.split('\n').filter((l) => l.trim()),
                  })
                }
                className="w-full p-3 text-xs border border-slate-300 rounded-xl leading-relaxed focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 4: សូចនាករ និងគោលដៅសមិទ្ធកម្ម (TABLE 1) */}
      {activeTab === 4 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                ៤. សូចនាករ និងគោលដៅសមិទ្ធកម្មរបស់សាលារៀន (Table 1)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                តារាងសូចនាករពេញលេញតាម ៥ ស្តង់ដាជាតិ គណនាថវិកា និងគោលដៅ ៣ ឆ្នាំ
              </p>
            </div>
            <button
              onClick={onNavigateToTable1}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-colors"
            >
              <span>បើកតារាងពេញ (៩៦ សូចនាករ)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="text-[11px] text-indigo-700 font-medium">ថវិកាគ្រោងសរុប ឆ្នាំ N+1</div>
              <div className="text-lg font-bold font-mono text-indigo-950 mt-1">
                {formatRiel(t1Summaries.grandTotalBudgetN1)} រៀល
              </div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="text-[11px] text-emerald-700 font-medium">គោលដៅថវិកាសរុប ឆ្នាំ N+1</div>
              <div className="text-lg font-bold font-mono text-emerald-950 mt-1">
                {formatRiel(t1Summaries.grandTotalTargetN1)} រៀល
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-600 font-medium">សូចនាករសរុប</div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-1">
                96 សូចនាករ (៥ ស្តង់ដា)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 5: សកម្មភាពអនុវត្ត និងថវិកា (TABLE 2) */}
      {activeTab === 5 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                ៥. សកម្មភាពអនុវត្ត និងគម្រោងថវិកា ៣ ឆ្នាំ (Table 2)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                ការបែងចែកថវិកាតាមសកម្មភាព និងប្រភពហិរញ្ញប្បទាន (ថវិការដ្ឋ ដៃគូ សហគមន៍ មូលនិធិឃុំ)
              </p>
            </div>
            <button
              onClick={onNavigateToTable2}
              className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-colors"
            >
              <span>បើកតារាងពេញ (Table 2)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-center">
              <div className="text-[10px] text-sky-700">ឆ្នាំ N ({schoolProfile.yearN})</div>
              <div className="text-sm font-bold font-mono text-sky-950 mt-1">
                {formatRiel(t2Summaries.grandTotal.yearN.total)} រៀល
              </div>
            </div>
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
              <div className="text-[10px] text-indigo-700">ឆ្នាំ N+1 ({schoolProfile.yearN1})</div>
              <div className="text-sm font-bold font-mono text-indigo-950 mt-1">
                {formatRiel(t2Summaries.grandTotal.yearN1.total)} រៀល
              </div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
              <div className="text-[10px] text-emerald-700">ឆ្នាំ N+2 ({schoolProfile.yearN2})</div>
              <div className="text-sm font-bold font-mono text-emerald-950 mt-1">
                {formatRiel(t2Summaries.grandTotal.yearN2.total)} រៀល
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
              <div className="text-[10px] text-purple-700">ឆ្នាំ N+3 ({schoolProfile.yearN3})</div>
              <div className="text-sm font-bold font-mono text-purple-950 mt-1">
                {formatRiel(t2Summaries.grandTotal.yearN3.total)} រៀល
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 6: សេចក្តីសន្និដ្ឋាន និងសម្មតិកម្ម */}
      {activeTab === 6 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>៦.១ សម្មតិកម្ម និងហានិភ័យ (Assumptions & Risks)</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  សម្មតិកម្មសម្រាប់ភាពជោគជ័យនៃផែនការ (Key Assumptions)
                </label>
                <textarea
                  rows={4}
                  value={doc.assumptions.join('\n')}
                  onChange={(e) =>
                    onUpdateDoc({
                      assumptions: e.target.value.split('\n').filter((l) => l.trim()),
                    })
                  }
                  className="w-full p-3 text-xs border border-slate-300 rounded-xl leading-relaxed focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  ការវិភាគហានិភ័យ និងវិធានការកាត់បន្ថយ (Risk Mitigation)
                </label>
                <div className="space-y-2">
                  {doc.risksAndMitigation.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
                    >
                      <div className="text-rose-800 font-medium">
                        <strong>ហានិភ័យ {idx + 1}៖</strong> {item.risk}
                      </div>
                      <div className="text-emerald-800">
                        <strong>វិធានការដោះស្រាយ៖</strong> {item.mitigation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* សេចក្តីអំពាវនាវ និងការវិនិយោគជាមួយឃុំ */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-bold text-slate-900 text-sm">
              <Award className="w-5 h-5 text-amber-500" />
              <span>៦.២ សេចក្តីសន្និដ្ឋាន និងការអំពាវនាវវិនិយោគជាមួយឃុំ (Call for Investment)</span>
            </div>

            <textarea
              rows={4}
              value={doc.communeCallToAction}
              onChange={(e) => onUpdateDoc({ communeCallToAction: e.target.value })}
              className="w-full p-3 text-xs border border-slate-300 rounded-xl leading-relaxed focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
