import React, { useState } from 'react';
import {
  Printer,
  X,
  FileText,
  Sliders,
  Maximize2,
  Minimize2,
  Check,
  Eye,
  Type,
  Layout,
  Layers,
  Sparkles,
} from 'lucide-react';

export interface PrintSettings {
  orientation: 'landscape' | 'portrait';
  paperSize: 'a4' | 'a3' | 'letter';
  fontSize: 'xs' | 'sm' | 'md' | 'lg';
  margin: 'narrow' | 'normal' | 'wide' | 'none';
  printScope: 'all' | 'doc_only' | 'table1_only' | 'table2_only' | 'tables_only' | 'aop_only';
  showPageNumbers: boolean;
  highlightTotals: boolean;
  repeatHeaders: boolean;
  denseTableRows: boolean;
}

export const DEFAULT_PRINT_SETTINGS: PrintSettings = {
  orientation: 'landscape', // Landscape is standard for wide 9-column & 18-column BSP tables
  paperSize: 'a4',
  fontSize: 'sm',
  margin: 'narrow',
  printScope: 'all',
  showPageNumbers: true,
  highlightTotals: true,
  repeatHeaders: true,
  denseTableRows: true,
};

interface PrintSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PrintSettings;
  onUpdateSettings: (settings: Partial<PrintSettings>) => void;
  onConfirmPrint: () => void;
}

export const PrintSettingsModal: React.FC<PrintSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onConfirmPrint,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-fadeIn my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 text-amber-300">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-amber-200 font-moul">
                ការកំណត់ការបោះពុម្ព (Print & PDF Settings)
              </h3>
              <p className="text-xs text-blue-100">
                កំណត់ទំហំអក្សរ ទិសដៅក្រដាស គម្លាតគេម និងផ្នែកដែលត្រូវបោះពុម្ព
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {/* Quick Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong>ការណែនាំពី MoEYS៖</strong> ដោយសារតារាងសូចនាករ (តារាងទី១) និងតារាងថវិកា (តារាងទី២) មានច្រើនជួរឈរ <strong>«ក្រដាសផ្ដេក (Landscape)»</strong> ជាមួយ <strong>«គេមតូច (Narrow)»</strong> និង <strong>«ទំហំអក្សរតូច (Small/Extra Small)»</strong> ជួយឱ្យតារាងសមល្អឥតខ្ចោះលើទំព័រ A4 ដោយមិនកាត់ជួរ។
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Paper Orientation (ផ្ដេក - បញ្ឈរ) */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-indigo-600" />
                <span>ទិសដៅក្រដាស (Orientation)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ orientation: 'landscape' })}
                  className={`p-3 rounded-xl border text-center font-medium transition cursor-pointer flex flex-col items-center gap-1.5 ${
                    settings.orientation === 'landscape'
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-8 h-5 border-2 border-current rounded flex items-center justify-center text-[9px]">
                    Landscape
                  </div>
                  <span className="text-xs">ក្រដាសផ្ដេក (ណែនាំ)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateSettings({ orientation: 'portrait' })}
                  className={`p-3 rounded-xl border text-center font-medium transition cursor-pointer flex flex-col items-center gap-1.5 ${
                    settings.orientation === 'portrait'
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-5 h-8 border-2 border-current rounded flex items-center justify-center text-[9px]">
                    Portrait
                  </div>
                  <span className="text-xs">ក្រដាសបញ្ឈរ</span>
                </button>
              </div>
            </div>

            {/* 2. Paper Size */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>ទំហំក្រដាស (Paper Size)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'a4', label: 'A4', desc: 'ស្តង់ដារ MoEYS' },
                  { id: 'a3', label: 'A3', desc: 'ផ្ទាំងធំ' },
                  { id: 'letter', label: 'Letter', desc: 'សហរដ្ឋអាមេរិក' },
                ].map((paper) => (
                  <button
                    key={paper.id}
                    type="button"
                    onClick={() => onUpdateSettings({ paperSize: paper.id as any })}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                      settings.paperSize === paper.id
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{paper.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{paper.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Font Size (ទំហំអក្សរ) */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-indigo-600" />
                <span>ទំហំអក្សរបោះពុម្ព (Font Scale)</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'xs', label: 'តូចណាស់ (7.5pt)', desc: 'តារាងធំ' },
                  { id: 'sm', label: 'តូច (8.5pt)', desc: 'សមរម្យ' },
                  { id: 'md', label: 'មធ្យម (9.5pt)', desc: 'ស្តង់ដារ' },
                  { id: 'lg', label: 'ធំ (10.5pt)', desc: 'អានស្រួល' },
                ].map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => onUpdateSettings({ fontSize: font.id as any })}
                    className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                      settings.fontSize === font.id
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{font.label.split(' ')[0]}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{font.label.split(' ')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Page Margins (គេមក្រដាស) */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span>គេមក្រដាស (Margins)</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'narrow', label: 'តូច (6mm)', desc: 'ណែនាំ' },
                  { id: 'normal', label: 'មធ្យម (12mm)', desc: 'ធម្មតា' },
                  { id: 'wide', label: 'ធំ (18mm)', desc: 'រឹមធំ' },
                  { id: 'none', label: 'គ្មាន (0mm)', desc: 'ពេញគែម' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onUpdateSettings({ margin: m.id as any })}
                    className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                      settings.margin === m.id
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{m.label.split(' ')[0]}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{m.label.split(' ')[1]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Print Scope (ផ្នែកដែលត្រូវបោះពុម្ព) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>ជ្រើសរើសផ្នែកដែលត្រូវបោះពុម្ព (Print Content)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'ឯកសារពេញលេញ', desc: '៦ ជំពូក + តារាងទាំង២ + ហត្ថលេខា' },
                { id: 'aop_only', label: 'ផែនការប្រតិបត្តិ (AOP)', desc: 'តារាងសូចនាករ និងថវិការដ្ឋ/ក្រៅរដ្ឋ N+1' },
                { id: 'tables_only', label: 'តែតារាងទាំងពីរ', desc: 'តារាងទី១ និងតារាងទី២' },
                { id: 'table1_only', label: 'តែតារាងទី១', desc: 'សូចនាករ ២៦គន្លឹះ + ៧០រង' },
                { id: 'table2_only', label: 'តែតារាងទី២', desc: 'គម្រោងថវិកា ៣ ឆ្នាំ (៤ប្រភព)' },
                { id: 'doc_only', label: 'តែរបាយការណ៍', desc: 'សេចក្តីផ្តើម វឌ្ឍនភាព & CIP' },
              ].map((scope) => (
                <button
                  key={scope.id}
                  type="button"
                  onClick={() => onUpdateSettings({ printScope: scope.id as any })}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    settings.printScope === scope.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{scope.label}</div>
                  <div className="text-[10px] text-slate-500 mt-1 leading-snug">{scope.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 6. Formatting & Table Options */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="font-bold text-slate-800 block">
              ជម្រើសតុបតែងបន្ថែម (Table Enhancements)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.highlightTotals}
                  onChange={(e) => onUpdateSettings({ highlightTotals: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-slate-700 font-medium">
                  ដាក់ស្រមោលក្រឡាសរុប (Highlight Totals)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.denseTableRows}
                  onChange={(e) => onUpdateSettings({ denseTableRows: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-slate-700 font-medium">
                  បង្រួមគម្លាតជួរក្រឡាឱ្យណែនស្អាត (Compact Rows)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.repeatHeaders}
                  onChange={(e) => onUpdateSettings({ repeatHeaders: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-slate-700 font-medium">
                  បង្ហាញក្បាលតារាងគ្រប់ទំព័រ (Repeat Header)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showPageNumbers}
                  onChange={(e) => onUpdateSettings({ showPageNumbers: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-slate-700 font-medium">
                  បង្ហាញលេខទំព័រ និងកាលបរិច្ឆេទ
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            ទម្រង់បច្ចុប្បន្ន៖ <strong className="text-slate-800">{settings.paperSize.toUpperCase()}</strong> |{' '}
            <strong className="text-slate-800">
              {settings.orientation === 'landscape' ? 'ផ្ដេក (Landscape)' : 'បញ្ឈរ (Portrait)'}
            </strong>{' '}
            | គេម <strong>{settings.margin}</strong>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition cursor-pointer"
            >
              បោះបង់
            </button>
            <button
              type="button"
              onClick={onConfirmPrint}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>បោះពុម្ពឥឡូវនេះ (Print / Save PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
