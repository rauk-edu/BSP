import React, { useState, useEffect } from 'react';
import {
  StrategicDocument,
  DEFAULT_STANDARDS_EVALUATION,
} from '../data/reportData';
import {
  IndicatorRow,
  ActivityBudgetRow,
  SchoolProfile,
} from '../data/bspData';
import {
  computeTable1Summaries,
  computeTable2Summaries,
  formatRiel,
} from '../utils/bspUtils';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Target,
  DollarSign,
  Building2,
  Award,
  Users,
  Layers,
  ArrowRight,
  Volume2,
} from 'lucide-react';
import { FormattedKhmerText } from './FormattedKhmerText';

interface SlidePitchViewProps {
  doc: StrategicDocument;
  schoolProfile: SchoolProfile;
  table1Rows: IndicatorRow[];
  table2Rows: ActivityBudgetRow[];
  onOpenTable1: () => void;
  onOpenTable2: () => void;
  onOpenAICopilot?: () => void;
}

export const SlidePitchView: React.FC<SlidePitchViewProps> = ({
  doc,
  schoolProfile,
  table1Rows,
  table2Rows,
  onOpenTable1,
  onOpenTable2,
  onOpenAICopilot,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [revealedSteps, setRevealedSteps] = useState<number>(1);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const t1Summaries = computeTable1Summaries(table1Rows);
  const t2Summaries = computeTable2Summaries(table2Rows);

  const slides = [
    {
      id: 'intro',
      title: '១. សេចក្តីផ្តើម និងសាវតាសាលារៀន',
      subtitle: 'គោលការណ៍ជាតិរបស់ MoEYS & ព័ត៌មានទូទៅរបស់សាលា',
      totalSteps: 3,
      speakerNote:
        'សូមជម្រាបជូនលោកមេឃុំ និងក្រុមប្រឹក្សាឃុំអំពីគោលការណ៍កំណែទម្រង់អប់រំ និងសាវតាសាលារបស់យើង ដែលជាកន្លែងបណ្តុះបណ្តាលកូនចៅរបស់អ្នកភូមិយើង។',
    },
    {
      id: 'progress',
      title: '២.១ វឌ្ឍនភាពសម្រេចបាន (៥ ស្តង់ដា)',
      subtitle: 'លទ្ធផលការងារជាវិជ្ជមានដែលសាលាបានខិតខំកន្លងមក',
      totalSteps: 5,
      speakerNote:
        'បង្ហាញពីការខិតខំប្រឹងប្រែងរបស់លោកគ្រូអ្នកគ្រូ និងសិស្សានុសិស្ស ដើម្បីឱ្យអាជ្ញាធរឃុំ និងសហគមន៍មានមោទនភាព និងទំនុកចិត្តលើសាលារៀន។',
    },
    {
      id: 'challenges',
      title: '២.២ បញ្ហាប្រឈមធំៗ (ត្រូវការការវិនិយោគ)',
      subtitle: 'ចំណុចលំបាក និងការខ្វះខាតដែលសាលាតែម្នាក់ឯងមិនអាចដោះស្រាយបាន',
      totalSteps: 5,
      speakerNote:
        'នេះជាចំណុចគន្លឹះដើម្បីសុំការវិនិយោគ! ត្រូវបញ្ជាក់ឱ្យច្បាស់ថា បញ្ហាខ្វះទឹកស្អាត ផ្លូវបេតុង និងសម្ភារបង្រៀន ប៉ះពាល់ផ្ទាល់ដល់កូនចៅអ្នកភូមិយើង។',
    },
    {
      id: 'vision_objectives',
      title: '៣. ចក្ខុវិស័យ និងគោលបំណងយុទ្ធសាស្ត្រ',
      subtitle: 'គោលដៅអភិវឌ្ឍន៍សាលាឱ្យក្លាយជា «សាលារៀនគំរូ»',
      totalSteps: 3,
      speakerNote:
        'សាលាយើងមានចក្ខុវិស័យច្បាស់លាស់ មិនមែនសុំជំនួយដោយគ្មានទិសដៅទេ។ យើងចង់ឱ្យសាលាក្លាយជាសាលាគំរូក្នុងឃុំយើង។',
    },
    {
      id: 'indicators',
      title: '៤. សូចនាករ និងគោលដៅសមិទ្ធកម្ម ៣ ឆ្នាំ',
      subtitle: 'សូចនាករគន្លឹះអំណាន គណិតវិទ្យា និងអត្រាចូលរៀន (Table 1)',
      totalSteps: 4,
      speakerNote:
        'រៀបរាប់ពីគោលដៅជាក់លាក់ ដូចជាអត្រាចូលរៀន ១០០%, អត្រាបោះបង់ការសិក្សាធ្លាក់ចុះ និងសមត្ថភាពអានថ្នាក់ទី៣/ទី៦ តាមស្តង់ដា។',
    },
    {
      id: 'budget_commune',
      title: '៥. គម្រោងថវិកា និងសំណើវិនិយោគជាមួយឃុំ (CIP)',
      subtitle: 'ការបែងចែកថវិការដ្ឋ ដៃគូ សហគមន៍ និងការស្នើសុំមូលនិធិឃុំ (Table 2)',
      totalSteps: 3,
      speakerNote:
        'បង្ហាញតារាងថវិកា៖ ថវិការដ្ឋមានប៉ុន្មាន ហើយចំណែកណាដែលស្នើសុំដាក់បញ្ចូលក្នុងផែនការវិនិយោគឃុំ (CIP) និងការចូលរួមរបស់សហគមន៍។',
    },
    {
      id: 'conclusion',
      title: '៦. សម្មតិកម្ម និងសេចក្តីអំពាវនាវវិនិយោគ',
      subtitle: 'ការប្តេជ្ញាចិត្តរួមគ្នាដើម្បីអនាគតកូនចៅឃុំយើង',
      totalSteps: 3,
      speakerNote:
        'ថ្លែងអំណរគុណ និងស្នើសុំការអនុម័តគម្រោងពីក្រុមប្រឹក្សាឃុំ និងការគាំទ្រពីសហគមន៍។',
    },
  ];

  const currentSlideData = slides[currentSlide];

  // Reset steps when slide changes
  useEffect(() => {
    setRevealedSteps(1);
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNextStep();
      } else if (e.key === 'ArrowLeft') {
        handlePrevStep();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, revealedSteps, isFullscreen]);

  const handleNextStep = () => {
    if (revealedSteps < currentSlideData.totalSteps) {
      setRevealedSteps((prev) => prev + 1);
    } else if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (revealedSteps > 1) {
      setRevealedSteps((prev) => prev - 1);
    } else if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => {
      const willBeFullscreen = !prev;
      try {
        const docEl = (document?.documentElement as unknown) as Record<string, unknown> | null;
        const doc = (document as unknown) as Record<string, unknown> | null;
        if (willBeFullscreen) {
          if (docEl && typeof docEl.requestFullscreen === 'function') {
            (docEl.requestFullscreen as () => Promise<void>)().catch(() => {});
          } else if (docEl && typeof docEl.webkitRequestFullscreen === 'function') {
            (docEl.webkitRequestFullscreen as () => void)();
          }
        } else {
          if (doc && typeof doc.exitFullscreen === 'function') {
            (doc.exitFullscreen as () => Promise<void>)().catch(() => {});
          } else if (doc && typeof doc.webkitExitFullscreen === 'function') {
            (doc.webkitExitFullscreen as () => void)();
          }
        }
      } catch {
        // Fallback gracefully to React state-based fullscreen
      }
      return willBeFullscreen;
    });
  };

  return (
    <div
      className={`space-y-4 ${
        isFullscreen
          ? 'fixed inset-0 z-50 p-4 sm:p-8 bg-slate-900 text-white min-h-screen overflow-y-auto'
          : ''
      }`}
    >
      {/* Top Slide Control Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {currentSlide + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                ស្លាយ {currentSlide + 1} នៃ {slides.length}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-600">
                ចំណុច {revealedSteps} នៃ {currentSlideData.totalSteps}
              </span>
            </div>
            <h2 className="text-sm md:text-base font-bold text-slate-900 mt-0.5">
              {currentSlideData.title}
            </h2>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* AI Copilot Button */}
          {onOpenAICopilot && (
            <button
              onClick={onOpenAICopilot}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-all"
              title="ជំនួយការ AI សុន្ទរកថា និងវិភាគ"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">ជំនួយការ AI</span>
            </button>
          )}

          {/* Speaker notes toggle */}
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
              showSpeakerNotes
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
            title="កំណត់ចំណាំពន្យល់សម្រាប់នាយកសាលា/វាគ្មិន"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{showSpeakerNotes ? 'លាក់កំណត់ចំណាំ' : 'កំណត់ចំណាំវាគ្មិន'}</span>
          </button>

          {/* Reveal All in this slide */}
          <button
            onClick={() => setRevealedSteps(currentSlideData.totalSteps)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 cursor-pointer"
          >
            បង្ហាញទាំងអស់
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 cursor-pointer"
            title="ពេញអេក្រង់ (ចុច F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Speaker Notes Box (When enabled) */}
      {showSpeakerNotes && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-950 mb-0.5">
              គន្លឹះពន្យល់សម្រាប់លោកនាយកសាលាក្នុងកិច្ចប្រជុំជាមួយរដ្ឋបាលឃុំ/សហគមន៍៖
            </div>
            <p className="leading-relaxed">{currentSlideData.speakerNote}</p>
          </div>
        </div>
      )}

      {/* Main Slide Presentation Stage */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 md:p-8 min-h-[460px] flex flex-col justify-between relative overflow-hidden">
        {/* Slide Top Subtitle */}
        <div className="mb-6 pb-3 border-b border-slate-100 flex items-center justify-between">
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            {currentSlideData.subtitle}
          </p>
          <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            {schoolProfile.schoolName}
          </span>
        </div>

        {/* Dynamic Slide Content based on currentSlide */}
        <div className="flex-1 space-y-6">
          {/* SLIDE 0: INTRO & BACKGROUND */}
          {currentSlide === 0 && (
            <div className="space-y-4">
              {/* Step 1: National Framework */}
              {revealedSteps >= 1 && (
                <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 text-sky-900 font-bold text-xs md:text-sm">
                    <Award className="w-4 h-4 text-sky-600" />
                    <span>១. ក្របខ័ណ្ឌគោលនយោបាយកំណែទម្រង់អប់រំជាតិ (MoEYS)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    {doc.nationalFramework.split('\n\n')[0]}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-medium text-sky-950">
                    <span className="bg-white p-2 rounded-lg border border-sky-200 text-center">
                      ១. អភិបាលកិច្ចសាលា (SBM)
                    </span>
                    <span className="bg-white p-2 rounded-lg border border-sky-200 text-center">
                      ២. កម្មវិធីសិក្សាសកម្ម
                    </span>
                    <span className="bg-white p-2 rounded-lg border border-sky-200 text-center">
                      ៣. សុខភាពសិក្សា & អាហារ
                    </span>
                    <span className="bg-white p-2 rounded-lg border border-sky-200 text-center">
                      ៤. ភាពជាដៃគូរដ្ឋ & សហគមន៍
                    </span>
                  </div>
                </div>
              )}

              {/* Step 2: School Background & Statistics */}
              {revealedSteps >= 2 && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs md:text-sm">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    <span>២. សាវតាសាលារៀន និងទិន្នន័យជាក់ស្តែង</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <FormattedKhmerText
                      text={doc.schoolBackground.history}
                      mode="full"
                      paragraphClassName="text-xs leading-relaxed"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                      <div className="text-[10px] text-slate-500">សិស្សសរុប</div>
                      <div className="text-sm font-bold font-mono text-indigo-950">
                        {doc.schoolBackground.studentCount.total} នាក់
                      </div>
                      <div className="text-[10px] text-slate-400">
                        (ស្រី {doc.schoolBackground.studentCount.female} នាក់)
                      </div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                      <div className="text-[10px] text-slate-500">គ្រូបង្រៀនសរុប</div>
                      <div className="text-sm font-bold font-mono text-emerald-950">
                        {doc.schoolBackground.teacherCount.total} នាក់
                      </div>
                      <div className="text-[10px] text-slate-400">
                        (ស្រី {doc.schoolBackground.teacherCount.female} នាក់)
                      </div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                      <div className="text-[10px] text-slate-500">ថ្នាក់រៀន / បន្ទប់</div>
                      <div className="text-sm font-bold font-mono text-amber-950">
                        {doc.schoolBackground.classCount} ថ្នាក់ / {doc.schoolBackground.roomsCount} បន្ទប់
                      </div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                      <div className="text-[10px] text-slate-500">ភូមិទទួលសេវាអប់រំ</div>
                      <div className="text-xs font-semibold text-slate-800 truncate">
                        {doc.schoolBackground.villagesCovered}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Commune Partnership */}
              {revealedSteps >= 3 && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm font-bold text-emerald-950">
                        ៣. គោលបំណងកិច្ចប្រជុំជាមួយរដ្ឋបាលឃុំ/សង្កាត់
                      </div>
                      <p className="text-xs text-emerald-900 mt-0.5">
                        បង្ហាញវឌ្ឍនភាព បញ្ហាប្រឈម និងស្នើសុំបញ្ចូលគម្រោងអាទិភាពសាលាទៅក្នុង «ផែនការវិនិយោគឃុំ (CIP)»។
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200 shrink-0">
                    ភាពជាដៃគូ
                  </span>
                </div>
              )}
            </div>
          )}

          {/* SLIDE 1: PROGRESS ACROSS 5 STANDARDS */}
          {currentSlide === 1 && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 mb-1">
                វឌ្ឍនភាពដែលសាលាសម្រេចបានតាមស្តង់ដានីមួយៗ៖
              </div>
              {doc.standardsEvaluation.map((std, idx) => {
                if (revealedSteps < idx + 1) return null;
                return (
                  <div
                    key={std.standardId}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <h4 className="text-xs md:text-sm font-bold text-slate-900">
                          {std.standardTitle}
                        </h4>
                      </div>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                        ជោគជ័យ {std.progressItems.length} ចំណុច
                      </span>
                    </div>
                    <div className="space-y-1.5 pl-1 pt-1">
                      {std.progressItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                          <span className="shrink-0 font-bold text-emerald-600 select-none leading-relaxed">-</span>
                          <span className="flex-1 leading-relaxed text-justify">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SLIDE 2: CHALLENGES ACROSS 5 STANDARDS (NEED COMMUNE INVESTMENT) */}
          {currentSlide === 2 && (
            <div className="space-y-3">
              <div className="text-xs text-rose-700 font-semibold mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>បញ្ហាប្រឈមធំៗ និងតម្រូវការគាំទ្រពីមូលនិធិឃុំ (Commune Investment Needs)៖</span>
              </div>
              {doc.standardsEvaluation.map((std, idx) => {
                if (revealedSteps < idx + 1) return null;
                return (
                  <div
                    key={std.standardId}
                    className="p-3.5 bg-rose-50/40 border border-rose-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        <h4 className="text-xs md:text-sm font-bold text-rose-950">
                          {std.standardTitle}
                        </h4>
                      </div>
                    </div>
                    <div className="space-y-1.5 pl-1 pt-1">
                      {std.challengeItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-800 leading-relaxed">
                          <span className="shrink-0 font-bold text-rose-600 select-none leading-relaxed">-</span>
                          <span className="flex-1 leading-relaxed text-justify">{item}</span>
                        </div>
                      ))}
                    </div>
                    {/* Commune Call to action chip */}
                    <div className="mt-2 pt-2 border-t border-rose-200/60 flex items-center gap-2 text-xs font-medium text-indigo-900 bg-white/80 p-2 rounded-lg">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>
                        <strong>សំណើវិនិយោគជាមួយឃុំ៖</strong> {std.communeInvestmentNeed}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SLIDE 3: VISION & STRATEGIC OBJECTIVES */}
          {currentSlide === 3 && (
            <div className="space-y-4">
              {revealedSteps >= 1 && (
                <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 text-indigo-950 font-bold text-xs md:text-sm">
                    <Target className="w-4 h-4 text-indigo-600" />
                    <span>១. ចក្ខុវិស័យ (Vision)</span>
                  </div>
                  <p className="text-xs md:text-sm text-indigo-900 leading-relaxed font-medium">
                    &ldquo;{doc.vision}&rdquo;
                  </p>
                </div>
              )}

              {revealedSteps >= 2 && (
                <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 text-sky-950 font-bold text-xs md:text-sm">
                    <Award className="w-4 h-4 text-sky-600" />
                    <span>២. បេសកកម្ម (Mission)</span>
                  </div>
                  <div className="text-xs text-sky-950 leading-relaxed whitespace-pre-line">
                    {doc.mission}
                  </div>
                </div>
              )}

              {revealedSteps >= 3 && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>៣. គោលបំណងយុទ្ធសាស្ត្រគន្លឹះ (Strategic Objectives)</span>
                  </div>
                  <ul className="pl-6 list-decimal space-y-1.5 text-xs text-slate-700">
                    {doc.strategicObjectives.map((obj, i) => (
                      <li key={i} className="font-medium">
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* SLIDE 4: KEY INDICATORS & TARGETS (TABLE 1 HIGHLIGHTS) */}
          {currentSlide === 4 && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                សូចនាករ និងគោលដៅសមិទ្ធកម្មគន្លឹះក្នុងផែនការយុទ្ធសាស្ត្រ ៣ ឆ្នាំ ({schoolProfile.yearN1} - {schoolProfile.yearN3})៖
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {revealedSteps >= 1 && (
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="text-xs font-bold text-emerald-950">
                      ស្តង់ដាទី១៖ ការចូលរៀន & គង់វង្ស
                    </div>
                    <div className="space-y-1 text-xs text-emerald-900">
                      <div>• អត្រាចុះឈ្មោះចូលរៀនថ្នាក់ទី១៖ <strong>១០០%</strong></div>
                      <div>• អត្រាបោះបង់ការសិក្សា៖ ធ្លាក់ចុះមកនៅក្រោម <strong>២%</strong></div>
                      <div>• អត្រាត្រួតថ្នាក់៖ ធ្លាក់ចុះមកនៅត្រឹម <strong>១% ទៅ ២%</strong></div>
                    </div>
                  </div>
                )}

                {revealedSteps >= 2 && (
                  <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="text-xs font-bold text-indigo-950">
                      ស្តង់ដាទី២៖ សមត្ថភាពអាន & គណិតវិទ្យា
                    </div>
                    <div className="space-y-1 text-xs text-indigo-900">
                      <div>• សិស្សមាននិទ្ទេស A, B, C (ខ្មែរ & គណិត)៖ លើសពី <strong>៥០%</strong></div>
                      <div>• សមត្ថភាពអានស្តង់ដាថ្នាក់ទី៣ (៤៥-៦០ពាក្យ/នាទី)៖ <strong>៥០%</strong></div>
                      <div>• សមត្ថភាពអានស្តង់ដាថ្នាក់ទី៦ (១០០-១២០ពាក្យ/នាទី)៖ <strong>៦០%</strong></div>
                    </div>
                  </div>
                )}

                {revealedSteps >= 3 && (
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="text-xs font-bold text-amber-950">
                      ស្តង់ដាទី៣ & ៤៖ សហគមន៍ & អភិបាលកិច្ច
                    </div>
                    <div className="space-y-1 text-xs text-amber-900">
                      <div>• ដំណើរការគណៈកម្មការ គ.គ.ស និង គ.គ.ថ៖ <strong>១០០%</strong></div>
                      <div>• ប្រើប្រាស់ថ្នាលបឋម (PLP) គ្រប់គ្រងទិន្នន័យ៖ <strong>ទៀងទាត់</strong></div>
                      <div>• បរិស្ថានសាលាបៃតង ស្អាត និងសុវត្ថិភាពកុមារ</div>
                    </div>
                  </div>
                )}

                {revealedSteps >= 4 && (
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="text-xs font-bold text-blue-950">
                      ស្តង់ដាទី៥៖ គណនេយ្យភាព និងតម្លាភាព
                    </div>
                    <div className="space-y-1 text-xs text-blue-900">
                      <div>• វេទិកាសាធារណៈជាមួយមាតាបិតា & ឃុំ៖ <strong>២ ដង/ឆ្នាំ</strong></div>
                      <div>• បិទផ្សាយតម្លាភាពចំណូល-ចំណាយថវិកា៖ <strong>ជាសាធារណៈ</strong></div>
                      <div>• វាយតម្លៃសាលារៀនគំរូជាប្រចាំឆ្នាំ</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={onOpenTable1}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                >
                  <span>ពិនិត្យតារាងទី១ លម្អិត (៩៦ សូចនាករ)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SLIDE 5: BUDGET & COMMUNE INVESTMENT APPEAL */}
          {currentSlide === 5 && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                ការបែងចែកថវិកាតាមប្រភពហិរញ្ញប្បទាន និងសំណើវិនិយោគជាមួយឃុំ (Table 2)៖
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {revealedSteps >= 1 && (
                  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-center space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="text-xs text-indigo-700 font-medium">ថវិការដ្ឋគ្រោង (N+1)</div>
                    <div className="text-lg font-bold font-mono text-indigo-950">
                      {formatRiel(t1Summaries.grandTotalBudgetN1)} រៀល
                    </div>
                    <div className="text-[10px] text-slate-500">សម្រាប់ប្រតិបត្តិការសាលា</div>
                  </div>
                )}

                {revealedSteps >= 2 && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="text-xs text-emerald-700 font-medium">
                      សំណើសុំមូលនិធិឃុំ (CIP)
                    </div>
                    <div className="text-lg font-bold font-mono text-emerald-950">
                      គម្រោងជាអាទិភាព
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      ផ្លូវបេតុង, ទឹកស្អាត, របងសាលា
                    </div>
                  </div>
                )}

                {revealedSteps >= 3 && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="text-xs text-amber-700 font-medium">
                      ការចូលរួមរបស់សហគមន៍
                    </div>
                    <div className="text-lg font-bold font-mono text-amber-950">
                      កម្លាំងពលកម្ម & ថវិកា
                    </div>
                    <div className="text-[10px] text-amber-800">អាហារូបត្ថម្ភ & ជួយសិស្សក្រីក្រ</div>
                  </div>
                )}
              </div>

              {revealedSteps >= 3 && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 animate-in fade-in duration-300">
                  <div className="font-bold text-slate-900">
                    សំណើវិនិយោគជាក់លាក់ស្នើសុំក្រុមប្រឹក្សាឃុំ/សង្កាត់អនុម័ត៖
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700">
                    <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                        ១
                      </span>
                      <span>ចាក់បេតុងផ្លូវចូលសាលា ប្រវែង... ម៉ែត្រ ដើម្បីកុំឱ្យលិចទឹកនៅរដូវវស្សា</span>
                    </div>
                    <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                        ២
                      </span>
                      <span>ជួសជុល និងសាងសង់របងការពារសុវត្ថិភាពសិស្សានុសិស្ស ប្រវែង... ម៉ែត្រ</span>
                    </div>
                    <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                        ៣
                      </span>
                      <span>តបណ្តាញទឹកស្អាត និងសាងសង់អាងលាងដៃស្តង់ដាសម្រាប់សិស្ស</span>
                    </div>
                    <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                        ៤
                      </span>
                      <span>មូលនិធិអាហារូបករណ៍សិស្សក្រីក្រ (កង់ សម្ភារសិក្សា) ចំនួន... នាក់</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 text-right">
                <button
                  onClick={onOpenTable2}
                  className="inline-flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
                >
                  <span>ពិនិត្យតារាងទី២ លម្អិត (៤ ប្រភពថវិកា ៣ ឆ្នាំ)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SLIDE 6: CONCLUSION & CALL TO ACTION */}
          {currentSlide === 6 && (
            <div className="space-y-4">
              {revealedSteps >= 1 && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>១. សម្មតិកម្ម និងការប្តេជ្ញាចិត្តរបស់សាលារៀន</span>
                  </div>
                  <ul className="pl-6 list-disc space-y-1 text-xs text-slate-700">
                    {doc.assumptions.map((ass, i) => (
                      <li key={i}>{ass}</li>
                    ))}
                  </ul>
                </div>
              )}

              {revealedSteps >= 2 && (
                <div className="p-4 bg-gradient-to-br from-indigo-900 via-sky-900 to-indigo-950 text-white rounded-xl space-y-3 shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs md:text-sm">
                    <Award className="w-4 h-4" />
                    <span>២. សេចក្តីអំពាវនាវ និងការស្នើសុំកិច្ចសហការវិនិយោគ</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-100 leading-relaxed">
                    {doc.communeCallToAction}
                  </p>
                </div>
              )}

              {revealedSteps >= 3 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <div className="text-xs font-bold text-amber-950">
                      ៣. ជំហានបន្ទាប់ (Next Steps)
                    </div>
                    <div className="text-xs text-amber-900 mt-0.5">
                      ពិភាក្សា ឆ្លើយសំណួរ និងឯកភាពលើការចុះកិច្ចសន្យាគម្រោងរវាងសាលារៀន និងរដ្ឋបាលឃុំ/សង្កាត់។
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg shadow-xs shrink-0">
                    អនុម័តគម្រោង
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Slide Bottom Navigation Stepper */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3 select-none">
          {/* Previous Button */}
          <button
            onClick={handlePrevStep}
            disabled={currentSlide === 0 && revealedSteps === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ថយក្រោយ (Prev)</span>
          </button>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto px-2">
            {slides.map((s, idx) => {
              const isCurrent = currentSlide === idx;
              const isPast = currentSlide > idx;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'w-6 bg-indigo-600'
                      : isPast
                      ? 'bg-emerald-500'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  title={s.title}
                />
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextStep}
            disabled={currentSlide === slides.length - 1 && revealedSteps === currentSlideData.totalSteps}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <span>
              {revealedSteps < currentSlideData.totalSteps
                ? `ចំណុចបន្ទាប់ (${revealedSteps + 1}/${currentSlideData.totalSteps})`
                : currentSlide < slides.length - 1
                ? 'ស្លាយបន្ទាប់ (Next)'
                : 'ចប់បទបង្ហាញ'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
