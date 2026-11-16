import React, { useState } from 'react';
import { SchoolProfile, DEFAULT_SCHOOL_PROFILE } from '../data/bspData';
import {
  School,
  Calendar,
  UserCheck,
  FileText,
  RotateCcw,
  CheckCircle2,
  Building2,
  MapPin,
  Sparkles,
  Info,
  ShieldCheck,
  Save,
} from 'lucide-react';

interface ProfileViewProps {
  schoolProfile: SchoolProfile;
  onUpdateProfile: (updated: Partial<SchoolProfile>) => void;
  onResetConclusion: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  schoolProfile,
  onUpdateProfile,
  onResetConclusion,
}) => {
  const [savedToast, setSavedToast] = useState(false);

  const handleFieldChange = (field: keyof SchoolProfile, value: string | number) => {
    onUpdateProfile({ [field]: value });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('តើអ្នកពិតជាចង់កំណត់ព័ត៌មានទូទៅឡើងវិញទៅលំនាំដើមរបស់សាលាបឋមសិក្សារោគមែនទេ?')) {
      onUpdateProfile(DEFAULT_SCHOOL_PROFILE);
      onResetConclusion();
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner / Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/60 text-blue-200 text-xs font-medium border border-blue-500/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>ព័ត៌មានអត្តសញ្ញាណ និងហត្ថលេខាសាលារៀន</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-moul tracking-wide text-amber-300">
              {schoolProfile.schoolName || 'សាលាបឋមសិក្សា រោគ'}
            </h1>
            <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
              ការកំណត់អត្តសញ្ញាណសាលារៀន វដ្តឆ្នាំថវិកា ៣ ឆ្នាំ (BSP {schoolProfile.yearN1}-{schoolProfile.yearN3}) 
              សមាសភាពគណៈកម្មការ និងសេចក្តីសន្និដ្ឋាននៃផែនការយុទ្ធសាស្ត្រ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 transition shadow-sm backdrop-blur-sm"
              title="កំណត់ទិន្នន័យទាំងអស់ឡើងវិញ"
            >
              <RotateCcw className="w-4 h-4 text-amber-300" />
              <span>កំណត់លំនាំដើម</span>
            </button>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/90 text-white text-sm font-medium shadow-md">
              <ShieldCheck className="w-4 h-4" />
              <span>MoEYS BSP 3-Years</span>
            </div>
          </div>
        </div>

        {savedToast && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-lg animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>បានរក្សាទុកដោយជោគជ័យ</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: School ID & Budget Cycles */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card: School Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
                <School className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">អត្តសញ្ញាណសាលារៀន</h3>
                <p className="text-xs text-slate-500">ទីតាំង និងលេខកូដសាលា</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ឈ្មោះសាលារៀន
                </label>
                <input
                  type="text"
                  value={schoolProfile.schoolName}
                  onChange={(e) => handleFieldChange('schoolName', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="ឧ. សាលាបឋមសិក្សា រោគ"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  លេខកូដសាលារៀន (School Code)
                </label>
                <input
                  type="text"
                  value={schoolProfile.schoolCode}
                  onChange={(e) => handleFieldChange('schoolCode', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-mono"
                  placeholder="ឧ. SCH-010502"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  កម្រងសាលា
                </label>
                <input
                  type="text"
                  value={schoolProfile.cluster}
                  onChange={(e) => handleFieldChange('cluster', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="ឧ. កម្រងស្ពានមេត្រី"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    ស្រុក/ខណ្ឌ
                  </label>
                  <input
                    type="text"
                    value={schoolProfile.district}
                    onChange={(e) => handleFieldChange('district', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="ឧ. ស្រុកភ្នំស្រុក"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    រាជធានី/ខេត្ត
                  </label>
                  <input
                    type="text"
                    value={schoolProfile.province}
                    onChange={(e) => handleFieldChange('province', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="ឧ. ខេត្តបន្ទាយមានជ័យ"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card: Budget Planning Cycles */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">វដ្តឆ្នាំថវិកា (Budget Cycle)</h3>
                <p className="text-xs text-slate-500">ឆ្នាំ N និងផែនការ ៣ ឆ្នាំ (N+1 ដល់ N+3)</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    ឆ្នាំ N-1 (កន្លងមក)
                  </label>
                  <input
                    type="number"
                    value={schoolProfile.yearNMinus1}
                    onChange={(e) => handleFieldChange('yearNMinus1', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-700 mb-1">
                    ឆ្នាំ N (បច្ចុប្បន្ន)
                  </label>
                  <input
                    type="number"
                    value={schoolProfile.yearN}
                    onChange={(e) => handleFieldChange('yearN', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-sm font-bold text-blue-700 rounded-lg border border-blue-300 bg-blue-50/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                <span className="text-xs font-semibold text-slate-700 block">
                  ផែនការ ៣ ឆ្នាំខាងមុខ (BSP Triennium)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">ឆ្នាំ N+1</label>
                    <input
                      type="number"
                      value={schoolProfile.yearN1}
                      onChange={(e) => handleFieldChange('yearN1', parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs font-bold text-center rounded border border-emerald-400 bg-emerald-50 text-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">ឆ្នាំ N+2</label>
                    <input
                      type="number"
                      value={schoolProfile.yearN2}
                      onChange={(e) => handleFieldChange('yearN2', parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs font-bold text-center rounded border border-emerald-400 bg-emerald-50 text-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">ឆ្នាំ N+3</label>
                    <input
                      type="number"
                      value={schoolProfile.yearN3}
                      onChange={(e) => handleFieldChange('yearN3', parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs font-bold text-center rounded border border-emerald-400 bg-emerald-50 text-emerald-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Signatories & Executive Conclusion */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Signatories & Approvals */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">សមាសភាពហត្ថលេខា និងកាលបរិច្ឆេទ</h3>
                <p className="text-xs text-slate-500">អ្នករៀបចំ ប្រធានគណៈកម្មការ និងនាយកសាលា</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  នាយក/នាយិកាសាលា
                </label>
                <input
                  type="text"
                  value={schoolProfile.principalName}
                  onChange={(e) => handleFieldChange('principalName', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="ឧ. លោកស្រី សុខ សារើន"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ប្រធានគណៈកម្មការទ្រទ្រង់/គ្រប់គ្រងសាលា
                </label>
                <input
                  type="text"
                  value={schoolProfile.committeeChair}
                  onChange={(e) => handleFieldChange('committeeChair', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="ឧ. ប្រធានគណៈកម្មការគ្រប់គ្រងសាលា ភូមិរោគ"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  អ្នករៀបចំផែនការថវិកា
                </label>
                <input
                  type="text"
                  value={schoolProfile.preparedBy}
                  onChange={(e) => handleFieldChange('preparedBy', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="ឧ. លោក/លោកស្រី ទទួលបន្ទុកផែនការថវិកា"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  កាលបរិច្ឆេទអនុម័តផែនការ
                </label>
                <input
                  type="text"
                  value={schoolProfile.approvalDate}
                  onChange={(e) => handleFieldChange('approvalDate', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="ឧ. ថ្ងៃទី ១០ ខែសីហា ឆ្នាំ២០២៥"
                />
              </div>
            </div>
          </div>

          {/* Card: Conclusion Notes & Priorities */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">
                    សេចក្តីសន្និដ្ឋាន និងអាទិភាពគន្លឹះ ៣ ឆ្នាំ (Executive Summary)
                  </h3>
                  <p className="text-xs text-slate-500">
                    ខ្លឹមសារសង្ខេបសម្រាប់បញ្ចូលក្នុងរបាយការណ៍ និងបទបង្ហាញ Slide Pitch
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onResetConclusion}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>កំណត់សេចក្តីសន្និដ្ឋានឡើងវិញ</span>
              </button>
            </div>

            <div>
              <textarea
                rows={12}
                value={schoolProfile.conclusionNotes}
                onChange={(e) => handleFieldChange('conclusionNotes', e.target.value)}
                className="w-full p-4 text-sm leading-relaxed rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-kantumruy transition bg-slate-50/50 focus:bg-white resize-y"
                placeholder="បញ្ចូលសេចក្តីសន្និដ្ឋាន និងអាទិភាពទាំង ៥ ស្តង់ដារបស់សាលារៀន..."
              />
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-slate-400" />
                  <span>ខ្លឹមសារនេះត្រូវបានបង្ហាញនៅក្នុងកម្រងស្លាយ និងជំពូកទី៤ នៃរបាយការណ៍ពេញលេញ</span>
                </div>
                <span className="font-mono">{schoolProfile.conclusionNotes?.length || 0} តួអក្សរ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
