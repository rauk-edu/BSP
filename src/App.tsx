/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_TABLE1_DATA,
  INITIAL_TABLE2_DATA,
  DEFAULT_SCHOOL_PROFILE,
  IndicatorRow,
  ActivityBudgetRow,
  SchoolProfile,
} from './data/bspData';
import {
  StrategicDocument,
  DEFAULT_STRATEGIC_DOCUMENT,
} from './data/reportData';
import { Header, AppMode } from './components/Header';
import { SlidePitchView } from './components/SlidePitchView';
import { FullDocumentView } from './components/FullDocumentView';
import { DocumentDrawer, DocumentSectionTarget } from './components/DocumentDrawer';
import { Table1View } from './components/Table1View';
import { Table2View } from './components/Table2View';
import { DashboardView } from './components/DashboardView';
import { ProfileView } from './components/ProfileView';
import { PrintView } from './components/PrintView';
import { FirestoreSyncModal } from './components/FirestoreSyncModal';
import { AICopilotModal } from './components/AICopilotModal';
import { Sparkles } from 'lucide-react';
import { BspPlanRecord, testConnection } from './firebase';
import { exportToCSV, syncTable1ToTable2, syncTable2ToTable1 } from './utils/bspUtils';

const STORAGE_KEYS = {
  TABLE1: 'bsp_3years_table1_v1',
  TABLE2: 'bsp_3years_table2_v1',
  PROFILE: 'bsp_3years_profile_v1',
  DOC: 'bsp_3years_doc_v1',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<AppMode>('slide');
  const [isSaved, setIsSaved] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFirestoreModalOpen, setIsFirestoreModalOpen] = useState(false);
  const [isAICopilotOpen, setIsAICopilotOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<DocumentSectionTarget>({
    chapter: 1,
  });

  // Load from localStorage or use defaults
  const [table1Rows, setTable1Rows] = useState<IndicatorRow[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TABLE1);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load table 1 data from localStorage', e);
    }
    return INITIAL_TABLE1_DATA;
  });

  const [table2Rows, setTable2Rows] = useState<ActivityBudgetRow[]>(() => {
    let t1 = INITIAL_TABLE1_DATA;
    let t2 = INITIAL_TABLE2_DATA;
    try {
      const savedT1 = localStorage.getItem(STORAGE_KEYS.TABLE1);
      if (savedT1) t1 = JSON.parse(savedT1);
      const savedT2 = localStorage.getItem(STORAGE_KEYS.TABLE2);
      if (savedT2) t2 = JSON.parse(savedT2);
    } catch (e) {
      console.error('Failed to load table 2 data from localStorage', e);
    }
    // Auto-sync Table 1 state budget columns into Table 2
    return syncTable1ToTable2(t1, t2);
  });

  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load school profile from localStorage', e);
    }
    return DEFAULT_SCHOOL_PROFILE;
  });

  const [doc, setDoc] = useState<StrategicDocument>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOC);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load document from localStorage', e);
    }
    return DEFAULT_STRATEGIC_DOCUMENT;
  });

  // Test Firestore connection on boot
  useEffect(() => {
    testConnection();
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TABLE1, JSON.stringify(table1Rows));
      localStorage.setItem(STORAGE_KEYS.TABLE2, JSON.stringify(table2Rows));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(schoolProfile));
      localStorage.setItem(STORAGE_KEYS.DOC, JSON.stringify(doc));
      setIsSaved(true);
    } catch (e) {
      console.error('Auto-save error', e);
    }
  }, [table1Rows, table2Rows, schoolProfile, doc]);

  // Update Table 1 row (with auto-sync into Table 2 for budget fields)
  const handleUpdateTable1Row = (id: string, field: keyof IndicatorRow, value: string) => {
    setIsSaved(false);
    setTable1Rows((prev) => {
      const updated = prev.map((row) => (row.id === id ? { ...row, [field]: value } : row));
      if (field === 'targetNPlus1' || field === 'budgetYearN1') {
        setTable2Rows((prevT2) => syncTable1ToTable2(updated, prevT2));
      }
      return updated;
    });
  };

  // Update Table 2 activity budget cell (with two-way sync back to Table 1 for state budget)
  const handleUpdateActivityBudget = (
    id: string,
    yearKey: 'yearN' | 'yearN1' | 'yearN2' | 'yearN3',
    sourceKey: 'state' | 'partner' | 'community' | 'other',
    value: string
  ) => {
    setIsSaved(false);
    setTable2Rows((prev) => {
      const updated = prev.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            [yearKey]: {
              ...row[yearKey],
              [sourceKey]: value,
            },
          };
        }
        return row;
      });

      // If user edits Year N or Year N+1 state budget directly in Table 2, two-way sync to Table 1
      if ((yearKey === 'yearN' || yearKey === 'yearN1') && sourceKey === 'state') {
        setTable1Rows((prevT1) => syncTable2ToTable1(updated, prevT1));
      }
      return updated;
    });
  };

  // Manual trigger to re-sync from Table 1 to Table 2 anytime
  const handleSyncFromTable1 = () => {
    setTable2Rows((prev) => syncTable1ToTable2(table1Rows, prev));
    setIsSaved(false);
  };

  // Update Strategic Document
  const handleUpdateDoc = (updated: Partial<StrategicDocument>) => {
    setIsSaved(false);
    setDoc((prev) => ({ ...prev, ...updated }));
  };

  // Update School Profile
  const handleUpdateProfile = (updated: Partial<SchoolProfile>) => {
    setIsSaved(false);
    setSchoolProfile((prev) => ({ ...prev, ...updated }));
  };

  // Reset Conclusion to MoEYS default
  const handleResetConclusion = () => {
    handleUpdateProfile({ conclusionNotes: DEFAULT_SCHOOL_PROFILE.conclusionNotes });
  };

  // Handle section selection from Drawer
  const handleSelectSection = (target: DocumentSectionTarget) => {
    setActiveSection(target);
    if (target.chapter === 4) {
      setActiveTab('table1');
    } else if (target.chapter === 5) {
      setActiveTab('table2');
    } else {
      if (activeTab !== 'slide' && activeTab !== 'document') {
        setActiveTab('document');
      }
    }
  };

  // Load a plan record from Firestore
  const handleLoadPlan = (plan: BspPlanRecord) => {
    const t1 = plan.table1Rows || table1Rows;
    const t2 = plan.table2Rows ? syncTable1ToTable2(t1, plan.table2Rows) : syncTable1ToTable2(t1, table2Rows);
    setTable1Rows(t1);
    setTable2Rows(t2);
    if (plan.schoolProfile) setSchoolProfile(plan.schoolProfile);
    if (plan.doc) setDoc(plan.doc);
    alert(`បានផ្ទុក "${plan.cycleTitle}" ពី Firestore យកមកប្រើប្រាស់ដោយជោគជ័យ!`);
  };

  // Create new strategic cycle 2026-2029
  const handleSetNewCycle = (startYear: number, endYear: number, title: string) => {
    setSchoolProfile((prev) => ({
      ...prev,
      yearNMinus1: startYear - 2, // 2024
      yearN: startYear - 1,       // 2025
      yearN1: startYear,          // 2026
      yearN2: startYear + 1,      // 2027
      yearN3: endYear,            // 2028 or 2029
    }));
    alert(
      `បានបង្កើតវដ្តផែនការយុទ្ធសាស្ត្រថ្មី៖ ${title} (ឆ្នាំ N: ${startYear - 1} → ឆ្នាំ N+1: ${startYear} ដល់ ${endYear}) ដោយជោគជ័យ!`
    );
  };

  // Export CSV
  const handleExportCSV = () => {
    if (activeTab === 'table2') {
      const headers = [
        'ល.រ',
        'សកម្មភាព',
        `ច្បាប់ហិរញ្ញវត្ថុ ឆ្នាំN (${schoolProfile.yearN}) - ថវិការដ្ឋ`,
        `ច្បាប់ហិរញ្ញវត្ថុ ឆ្នាំN (${schoolProfile.yearN}) - ថវិកាដៃគូ`,
        `ច្បាប់ហិរញ្ញវត្ថុ ឆ្នាំN (${schoolProfile.yearN}) - ថវិកាសហគមន៍`,
        `ច្បាប់ហិរញ្ញវត្ថុ ឆ្នាំN (${schoolProfile.yearN}) - ថវិកាផ្សេងៗ`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+1 (${schoolProfile.yearN1}) - ថវិការដ្ឋ`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+1 (${schoolProfile.yearN1}) - ថវិកាដៃគូ`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+1 (${schoolProfile.yearN1}) - ថវិកាសហគមន៍`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+1 (${schoolProfile.yearN1}) - ថវិកាផ្សេងៗ`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+2 (${schoolProfile.yearN2}) - ថវិការដ្ឋ`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+2 (${schoolProfile.yearN2}) - ថវិកាដៃគូ`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+2 (${schoolProfile.yearN2}) - ថវិកាសហគមន៍`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+2 (${schoolProfile.yearN2}) - ថវិកាផ្សេងៗ`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+3 (${schoolProfile.yearN3}) - ថវិការដ្ឋ`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+3 (${schoolProfile.yearN3}) - ថវិកាដៃគូ`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+3 (${schoolProfile.yearN3}) - ថវិកាសហគមន៍`,
        `គម្រោងតម្រូវការឥណទាន ឆ្នាំN+3 (${schoolProfile.yearN3}) - ថវិកាផ្សេងៗ`,
      ];
      const rows = table2Rows.map((r) => [
        r.code,
        r.activity,
        r.yearN.state,
        r.yearN.partner,
        r.yearN.community,
        r.yearN.other,
        r.yearN1.state,
        r.yearN1.partner,
        r.yearN1.community,
        r.yearN1.other,
        r.yearN2.state,
        r.yearN2.partner,
        r.yearN2.community,
        r.yearN2.other,
        r.yearN3.state,
        r.yearN3.partner,
        r.yearN3.community,
        r.yearN3.other,
      ]);
      exportToCSV(`BSP_Table2_Credit_Requirements_${schoolProfile.yearN1}.csv`, headers, rows);
    } else {
      const headers = [
        'ល.រ',
        'ស្តង់ដា និងសូចនាករ',
        `ឆ្នាំគ្រោងថវិកា ឆ្នាំN+1 (${schoolProfile.yearN1}) (រៀល)`,
        `គោលដៅ ឆ្នាំមុន N-1 (${schoolProfile.yearNMinus1})`,
        `គោលដៅ ឆ្នាំបច្ចុប្បន្ន N (${schoolProfile.yearN})`,
        `គោលដៅ ឆ្នាំគ្រោង N+1 (${schoolProfile.yearN1})`,
        'មូលហេតុនៃការផ្លាស់ប្តូរ (ធៀបនឹងគោលដៅឆ្នាំ N)',
        `គោលដៅ ឆ្នាំគ្រោង N+2 (${schoolProfile.yearN2})`,
        `គោលដៅ ឆ្នាំគ្រោង N+3 (${schoolProfile.yearN3})`,
      ];
      const rows = table1Rows.map((r) => [
        r.code,
        r.title,
        r.budgetYearN1,
        r.targetNMinus1,
        r.targetN,
        r.targetNPlus1,
        r.reasonChangeNPlus1,
        r.targetNPlus2,
        r.targetNPlus3,
      ]);
      exportToCSV(`BSP_Table1_Indicators_${schoolProfile.yearN1}.csv`, headers, rows);
    }
  };

  // Export full JSON Backup
  const handleExportJSON = () => {
    const backupData = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      schoolProfile,
      doc,
      table1Rows,
      table2Rows,
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `BSP_CIP_Proposal_${schoolProfile.schoolName.replace(/\s+/g, '_')}_${schoolProfile.yearN1}.json`;
    link.click();
  };

  // Import JSON Backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.table1Rows && parsed.table2Rows) {
          setTable1Rows(parsed.table1Rows);
          setTable2Rows(parsed.table2Rows);
          if (parsed.schoolProfile) setSchoolProfile(parsed.schoolProfile);
          if (parsed.doc) setDoc(parsed.doc);
          alert('បានបញ្ចូលទិន្នន័យដោយជោគជ័យ!');
        } else {
          alert('ឯកសារមិនត្រូវតាមទម្រង់ BSP!');
        }
      } catch (err) {
        console.error('Import error', err);
        alert('មានបញ្ហាក្នុងការអានឯកសារ JSON!');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to original default data
  const handleResetData = () => {
    if (
      window.confirm(
        'តើលោកអ្នកពិតជាចង់កំណត់ទិន្នន័យឡើងវិញតាមគំរូដើម MoEYS មែនទេ? រាល់ការកែប្រែនឹងត្រូវកំណត់ឡើងវិញ។'
      )
    ) {
      const resetT1 = INITIAL_TABLE1_DATA;
      const resetT2 = syncTable1ToTable2(resetT1, INITIAL_TABLE2_DATA);
      setTable1Rows(resetT1);
      setTable2Rows(resetT2);
      setSchoolProfile(DEFAULT_SCHOOL_PROFILE);
      setDoc(DEFAULT_STRATEGIC_DOCUMENT);
      localStorage.removeItem(STORAGE_KEYS.TABLE1);
      localStorage.removeItem(STORAGE_KEYS.TABLE2);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.DOC);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        schoolProfile={schoolProfile}
        onOpenProfileModal={() => setActiveTab('profile')}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onResetData={handleResetData}
        onPrint={handlePrint}
        isSaved={isSaved}
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        onOpenFirestoreModal={() => setIsFirestoreModalOpen(true)}
        onOpenAICopilot={() => setIsAICopilotOpen(true)}
      />

      {/* Document Outline Drawer */}
      <DocumentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectSection={handleSelectSection}
        activeSection={activeSection}
        mode={activeTab === 'slide' ? 'slide' : activeTab === 'document' ? 'document' : 'tables'}
        setMode={(m) => setActiveTab(m === 'slide' ? 'slide' : 'document')}
      />

      {/* Firestore Cloud Sync Modal */}
      <FirestoreSyncModal
        isOpen={isFirestoreModalOpen}
        onClose={() => setIsFirestoreModalOpen(false)}
        currentProfile={schoolProfile}
        currentDoc={doc}
        currentTable1={table1Rows}
        currentTable2={table2Rows}
        onLoadPlan={handleLoadPlan}
        onSetNewCycle={handleSetNewCycle}
      />

      {/* AI Copilot Modal */}
      <AICopilotModal
        isOpen={isAICopilotOpen}
        onClose={() => setIsAICopilotOpen(false)}
        schoolProfile={schoolProfile}
        doc={doc}
        table1Rows={table1Rows}
        table2Rows={table2Rows}
        onApplyProfileData={handleUpdateProfile}
        onApplyDocData={handleUpdateDoc}
      />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 no-print">
        {/* Slide Pitch Mode (Step-by-step for teaching / commune pitch) */}
        {activeTab === 'slide' && (
          <SlidePitchView
            doc={doc}
            schoolProfile={schoolProfile}
            table1Rows={table1Rows}
            table2Rows={table2Rows}
            onOpenTable1={() => setActiveTab('table1')}
            onOpenTable2={() => setActiveTab('table2')}
            onOpenAICopilot={() => setIsAICopilotOpen(true)}
          />
        )}

        {/* Full National Report & Proposal Mode (6 Chapters) */}
        {activeTab === 'document' && (
          <FullDocumentView
            doc={doc}
            onUpdateDoc={handleUpdateDoc}
            schoolProfile={schoolProfile}
            table1Rows={table1Rows}
            table2Rows={table2Rows}
            onNavigateToTable1={() => setActiveTab('table1')}
            onNavigateToTable2={() => setActiveTab('table2')}
            onOpenAICopilot={() => setIsAICopilotOpen(true)}
          />
        )}

        {/* Table 1 View: Performance Indicators */}
        {activeTab === 'table1' && (
          <Table1View
            rows={table1Rows}
            onUpdateRow={handleUpdateTable1Row}
            schoolProfile={schoolProfile}
            onOpenAICopilot={() => setIsAICopilotOpen(true)}
          />
        )}

        {/* Table 2 View: Budget Plan & Credit Needs */}
        {activeTab === 'table2' && (
          <Table2View
            rows={table2Rows}
            onUpdateActivityBudget={handleUpdateActivityBudget}
            schoolProfile={schoolProfile}
            onSyncFromTable1={handleSyncFromTable1}
            onOpenAICopilot={() => setIsAICopilotOpen(true)}
          />
        )}

        {/* Dashboard View: Analytics & Charts */}
        {activeTab === 'dashboard' && (
          <DashboardView
            table1Rows={table1Rows}
            table2Rows={table2Rows}
            schoolProfile={schoolProfile}
            onNavigateToTable1={() => setActiveTab('table1')}
            onNavigateToTable2={() => setActiveTab('table2')}
          />
        )}

        {/* Profile View: School Identity & Sign-offs */}
        {activeTab === 'profile' && (
          <ProfileView
            schoolProfile={schoolProfile}
            onUpdateProfile={handleUpdateProfile}
            onResetConclusion={handleResetConclusion}
          />
        )}
      </main>

      {/* Floating Quick AI Button */}
      <div className="fixed bottom-6 right-6 z-40 no-print">
        <button
          onClick={() => setIsAICopilotOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-700 via-indigo-600 to-sky-600 hover:from-purple-800 hover:to-sky-700 text-white rounded-full shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 transition-all cursor-pointer font-bold text-xs sm:text-sm border-2 border-white/40"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>ជំនួយការ AI MoEYS</span>
        </button>
      </div>

      {/* Official Print Layout (Visible only when printing) */}
      <PrintView
        table1Rows={table1Rows}
        table2Rows={table2Rows}
        schoolProfile={schoolProfile}
        doc={doc}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            ផែនការយុទ្ធសាស្ត្រថវិការយៈពេល ៣ ឆ្នាំ (BSP) & សំណើវិនិយោគឃុំ (CIP) • ក្រសួងអប់រំ យុវជន និងកីឡា
          </div>
          <div className="text-slate-400 text-[11px]">
            រក្សាទុក និងការពារទិន្នន័យលើ Google Cloud Firestore
          </div>
        </div>
      </footer>
    </div>
  );
}
