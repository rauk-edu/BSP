import React from 'react';
import {
  FileSpreadsheet,
  BarChart3,
  Building,
  Printer,
  Download,
  Upload,
  RotateCcw,
  Save,
  CheckCircle2,
  Presentation,
  BookOpen,
  Menu,
  Cloud,
  Sparkles,
} from 'lucide-react';
import { SchoolProfile } from '../data/bspData';

export type AppMode = 'slide' | 'document' | 'table1' | 'table2' | 'dashboard' | 'profile';

interface HeaderProps {
  activeTab: AppMode;
  setActiveTab: (tab: AppMode) => void;
  schoolProfile: SchoolProfile;
  onOpenProfileModal: () => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetData: () => void;
  onPrint: () => void;
  isSaved: boolean;
  onToggleDrawer: () => void;
  onOpenFirestoreModal: () => void;
  onOpenAICopilot: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  schoolProfile,
  onOpenProfileModal,
  onExportCSV,
  onExportJSON,
  onImportJSON,
  onResetData,
  onPrint,
  isSaved,
  onToggleDrawer,
  onOpenFirestoreModal,
  onOpenAICopilot,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30 no-print">
      {/* Top National Header Bar */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-sky-900 text-white px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-moul text-amber-300 tracking-wider">ព្រះរាជាណាចក្រកម្ពុជា</span>
            <span className="text-slate-300">|</span>
            <span className="font-moul text-amber-200 text-[11px]">ជាតិ សាសនា ព្រះមហាក្សត្រ</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-200 text-xs">
            <span>ក្រសួងអប់រំ យុវជន និងកីឡា</span>
            <span>•</span>
            <button
              onClick={onOpenProfileModal}
              className="text-amber-300 hover:text-amber-200 font-medium underline flex items-center gap-1 cursor-pointer"
            >
              <Building className="w-3.5 h-3.5" />
              <span>{schoolProfile.schoolName || 'កំណត់ព័ត៌មានសាលា'}</span>
            </button>
            <span>•</span>
            <span className="bg-sky-800/80 px-2 py-0.5 rounded text-[11px] font-mono text-sky-200">
              ឆ្នាំ N: {schoolProfile.yearN} → ឆ្នាំ N+1: {schoolProfile.yearN1}
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          {/* Drawer Toggle Button */}
          <button
            onClick={onToggleDrawer}
            className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
            title="បើក/បិទ ផ្ទាំងឯកសារ (Outline Drawer)"
          >
            <Menu className="w-4 h-4" />
            <span className="text-xs font-semibold hidden sm:inline">ផ្ទាំងឯកសារ</span>
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-sky-600 flex items-center justify-center text-white shadow-xs font-bold text-base">
            BSP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                ផែនការយុទ្ធសាស្ត្រថវិកា & សំណើវិនិយោគឃុំ (BSP-CIP)
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                MoEYS Standard
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              ឧបករណ៍សម្រាប់បង្រៀន ផ្សព្វផ្សាយ និងកៀរគរការវិនិយោគជាមួយរដ្ឋបាលឃុំ ស្រុក និងសហគមន៍
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* AI Copilot Button */}
          <button
            onClick={onOpenAICopilot}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-700 hover:to-sky-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-all animate-pulse hover:animate-none"
            title="ជំនួយការឆ្លាតវៃ AI ផែនការយុទ្ធសាស្ត្រ MoEYS"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ជំនួយការ AI</span>
          </button>

          {/* Firestore Cloud Sync Button */}
          <button
            onClick={onOpenFirestoreModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-all"
            title="រក្សាទុកទិន្នន័យទៅក្នុង Firestore និងគ្រប់គ្រងវដ្តឆ្នាំ ២០២៦-២០២៩"
          >
            <Cloud className="w-3.5 h-3.5 text-amber-300" />
            <span>Firestore ពពក</span>
          </button>

          {/* Saved indicator */}
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">{isSaved ? 'រក្សាទុករួច' : 'រក្សាទុក...'}</span>
          </div>

          {/* Export CSV */}
          <button
            onClick={onExportCSV}
            title="ទាញយកជាឯកសារ Excel (CSV)"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-300 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={onExportJSON}
            title="ទាញយកឯកសារចម្លងទុក (JSON Backup)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-300 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">ចម្លងទុក</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={onImportJSON}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="បញ្ចូលឯកសារទិន្នន័យ (Import JSON)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-300 transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">បញ្ចូលឯកសារ</span>
          </button>

          {/* Reset */}
          <button
            onClick={onResetData}
            title="កំណត់ទិន្នន័យឡើងវិញតាមគំរូដើម"
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Print */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>បោះពុម្ព</span>
          </button>
        </div>
      </div>

      {/* Navigation Modes Bar */}
      <div className="max-w-7xl mx-auto px-4 border-t border-slate-200">
        <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2">
          {/* Mode 1: Slide Pitch Mode */}
          <button
            onClick={() => setActiveTab('slide')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'slide'
                ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-xs'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>របៀបស្លាយ (Pitch មួយផ្នែកៗ)</span>
          </button>

          {/* Mode 2: Full National Document Mode */}
          <button
            onClick={() => setActiveTab('document')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'document'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>របៀបឯកសារជាតិ (៦ ជំពូក)</span>
          </button>

          {/* Mode 3: Table 1 Indicators */}
          <button
            onClick={() => setActiveTab('table1')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'table1'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
            <span>៤. សូចនាករ (តារាងទី១)</span>
          </button>

          {/* Mode 4: Table 2 Budget Plan */}
          <button
            onClick={() => setActiveTab('table2')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'table2'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-sky-600" />
            <span>៥. ថវិកា ៣ ឆ្នាំ (តារាងទី២)</span>
          </button>

          {/* Mode 5: Analytics Dashboard */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>ផ្ទាំងវិភាគ</span>
          </button>

          {/* Mode 6: School Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building className="w-4 h-4 text-amber-600" />
            <span>ព័ត៌មានសាលា</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
