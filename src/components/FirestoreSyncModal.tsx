import React, { useState, useEffect } from 'react';
import {
  BspPlanRecord,
  savePlanToFirestore,
  fetchPlansFromFirestore,
  deletePlanFromFirestore,
  testConnection,
} from '../firebase';
import { IndicatorRow, ActivityBudgetRow, SchoolProfile } from '../data/bspData';
import { StrategicDocument } from '../data/reportData';
import {
  Cloud,
  CloudCheck,
  CloudUpload,
  RefreshCw,
  Trash2,
  Calendar,
  Sparkles,
  Archive,
  CheckCircle2,
  ArrowRight,
  X,
  AlertCircle,
  Database,
} from 'lucide-react';

interface FirestoreSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: SchoolProfile;
  currentDoc: StrategicDocument;
  currentTable1: IndicatorRow[];
  currentTable2: ActivityBudgetRow[];
  onLoadPlan: (plan: BspPlanRecord) => void;
  onSetNewCycle: (startYear: number, endYear: number, title: string) => void;
}

export const FirestoreSyncModal: React.FC<FirestoreSyncModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  currentDoc,
  currentTable1,
  currentTable2,
  onLoadPlan,
  onSetNewCycle,
}) => {
  const [plans, setPlans] = useState<BspPlanRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [saveTitle, setSaveTitle] = useState(
    `ទិន្នន័យគំរូដើម (${currentProfile.yearN} - ${currentProfile.yearN3})`
  );
  const [saveStatus, setSaveStatus] = useState<'active' | 'archived' | 'draft'>('archived');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check connection and fetch plans
  const loadCloudPlans = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const online = await testConnection();
      setIsConnected(online);
      const records = await fetchPlansFromFirestore();
      setPlans(records);
    } catch (err) {
      console.error(err);
      setErrorMessage('មិនអាចទាញយកទិន្នន័យពី Firestore បានទេ សូមពិនិត្យការតភ្ជាប់។');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCloudPlans();
    }
  }, [isOpen]);

  // Save current plan
  const handleSaveToCloud = async () => {
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const planId = `plan_${currentProfile.schoolCode || 'sch'}_${Date.now()}`;
      const newPlan: BspPlanRecord = {
        id: planId,
        schoolCode: currentProfile.schoolCode,
        schoolName: currentProfile.schoolName,
        cycleTitle: saveTitle.trim() || `ផែនការ ${currentProfile.yearN1}-${currentProfile.yearN3}`,
        startYear: currentProfile.yearN,
        endYear: currentProfile.yearN3,
        status: saveStatus,
        schoolProfile: currentProfile,
        doc: currentDoc,
        table1Rows: currentTable1,
        table2Rows: currentTable2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await savePlanToFirestore(newPlan);
      setSuccessMessage('បានរក្សាទុកទិន្នន័យទៅក្នុង Firestore ដោយជោគជ័យ!');
      await loadCloudPlans();
    } catch (err) {
      console.error(err);
      setErrorMessage('មានបញ្ហាក្នុងការរក្សាទុកទិន្នន័យទៅ Firestore!');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete plan from Firestore
  const handleDeletePlan = async (id: string, title: string) => {
    if (window.confirm(`តើលោកអ្នកពិតជាចង់លុប "${title}" ចេញពី Firestore មែនទេ?`)) {
      try {
        await deletePlanFromFirestore(id);
        await loadCloudPlans();
      } catch (err) {
        console.error(err);
        alert('មិនអាចលុបទិន្នន័យបានទេ!');
      }
    }
  };

  // Create new cycle 2026-2029
  const handleCreateNewCycle2026_2029 = () => {
    onSetNewCycle(2026, 2029, 'ផែនការយុទ្ធសាស្ត្រថវិកា ២០២៦-២០២៩');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-sky-900 to-indigo-950 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-700/80 text-amber-300">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm md:text-base">
                  ប្រព័ន្ធរក្សាទុកទិន្នន័យពពក Firestore (Cloud Archives)
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Online</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                រក្សាទុកទិន្នន័យគំរូ និងប្តូរទៅកាន់វដ្តផែនការយុទ្ធសាស្ត្រឆ្នាំបន្ទាប់ (២០២៦-២០២៩)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs">
          {/* Notifications */}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Quick Action - Create New 2026-2029 Cycle */}
          <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-xs md:text-sm">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>បង្កើតវដ្តផែនការយុទ្ធសាស្ត្រថ្មី (២០២៦-២០២៩)</span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                វដ្តបន្ទាប់
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              ផ្លាស់ប្តូរឆ្នាំផែនការទៅជា <strong>២០២៦ ដល់ ២០២៩</strong> (ឆ្នាំ N=2025, N+1=2026, N+2=2027, N+3=2028/2029) ដើម្បីចាប់ផ្តើមរៀបចំផែនការថ្មី ខណៈទិន្នន័យគំរូត្រូវបានរក្សាទុកក្នុង Firestore។
            </p>
            <button
              onClick={handleCreateNewCycle2026_2029}
              className="mt-2 flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold shadow-xs cursor-pointer transition-colors"
            >
              <span>ប្តូរទៅកាន់វដ្តឆ្នាំ ២០២៦-២០២៩</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Section 2: Save Current Plan to Firestore */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
              <CloudUpload className="w-4 h-4 text-indigo-600" />
              <span>រក្សាទុកទិន្នន័យបច្ចុប្បន្នទៅក្នុង Firestore (Archive / Cloud Save)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-slate-500 mb-1">
                  ឈ្មោះសម្គាល់វដ្តទិន្នន័យ
                </label>
                <input
                  type="text"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  placeholder="ឧ. ទិន្នន័យគំរូដើម ២០២៤-២០២៥"
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  ស្ថានភាពឯកសារ
                </label>
                <select
                  value={saveStatus}
                  onChange={(e) =>
                    setSaveStatus(e.target.value as 'active' | 'archived' | 'draft')
                  }
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="archived">រក្សាទុកជាប្រវត្តិ (Archived)</option>
                  <option value="active">សកម្មបច្ចុប្បន្ន (Active)</option>
                  <option value="draft">ព្រាង (Draft)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleSaveToCloud}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs disabled:opacity-50 cursor-pointer transition-colors"
              >
                <CloudUpload className="w-3.5 h-3.5" />
                <span>{isSaving ? 'កំពុងរក្សាទុក...' : 'បញ្ជូនទៅរក្សាទុកក្នុង Firestore'}</span>
              </button>
            </div>
          </div>

          {/* Section 3: List of Saved Cycles in Firestore */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Archive className="w-4 h-4 text-slate-500" />
                <span>បញ្ជីទិន្នន័យដែលបានរក្សាទុកក្នុង Firestore ({plans.length})</span>
              </div>
              <button
                onClick={loadCloudPlans}
                disabled={isLoading}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer font-medium"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                <span>ផ្ទុកឡើងវិញ</span>
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-6 text-slate-400">កំពុងទាញយកទិន្នន័យពីពពក...</div>
            ) : plans.length === 0 ? (
              <div className="text-center py-6 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-xs">
                មិនទាន់មានទិន្នន័យក្នុង Firestore នៅឡើយទេ។ សូមចុច &ldquo;បញ្ជូនទៅរក្សាទុកក្នុង Firestore&rdquo; ខាងលើ។
              </div>
            ) : (
              <div className="space-y-2">
                {plans.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">
                          {p.cycleTitle}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            p.status === 'archived'
                              ? 'bg-amber-100 text-amber-800'
                              : p.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {p.status === 'archived'
                            ? 'ប្រវត្តិ (Archived)'
                            : p.status === 'active'
                            ? 'សកម្ម (Active)'
                            : 'ព្រាង (Draft)'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>{p.schoolName}</span>
                        <span>•</span>
                        <span className="font-mono">ឆ្នាំ {p.startYear} - {p.endYear}</span>
                        <span>•</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(p.updatedAt).toLocaleDateString('km-KH')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `តើលោកអ្នកចង់ផ្ទុកទិន្នន័យ "${p.cycleTitle}" មកប្រើប្រាស់ក្នុងប្រព័ន្ធមែនទេ?`
                            )
                          ) {
                            onLoadPlan(p);
                            onClose();
                          }
                        }}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg text-xs cursor-pointer transition-colors"
                      >
                        ផ្ទុកទិន្នន័យនេះ
                      </button>
                      <button
                        onClick={() => handleDeletePlan(p.id, p.cycleTitle)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                        title="លុបចេញពី Firestore"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <CloudCheck className="w-4 h-4 text-emerald-600" />
            <span>ទិន្នន័យត្រូវបានការពារ និងរក្សាទុកនៅលើ Google Cloud Firestore</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium cursor-pointer"
          >
            បិទ
          </button>
        </div>
      </div>
    </div>
  );
};
