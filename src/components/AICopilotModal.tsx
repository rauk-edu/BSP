import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Copy,
  Check,
  Bot,
  User,
  Lightbulb,
  FileText,
  Target,
  DollarSign,
  Award,
  Layers,
  Building,
  GraduationCap,
  Users,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import {
  chatWithAI,
  diagnoseStandards,
  suggestTargetsForTable1,
  suggestActivitiesForTable2,
  generatePitchOrLetter,
  ChatMessage,
} from '../services/aiService';
import { IndicatorRow, ActivityBudgetRow, SchoolProfile } from '../data/bspData';
import { StrategicDocument, DEFAULT_STAKEHOLDER_SPEECH } from '../data/reportData';

interface AICopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolProfile: SchoolProfile;
  doc: StrategicDocument;
  table1Rows: IndicatorRow[];
  table2Rows: ActivityBudgetRow[];
  onApplyProfileData?: (updated: Partial<SchoolProfile>) => void;
  onApplyDocData?: (updated: Partial<StrategicDocument>) => void;
}

type AITab = 'chat' | 'diagnose' | 'table1' | 'table2' | 'speech' | 'rohkData';

export const AICopilotModal: React.FC<AICopilotModalProps> = ({
  isOpen,
  onClose,
  schoolProfile,
  doc,
  table1Rows,
  table2Rows,
  onApplyProfileData,
  onApplyDocData,
}) => {
  const [activeTab, setActiveTab] = useState<AITab>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `ជម្រាបសួរលោកនាយិកា លោកគ្រូ-អ្នកគ្រូ! ខ្ញុំគឺជា **ជំនួយការ AI យុទ្ធសាស្ត្រថវិកា MoEYS** សម្រាប់សាលារៀន។ ខ្ញុំអាចជួយលោកអ្នក៖
• វិភាគស្ថានភាពសាលារៀនធៀបនឹង **ស្តង់ដាសាលារៀនគំរូទាំង ៥**
• កំណត់គោលដៅ និងសរសេរ **"មូលហេតុនៃការផ្លាស់ប្តូរ"** ក្នុងតារាងទី១
• ស្នើសកម្មភាព និងបែងចែកថវិកា ៣ ឆ្នាំ (រដ្ឋ, ដៃគូ, មូលនិធិឃុំ CIP, សហគមន៍) ក្នុងតារាងទី២
• រៀបចំសេចក្តីព្រាង **សុន្ទរកថាកិច្ចប្រជុំ** ឬ **លិខិតផ្លូវការ** ទៅរដ្ឋបាលឃុំ-ស្រុក

តើខ្ញុំអាចជួយអ្វីលោកអ្នកថ្ងៃនេះបានដែរ?`,
      timestamp: new Date().toLocaleTimeString('km-KH'),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // States for diagnostic tab
  const [diagnosticResult, setDiagnosticResult] = useState<string>('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  // States for Table 1 suggestions
  const [table1Suggestions, setTable1Suggestions] = useState<string>('');
  const [isSuggestingT1, setIsSuggestingT1] = useState(false);

  // States for Table 2 suggestions
  const [table2Activities, setTable2Activities] = useState<string>('');
  const [isSuggestingT2, setIsSuggestingT2] = useState(false);
  const [customFocusArea, setCustomFocusArea] = useState('ការកែលម្អបណ្ណាល័យ, របង ៤០ម, កម្មវិធីអាហារូបត្ថម្ភ, និងការបង្រៀនបំប៉នសិស្សរៀនយឺត');

  // States for Speech/Letter
  const [speechResult, setSpeechResult] = useState<string>(DEFAULT_STAKEHOLDER_SPEECH);
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
  const [letterType, setLetterType] = useState<'speech' | 'letter'>('speech');
  const [targetAudience, setTargetAudience] = useState('ក្រុមប្រឹក្សាឃុំ (CIP), មាតាបិតាសិស្ស, អង្គការ World Vision & អង្គការកុមារកម្ពុជារីករាយ');

  if (!isOpen) return null;

  // Real data of Rohk Primary School
  const rohkDataSummary = {
    name: 'សាលាបឋមសិក្សា រោគ',
    legalCode: 'លិខិតលេខ ១១២១ អយក.ប្រក ចុះថ្ងៃទី១០ ខែសីហា ឆ្នាំ២០២០',
    appointedPrincipal: 'លោកស្រី សុខ សារើន (លិខិតលេខ ០២ ដក.តត ឆ្នាំ២០១៧)',
    location: 'ភូមិរោគ ឃុំស្ពានស្រែង ស្រុកភ្នំស្រុក ខេត្តបន្ទាយមានជ័យ (១៣ គ.ម ពីស្រុក, ៦៩ គ.ម ពីខេត្ត)',
    landArea: '១៤.៤០០ ម៉ែត្រការ៉េ',
    students: '២៥០ នាក់ (ស្រី ១២២ នាក់) | អត្រាជាប់ ៩៨% (២៤៥ នាក់) | ប្រឡងសងជាប់ ១០០% | បោះបង់ ១ នាក់ (១%)',
    staff: 'សរុប ១៧ នាក់ (ស្រី ១២ នាក់)៖ គ្រូបង្រៀន ១២ នាក់ (ស្រី ១១ នាក់), បុគ្គលិកមិនបង្រៀន ៥ នាក់ (នាយិកា, នាយករង, លេខា, បណ្ណារក្ស, កសិកម្ម)',
    buildings: '៤ ខ្នង ១៥ បន្ទប់ (បង្រៀន ១២ បន្ទប់, ឃ្លាំង ១, បណ្ណាល័យ & ទីចាត់ការ ២)',
    partners: 'UNDP (១៩៩៧), HERO (២០១២), World Vision (២០១៤, ២០២៥, ២០២៦), សម្តេចតេជោ (អគារ ៦ បន្ទប់), អង្គការកុមារកម្ពុជារីករាយ (អគារពហុបំណង ៣ បន្ទប់ & អាហារពេលព្រឹក)',
    currentStatus: 'កំពុងខ្ចីបន្ទប់នៅអនុវិទ្យាល័យស្ពានមេត្រីបង្រៀនបណ្ដោះអាសន្ន រង់ចាំការសាងសង់-ជួសជុល',
    challenges: 'កុមារ ៣-៥ឆ្នាំ និង ៦ឆ្នាំ/៧០ខែ មិនទាន់ចុះឈ្មោះចូលរៀនបាន ១០០%, សៀវភៅជំនួយភាសាខ្មែរ-គណិតថ្នាក់ទី១-៣',
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('km-KH'),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputMessage('');
    setIsLoading(true);

    try {
      const context = {
        schoolProfile,
        studentCount: doc.schoolBackground.studentCount,
        teacherCount: doc.schoolBackground.teacherCount,
        rohkSummary: rohkDataSummary,
      };

      const reply = await chatWithAI(textToSend, context, messages.slice(-6));
      const aiMsg: ChatMessage = {
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString('km-KH'),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      const errorMsgFormatted: ChatMessage = {
        role: 'assistant',
        content: `⚠️ សូមអភ័យទោស៖ មានបញ្ហាក្នុងការទាក់ទងជាមួយ AI៖ ${errorMsg}`,
        timestamp: new Date().toLocaleTimeString('km-KH'),
      };
      setMessages((prev) => [...prev, errorMsgFormatted]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunDiagnostic = async () => {
    setIsDiagnosing(true);
    try {
      const analysis = await diagnoseStandards(
        schoolProfile,
        {
          totalStudents: 250,
          femaleStudents: 122,
          passRate: '98%',
          dropoutCount: 1,
          grade1Students: 31,
          grade6Students: 35,
        },
        {
          totalBuildings: 4,
          totalRooms: 15,
          classroomTeaching: 12,
          libraryRooms: 2,
          renovationUnderway: true,
          temporaryClassrooms: 'អនុវិទ្យាល័យស្ពានមេត្រី',
        },
        'ការចុះឈ្មោះកុមារ ៣-៥ឆ្នាំ និង ៦ឆ្នាំមិនទាន់បាន ១០០% (ត្រូវការអន្តរាគមន៍ពីអាជ្ញាធរឃុំ-ភូមិ), តម្រូវការសៀវភៅជំនួយភាសាខ្មែរ-គណិត ថ្នាក់ទី១-៣, ការបញ្ចប់របង ៤០ម និងទីធ្លា'
      );
      setDiagnosticResult(analysis);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setDiagnosticResult(`⚠️ បរាជ័យក្នុងការវិភាគ៖ ${errorMsg}`);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleSuggestTable1 = async () => {
    setIsSuggestingT1(true);
    try {
      const suggestions = await suggestTargetsForTable1(table1Rows.slice(0, 20), {
        schoolName: schoolProfile.schoolName,
        currentStudents: 250,
        passRate: '98%',
        dropoutCount: 1,
        yearN: schoolProfile.yearN,
        yearN1: schoolProfile.yearN1,
      });
      setTable1Suggestions(suggestions);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setTable1Suggestions(`⚠️ មានបញ្ហាក្នុងការផ្ដល់អនុសាសន៍៖ ${errorMsg}`);
    } finally {
      setIsSuggestingT1(false);
    }
  };

  const handleSuggestTable2 = async () => {
    setIsSuggestingT2(true);
    try {
      const activities = await suggestActivitiesForTable2(
        customFocusArea,
        'ថវិការដ្ឋ SIG/PB, អង្គការ World Vision, អង្គការកុមារកម្ពុជារីករាយ, មូលនិធិវិនិយោគឃុំ (CIP), ការចូលរួមរបស់សហគមន៍'
      );
      setTable2Activities(activities);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setTable2Activities(`⚠️ មានបញ្ហាក្នុងការបង្កើតសកម្មភាព៖ ${errorMsg}`);
    } finally {
      setIsSuggestingT2(false);
    }
  };

  const handleGeneratePitchOrLetter = async () => {
    setIsGeneratingSpeech(true);
    try {
      const content = await generatePitchOrLetter(
        letterType,
        {
          schoolProfile,
          history: doc.schoolBackground.history,
          studentCount: doc.schoolBackground.studentCount,
          teacherCount: doc.schoolBackground.teacherCount,
          challenges: 'ការចុះឈ្មោះចូលរៀនកុមារ, ការសាងសង់អគារពហុបំណង, របងសាលា, សៀវភៅជំនួយអំណាន',
        },
        targetAudience
      );
      setSpeechResult(content);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setSpeechResult(`⚠️ មានបញ្ហាក្នុងការបង្កើតខ្លឹមសារ៖ ${errorMsg}`);
    } finally {
      setIsGeneratingSpeech(false);
    }
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleApplyAllRohkData = () => {
    if (onApplyProfileData) {
      onApplyProfileData({
        schoolName: 'សាលាបឋមសិក្សា រោគ',
        schoolCode: 'SCH-010502',
        cluster: 'កម្រងស្ពានមេត្រី',
        district: 'ស្រុកភ្នំស្រុក',
        province: 'ខេត្តបន្ទាយមានជ័យ',
        principalName: 'លោកស្រី សុខ សារើន',
        committeeChair: 'ប្រធានគណៈកម្មការគ្រប់គ្រងសាលា ភូមិរោគ',
      });
    }
    if (onApplyDocData) {
      onApplyDocData({
        schoolBackground: {
          ...doc.schoolBackground,
          studentCount: { total: 250, female: 122 },
          teacherCount: { total: 12, female: 11 },
          classCount: 12,
          roomsCount: 15,
          communeName: 'ឃុំស្ពានស្រែង',
          districtName: 'ស្រុកភ្នំស្រុក',
          provinceName: 'ខេត្តបន្ទាយមានជ័យ',
        },
      });
    }
    alert('បានផ្ទុកទិន្នន័យផ្លូវការ និងលទ្ធផលសិក្សារបស់ «សាលាបឋមសិក្សា រោគ» ដោយជោគជ័យ!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-sky-800 text-white px-5 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  ជំនួយការឆ្លាតវៃ AI ផែនការយុទ្ធសាស្ត្រ MoEYS
                </h2>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-xs text-purple-200">
                វិភាគទិន្នន័យសាលារៀន ផ្ដល់អនុសាសន៍សូចនាករ និងបង្កើតសុន្ទរកថាកៀរគរថវិកា CIP
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="បិទ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 flex items-center overflow-x-auto gap-2 py-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>ពិគ្រោះយោបល់ AI (Chat)</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnose')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'diagnose'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>វិភាគស្តង់ដាសាលាគំរូ ៥</span>
          </button>

          <button
            onClick={() => setActiveTab('table1')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'table1'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-500" />
            <span>ជំនួយការតារាងទី១ (សូចនាករ)</span>
          </button>

          <button
            onClick={() => setActiveTab('table2')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'table2'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-sky-500" />
            <span>ជំនួយការតារាងទី២ (ថវិកា ៣ឆ្នាំ)</span>
          </button>

          <button
            onClick={() => setActiveTab('speech')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'speech'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>សុន្ទរកថា & លិខិតផ្លូវការ</span>
          </button>

          <button
            onClick={() => setActiveTab('rohkData')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'rohkData'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-rose-500" />
            <span>ទិន្នន័យពិត «សាលារៀន រោគ»</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          {/* TAB 1: Chat Copilot */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full max-w-4xl mx-auto">
              {/* Quick Prompt Suggestions */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>សំណើគន្លឹះរហ័សសម្រាប់សាលាបឋមសិក្សា រោគ (ចុចដើម្បីសួរ)៖</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'វិភាគទិន្នន័យជាក់ស្តែងសាលាបឋមសិក្សា រោគ និងផ្ដល់អនុសាសន៍តាមស្តង់ដាទាំង ៥',
                    'យុទ្ធសាស្ត្រជម្រុញកុមារ ៣-៥ឆ្នាំ និង ៦ឆ្នាំ/៧០ខែ ឱ្យចុះឈ្មោះចូលរៀន ១០០%',
                    'វិធីសាស្ត្រពន្យល់ភាគីពាក់ព័ន្ធអំពីមូលហេតុថវិកាប្រែប្រួលតាមចំនួនក្បាលសិស្ស',
                    'រៀបចំសំណើដាក់បញ្ចូលគម្រោងរបង ៤០ម និងប្រព័ន្ធទឹក ក្នុងផែនការវិនិយោគឃុំ (CIP)',
                    'យុទ្ធសាស្ត្រជម្រុញមាតាបិតាថ្នាក់ទី១-៣ ទិញសៀវភៅជំនួយភាសាខ្មែរ និងគណិត',
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isLoading}
                      className="text-[11px] bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 hover:border-purple-300 rounded-full px-3 py-1 transition-colors text-left cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-xs ${
                        msg.role === 'user'
                          ? 'bg-indigo-600'
                          : 'bg-gradient-to-br from-purple-600 to-sky-600'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </div>

                    <div
                      className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-800 border border-slate-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                      <div
                        className={`text-[10px] mt-2 flex items-center justify-between gap-4 ${
                          msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {msg.role === 'assistant' && (
                          <button
                            onClick={() => handleCopyText(msg.content, index)}
                            className="text-slate-400 hover:text-purple-600 flex items-center gap-1 cursor-pointer transition-colors"
                            title="ចម្លងអត្ថបទ"
                          >
                            {copiedIndex === index ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600 font-semibold">ចម្លងរួច</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>ចម្លង</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-500 text-xs py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                    <span>AI កំពុងវិភាគ និងរៀបចំចម្លើយយ៉ាងយកចិត្តទុកដាក់...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="mt-auto bg-white border border-slate-200 rounded-xl p-2 shadow-xs flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="សួរសំណួរ ឬស្នើសុំយុទ្ធសាស្ត្រថវិកា BSP ពី AI..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 text-xs sm:text-sm outline-hidden text-slate-800 placeholder-slate-400"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">ផ្ញើ</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Model School Diagnostic */}
          {activeTab === 'diagnose' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span>ការវិភាគកម្រិតស្តង់ដាសាលារៀនគំរូទាំង ៥ របស់ MoEYS</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    ដំណើរការដោយ Gemini 3.8 Flash ដោយផ្អែកលើទិន្នន័យជាក់ស្តែងនៃសាលាបឋមសិក្សា រោគ
                  </p>
                </div>
                <button
                  onClick={handleRunDiagnostic}
                  disabled={isDiagnosing}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all disabled:opacity-50 shrink-0"
                >
                  {isDiagnosing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>ដំណើរការវិភាគស្តង់ដាឥឡូវនេះ</span>
                </button>
              </div>

              {/* 5 Standards Quick Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  {
                    title: 'ស្តង់ដាទី១',
                    subtitle: 'លទ្ធផលសិក្សាសិស្ស',
                    status: '៩៨% ជាប់ (២៤៥ នាក់)',
                    color: 'emerald',
                  },
                  {
                    title: 'ស្តង់ដាទី២',
                    subtitle: 'ការបង្រៀន & រៀន',
                    status: 'គ្រូ ១២នាក់ / បណ្ណាល័យ',
                    color: 'indigo',
                  },
                  {
                    title: 'ស្តង់ដាទី៣',
                    subtitle: 'សហគមន៍',
                    status: 'សហគមន៍ + World Vision',
                    color: 'amber',
                  },
                  {
                    title: 'ស្តង់ដាទី៤',
                    subtitle: 'អភិបាលកិច្ច',
                    status: '៤ ខ្នង ១៥ បន្ទប់ / កំពុងសាងសង់',
                    color: 'blue',
                  },
                  {
                    title: 'ស្តង់ដាទី៥',
                    subtitle: 'គណនេយ្យភាព',
                    status: 'វេទិកា & ការបិទផ្សាយ',
                    color: 'rose',
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-xs"
                  >
                    <div className="text-[11px] font-bold text-slate-500">{s.title}</div>
                    <div className="text-xs font-semibold text-slate-800 mt-0.5">{s.subtitle}</div>
                    <div className="text-[10px] text-indigo-600 font-medium mt-1 bg-indigo-50 py-0.5 px-1.5 rounded">
                      {s.status}
                    </div>
                  </div>
                ))}
              </div>

              {/* Diagnostic Output */}
              {diagnosticResult ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>លទ្ធផលនៃការវិភាគរបស់ AI៖</span>
                    </span>
                    <button
                      onClick={() => handleCopyText(diagnosticResult, 999)}
                      className="text-xs text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {copiedIndex === 999 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === 999 ? 'ចម្លងរួច' : 'ចម្លងការវិភាគ'}</span>
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                    {diagnosticResult}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500">
                  <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-medium">ចុចលើប៊ូតុង "ដំណើរការវិភាគស្តង់ដាឥឡូវនេះ" ដើម្បីឱ្យ AI វាយតម្លៃស្ថានភាពសាលា</p>
                  <p className="text-xs text-slate-400 mt-1">
                    AI នឹងផ្តល់អនុសាសន៍តាមស្តង់ដានីមួយៗ និងស្នើយុទ្ធសាស្ត្រដាក់បញ្ចូលក្នុង CIP ឃុំ
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Table 1 Suggestions */}
          {activeTab === 'table1' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <span>ជំនួយការកំណត់គោលដៅ និងមូលហេតុផ្លាស់ប្តូរ (តារាងទី១)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    ជួយសរសេរ «មូលហេតុនៃការផ្លាស់ប្តូរ» ជាភាសាខ្មែររដ្ឋបាល និងព្យាករគោលដៅឆ្នាំ N+1 ដល់ N+3
                  </p>
                </div>
                <button
                  onClick={handleSuggestTable1}
                  disabled={isSuggestingT1}
                  className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all disabled:opacity-50 shrink-0"
                >
                  {isSuggestingT1 ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>បង្កើតអនុសាសន៍សូចនាករ</span>
                </button>
              </div>

              {table1Suggestions ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-700">
                      អនុសាសន៍ និងសេចក្តីព្រាងមូលហេតុផ្លាស់ប្តូរ៖
                    </span>
                    <button
                      onClick={() => handleCopyText(table1Suggestions, 888)}
                      className="text-xs text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {copiedIndex === 888 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>ចម្លងខ្លឹមសារ</span>
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {table1Suggestions}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500">
                  <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-medium">ចុចលើប៊ូតុងខាងលើ ដើម្បីបង្កើតអនុសាសន៍សម្រាប់សូចនាករតារាងទី១</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Table 2 Activity Generator */}
          {activeTab === 'table2' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-sky-600" />
                    <span>ជំនួយការស្នើសកម្មភាព និងបែងចែកថវិកា ៣ ឆ្នាំ (តារាងទី២)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    បង្កើតសំណើសកម្មភាព និងបែងចែកប្រភពថវិកា (រដ្ឋ, ដៃគូ NGOs, មូលនិធិឃុំ CIP, សហគមន៍)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    វិស័យអាទិភាពដែលត្រូវរៀបចំគម្រោងថវិកា៖
                  </label>
                  <input
                    type="text"
                    value={customFocusArea}
                    onChange={(e) => setCustomFocusArea(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:border-sky-500 outline-hidden"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSuggestTable2}
                    disabled={isSuggestingT2}
                    className="px-4 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isSuggestingT2 ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>បង្កើតសំណើសកម្មភាព និងថវិកា</span>
                  </button>
                </div>
              </div>

              {table2Activities ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-700">សំណើសកម្មភាព និងការបែងចែកថវិកា៖</span>
                    <button
                      onClick={() => handleCopyText(table2Activities, 777)}
                      className="text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {copiedIndex === 777 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>ចម្លងសកម្មភាព</span>
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {table2Activities}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500">
                  <DollarSign className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-medium">ចុចបង្កើតសកម្មភាពដើម្បីទទួលបានការវិភាគថវិកាជាក់ស្តែង</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Stakeholder Speech & Letters */}
          {activeTab === 'speech' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <span>បង្កើតសុន្ទរកថាកិច្ចប្រជុំ ឬលិខិតផ្លូវការទៅរដ្ឋបាលឃុំ/ស្រុក</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      កែច្នៃសុន្ទរកថារបស់លោកស្រីនាយិកា សុខ សារើន ឱ្យកាន់តែទាក់ទាញ និងមានទម្ងន់បញ្ចុះបញ្ចូល
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={letterType}
                      onChange={(e) => setLetterType(e.target.value as 'speech' | 'letter')}
                      className="text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="speech">សុន្ទរកថាក្នុងកិច្ចប្រជុំ</option>
                      <option value="letter">លិខិតស្នើសុំផ្លូវការ (ឃុំ/ស្រុក/ដៃគូ)</option>
                    </select>

                    <button
                      onClick={handleGeneratePitchOrLetter}
                      disabled={isGeneratingSpeech}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all disabled:opacity-50"
                    >
                      {isGeneratingSpeech ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      <span>បង្កើតថ្មីជាមួយ AI</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ទស្សនិកជន ឬអ្នកទទួល៖
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              {/* Speech Output */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700">
                    {letterType === 'speech' ? 'ខ្លឹមសារសុន្ទរកថាផ្លូវការ៖' : 'ខ្លឹមសារលិខិតផ្លូវការ៖'}
                  </span>
                  <button
                    onClick={() => handleCopyText(speechResult, 666)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    {copiedIndex === 666 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>ចម្លងខ្លឹមសារ</span>
                  </button>
                </div>
                <div className="whitespace-pre-wrap text-xs sm:text-sm text-slate-800 leading-relaxed font-sans bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {speechResult}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Real Rok Primary School Data */}
          {activeTab === 'rohkData' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gradient-to-br from-indigo-900 via-sky-900 to-indigo-950 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      ទិន្នន័យផ្លូវការ MoEYS
                    </span>
                    <h3 className="text-xl font-bold font-moul text-amber-200 mt-2">
                      សាលាបឋមសិក្សា រោគ
                    </h3>
                    <p className="text-xs text-slate-200 mt-1">
                      ស្រុកភ្នំស្រុក ខេត្តបន្ទាយមានជ័យ • បង្កើតឆ្នាំ១៩៨១ • ទទួលស្គាល់ផ្លូវការលិខិតលេខ ១១២១ អយក.ប្រក
                    </p>
                  </div>
                  <button
                    onClick={handleApplyAllRohkData}
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>ផ្ទុកចូលប្រព័ន្ធទាំងស្រុង (1-Click)</span>
                  </button>
                </div>
              </div>

              {/* Data Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* School Profile Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                    <Building className="w-4 h-4 text-indigo-600" />
                    <span>ព័ត៌មានទូទៅ & ថ្នាក់ដឹកនាំ</span>
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-700">
                    <li><strong className="text-slate-900">នាយិកាសាលា៖</strong> លោកស្រី សុខ សារើន (លិខិតលេខ ០២ ដក.តត ឆ្នាំ២០១៧)</li>
                    <li><strong className="text-slate-900">ទីតាំង៖</strong> ភាគខាងកើតភូមិរោគ ជាប់ទំនប់អាងទឹកស្ពានស្រែង (ផ្លូវបុរាណ)</li>
                    <li><strong className="text-slate-900">ចម្ងាយ៖</strong> ១៣ គ.ម ពីស្រុកភ្នំស្រុក, ៦៩ គ.ម ពីខេត្តបន្ទាយមានជ័យ</li>
                    <li><strong className="text-slate-900">ផ្ទៃដីសរុប៖</strong> ១៤.៤០០ ម៉ែត្រការ៉េ</li>
                    <li><strong className="text-slate-900">បុគ្គលិកសរុប៖</strong> ១៧ នាក់ (ស្រី ១២ នាក់) • គ្រូបង្រៀន ១២ នាក់ (ស្រី ១១ នាក់)</li>
                  </ul>
                </div>

                {/* Academic Results Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span>លទ្ធផលសិក្សា ឆ្នាំសិក្សា ២០២៥-២០២៦</span>
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-700">
                    <li><strong className="text-slate-900">សរុបសិស្ស៖</strong> ២៥០ នាក់ (ស្រី ១២២ នាក់)</li>
                    <li><strong className="text-slate-900">សិស្សជាប់មធ្យមភាគ៖</strong> ២៤៥ នាក់ (៩៨% - ស្រី ១២០ នាក់)</li>
                    <li><strong className="text-slate-900">សិស្សធ្លាក់មធ្យមភាគ៖</strong> ៤ នាក់ (២% - បានប្រឡងតេស្តឡើងវិញជាប់ទាំងអស់)</li>
                    <li><strong className="text-slate-900">សិស្សបោះបង់៖</strong> ១ នាក់ (១% - ស្រី ១ នាក់)</li>
                    <li><strong className="text-slate-900">ថ្នាក់រៀន៖</strong> មត្តេយ្យ ២ បន្ទប់, បឋមសិក្សា ១០ បន្ទប់ (ថ្នាក់ទី១ ដល់ ទី៦)</li>
                  </ul>
                </div>

                {/* Infrastructure & Partners Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                    <Layers className="w-4 h-4 text-sky-600" />
                    <span>អគារ & ដៃគូអភិវឌ្ឍន៍</span>
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-700">
                    <li><strong className="text-slate-900">អគារ និងបន្ទប់៖</strong> សរុប ៤ ខ្នង ១៥ បន្ទប់ (បង្រៀន ១២, ឃ្លាំង ១, បណ្ណាល័យ & ទីចាត់ការ ២)</li>
                    <li><strong className="text-slate-900">អំណោយសម្តេចតេជោ៖</strong> អគារសិក្សា ១ ខ្នង ៦ បន្ទប់ (តាមរយៈ នាយឧត្តមសេនីយ៍ ខេង សុមេធ)</li>
                    <li><strong className="text-slate-900">World Vision៖</strong> អគារ ៤ បន្ទប់ (២០១៤), បរិស្ថានទីធ្លា, កន្លែងកង់-ម៉ូតូ, របងតឿ ៤០ម</li>
                    <li><strong className="text-slate-900">អង្គការកុមារកម្ពុជារីករាយ៖</strong> កំពុងសាងសង់អគារពហុបំណង ១ ខ្នង ៣ បន្ទប់, អាហារពេលព្រឹកកុមារ, ជួសជុលតុសិស្ស</li>
                  </ul>
                </div>

                {/* Key Challenges Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                    <ShieldCheck className="w-4 h-4 text-rose-600" />
                    <span>បញ្ហាប្រឈម និងសំណូមពរអាទិភាព</span>
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-700">
                    <li><strong className="text-slate-900">ការចុះឈ្មោះចូលរៀន៖</strong> កុមារ ៣-៥ឆ្នាំ និង ៦ឆ្នាំ/៧០ខែ មិនទាន់បាន ១០០% (ស្នើអាជ្ញាធរជួយអន្តរាគមន៍)</li>
                    <li><strong className="text-slate-900">សៀវភៅជំនួយ៖</strong> ជម្រុញមាតាបិតាថ្នាក់ទី១-៣ ទិញសៀវភៅជំនួយភាសាខ្មែរ និងគណិត</li>
                    <li><strong className="text-slate-900">ទីតាំងរៀនបណ្ដោះអាសន្ន៖</strong> កំពុងខ្ចីបន្ទប់នៅអនុវិទ្យាល័យស្ពានមេត្រី រង់ចាំការសាងសង់រួចរាល់</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
