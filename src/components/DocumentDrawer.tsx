import React, { useState } from 'react';
import {
  FileText,
  ChevronDown,
  ChevronRight,
  Search,
  Check,
  X,
  Layers,
  Award,
  DollarSign,
  TrendingUp,
  Target,
  Presentation,
  BookOpen,
} from 'lucide-react';

export interface DocumentSectionTarget {
  chapter: number; // 1, 2, 3, 4, 5, 6
  subType?: 'progress' | 'challenge';
  standardId?: number; // 1 to 5
}

interface DocumentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (target: DocumentSectionTarget) => void;
  activeSection: DocumentSectionTarget;
  mode: 'document' | 'slide' | 'tables';
  setMode: (mode: 'document' | 'slide' | 'tables') => void;
}

export const DocumentDrawer: React.FC<DocumentDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  activeSection,
  mode,
  setMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    chapter2: true,
    progress: true,
    challenges: true,
  });

  const toggleExpand = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const standards = [
    { id: 1, title: 'លទ្ធផលសិក្សារបស់សិស្ស' },
    { id: 2, title: 'ការបង្រៀន និងរៀន' },
    { id: 3, title: 'ការចូលរួមរបស់សហគមន៍' },
    { id: 4, title: 'ដំណើរការប្រតិបត្តិរបស់សាលា' },
    { id: 5, title: 'គណនេយ្យភាព' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <aside className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white border-r border-slate-200 z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">ផ្ទាំងឯកសារ (Document Outline)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher: Document vs Slide vs Tables */}
        <div className="p-3 border-b border-slate-200 bg-white">
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setMode('slide')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                mode === 'slide'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>របៀបស្លាយ (Pitch)</span>
            </button>
            <button
              onClick={() => setMode('document')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                mode === 'document'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>របៀបឯកសារពេញ</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-slate-200">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ស្វែងរកជំពូក..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Navigation Outline Tree */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
          {/* ១. សេចក្តីផ្តើម */}
          <button
            onClick={() => {
              onSelectSection({ chapter: 1 });
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
              activeSection.chapter === 1
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>១. សេចក្តីផ្តើម (ក្របខ័ណ្ឌជាតិ & សាវតា)</span>
            </span>
          </button>

          {/* ២. វឌ្ឍនភាព និងបញ្ហាប្រឈម */}
          <div className="space-y-1">
            <button
              onClick={() => toggleExpand('chapter2')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                activeSection.chapter === 2
                  ? 'bg-sky-50 text-sky-800 font-semibold'
                  : 'text-slate-800 hover:bg-slate-100 font-medium'
              }`}
            >
              <span className="flex items-center gap-2">
                {expandedSections.chapter2 ? (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                )}
                <span>២. វឌ្ឍនភាព និងបញ្ហាប្រឈម</span>
              </span>
            </button>

            {/* Nested Sub-levels */}
            {expandedSections.chapter2 && (
              <div className="pl-6 space-y-1 border-l-2 border-slate-100 ml-4">
                {/* វឌ្ឍនភាព */}
                <div>
                  <button
                    onClick={() => toggleExpand('progress')}
                    className="w-full flex items-center justify-between py-1 px-2 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      {expandedSections.progress ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span className="text-emerald-700 font-semibold">វឌ្ឍនភាព</span>
                    </span>
                  </button>

                  {expandedSections.progress && (
                    <div className="pl-5 space-y-1 py-1">
                      {standards.map((std) => {
                        const isSelected =
                          activeSection.chapter === 2 &&
                          activeSection.subType === 'progress' &&
                          activeSection.standardId === std.id;
                        return (
                          <button
                            key={`prog_${std.id}`}
                            onClick={() => {
                              onSelectSection({
                                chapter: 2,
                                subType: 'progress',
                                standardId: std.id,
                              });
                              if (window.innerWidth < 1024) onClose();
                            }}
                            className={`w-full flex items-center justify-between py-1 px-2 rounded text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-50 text-emerald-800 font-medium'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span className="truncate">{std.title}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* បញ្ហាប្រឈម */}
                <div>
                  <button
                    onClick={() => toggleExpand('challenges')}
                    className="w-full flex items-center justify-between py-1 px-2 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      {expandedSections.challenges ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span className="text-rose-700 font-semibold">បញ្ហាប្រឈម</span>
                    </span>
                  </button>

                  {expandedSections.challenges && (
                    <div className="pl-5 space-y-1 py-1">
                      {standards.map((std) => {
                        const isSelected =
                          activeSection.chapter === 2 &&
                          activeSection.subType === 'challenge' &&
                          activeSection.standardId === std.id;
                        // Red checkmark matching user screenshot on standard 4
                        const hasRedCheck = std.id === 4;
                        return (
                          <button
                            key={`chal_${std.id}`}
                            onClick={() => {
                              onSelectSection({
                                chapter: 2,
                                subType: 'challenge',
                                standardId: std.id,
                              });
                              if (window.innerWidth < 1024) onClose();
                            }}
                            className={`w-full flex items-center justify-between py-1 px-2 rounded text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-rose-50 text-rose-800 font-medium'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <FileText className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                              <span className="truncate">{std.title}</span>
                            </span>
                            {hasRedCheck && (
                              <Check className="w-3.5 h-3.5 text-rose-600 stroke-[3] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ៣. គោលបំណង */}
          <button
            onClick={() => {
              onSelectSection({ chapter: 3 });
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
              activeSection.chapter === 3
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4 text-slate-400" />
              <span>៣. គោលបំណង និងចក្ខុវិស័យ</span>
            </span>
          </button>

          {/* ៤. គោលដៅសមិទ្ធកម្ម (With red checkmark from screenshot) */}
          <button
            onClick={() => {
              onSelectSection({ chapter: 4 });
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
              activeSection.chapter === 4
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>៤. គោលដៅសមិទ្ធកម្ម (តារាងទី១)</span>
            </span>
            <Check className="w-3.5 h-3.5 text-rose-600 stroke-[3] shrink-0" />
          </button>

          {/* ៥. សកម្មភាពអនុវត្ត */}
          <button
            onClick={() => {
              onSelectSection({ chapter: 5 });
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
              activeSection.chapter === 5
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-sky-600" />
              <span>៥. សកម្មភាពអនុវត្ត & ថវិកា (តារាងទី២)</span>
            </span>
          </button>

          {/* ៦. សេចក្តីសន្និដ្ឋាន */}
          <button
            onClick={() => {
              onSelectSection({ chapter: 6 });
              if (window.innerWidth < 1024) onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
              activeSection.chapter === 6
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>៦. សេចក្តីសន្និដ្ឋាន & សម្មតិកម្ម</span>
            </span>
          </button>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center">
          ឯកសារផែនការយុទ្ធសាស្ត្រថវិកា ៣ ឆ្នាំ MoEYS
        </div>
      </aside>
    </>
  );
};
