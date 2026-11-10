// Auto-generated data extracted from official MoEYS BSP-3YEARS.html

export interface IndicatorRow {
  id: string;
  rowIdx: number;
  standardId: number;
  category: 'GRAND_TOTAL' | 'STANDARD_HEADER' | 'KEY_INDICATOR' | 'SUB_INDICATOR' | 'DISAGGREGATION';
  code: string;
  title: string;
  budgetYearN1: string;
  targetNMinus1: string;
  targetN: string;
  targetNPlus1: string;
  reasonChangeNPlus1: string;
  targetNPlus2: string;
  targetNPlus3: string;
}

export interface BudgetYearSource {
  state: string;
  partner: string;
  community: string;
  other: string;
}

export interface ActivityBudgetRow {
  id: string;
  rowIdx: number;
  standardId: number;
  category: 'GRAND_TOTAL' | 'STANDARD_HEADER' | 'ACTIVITY';
  code: string;
  activity: string;
  yearN: BudgetYearSource;
  yearN1: BudgetYearSource;
  yearN2: BudgetYearSource;
  yearN3: BudgetYearSource;
}

export interface StandardMeta {
  id: number;
  title: string;
  shortTitle: string;
  indicatorsSummary: string;
  color: string;
  accentBg: string;
  borderColor: string;
  badgeBg: string;
  iconName: string;
}

export const STANDARDS_META: StandardMeta[] = [
  {
    id: 1,
    title: 'ស្តង់ដាទី១៖ លទ្ធផលសិក្សារបស់សិស្ស',
    shortTitle: 'ស្តង់ដាទី១៖ លទ្ធផលសិក្សា',
    indicatorsSummary: '៥ សូចនាករគន្លឹះ និង ១១ សូចនាកររង',
    color: 'emerald',
    accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-500',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    iconName: 'GraduationCap'
  },
  {
    id: 2,
    title: 'ស្តង់ដាទី២៖ ការបង្រៀន និងរៀន',
    shortTitle: 'ស្តង់ដាទី២៖ ការបង្រៀន & រៀន',
    indicatorsSummary: '១០ សូចនាករគន្លឹះ និង ៣០ សូចនាកររង',
    color: 'indigo',
    accentBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    borderColor: 'border-indigo-500',
    badgeBg: 'bg-indigo-100 text-indigo-800',
    iconName: 'BookOpen'
  },
  {
    id: 3,
    title: 'ស្តង់ដាទី៣៖ ការចូលរួមរបស់សហគមន៍',
    shortTitle: 'ស្តង់ដាទី៣៖ សហគមន៍',
    indicatorsSummary: '៣ សូចនាករគន្លឹះ និង ៦ សូចនាកររង',
    color: 'amber',
    accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-500',
    badgeBg: 'bg-amber-100 text-amber-800',
    iconName: 'Users'
  },
  {
    id: 4,
    title: 'ស្តង់ដាទី៤៖ អភិបាលកិច្ចសាលារៀន',
    shortTitle: 'ស្តង់ដាទី៤៖ អភិបាលកិច្ច',
    indicatorsSummary: '៦ សូចនាករគន្លឹះ និង ១៧ សូចនាកររង',
    color: 'blue',
    accentBg: 'bg-blue-50 text-blue-800 border-blue-200',
    borderColor: 'border-blue-500',
    badgeBg: 'bg-blue-100 text-blue-800',
    iconName: 'Building2'
  },
  {
    id: 5,
    title: 'ស្តង់ដាទី៥៖ គណនេយ្យភាពរបស់សាលារៀន',
    shortTitle: 'ស្តង់ដាទី៥៖ គណនេយ្យភាព',
    indicatorsSummary: '៣ សូចនាករគន្លឹះ និង ៦ សូចនាកររង',
    color: 'rose',
    accentBg: 'bg-rose-50 text-rose-800 border-rose-200',
    borderColor: 'border-rose-500',
    badgeBg: 'bg-rose-100 text-rose-800',
    iconName: 'ShieldCheck'
  }
];

export interface SchoolProfile {
  schoolName: string;
  schoolCode: string;
  cluster: string;
  district: string;
  province: string;
  yearNMinus1: number;
  yearN: number;
  yearN1: number;
  yearN2: number;
  yearN3: number;
  principalName: string;
  committeeChair: string;
  preparedBy: string;
  approvalDate: string;
  conclusionNotes: string;
}

export const DEFAULT_SCHOOL_PROFILE: SchoolProfile = {
  schoolName: 'សាលាបឋមសិក្សា រោគ',
  schoolCode: 'SCH-010502',
  cluster: 'កម្រងស្ពានមេត្រី',
  district: 'ស្រុកភ្នំស្រុក',
  province: 'ខេត្តបន្ទាយមានជ័យ',
  yearNMinus1: 2024,
  yearN: 2025,
  yearN1: 2026,
  yearN2: 2027,
  yearN3: 2028,
  principalName: 'លោកស្រី សុខ សារើន',
  committeeChair: 'ប្រធានគណៈកម្មការគ្រប់គ្រងសាលា ភូមិរោគ',
  preparedBy: 'លោក/លោកស្រី ទទួលបន្ទុកផែនការថវិកា',
  approvalDate: 'ថ្ងៃទី ១០ ខែសីហា ឆ្នាំ២០២៥',
  conclusionNotes: `ផ្អែកលើការរៀបចំផែនការយុទ្ធសាស្ត្រថវិការយៈពេល ៣ ឆ្នាំ (BSP 2026-2028) និងស្ថានភាពជាក់ស្តែងរបស់សាលាបឋមសិក្សា រោគ (ស្រុកភ្នំស្រុក ខេត្តបន្ទាយមានជ័យ) សាលារៀនបានកំណត់អាទិភាពគន្លឹះដូចខាងក្រោម៖

១. ស្តង់ដាទី១៖ បង្កើនការចុះឈ្មោះកុមារគ្រប់អាយុ (៣-៥ឆ្នាំ និង ៦ឆ្នាំ/៧០ខែ) ឱ្យចូលរៀនបាន ១០០% តាមរយៈការសហការជាមួយអាជ្ញាធរភូមិ-ឃុំ បន្ទាប់ពីការជំរឿនដោយក្រុមគ្រូទាំង ៨ក្រុម។ រក្សាអត្រាឡើងថ្នាក់ ៩៨-១០០% និងកាត់បន្ថយការបោះបង់ឱ្យនៅ ០%។
២. ស្តង់ដាទី២៖ ពង្រឹងសមត្ថភាពអំណាន និងគណិតវិទ្យាថ្នាក់ដំបូង (ថ្នាក់ទី១-ទី៣) ដោយជម្រុញមាតាបិតាចូលរួមទិញសៀវភៅជំនួយ និងរៀបចំការបង្រៀនបំប៉នសិស្សរៀនយឺត។ បំពាក់សម្ភារទំនើបក្នុងបណ្ណាល័យ (អគារ ១ខ្នង ២បន្ទប់)។
៣. ស្តង់ដាទី៣៖ ពង្រឹងភាពជាដៃគូសហគមន៍ អង្គការទស្សនៈពិភពលោក (World Vision) និងអង្គការកុមារកម្ពុជារីករាយ ក្នុងការកសាងអគារពហុបំណង ១ខ្នង ៣បន្ទប់ និងកម្មវិធីអាហារពេលព្រឹក។
៤. ស្តង់ដាទី៤៖ បញ្ចប់ការសាងសង់ និងជួសជុលអគារសិក្សាទាំងអស់ (រួមមាន អគារសម្ដេច ៦បន្ទប់, អគារ World Vision ២បន្ទប់, អគារបណ្ណាល័យ) និងស្នើសុំគម្រោងរបង ៤០ម៉ែត្រ បរិស្ថានទីធ្លា និងប្រព័ន្ធទឹកស្អាតចូលក្នុងផែនការវិនិយោគឃុំ (CIP)។
៥. ស្តង់ដាទី៥៖ ពន្យល់បំភ្លឺយ៉ាងច្បាស់លាស់ជូនភាគីពាក់ព័ន្ធអំពីយន្តការថវិកាដែលប្រែប្រួលតាមចំនួនក្បាលសិស្ស និងរក្សាតម្លាភាពហិរញ្ញវត្ថុ ១០០%។`
};

export const INITIAL_TABLE1_DATA: IndicatorRow[] = [
  {
    "id": "t1_3",
    "rowIdx": 3,
    "standardId": 0,
    "category": "GRAND_TOTAL",
    "code": "សរុប",
    "title": "សរុប",
    "budgetYearN1": "14,052,700",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "13,953,100",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_4",
    "rowIdx": 4,
    "standardId": 1,
    "category": "STANDARD_HEADER",
    "code": "ស្តង់ដាទី១៖ លទ្ធផលសិក្សារបស់សិស្ស(៥សូចនាករគន្លឹះ និង ១១សូចនាកររង)",
    "title": "ស្តង់ដាទី១៖ លទ្ធផលសិក្សារបស់សិស្ស(៥សូចនាករគន្លឹះ និង ១១សូចនាកររង)",
    "budgetYearN1": "2,702,700",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "2,720,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_5",
    "rowIdx": 5,
    "standardId": 1,
    "category": "KEY_INDICATOR",
    "code": "១",
    "title": "ការប្រមូលកុមារចូលរៀន",
    "budgetYearN1": "400,000",
    "targetNMinus1": "99%",
    "targetN": "100%",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "1.00",
    "targetNPlus3": "100%"
  },
  {
    "id": "t1_6",
    "rowIdx": 6,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "១.១",
    "title": "ភាគរយកុមារថ្នាក់ទី១ ចូលរៀនត្រឹមត្រូវតាមអាយុ",
    "budgetYearN1": "400,000",
    "targetNMinus1": "99",
    "targetN": "100",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "&bull; រៀបចំ ការចុះបញ្ជីសិស្សថ្មី &bull; ផ្សព្វផ្សាយអំពី អត្ថប្រយោជន៍នៃការចូលរៀន តាមសហគមន៍ &bull; សហការជាមួយ មាតាបិតា និងអាជ្ញាធរ ដើម្បីធានាថាកុមារទាំងអស់ចូលរៀនតាមអាយុ",
    "targetNPlus2": "100.00",
    "targetNPlus3": "100"
  },
  {
    "id": "t1_7",
    "rowIdx": 7,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "១.១",
    "title": "- ស្រី",
    "budgetYearN1": "",
    "targetNMinus1": "98",
    "targetN": "100",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "100.00",
    "targetNPlus3": "100"
  },
  {
    "id": "t1_8",
    "rowIdx": 8,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "១.១",
    "title": "- ប្រុស",
    "budgetYearN1": "",
    "targetNMinus1": "100",
    "targetN": "100",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "100.00",
    "targetNPlus3": "100"
  },
  {
    "id": "t1_9",
    "rowIdx": 9,
    "standardId": 1,
    "category": "KEY_INDICATOR",
    "code": "២",
    "title": "កុមាររៀនបានគង់វង្សក្នុងសាលារៀន",
    "budgetYearN1": "702,700",
    "targetNMinus1": "4",
    "targetN": "2.5",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "1.50",
    "targetNPlus3": "0.5"
  },
  {
    "id": "t1_10",
    "rowIdx": 10,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "២.១",
    "title": "អត្រាបោះបង់ការសិក្សាបានថយចុះ",
    "budgetYearN1": "300,000",
    "targetNMinus1": "5",
    "targetN": "3",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "&bull; ធ្វើ សម្ភាសន៍សិស្ស និងមាតាបិតា ដើម្បីរកមូលហេតុបោះបង់ &bull; ផ្តល់ជំនួយ សម្ភារៈសិក្សា ឬអាហារូបករណ៍ &bull; បង្កើត ក្រុមគាំទ្រសិស្សក្នុងសាលា ដើម្បីជួយពង្រឹងចិត្តស្មោះត្រង់ក្នុងការរៀន",
    "targetNPlus2": "2.00",
    "targetNPlus3": "1"
  },
  {
    "id": "t1_11",
    "rowIdx": 11,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "២.១",
    "title": "- ស្រី",
    "budgetYearN1": "",
    "targetNMinus1": "4",
    "targetN": "2",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "2.00",
    "targetNPlus3": "1"
  },
  {
    "id": "t1_12",
    "rowIdx": 12,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "២.១",
    "title": "- ប្រុស",
    "budgetYearN1": "",
    "targetNMinus1": "6",
    "targetN": "4",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "2.00",
    "targetNPlus3": "1"
  },
  {
    "id": "t1_13",
    "rowIdx": 13,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "២.២",
    "title": "អត្រាត្រួតថ្នាក់បានថយចុះ",
    "budgetYearN1": "402,700",
    "targetNMinus1": "3",
    "targetN": "2",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "&bull; រៀបចំ ថ្នាក់បង្រៀនបន្ថែម (Remedial Class) សម្រាប់សិស្សដែលមានលទ្ធផលទាប &bull; តាមដាន លទ្ធផលសិក្សា និងពិន្ទុ ជាប្រចាំ &bull; ប្រើ វិធីសាស្រ្តបង្រៀនចម្រុះ ដើម្បីឲ្យសិស្សយល់បានងាយ",
    "targetNPlus2": "1.00",
    "targetNPlus3": "0"
  },
  {
    "id": "t1_14",
    "rowIdx": 14,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "២.២",
    "title": "- ស្រី",
    "budgetYearN1": "",
    "targetNMinus1": "2",
    "targetN": "1",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "1.00",
    "targetNPlus3": "0"
  },
  {
    "id": "t1_15",
    "rowIdx": 15,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "២.២",
    "title": "- ប្រុស",
    "budgetYearN1": "",
    "targetNMinus1": "4",
    "targetN": "3",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "1.00",
    "targetNPlus3": "0"
  },
  {
    "id": "t1_16",
    "rowIdx": 16,
    "standardId": 1,
    "category": "KEY_INDICATOR",
    "code": "៣",
    "title": "លទ្ធផលនៃការសិក្សារបស់សិស្ស",
    "budgetYearN1": "1,200,000",
    "targetNMinus1": "46.63",
    "targetN": "50.63",
    "targetNPlus1": "1,420,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "54.38",
    "targetNPlus3": "58.00"
  },
  {
    "id": "t1_17",
    "rowIdx": 17,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "៣.១",
    "title": "ភាគរយសិស្សមាននិទ្ទេស A B និង C មុខវិជ្ជាភាសាខ្មែរ",
    "budgetYearN1": "300,000",
    "targetNMinus1": "46",
    "targetN": "50",
    "targetNPlus1": "450,000",
    "reasonChangeNPlus1": "គណៈគ្រប់គ្រងសាលារៀនដឹកនាំលោកគ្រូ-អ្នកគ្រូរៀបចំសំណួរតេស្ត ទៅតាម មុខវិជ្ជានិងតាមកម្រិតថ្នាក់។",
    "targetNPlus2": "53.50",
    "targetNPlus3": "57.5"
  },
  {
    "id": "t1_18",
    "rowIdx": 18,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៣.១",
    "title": "- ស្រី",
    "budgetYearN1": "",
    "targetNMinus1": "50",
    "targetN": "55",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "58.00",
    "targetNPlus3": "60"
  },
  {
    "id": "t1_19",
    "rowIdx": 19,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៣.១",
    "title": "- ប្រុស",
    "budgetYearN1": "",
    "targetNMinus1": "42",
    "targetN": "45",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "49.00",
    "targetNPlus3": "55"
  },
  {
    "id": "t1_20",
    "rowIdx": 20,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "៣.២",
    "title": "ភាគរយសិស្សមាននិទ្ទេស A B និង C មុខវិជ្ជាគណិតវិទ្យា",
    "budgetYearN1": "300,000",
    "targetNMinus1": "46",
    "targetN": "50",
    "targetNPlus1": "450,000",
    "reasonChangeNPlus1": "&bull; រៀបចំដំណើរការធ្វើតេស្តនិងកែកិច្ចការមុខវិជ្ជាភាសាខ្មែរ ឱ្យមានលក្ខណៈស្តង់ដា",
    "targetNPlus2": "53.00",
    "targetNPlus3": "56.5"
  },
  {
    "id": "t1_21",
    "rowIdx": 21,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៣.២",
    "title": "- ស្រី",
    "budgetYearN1": "",
    "targetNMinus1": "50",
    "targetN": "55",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "56.00",
    "targetNPlus3": "57"
  },
  {
    "id": "t1_22",
    "rowIdx": 22,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៣.២",
    "title": "- ប្រុស",
    "budgetYearN1": "",
    "targetNMinus1": "42",
    "targetN": "45",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "50.00",
    "targetNPlus3": "56"
  },
  {
    "id": "t1_23",
    "rowIdx": 23,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "៣.៣",
    "title": "ភាគរយសិស្សថ្នាក់ទី៣ មានសមត្ថភាពអានតាមស្តង់ដា (៤៥ ទៅ ៦០ពាក្យក្នុង១នាទី)",
    "budgetYearN1": "300,000",
    "targetNMinus1": "43",
    "targetN": "47.5",
    "targetNPlus1": "270,000",
    "reasonChangeNPlus1": "&bull; យកលទ្ធផលតេស្តមុខវិជ្ជាភាសាខ្មែរទៅកែលម្អការបង្រៀន និងរៀន",
    "targetNPlus2": "52.50",
    "targetNPlus3": "55.5"
  },
  {
    "id": "t1_24",
    "rowIdx": 24,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៣.៣",
    "title": "- ស្រី",
    "budgetYearN1": "",
    "targetNMinus1": "46",
    "targetN": "50",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "55.00",
    "targetNPlus3": "56"
  },
  {
    "id": "t1_25",
    "rowIdx": 25,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៣.៣",
    "title": "- ប្រុស",
    "budgetYearN1": "",
    "targetNMinus1": "40",
    "targetN": "45",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "50.00",
    "targetNPlus3": "55"
  },
  {
    "id": "t1_26",
    "rowIdx": 26,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "៣.៤",
    "title": "ភាគរយសិស្សថ្នាក់ទី៦ មានសមត្ថភាពអានតាមស្តង់ដា (១០០ ទៅ ១២០ពាក្យក្នុង១នាទី)",
    "budgetYearN1": "300,000",
    "targetNMinus1": "51.5",
    "targetN": "55",
    "targetNPlus1": "250,000",
    "reasonChangeNPlus1": "គណៈគ្រប់គ្រងសាលារៀនដឹកនាំលោកគ្រូ-អ្នកគ្រូរៀបចំតារាងលម្អិតដែលបង្ហាញអំពីលទ្ធសិក្សាស្តង់ដានៃកម្មវិធីសិក្សាដែលត្រូវដាក់បញ្ចូលក្នុងវិញ្ញាសា ប្រឡង ។",
    "targetNPlus2": "58.50",
    "targetNPlus3": "62.5"
  },
  {
    "id": "t1_27",
    "rowIdx": 27,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៣.៤",
    "title": "- ស្រី",
    "budgetYearN1": "",
    "targetNMinus1": "58",
    "targetN": "60",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "61.00",
    "targetNPlus3": "65"
  },
  {
    "id": "t1_28",
    "rowIdx": 28,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៣.៤",
    "title": "- ប្រុស",
    "budgetYearN1": "",
    "targetNMinus1": "45",
    "targetN": "50",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "56.00",
    "targetNPlus3": "60"
  },
  {
    "id": "t1_29",
    "rowIdx": 29,
    "standardId": 1,
    "category": "KEY_INDICATOR",
    "code": "៤",
    "title": "ស្ថានភាពអាហារូបត្ថម្ភ",
    "budgetYearN1": "400,000",
    "targetNMinus1": "118",
    "targetN": "126",
    "targetNPlus1": "300,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "129.00",
    "targetNPlus3": "131"
  },
  {
    "id": "t1_30",
    "rowIdx": 30,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "៤.១",
    "title": "ភាគរយសិស្សមានស្ថានភាពអាហារូបត្ថម្ភធម្មតា",
    "budgetYearN1": "200,000",
    "targetNMinus1": "65",
    "targetN": "69",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "&middot;រៀបចំបញ្ជីកត់ត្រាអំពីស្ថានភាពអាហារូបត្ថម្ភរបស់សិស្ស តាមប័ណ្ណ សុខភាពកុមារី និងកុមារា (ថ្លឹងទម្ងន់ វាស់កម្ពស់) សាលារៀនកត់ត្រាស្ថាភាពអាហារូបត្ថម្ភរបស់កុមារម្នាក់ (អាយុ ទម្ងន់ កម្ពស់) អាយុធៀបកម្ពស់ អាយុធៀបទម្ងន់ ទម្ងន់ធៀបកម្ពស់",
    "targetNPlus2": "70.00",
    "targetNPlus3": "72"
  },
  {
    "id": "t1_31",
    "rowIdx": 31,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៤.១",
    "title": "- ស្រី",
    "budgetYearN1": "",
    "targetNMinus1": "60",
    "targetN": "64",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "65.00",
    "targetNPlus3": "68"
  },
  {
    "id": "t1_32",
    "rowIdx": 32,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៤.១",
    "title": "- ប្រុស",
    "budgetYearN1": "",
    "targetNMinus1": "70",
    "targetN": "74",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "75.00",
    "targetNPlus3": "76"
  },
  {
    "id": "t1_33",
    "rowIdx": 33,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "៤.២",
    "title": "ភាគរយសិស្សដែលមានបញ្ហាអាហារូបត្ថម្ភ ទទួលបានកិច្ចអន្តរាគមន៍",
    "budgetYearN1": "200,000",
    "targetNMinus1": "52.5",
    "targetN": "56.5",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "&middot; រក្សទុកដាក់ជាឯកសារភស្តុតាងឱ្យបានត្រឹមត្រូវប្រចាំ សាលាតាមកម្រិតអាយុសិស្ស ដើម្បីបង្ហាញដល់មាតាបិតាអ្នកអាណាព្យាបាល សាលារៀនត្រូវរៀបចំរបាយការណ៍ស្តីពីស្ថានភាពអាហារូបត្ថម្ភរបស់សិស្ស",
    "targetNPlus2": "59.00",
    "targetNPlus3": "59"
  },
  {
    "id": "t1_34",
    "rowIdx": 34,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៤.២",
    "title": "- ស្រី",
    "budgetYearN1": "",
    "targetNMinus1": "50",
    "targetN": "55",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "58.00",
    "targetNPlus3": "58"
  },
  {
    "id": "t1_35",
    "rowIdx": 35,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៤.២",
    "title": "- ប្រុស",
    "budgetYearN1": "",
    "targetNMinus1": "55",
    "targetN": "58",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "60.00",
    "targetNPlus3": "60"
  },
  {
    "id": "t1_36",
    "rowIdx": 36,
    "standardId": 1,
    "category": "KEY_INDICATOR",
    "code": "៥",
    "title": "សីលធម៌ និងឥរិយាបថរបស់សិស្ស",
    "budgetYearN1": "500,000",
    "targetNMinus1": "89%",
    "targetN": "91%",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "0.90",
    "targetNPlus3": "92%"
  },
  {
    "id": "t1_37",
    "rowIdx": 37,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "៥.១",
    "title": "ភាគរយកុមារទទួលបានការប្រឹក្សាយោបល់",
    "budgetYearN1": "200,000",
    "targetNMinus1": "92.5",
    "targetN": "97",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- របាយការណ៍អំពីចំនួនកុមារដែលរងហិង្សា ឬ មានវិបត្តិផ្លូវចិត្ត បានទទួលប្រឹក្សាយោបល់",
    "targetNPlus2": "95.50",
    "targetNPlus3": "99"
  },
  {
    "id": "t1_38",
    "rowIdx": 38,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៥.១",
    "title": "- ស្រី",
    "budgetYearN1": "",
    "targetNMinus1": "95",
    "targetN": "98",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "96.00",
    "targetNPlus3": "100"
  },
  {
    "id": "t1_39",
    "rowIdx": 39,
    "standardId": 1,
    "category": "DISAGGREGATION",
    "code": "៥.១",
    "title": "- ប្រុស",
    "budgetYearN1": "",
    "targetNMinus1": "90",
    "targetN": "96",
    "targetNPlus1": "",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "95.00",
    "targetNPlus3": "98"
  },
  {
    "id": "t1_40",
    "rowIdx": 40,
    "standardId": 1,
    "category": "SUB_INDICATOR",
    "code": "៥.២",
    "title": "ភាគរយថ្នាក់រៀនដាក់ពិន្ទុ បំណិនសម្បទា និងចរិយាសម្បទាដល់សិស្សប្រចាំឆ្នាំ",
    "budgetYearN1": "300,000",
    "targetNMinus1": "85",
    "targetN": "85",
    "targetNPlus1": "300,000",
    "reasonChangeNPlus1": "របាយការណ៍អំពីចំនួនថ្នាក់រៀនដែលបានដាក់ពិន្ទុបំណិនសម្បទា និងចរិយាសម្បទា ដល់សិស្សប្រចាំឆ្នាំ ធៀបជាមួយចំនួនថ្នាក់រៀនសរុប",
    "targetNPlus2": "85.00",
    "targetNPlus3": "85"
  },
  {
    "id": "t1_41",
    "rowIdx": 41,
    "standardId": 2,
    "category": "STANDARD_HEADER",
    "code": "ស្តង់ដាទី២៖ ការបង្រៀន និងរៀន (១០សូចនាករគន្លឹះ និង ៣០សូចនាកររង)",
    "title": "ស្តង់ដាទី២៖ ការបង្រៀន និងរៀន (១០សូចនាករគន្លឹះ និង ៣០សូចនាកររង)",
    "budgetYearN1": "6,150,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "5,983,100",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_42",
    "rowIdx": 42,
    "standardId": 2,
    "category": "KEY_INDICATOR",
    "code": "១",
    "title": "ការអនុវត្តវិធីសាស្ត្របង្រៀន",
    "budgetYearN1": "1,600,000",
    "targetNMinus1": "52.8",
    "targetN": "57",
    "targetNPlus1": "1,400,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "57.67",
    "targetNPlus3": "64.5"
  },
  {
    "id": "t1_43",
    "rowIdx": 43,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "១.១",
    "title": "ភាគរយគ្រូបង្រៀនថ្នាក់ទី១ និង/ឬ ទី២ និង/ឬ ទី៣ អនុវត្តកញ្ចប់សម្ភារៈអំណាន ថ្នាក់ដំបូងកម្រិត២ និងកម្រិត៣",
    "budgetYearN1": "350,000",
    "targetNMinus1": "60",
    "targetN": "65",
    "targetNPlus1": "300,000",
    "reasonChangeNPlus1": "&bull; អនុវត្តវិធីសាស្ត្របង្រៀនថ្មីៗដូចជាការអនុវត្តលំនាំបង្រៀននៃកញ្ចប់សម្ភារៈអំណាន &bull;របាយការណ៍សង្កេតការការបង្រៀនថ្នាក់ទី១-២-ស្តីពីកញ្ចប់សម្ភារៈអំណានដំបូង",
    "targetNPlus2": "67.00",
    "targetNPlus3": "70"
  },
  {
    "id": "t1_44",
    "rowIdx": 44,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "១.២",
    "title": "ភាគរយគ្រូបង្រៀនថ្នាក់ទី១ និង/ឬ ទី២ និង/ឬ ទី៣ អនុវត្តកញ្ចប់សម្ភារៈគណិតវិទ្យា ថ្នាក់ដំបូងកម្រិត២ និងកម្រិត៣",
    "budgetYearN1": "350,000",
    "targetNMinus1": "60",
    "targetN": "65",
    "targetNPlus1": "300,000",
    "reasonChangeNPlus1": "&bull; អនុវត្តវិធីសាស្ត្របង្រៀនថ្មីៗដូចជាការអនុវត្តលំនាំបង្រៀននៃកញ្ចប់សម្ភារគណិតវិទ្យា &bull;របាយការណ៍សង្កេតការការបង្រៀនថ្នាក់ទី១-២-ស្តីពីកញ្ចប់សម្ភារៈអំណានដំបូង",
    "targetNPlus2": "67.00",
    "targetNPlus3": "70"
  },
  {
    "id": "t1_45",
    "rowIdx": 45,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "១.៣",
    "title": "ភាគរយគ្រូបង្រៀនចូលរៀនវគ្គអភិវឌ្ឍសមត្ថភាពប្រចាំឆ្នាំ (កញ្ចប់សម្ភារៈអំណាននិងគណិតវិទ្យាថ្នាក់ដំបូង ការប្រឹក្សាគរុកោសល្យ វិធីសាស្ត្របង្រៀននានា ការអប់រំវិន័យបែបវិជ្ជមាន វិធីសាស្ត្រអំណានក្នុងបណ្ណាល័យ...)",
    "budgetYearN1": "300,000",
    "targetNMinus1": "70",
    "targetN": "75",
    "targetNPlus1": "300,000",
    "reasonChangeNPlus1": "សាលារៀនរៀបចំផែនការអភិវឌ្ឍសមត្ថភាព និងផ្តល់ការលើកទឹកចិត្ត ឱ្យគ្រូបង្រៀន និងបុគ្គលិកអប់រំចូលរួមវគ្គបំប៉នសមត្ថភាពនានា តាមតម្រូវការរបស់អង្គភាព ។",
    "targetNPlus2": "78.00",
    "targetNPlus3": "80"
  },
  {
    "id": "t1_46",
    "rowIdx": 46,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "១.៤",
    "title": "ចំនួនកិច្ចការជាគម្រោងដែលគ្រូថ្នាក់ទី៤-៦ បានដាក់ឱ្យសិស្សអនុវត្ត ក្នុង១ឆ្នាំ (គិតជាមធ្យម ក្នុងថ្នាក់/សាលា)",
    "budgetYearN1": "200,000",
    "targetNMinus1": "4",
    "targetN": "5",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "&bull; គ្រូថ្នាក់ទី៤-៦ធ្វើផែនការបែបគម្រោងការរៀនសម្របតាមសមត្ថភាពសិស្សម្នាក់ៗ (Adaptive learningsystein)ដោយឈរលើគោលវិធីសិស្ស មជ្ឈមណ្ឌល របាយការណ៍សង្កេតការការបង្រៀនថ្នាក់ទី១-២-ស្តីពីកញ្ចប់សម្ភារៈអំណានដំបូង",
    "targetNPlus2": "6.00",
    "targetNPlus3": "7"
  },
  {
    "id": "t1_47",
    "rowIdx": 47,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "១.៥",
    "title": "ភាគរយសិស្សបានធ្វើកិច្ចការតាមផ្ទះ មេរៀនភាសាខ្មែរ គណិត និងមានការកែពីគ្រូ",
    "budgetYearN1": "200,000",
    "targetNMinus1": "70",
    "targetN": "75",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "&bull;របាយការណ៍របស់គ្រូបង្រៀនស្ដីពីផែនការ និងលទ្ធផលនៃកាផ្ដល់សន្លឹកកិច្ចការ និងដាក់លំហាត់ឲ្យសិស្សធ្វើនៅផ្ទះ",
    "targetNPlus2": "78.00",
    "targetNPlus3": "80"
  },
  {
    "id": "t1_48",
    "rowIdx": 48,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "១.៦",
    "title": "ភាគរយសិស្សអនុវត្តសៀវភៅផ្តល់ព័ត៌មានត្រឡប់ គិតជាមធ្យមក្នុងមួយខែ",
    "budgetYearN1": "200,000",
    "targetNMinus1": "30",
    "targetN": "40",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- ជម្រុញការអនុវត្តសៀវភៅផ្ដល់ព័ត៌មានត្រឡប់របស់គ្រប់ថ្នាក់ និងកត់ត្រាខ្លឹមសារ។",
    "targetNPlus2": "50.00",
    "targetNPlus3": "80"
  },
  {
    "id": "t1_49",
    "rowIdx": 49,
    "standardId": 2,
    "category": "KEY_INDICATOR",
    "code": "២",
    "title": "ការអនុវត្តកម្មវិធីសិក្សានិងការរៀបចំផែនការបង្រៀន",
    "budgetYearN1": "750,000",
    "targetNMinus1": "52.00",
    "targetN": "54.29",
    "targetNPlus1": "783,100",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "56.14",
    "targetNPlus3": "57.57"
  },
  {
    "id": "t1_50",
    "rowIdx": 50,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "២.១",
    "title": "ភាគរយថ្នាក់រៀនដែលមានបំណែងចែកកម្មវិធីសិក្សា គ្រប់មុខវិជ្ជាសិក្សាគោល",
    "budgetYearN1": "150,000",
    "targetNMinus1": "99",
    "targetN": "100",
    "targetNPlus1": "150,000",
    "reasonChangeNPlus1": "គ្រូបង្រៀនរៀបចំបំណែងចែកកម្មវិធីសិក្សាប្រចាំឆ្នាំ ប្រចាំខែ ប្រចាំសប្តាហ៍ តាមមុខវិជ្ជាសិក្សាគោល (ភាសាខ្មែរ គណិតវិទ្យា សិក្សាសង្គមវិទ្យាសាស្រ្ត ។ដាក់តាំងបង្ហាញកម្មវិធីគ្រប់មុខវិជ្ជា និង គ្រប់កម្រិតថ្នាក់លើតារាងកម្មវិធីសិក្សាប្រចាំឆ្នាំ ឬរក្សាទុកនៅទីចាត់ការ ។",
    "targetNPlus2": "100.00",
    "targetNPlus3": "100"
  },
  {
    "id": "t1_51",
    "rowIdx": 51,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "២.២",
    "title": "ភាគរយគ្រូដែលបានរៀបចំកិច្ចតែងការបង្រៀនថ្មី ឬបានធ្វើបច្ចុប្បន្នកម្ម គ្រប់មេរៀន និងគ្រប់មុខវិជ្ជា",
    "budgetYearN1": "200,000",
    "targetNMinus1": "85",
    "targetN": "90",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "គ្រូបង្រៀនធ្វើស្វ័យវាយតម្លៃលើការអនុវត្តកិច្ចតែងការបង្រៀន និងធ្វើបច្ចុប្បន្នកម្មកិច្ចតែងការបង្រៀនជាប្រចាំ ។",
    "targetNPlus2": "95.00",
    "targetNPlus3": "100"
  },
  {
    "id": "t1_52",
    "rowIdx": 52,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "២.៣",
    "title": "ចំនួនដងថ្នាក់រៀនបិទទ្វារ (សរុបថ្នាក់ទាំងអស់គិតជាមធ្យម)",
    "budgetYearN1": "50,000",
    "targetNMinus1": "0",
    "targetN": "0",
    "targetNPlus1": "53,100",
    "reasonChangeNPlus1": "គណៈគ្រប់គ្រងសាលារៀន រៀបចំរបាយការណ៍បូកសរុបវត្តមាន និងវត្តមានបុគ្គលិកអប់រំជាពិសេសគ្រូបន្ទុកថ្នាក់ ជាពិសេសគ្រូបន្ទុកថ្នាក់ បញ្ជីគ្រប់គ្រងវត្តមានរបស់សាលារៀន ។",
    "targetNPlus2": "0.00",
    "targetNPlus3": "0"
  },
  {
    "id": "t1_53",
    "rowIdx": 53,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "២.៤",
    "title": "ចំនួនថ្ងៃសាលាបិទទ្វារមិនស្របតាមប្រតិទិនសិក្សាប្រចាំឆ្នាំ",
    "budgetYearN1": "50,000",
    "targetNMinus1": "0",
    "targetN": "0",
    "targetNPlus1": "80,000",
    "reasonChangeNPlus1": "ពង្រឹងអភិបាលកិច្ចសាលារៀន ត្រួតពិនិត្យវត្តមានគ្រូនិងសិស្សឱ្យបានតឹងរ៉ឹង និងទប់ស្កាត់ការបិទទ្វារសាលាខុសពីច្បាប់។",
    "targetNPlus2": "0.00",
    "targetNPlus3": "0"
  },
  {
    "id": "t1_54",
    "rowIdx": 54,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "២.៥",
    "title": "ភាគរយថ្នាក់ទី ៤-៦ បានបង្រៀនភាសាបរទេស",
    "budgetYearN1": "100,000",
    "targetNMinus1": "80",
    "targetN": "90",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "បានដាក់កម្មវិធីសិក្សា ភាសាបរទេស ថ្នាក់ទី៤ ដល់ទី៦ បង្រៀនតាមការណែនាំ",
    "targetNPlus2": "95.00",
    "targetNPlus3": "99"
  },
  {
    "id": "t1_55",
    "rowIdx": 55,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "២.៦",
    "title": "ភាគរយថ្នាក់ទី ៤-៦ បានបង្រៀនមេរៀន បំណិនជីវិតមូលដ្ឋាន",
    "budgetYearN1": "100,000",
    "targetNMinus1": "80",
    "targetN": "90",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "បានដាក់មេរៀន បំណិនមូដ្ឋាន ថ្នាក់ទី៤ ដល់ទី៦ បង្រៀនតាមការណែនាំ",
    "targetNPlus2": "95.00",
    "targetNPlus3": "99"
  },
  {
    "id": "t1_56",
    "rowIdx": 56,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "២.៧",
    "title": "ភាគរយសិស្សអវត្តមាន លើសពី៤ដង ក្នុង១ឆ្នាំសិក្សា",
    "budgetYearN1": "100,000",
    "targetNMinus1": "20",
    "targetN": "10",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "អនុវត្តលិខិតលេខ ៥៤ ស្រង់វត្តមានសិស្សកត់ដាក់ក្មុងបញ្ជីរដ្ឋបាលគ្រូជាប្រចាំ ធ្វើបទបញ្ជាផ្ទៃក្នុង និងគោលការណ៍ថ្នាក់រៀន",
    "targetNPlus2": "8.00",
    "targetNPlus3": "5"
  },
  {
    "id": "t1_57",
    "rowIdx": 57,
    "standardId": 2,
    "category": "KEY_INDICATOR",
    "code": "៣",
    "title": "សម្ភារៈរៀននិងបង្រៀន",
    "budgetYearN1": "1,700,000",
    "targetNMinus1": "62.5",
    "targetN": "75",
    "targetNPlus1": "1,700,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "78.75",
    "targetNPlus3": "82"
  },
  {
    "id": "t1_58",
    "rowIdx": 58,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៣.១",
    "title": "ភាគរយសិស្សមានសៀវភៅសិក្សាគោលតាមនិយាម",
    "budgetYearN1": "200,000",
    "targetNMinus1": "90",
    "targetN": "100",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "សាលារៀនរៀបចំបញ្ជីគ្រប់គ្រងសៀវភៅសិក្សាគោលតាមមុខវិជ្ជា និងតាមកម្រិត",
    "targetNPlus2": "100.00",
    "targetNPlus3": "100"
  },
  {
    "id": "t1_59",
    "rowIdx": 59,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៣.២",
    "title": "ភាគរយសិស្សថ្នាក់ទី១ និង/ឬ ទី២ និង/ឬ ទី៣ មានកញ្ចប់សម្ភារៈអំណាន និងគណិតវិទ្យា ថ្នាក់ដំបូង ដែលមាតាបិតាទិញឱ្យ",
    "budgetYearN1": "100,000",
    "targetNMinus1": "50",
    "targetN": "60",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "គណៈគ្រប់គ្រងសាលា និងគ្រូបង្រៀនគ្រប់កម្រិតថ្នាក់ណែនាំមាតា បិតា អ្នកអាណាព្យាបាលចូលតួមទិញសៀវភៅជំនួយភាសាខ្មែរ និងគណិតវិទ្យា សៀវភៅហ្វឹកហាត់អាន សរសេរ និងគណិតវិទ្យាសម្រាប់ថ្នាក់ទី១ ទី២ និងទី៣",
    "targetNPlus2": "65.00",
    "targetNPlus3": "70"
  },
  {
    "id": "t1_60",
    "rowIdx": 60,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៣.៣",
    "title": "ភាគរយគ្រូបង្រៀនផលិត និងប្រើប្រាស់សម្ភារៈឧបទេសជាប្រចាំ",
    "budgetYearN1": "1,000,000",
    "targetNMinus1": "70",
    "targetN": "80",
    "targetNPlus1": "1,000,000",
    "reasonChangeNPlus1": "- មានសម្ភារប្រើប្រាស់គ្រប់គ្រាន់ក្មុងឃ្លាំង - គ្រូបង្រៀនបានផលិតបន្ថែម - គ្រូបង្រៀនបានប្រើប្រាស់សម្ភារដែលបានផលិតសម្រាប់ដំណើរការបង្រៀន",
    "targetNPlus2": "85.00",
    "targetNPlus3": "89"
  },
  {
    "id": "t1_61",
    "rowIdx": 61,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៣.៤",
    "title": "ភាគរយគ្រូបង្រៀនប្រើប្រាស់បច្ចេកវិទ្យាបម្រើឱ្យការរៀន និងបង្រៀន",
    "budgetYearN1": "400,000",
    "targetNMinus1": "40",
    "targetN": "60",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "គ្រូបង្រៀនបានទទួលការបណ្ដុះបណ្ដាលការប្រើប្រាស់បច្ចេកវិទ្យា",
    "targetNPlus2": "65.00",
    "targetNPlus3": "69"
  },
  {
    "id": "t1_62",
    "rowIdx": 62,
    "standardId": 2,
    "category": "KEY_INDICATOR",
    "code": "៤",
    "title": "ការជួយគាំទ្រសិស្ស",
    "budgetYearN1": "200,000",
    "targetNMinus1": "53.33",
    "targetN": "61.67",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "67.33",
    "targetNPlus3": "71.00"
  },
  {
    "id": "t1_63",
    "rowIdx": 63,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៤.១",
    "title": "ភាគរយសិស្ស និងមាតាបិតា បានចុះកិច្ចព្រមព្រៀង រៀនសូត្រប្រចាំឆ្នាំជាមួយគ្រូ",
    "budgetYearN1": "50,000",
    "targetNMinus1": "50",
    "targetN": "60",
    "targetNPlus1": "50,000",
    "reasonChangeNPlus1": "គ្រូបង្រៀនអញ្ជើញមាតាបិតា អ្នកអាណាព្យាបាលមកជួបប្រជុំពិភាក្សាអំពីលទ្ធតេស្តវិនិច្ឆ័យសមត្ថភាពសិស្សម្នាក់ៗ តាមរយៈការធ្វើតេស្តដំណាក់ជាប្រចាំ( ក្នុងម៉ោងសិក្សា តេស្តប្រចាំខែ ត្រីមាស ) ។",
    "targetNPlus2": "65.00",
    "targetNPlus3": "69"
  },
  {
    "id": "t1_64",
    "rowIdx": 64,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៤.២",
    "title": "ភាគរយថ្នាក់រៀនមានការប្រជុំជាមួយ មាតាបិតា ពិនិត្យតាមដានការរៀនសូត្រ ទៀងទាត់",
    "budgetYearN1": "100,000",
    "targetNMinus1": "50",
    "targetN": "60",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "គ្រូបង្រៀនបង្ហាញតារាងលទ្ធផលសិក្សាសិស្សប្រចាំខែ បន្ទាប់មកពិភាក្សាជាមួយមាតា បិតា អ្នកអាណាព្យាបាលអំពីការ បង្កើន និងកែលម្អលទ្ធផលសិក្សារបស់កូនៗឱ្យកាន់តែល្អប្រសើរឡើង ។",
    "targetNPlus2": "69.00",
    "targetNPlus3": "74"
  },
  {
    "id": "t1_65",
    "rowIdx": 65,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៤.៣",
    "title": "ភាគរយសិស្សរៀនយឺតបានទទួលការជួយប្រចាំខែ ផ្អែកតាមលទ្ធផល តេស្តស្តង់ដាប្រចាំខែ",
    "budgetYearN1": "50,000",
    "targetNMinus1": "60",
    "targetN": "65",
    "targetNPlus1": "50,000",
    "reasonChangeNPlus1": "គ្រូបង្រៀនរៀបចំផែនការជួយសិស្សរៀនយឺតស្របពេលថ្ងៃព្រហស្បតិ៍ ឬវេលាសមស្របដទៃទៀត ។ គ្រូបង្រៀនរៀបចំបញ្ជីឈ្មោះសិស្សរៀនយឺត និងរៀបចំតារាងរំលស់សិស្សរៀនយឺតប្រចាំខែ ។",
    "targetNPlus2": "68.00",
    "targetNPlus3": "70"
  },
  {
    "id": "t1_66",
    "rowIdx": 66,
    "standardId": 2,
    "category": "KEY_INDICATOR",
    "code": "៥",
    "title": "ដំណើរការបណ្ណាល័យ",
    "budgetYearN1": "600,000",
    "targetNMinus1": "35",
    "targetN": "42.5",
    "targetNPlus1": "600,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "45.50",
    "targetNPlus3": "47.5"
  },
  {
    "id": "t1_67",
    "rowIdx": 67,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៥.១",
    "title": "ចំនួនសៀវភៅដែលសិស្សម្នាក់ៗ ខ្ចី-សង ក្នុង១ឆ្នាំ",
    "budgetYearN1": "300,000",
    "targetNMinus1": "50",
    "targetN": "60",
    "targetNPlus1": "300,000",
    "reasonChangeNPlus1": "បណ្ណារក្សរៀបចំកាលវិភាគម៉ោងបណ្ណាល័យសម្រាប់ថ្នាក់នីមួយៗ ព្រមទាំងការកំណត់ពេលវេលាសម្រាប់សិស្សអាន ខ្ចី សងសៀវភៅ ។",
    "targetNPlus2": "65.00",
    "targetNPlus3": "68"
  },
  {
    "id": "t1_68",
    "rowIdx": 68,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៥.២",
    "title": "ចំនួនដង គ្រូបង្រៀនម្នាក់ៗក្នុង១ឆ្នាំ នាំសិស្សចូលបណ្ណាល័យអនុវត្តសកម្មភាពអាន ដោយប្រើប្រាស់វិធីសាស្ត្រអំណាន",
    "budgetYearN1": "300,000",
    "targetNMinus1": "20",
    "targetN": "25",
    "targetNPlus1": "300,000",
    "reasonChangeNPlus1": "បណ្ណារក្សរៀបចំផែនការបង្រៀនក្នុងបណ្ណាល័យដោយសហការជាមួយគ្រូបន្ទុកថ្នាក់",
    "targetNPlus2": "26.00",
    "targetNPlus3": "27"
  },
  {
    "id": "t1_69",
    "rowIdx": 69,
    "standardId": 2,
    "category": "KEY_INDICATOR",
    "code": "៦",
    "title": "ការធ្វើអធិការកិច្ចផ្ទៃក្នុង",
    "budgetYearN1": "100,000",
    "targetNMinus1": "50",
    "targetN": "55",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "60.00",
    "targetNPlus3": "70"
  },
  {
    "id": "t1_70",
    "rowIdx": 70,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៦.១",
    "title": "ភាគរយគ្រូបង្រៀនទទួលបានការផ្តល់ប្រឹក្សាគរុកោសល្យ/អធិការកិច្ចថ្នាក់រៀន យ៉ាងតិចម្តង/ខែ",
    "budgetYearN1": "100,000",
    "targetNMinus1": "50",
    "targetN": "55",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "ណែនាំឱ្យទីប្រឹក្សាគរុកោសល្យទាំងអស់ ចូលរួមការប្រជុំដឹកនាំដោយនាយកសាលារៀនដើម្បីរៀបចំផែនការចុះផ្តល់ប្រឹក្សាគរុកោសល្យ ប្រចាំខែ ឬប្រចាំត្រីមាស ឬប្រចាំឆមាស ឬប្រចាំឆ្នាំ និងចុះជួយគាំទ្រគ្រូបង្រៀនក្នុងសាលារៀន ។",
    "targetNPlus2": "60.00",
    "targetNPlus3": "70"
  },
  {
    "id": "t1_71",
    "rowIdx": 71,
    "standardId": 2,
    "category": "KEY_INDICATOR",
    "code": "៧",
    "title": "ការប្រជុំបច្ចេកទេស",
    "budgetYearN1": "200,000",
    "targetNMinus1": "7",
    "targetN": "7",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "7.00",
    "targetNPlus3": "7"
  },
  {
    "id": "t1_72",
    "rowIdx": 72,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៧.១",
    "title": "ចំនួនដងសាលារៀនបានរៀបចំការប្រជុំបច្ចេកទេស",
    "budgetYearN1": "200,000",
    "targetNMinus1": "7",
    "targetN": "7",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "គណៈគ្រប់គ្រងសាលារៀន ត្រូវរៀបចំរបាយការណ៍បូកសរុបស្តីពីចំនួនដងសាលារៀនរៀបចំប្រជុំបច្ចេកទេសប្រចាំខែ ប្រឆ្នាំ ។",
    "targetNPlus2": "7.00",
    "targetNPlus3": "7"
  },
  {
    "id": "t1_73",
    "rowIdx": 73,
    "standardId": 2,
    "category": "KEY_INDICATOR",
    "code": "៨",
    "title": "ការអនុវត្តកម្មវិធីសិក្សាក្រៅម៉ោងសិក្សា",
    "budgetYearN1": "800,000",
    "targetNMinus1": "1.33",
    "targetN": "1.33",
    "targetNPlus1": "800,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "1.67",
    "targetNPlus3": "2.00"
  },
  {
    "id": "t1_74",
    "rowIdx": 74,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៨.១",
    "title": "ចំនួនដងការប្រកួតប្រជែងអំណាន និងធ្វើលំហាត់គណិតវិទ្យាក្នុងមួយឆ្នាំ",
    "budgetYearN1": "400,000",
    "targetNMinus1": "2",
    "targetN": "2",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "បែងចែកសិស្សជាក្រុម ជ្រើសរើសប្រធានបទសម្រាប់ការប្រគួតអំណាន និងប្រធានបទសម្រាប់ការប្រគួតធ្វ់លំហាត់គណិតវិទ្យា ។",
    "targetNPlus2": "3.00",
    "targetNPlus3": "4"
  },
  {
    "id": "t1_75",
    "rowIdx": 75,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៨.២",
    "title": "ចំនួនក្លឹបសិក្សាបានបង្កើតដើម្បីជួយសិស្សរៀនយឺត និងជួយការងារផ្សេងៗរបស់សាលា",
    "budgetYearN1": "200,000",
    "targetNMinus1": "1",
    "targetN": "1",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "ជួយ សិស្សរៀនយឺត និងជួយការងារផ្សេងៗ របស់សាលា",
    "targetNPlus2": "1.00",
    "targetNPlus3": "1"
  },
  {
    "id": "t1_76",
    "rowIdx": 76,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៨.៣",
    "title": "ចំនួនដងសិស្សានុសិស្សបានចុះទស្សនៈកិច្ចសិក្សានៅតាមទីកន្លែងនានា ក្នុងមួយឆ្នាំសិក្សា",
    "budgetYearN1": "200,000",
    "targetNMinus1": "1",
    "targetN": "1",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "ចុះទស្សនកិច្ចសិក្សានៅតាមទីកន្លែងនានា ក្នុង មួយឆ្នាំសិក្សា",
    "targetNPlus2": "1.00",
    "targetNPlus3": "1"
  },
  {
    "id": "t1_77",
    "rowIdx": 77,
    "standardId": 2,
    "category": "KEY_INDICATOR",
    "code": "៩",
    "title": "ការអនុវត្តការអប់រំសីលធម៌ ចរិយាធម៌",
    "budgetYearN1": "200,000",
    "targetNMinus1": "5.00",
    "targetN": "6.67",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "7.67",
    "targetNPlus3": "8.00"
  },
  {
    "id": "t1_78",
    "rowIdx": 78,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៩.១",
    "title": "សាលារៀនមានកម្មវិធីលើកកម្ពស់ការអប់រំសីលធម៌ និងចរិយាធម៌ (ស្អាត សុភាព របៀប ទៀងពេល និងសមាធិ)",
    "budgetYearN1": "50,000",
    "targetNMinus1": "4",
    "targetN": "6",
    "targetNPlus1": "50,000",
    "reasonChangeNPlus1": "- សាលារៀនមានរៀបចំផែនការស្តីពីការលើកកម្ពស់ចរិយាធម៌ និងផ្សព្វផ្សាយឱ្យបានទូលំទូលាយ និងជាប្រចាំ - របាយការណ៍ស្តីពីការអនុវត្ត និងការពិនិត្យតាមដាន និងជំរុញការអនុវត្ត - បញ្ជីពិន្ទុ សៀវភៅតាមដានការសិក្សា និងសៀវភៅសិក្ខាគារិក មានការផ្តល់ពិន្ទុលើការអប់រំចរិយាធម៌ - សិស្សានុសិស្សបង្ហាញការអនុវត្តជាក់ស្តែងទាំងនៅក្នុងសាលា នៅផ្ទះ និងតាមទីកន្លែងនានា",
    "targetNPlus2": "7.00",
    "targetNPlus3": "7"
  },
  {
    "id": "t1_79",
    "rowIdx": 79,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៩.២",
    "title": "ចំនួនដងព្រះសង្ឃនិមន្តមកផ្តល់ធម៌ទេសនាអប់រំ ក្នុង១ឆ្នាំ",
    "budgetYearN1": "50,000",
    "targetNMinus1": "7",
    "targetN": "9",
    "targetNPlus1": "50,000",
    "reasonChangeNPlus1": "- សាលារៀនមានរៀបចំផែនការស្តីពីការនិមន្តព្រះសង្ឃ ឬ អញ្ជើញចាស់ព្រឹទ្ធាចារ្យ ផ្តល់ធម៌ទេសនា ឬ ការអប់រំ ប្រចាំឆ្នាំ ដោយរំលេចប្រធានបទជាក់លាក់ - របាយការណ៍ស្តីពីការអនុវត្ត និងការពិនិត្យតាមដាន និងជំរុញការ អនុវត្ត - ផ្ទៀងផ្ទាត់ជាមួយសិស្សម្នាក់ៗ តាមរយៈការបញ្ជាក់ពីសិស្សា នុសិស្ស និងអ្នកពាក់ព័ន្ធផ្សេងទៀត",
    "targetNPlus2": "10.00",
    "targetNPlus3": "10"
  },
  {
    "id": "t1_80",
    "rowIdx": 80,
    "standardId": 2,
    "category": "SUB_INDICATOR",
    "code": "៩.៣",
    "title": "សាលារៀនមានសកម្មភាពអប់រំសិល្បៈ (ចម្រៀង គំនូរ របាំ តន្ត្រី)",
    "budgetYearN1": "100,000",
    "targetNMinus1": "4",
    "targetN": "5",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- សាលារៀនមានរៀបចំផែនការស្តីពីការអប់រំសិល្បៈ - ថ្នាក់រៀននីមួយៗមានរៀបចំកាលវិភាគម៉ោងអប់រំសិល្បៈ - របាយការណ៍ស្តីពីការអនុវត្ត និងការពិនិត្យតាមដាន និងជំរុញការអនុវត្ត - ផ្ទៀងផ្ទាត់ជាមួយសិស្សម្នាក់ៗ តាមរយៈការបញ្ជាក់ពីសិស្សានុសិស្ស និងអ្នកពាក់ព័ន្ធផ្សេងទៀត",
    "targetNPlus2": "6.00",
    "targetNPlus3": "7"
  },
  {
    "id": "t1_81",
    "rowIdx": 81,
    "standardId": 3,
    "category": "STANDARD_HEADER",
    "code": "ស្តង់ដាទី៣៖ ការចូលរួមរបស់សហគមន៍ (៣សូចនាករគន្លឹះ និង ៦សូចនាកររង)",
    "title": "ស្តង់ដាទី៣៖ ការចូលរួមរបស់សហគមន៍ (៣សូចនាករគន្លឹះ និង ៦សូចនាកររង)",
    "budgetYearN1": "900,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "1,000,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_82",
    "rowIdx": 82,
    "standardId": 3,
    "category": "KEY_INDICATOR",
    "code": "១",
    "title": "ការបង្កើតនិងដំណើរការគណៈកម្មការគ្រប់គ្រងសាលារៀន និងថ្នាក់រៀន",
    "budgetYearN1": "400,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "500,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "46.33",
    "targetNPlus3": "53.00"
  },
  {
    "id": "t1_83",
    "rowIdx": 83,
    "standardId": 3,
    "category": "SUB_INDICATOR",
    "code": "១.១",
    "title": "ចំនួនដងគណៈកម្មការគ្រប់គ្រងសាលារៀន (គ.គ.ស.) ប្រជុំក្នុងមួយឆ្នាំ",
    "budgetYearN1": "100,000",
    "targetNMinus1": "7",
    "targetN": "9",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- ថ្នាក់រៀនមានរបាយការណ៍ប្រជុំស្តីពីការបង្កើតគណៈកម្មការគ្រប់គ្រងថ្នាក់រៀន - លិខិតបង្គាប់ការគណៈកម្មការគ្រប់គ្រងថ្នាក់រៀន មានការទទួល ស្គាល់ តាមការណែនាំ - គ.គ.ថ. មានរចនាសម្ព័ន្ធ និងតួនាទីភារកិច្ចច្បាស់លាស់ តាមការណែនាំ - គ.គ.ថ. មានរបាយការណ៍ប្រជុំ និងរបាយការណ៍វឌ្ឍនភាព តាមការណែនាំ",
    "targetNPlus2": "9.00",
    "targetNPlus3": "9"
  },
  {
    "id": "t1_84",
    "rowIdx": 84,
    "standardId": 3,
    "category": "SUB_INDICATOR",
    "code": "១.២",
    "title": "ភាគរយថ្នាក់រៀនបង្កើត និងដំណើរការគណៈកម្មការគ្រប់គ្រងថ្នាក់រៀន (គ.គ.ថ)",
    "budgetYearN1": "300,000",
    "targetNMinus1": "50",
    "targetN": "60",
    "targetNPlus1": "300,000",
    "reasonChangeNPlus1": "- គ.គ.ថ. មានរចនាសម្ព័ន្ធ និងតួនាទីភារកិច្ចច្បាស់លាស់ តាមការណែនាំ - គ.គ.ថ. មានរបាយការណ៍ប្រជុំ និងរបាយការណ៍វឌ្ឍនភាព តាមការណែនាំ - គ.គ.ថ. មានរបាយការណ៍បង្ហាញអំពីការគាំទ្រឱ្យថ្នាក់រៀនមាន ការអភិវឌ្ឍទាំងលទ្ធផលសិក្សារបស់សិស្សការកែលម្អ បរិស្ថានថ្នាក់រៀន និងសកម្មភាពបម្រើឱ្យការសិក្សារបស់សិស្ស",
    "targetNPlus2": "70.00",
    "targetNPlus3": "80"
  },
  {
    "id": "t1_85",
    "rowIdx": 85,
    "standardId": 3,
    "category": "SUB_INDICATOR",
    "code": "១.៣",
    "title": "ភាគរយមាតាបិតា អ្នកអាណាព្យាបាលបានចូលរួមប្រជុំប្រចាំខែពិភាក្សាអំពីលទ្ធផលការសិក្សារបស់កូន និងកិច្ចការផ្សេងៗ",
    "budgetYearN1": "100,000",
    "targetNMinus1": "40",
    "targetN": "50",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- មានអញ្ជើញមាតាបិតាចូលរួមប្រជុំ - មានរបាយការណ៍ប្រជុំ ដោយមានគោលបំណង និងរបៀបវារៈនៃកិច្ចប្រជុំរួមទាំងរូបភាពអ្នកចូលរួម - មានបញ្ជីវត្តមានអ្នកចូលរួម",
    "targetNPlus2": "60.00",
    "targetNPlus3": "70"
  },
  {
    "id": "t1_86",
    "rowIdx": 86,
    "standardId": 3,
    "category": "KEY_INDICATOR",
    "code": "២",
    "title": "ការចូលរួមរបស់សហគមន៍",
    "budgetYearN1": "300,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "300,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "21.50",
    "targetNPlus3": "24.50"
  },
  {
    "id": "t1_87",
    "rowIdx": 87,
    "standardId": 3,
    "category": "SUB_INDICATOR",
    "code": "២.១",
    "title": "សាលារៀនមានកិច្ចសហប្រតិបត្តិការភាពជាដៃគូវិនិយោគជាមួយវិស័យសាធារណៈ វិស័យឯកជន និងដៃគូអភិវឌ្ឍ",
    "budgetYearN1": "200,000",
    "targetNMinus1": "2",
    "targetN": "3",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "- សាលារៀនមានរៀបចំផែនការស្តីពីការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធ និងមានប្លង់មេច្បាស់លាស់ - គណៈគ្រប់គ្រងសាលារៀន និង គ.គ.ស. បានពិភាក្សា អំពីការកៀរគររកដៃគូវិនិយោគ លើការរៀបចំអាហារដ្ឋាន ទីលានកីឡា សាលប្រជុំ អគារពហុបំណង ការដាក់ឱ្យអនុវត្តកម្មវិធីសិក្សាទំនើបជាដើម - គណៈគ្រប់គ្រងសាលារៀន និង គ.គ.ស. ស្វែងរកដៃគូ សហប្រតិបត្តិការ និងវិនិយោគ ទៅតាមផែនការមេ និងតម្រូវការ - មានការចុះកិច្ចព្រមព្រៀង ដោយឈរលើផលប្រយោជន៍សិស្សជាធំ - សិស្សានុសិស្សបានទទួលផលពីការសហប្រតិបត្តិការ",
    "targetNPlus2": "3.00",
    "targetNPlus3": "4"
  },
  {
    "id": "t1_88",
    "rowIdx": 88,
    "standardId": 3,
    "category": "SUB_INDICATOR",
    "code": "២.២",
    "title": "ភាគរយសិស្សត្រៀមនឹងបោះបង់ ឬបោះបង់ការសិក្សាបានត្រឡប់មករៀនវិញ ក្រោមការគាំទ្រពីសហគមន៍",
    "budgetYearN1": "100,000",
    "targetNMinus1": "30",
    "targetN": "35",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- សាលារៀនមានរៀបចំប្រជុំណែនាំដល់គ្រូប្រចាំថ្នាក់ អំពីការកំណត់អត្តសញ្ញាណសិស្សត្រៀមបោះបង់ការសិក្សា - គ្រូប្រចាំថ្នាក់រាយការណ៍អំពីស្ថិតិសិស្សត្រៀមបោះបង់ការសិក្សា - នាយកសាលា គ្រូប្រចាំថ្នាក់ និងគ.គ.ស. ប្រជុំពិភាក្សាអំពីការទប់ស្កាត់សិស្សកុំឱ្យបោះបង់ការសិក្សា និងគាំទ្រពួកគេដើម្បីបានមករៀនទៀតទាត់ - ផ្ទៀងផ្ទាត់ជាមួយសិស្សម្នាក់ៗ តាមរយៈការបញ្ជាក់ពីសិស្សានុសិស្ស និងអ្នកពាក់ព័ន្ធផ្សេងទៀតបានមករៀនទៀតទាត់",
    "targetNPlus2": "40.00",
    "targetNPlus3": "45"
  },
  {
    "id": "t1_89",
    "rowIdx": 89,
    "standardId": 3,
    "category": "KEY_INDICATOR",
    "code": "៣",
    "title": "ការគាំទ្ររបស់សហគមន៍",
    "budgetYearN1": "200,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_90",
    "rowIdx": 90,
    "standardId": 3,
    "category": "SUB_INDICATOR",
    "code": "៣.១",
    "title": "បរិមាណចំណូលមូលនិធិបង់ចូលសាលារៀន",
    "budgetYearN1": "200,000",
    "targetNMinus1": "3ដង",
    "targetN": "5ដង",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "- សាលារៀនមានរៀបចំផែនការអភិវឌ្ឍសាលារៀន ទាំង៤ - នាយកសាលា និង គ.គ.ស. បង្ហាញអំពីបរិមាណចំណូលចំណាយ ទាំងថវិការដ្ឋ (លើកលែងមូលនិធិដំណើរការសាលារៀនបន្ថែម) និងថវិកាដែលមានមកពីប្រភព ៣ផ្សេងទៀត ដូចមានចែងក្នុងសៀវភៅ SOF - ធ្វើការប្រៀបធៀបចំណូលថវិការដ្ឋ និងថវិកាពីប្រភពទាំង៣",
    "targetNPlus2": "5ដង",
    "targetNPlus3": "5ដង"
  },
  {
    "id": "t1_91",
    "rowIdx": 91,
    "standardId": 4,
    "category": "STANDARD_HEADER",
    "code": "ស្តង់ដាទី៤៖ អភិបាលកិច្ចសាលារៀន (៦សូចនាករគន្លឹះ និង ១៧សូចនាកររង)",
    "title": "ស្តង់ដាទី៤៖ អភិបាលកិច្ចសាលារៀន (៦សូចនាករគន្លឹះ និង ១៧សូចនាកររង)",
    "budgetYearN1": "3,300,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "3,250,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_92",
    "rowIdx": 92,
    "standardId": 4,
    "category": "KEY_INDICATOR",
    "code": "១",
    "title": "ការគ្រប់គ្រងរដ្ឋបាលទូទៅ",
    "budgetYearN1": "700,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "700,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_93",
    "rowIdx": 93,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "១.១",
    "title": "ការរៀបចំទីតាំងការតុកដាក់ឯកសារ មានសណ្ឋាប់ធ្នាប់ និងរបៀបរៀបរយ",
    "budgetYearN1": "300,000",
    "targetNMinus1": "មានទូដាក់ឯកសារ",
    "targetN": "មានទូដាក់ឯកសារ+មានកៅអី",
    "targetNPlus1": "300,000",
    "reasonChangeNPlus1": "- ទីចាត់ការស្អាត រៀបចំមានសណ្តាប់ធ្នាប់របៀបរៀបរយ និងផាសុកភាព - មានទូរដាក់ឯកសារ តុនិងកៅអីសម្រាប់បុគ្គលិកទីចាត់ការ និង កន្លែងទទួលភ្ញៀវ - មានកុំព្យូទ័រ ព្រីនទ័រ និងម៉ាស៊ីនថតចម្លង សម្រាប់ការងាររដ្ឋបាល ស្ថិតិ និងរបាយការណ៍ជាដើម - ទីចាត់ការមានសម្ភារៈប្រើប្រាស់សមស្របតាមតម្រូវការ",
    "targetNPlus2": "មានទូដាក់ឯកសារ+មានកៅអី+មានសម្ភារៈ",
    "targetNPlus3": "មានទូដាក់ឯកសារ+មានកៅអី+មានសម្ភារៈ"
  },
  {
    "id": "t1_94",
    "rowIdx": 94,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "១.២",
    "title": "ការប្រើប្រាស់ថ្នាលបឋម(PLP) ក្នុងការគ្រប់គ្រងទិន្នន័យសាលារៀន",
    "budgetYearN1": "400,000",
    "targetNMinus1": "ប្រើ app",
    "targetN": "ប្រើ app",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "- អនុវត្តការប្រើប្រាស់ប្រព័ន្ធព័ត៌មានគ្រប់គ្រងហិរញ្ញវត្ថុ (FMIS) និងប្រព័ន្ធ/App គ្រប់គ្រងទិន្នន័យបឋមដែលបានដំឡើងលើកុំព្យូទ័រ ដើម្បីអាចទាញយកជារបាយការណ៍តាមតម្រូវការ។ - មានលិខិតបង្គាប់ការផ្លូវការ ចាត់តាំងបុគ្គលិកអប់រំឱ្យទទួលខុសត្រូវលើការគ្រប់គ្រង និងបញ្ចូលទិន្នន័យក្នុងប្រព័ន្ធ/App។ - ទិន្នន័យសាលារៀនត្រូវបានផ្សព្វផ្សាយជាសាធារណៈជូនដល់ មាតាបិតា អ្នកអាណាព្យាបាលសិស្ស សហគមន៍ និងអាជ្ញាធរដែនដីពាក់ព័ន្ធ។",
    "targetNPlus2": "ប្រើ app",
    "targetNPlus3": "ប្រើ app"
  },
  {
    "id": "t1_95",
    "rowIdx": 95,
    "standardId": 4,
    "category": "KEY_INDICATOR",
    "code": "២",
    "title": "ការរៀបចំផែនការអភិវឌ្ឍសាលារៀន",
    "budgetYearN1": "400,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_96",
    "rowIdx": 96,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "២.១",
    "title": "ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍សាលារៀន ៥ឆ្នាំ ផែនការយុទ្ធសាស្ត្រថវិកា ៣ឆ្នាំ ផែនការថវិកាប្រចាំឆ្នាំ និងផែនការប្រតិបត្តិប្រចាំឆ្នាំ បានរៀបចំតាមការណែនាំ",
    "budgetYearN1": "400,000",
    "targetNMinus1": "មាន៣",
    "targetN": "មាន៤",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "- សាលារៀនមានរៀបចំការប្រជុំពិភាក្សាអំពីការរៀបចំផែនការទាំង៤ តាមការណែនាំ - ការប្រជុំមានការចូលរួមពីគ្រប់អ្នកពាក់ព័ន្ធ តាមការណែនាំ - មានរបាយការណ៍ពិនិត្យនិងវាយតម្លៃការអនុវត្តផែនការសកម្មភាពដែលបានគ្រោង - មានការឆ្លុះបញ្ចាំងអំពីការអនុវត្តផែនការ ធៀបនឹងលទ្ធផល សិក្សារបស់សិស្ស និងវឌ្ឍនភាពរបស់សាលារៀន &bull;ឆ្លុះបញ្ចាំងអំពីការអនុវត្តផែនការ ធៀបនឹងលទ្ធផលសិក្សារបស់សិស្ស និងវឌ្ឍនភាពរបស់សាលារៀន",
    "targetNPlus2": "មាន៤",
    "targetNPlus3": "មាន៤"
  },
  {
    "id": "t1_97",
    "rowIdx": 97,
    "standardId": 4,
    "category": "KEY_INDICATOR",
    "code": "៣",
    "title": "ការវាយតម្លៃការបំពេញការងាររបស់បុគ្គលិក",
    "budgetYearN1": "50,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "50,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_98",
    "rowIdx": 98,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៣.១",
    "title": "ភាគរយគ្រូបង្រៀន និងបុគ្គលិកអប់រំបានចុះកិច្ចព្រមព្រៀងទទួលផលការងារប្រចាំឆ្នាំ",
    "budgetYearN1": "50,000",
    "targetNMinus1": "12",
    "targetN": "12",
    "targetNPlus1": "50,000",
    "reasonChangeNPlus1": "- ចុះកិច្ចព្រមព្រៀងទទួលផលការងារប្រចាំឆ្នាំ ក្នុងប្រព័ន្ធគ្រប់គ្រងទិន្នន័យបឋម - របាយការណ៍ស្តីពីការប្រជុំផ្សព្វផ្សាយអំពីគោលការណ៍នៃការចុះកិច្ចព្រមព្រៀងរវាងនាយកសាលា និងគ្រូបង្រៀន ក្រោមការអនុវត្តពីប្រធាន គ.គ.ស. - បញ្ជីរាយនាមគ្រូ បុគ្គលិកអប់រំ និងនាយកសាលាបានចុះកិច្ចព្រមព្រៀងទទួលផលការងារប្រចាំឆ្នាំ ដោយមានកំណត់ចំណុចដៅនៃសូចនាករ លទ្ធផល ច្បាស់លាស់ - របាយការណ៍ស្តីពីការវាយតម្លៃនៃការអនុវត្តកិច្ចព្រមព្រៀងរបស់គ្រូបង្រៀន និងបុគ្គលិកអប់រំ",
    "targetNPlus2": "12.00",
    "targetNPlus3": "12"
  },
  {
    "id": "t1_99",
    "rowIdx": 99,
    "standardId": 4,
    "category": "KEY_INDICATOR",
    "code": "៤",
    "title": "រង្វាយតម្លៃលទ្ធផលសិក្សា",
    "budgetYearN1": "150,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "150,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_100",
    "rowIdx": 100,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៤.១",
    "title": "ការរៀបចំធ្វើតេស្តស្តង់ដាដើមឆ្នាំ ឬចុងឆ្នាំ ប្រចាំខែ ឆមាស និងតេស្តស្តង់ដា ថ្នាក់ទី៣ និងទី៦ បានរៀបចំទៀងទាត់",
    "budgetYearN1": "150,000",
    "targetNMinus1": "ពេញ១ឆ្នាំ",
    "targetN": "ពេញ១ឆ្នាំ",
    "targetNPlus1": "150,000",
    "reasonChangeNPlus1": "ប្រជុំផ្សព្វផ្សាយអំពីគោលការណ៍នៃការរៀបចំ អនុវត្តតេស្តស្តង់ដា ការរៀបចំធ្វើតេស្ត ស្តង់ដាដើមឆ្នាំ ឬ ចុងឆ្នាំ ប្រចាំខែ ឆមាស និង តេស្តស្តង់ដាថ្នាក់ទី៣ និងទី៦ បានរៀបចំ ទៀងទាត់",
    "targetNPlus2": "ពេញ១ឆ្នាំ",
    "targetNPlus3": "ពេញ១ឆ្នាំ"
  },
  {
    "id": "t1_101",
    "rowIdx": 101,
    "standardId": 4,
    "category": "KEY_INDICATOR",
    "code": "៥",
    "title": "ការលើកកម្ពស់សុខភាពសិក្សា និងអាហារូបត្ថម្ភ",
    "budgetYearN1": "900,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "850,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_102",
    "rowIdx": 102,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៥.១",
    "title": "ការលើកកម្ពស់សុខភាព ថែសុខភាពបឋម",
    "budgetYearN1": "100,000",
    "targetNMinus1": "មានរបាយការណ៍",
    "targetN": "មានរបាយការណ៍",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- សុវត្ថិភាពនៃបរិស្ថាន និងសម្ភារៈស្អាតបឋម - របាយការណ៍ស្តីពីការផ្តល់ថ្នាំបង្ការតាមកម្មវិធីជាតិ ផ្តល់ថ្នាំបង្ការ ឬថ្នាំទម្លាក់ដង្កូវព្រូន - បន្ទប់សុខភាព និងសម្ភារៈប្រើប្រាស់មូលដ្ឋានចាំបាច់ - របាយការណ៍ស្តីពីសន្ទស្សន៍ម៉ាស់រាងកាយ (BMI) និងការពិនិត្យភ្នែក គ្រប់សិស្សក្នុងប្រព័ន្ធគ្រប់គ្រងទិន្នន័យបឋម",
    "targetNPlus2": "មានរបាយការណ៍",
    "targetNPlus3": "មានរបាយការណ៍"
  },
  {
    "id": "t1_103",
    "rowIdx": 103,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៥.២",
    "title": "ការលើកកម្ពស់ទឹកស្អាត និងអនាម័យ",
    "budgetYearN1": "100,000",
    "targetNMinus1": "មានរបាយការណ៍",
    "targetN": "មានរបាយការណ៍",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- រូបភាពការបិទផ្សាយគោលការណ៍ណែនាំស្តីពីការលើកកម្ពស់ - បង្គន់អនាម័យ ទីតាំងលាងសម្អាតដៃ មានបិទស្លាក និងដំណើរការ - កម្មវិធីគ្រប់គ្រងអនាម័យតាមរដូវរបស់កុមារី - កាលវិភាគស្តីពីការលាងសម្អាតដៃ និងដុសសម្អាតធ្មេញសម្រាប់សិស្សទាំងអស់",
    "targetNPlus2": "មានរបាយការណ៍",
    "targetNPlus3": "មានរបាយការណ៍"
  },
  {
    "id": "t1_104",
    "rowIdx": 104,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៥.៣",
    "title": "ការលើកកម្ពស់សុវត្ថិភាពចំណីអាហារ និងអាហារប្រកបដោយសុខភាព",
    "budgetYearN1": "100,000",
    "targetNMinus1": "មានរបាយការណ៍",
    "targetN": "មានរបាយការណ៍",
    "targetNPlus1": "50,000",
    "reasonChangeNPlus1": "- រូបភាពការបិទផ្សាយគោលការណ៍ណែនាំស្តីពីការលើកកម្ពស់សុវត្ថិភាពចំណីអាហារ - ផែនការ និងយន្តការត្រួតពិនិត្យសុវត្ថិភាពចំណីអាហារ និងអាហារប្រកបដោយសុខភាព - រោងអាហារដ្ឋានសម្រាប់កុមារអង្គុយញ៉ាំដែលមានអនាម័យ និងសុខភាព",
    "targetNPlus2": "មានរបាយការណ៍",
    "targetNPlus3": "មានរបាយការណ៍"
  },
  {
    "id": "t1_105",
    "rowIdx": 105,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៥.៤",
    "title": "ការអនុវត្តមុខវិជ្ជាអប់រំសុខភាព",
    "budgetYearN1": "50,000",
    "targetNMinus1": "មានរបាយការណ៍",
    "targetN": "មានរបាយការណ៍",
    "targetNPlus1": "50,000",
    "reasonChangeNPlus1": "- ផែនការបង្រៀន និងកាលវិភាគមេរៀនមុខវិជ្ជាអប់រំសុខភាព - សៀវភៅមាតិកាការបង្រៀនមុខវិជ្ជាអប់រំសុខភាព - របាយការណ៍ពីការអប់រំផ្សព្វផ្សាយអំពីសុខភាព គ្រប់រូបភាព",
    "targetNPlus2": "មានរបាយការណ៍",
    "targetNPlus3": "មានរបាយការណ៍"
  },
  {
    "id": "t1_106",
    "rowIdx": 106,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៥.៥",
    "title": "ការលើកកម្ពស់បរិស្ថានស្អាត បៃតង សុវត្ថិភាព អនាម័យ និងមេត្រីភាព",
    "budgetYearN1": "50,000",
    "targetNMinus1": "មានរបាយការណ៍",
    "targetN": "មានរបាយការណ៍",
    "targetNPlus1": "50,000",
    "reasonChangeNPlus1": "- ផែនការបានរៀបចំ ស្របតាមលក្ខណៈបច្ចេកទេស ឬមានស្តង់ដារបច្ចេកទេស - សួនច្បាររួម រុក្ខជាតិ ដើម្បីសួនបៃតង ជំរុំ - សួនដី ចម្ការ",
    "targetNPlus2": "មានរបាយការណ៍",
    "targetNPlus3": "មានរបាយការណ៍"
  },
  {
    "id": "t1_107",
    "rowIdx": 107,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៥.៦",
    "title": "ការរក្សាសុខសុវត្ថិភាព ការការពារកុមារ ការបង្ការគ្រោះមហន្តរាយ",
    "budgetYearN1": "400,000",
    "targetNMinus1": "មានរបាយការណ៍",
    "targetN": "មានរបាយការណ៍",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "- សាលារៀនមានរបង ទ្វារចេញចូល - សាលារៀនមានប្រព័ន្ធរក្សាសុវត្ថិភាព ការដាក់ផ្ទាំងសញ្ញាចរាចរណ៍ សញ្ញាបង្ការគ្រោះថ្នាក់ បំពង់ពន្លត់អគ្គីភ័យ - សហការជាមួយអាជ្ញាធរមូលដ្ឋានដើម្បីធានាសុវត្ថិភាពរបស់សិស្ស",
    "targetNPlus2": "មានរបាយការណ៍",
    "targetNPlus3": "មានរបាយការណ៍"
  },
  {
    "id": "t1_108",
    "rowIdx": 108,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៥.៧",
    "title": "ការអនុវត្តសកម្មភាពអប់រំកាយ និងកីឡា",
    "budgetYearN1": "100,000",
    "targetNMinus1": "មានរបាយការណ៍",
    "targetN": "មានរបាយការណ៍",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- ទីធ្លាសម្រាប់ធ្វើសកម្មភាពអប់រំកាយ និងកីឡា - តារាងវាយតម្លៃលទ្ធផលការសិក្សារបស់សិស្សពីមុខវិជ្ជាអប់រំកាយ និងកីឡា",
    "targetNPlus2": "មានរបាយការណ៍",
    "targetNPlus3": "មានរបាយការណ៍"
  },
  {
    "id": "t1_109",
    "rowIdx": 109,
    "standardId": 4,
    "category": "KEY_INDICATOR",
    "code": "៦",
    "title": "ការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធអប់រំ",
    "budgetYearN1": "1,100,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "1,100,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_110",
    "rowIdx": 110,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៦.១",
    "title": "សាលារៀនមានបណ្តាញអគ្គិសនី បំពាក់អ៊ីនធើណិត",
    "budgetYearN1": "200,000",
    "targetNMinus1": "70",
    "targetN": "100",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "- សាលារៀនមានតបណ្តាញអគ្គិសនីចូល - បណ្តាញអគ្គិសនីត្រូវបានតភ្ជាប់ទៅទីចាត់ការ និងគ្រប់បន្ទប់រៀន និងបន្ទប់ផ្សេងៗទៀត ប្រកបដោយសណ្តាប់ធ្នាប់ និងសុវត្ថិភាព - សាលារៀនមានតបណ្តាញអ៊ីនធើណិត - បណ្តាញអ៊ីនធើណិតត្រូវបានតភ្ជាប់ទៅទីចាត់ការ និងគ្រប់បន្ទប់រៀន និងបន្ទប់ផ្សេងៗទៀត ប្រកបដោយសណ្តាប់ធ្នាប់ និងគុណភាព",
    "targetNPlus2": "100.00",
    "targetNPlus3": "100"
  },
  {
    "id": "t1_111",
    "rowIdx": 111,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៦.២",
    "title": "ភាគរយបន្ទប់រៀនបំពាក់ឧបករណ៍សិក្សាទំនើប (LCD, Smart TV, Smart Board)",
    "budgetYearN1": "200,000",
    "targetNMinus1": "0",
    "targetN": "1",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "- សាលារៀនមានផែនការបំពាក់ឧបករណ៍សិក្សាទំនើបតាមបន្ទប់ រៀន និងការបណ្តុះបណ្តាលគ្រូបង្រៀនឱ្យចេះប្រើប្រាស់ - គណៈគ្រងសាលា និង គ.គ.ស. ពិភាក្សាអំពីការស្នើសុំទៅក្រសួង ឬ អង្កការដៃគូអភិវឌ្ឍ ឬ កៀរគរមូលនិធិពីមាតាបិតា សប្បុរសជន ដើម្បីបំពាក់ឧករណ៍សិក្សាទំនើប - គ្រូបង្រៀន ពិភាក្សាជាមួយ គ.គ.ថ. ដើម្បីកៀរគរមូលនិធិ ដើម្បីបំពាក់ឧករណ៍សិក្សាទំនើប នៅតាមបន្ទប់រៀនរបស់ខ្លួន",
    "targetNPlus2": "10.00",
    "targetNPlus3": "12"
  },
  {
    "id": "t1_112",
    "rowIdx": 112,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៦.៣",
    "title": "សាលារៀនមានបណ្ណាល័យ",
    "budgetYearN1": "200,000",
    "targetNMinus1": "1",
    "targetN": "1",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "- សាលារៀនមានសៀវភៅណែនាំប្រតិបត្តិស្តីពីបណ្ណាល័យបឋមសិក្សា - សាលារៀនមានអគារ ឬ បន្ទប់សម្រាប់រៀបចំបង្កើត និងដំណើរការបណ្ណាល័យ - សាលារៀនមានបណ្ណាល័យតាមស្តង់ដា និងកំពុងដំណើរការ - សាលារៀនមានបណ្ណាល័យ តែមិនមានបណ្ណារក្ស ឬ មិនទាន់ មានសង្ហារឹមនិងសៀវភៅអានតាមស្តង់ដា នាយកសាលា និង គ.គ.ស. ត្រូវពិភាក្សាគ្នាដើម្បីកៀរគរមូលនិធិពីមាតាបិតា សប្បុរសជន ដើម្បីបំពាក់គ្រឿង សង្ហារឹម ទិញសៀវភៅអានបន្ថែម និងជួលបណ្ណារក្សាស្ម័គ្រចិត្តជាដើម",
    "targetNPlus2": "1.00",
    "targetNPlus3": "1"
  },
  {
    "id": "t1_113",
    "rowIdx": 113,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៦.៤",
    "title": "សាលារៀនមានបន្ទប់កុំព្យូទ័រសម្រាប់សិស្សរៀន",
    "budgetYearN1": "400,000",
    "targetNMinus1": "0",
    "targetN": "0",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "- សាលារៀនមានអគារ ឬ បន្ទប់សម្រាប់រៀបចំបង្កើតនិង ដំណើរការបន្ទប់កុំព្យូទ័រ - សាលារៀនមានបន្ទប់កុំព្យូទ័រ និងកំពុងដំណើរការ - សាលារៀនមានបន្ទប់កុំព្យូទ័រ តែមិនមានគ្រូកុំព្យូទ័រ ឬ មិនទាន់ មានកុំព្យូទ័រគ្រប់គ្រាន់សម្រាប់សិស្សរៀន នាយកសាលា និង គ.គ.ស. ត្រូវពិភាក្សាគ្នាដើម្បីកៀរគរមូលនិធិពីមាតាបិតា សប្បុរសជន ដើម្បីទិញកុំព្យូទ័របន្ថែម និងជួលគ្រូបង្រៀន កុំព្យូទរ័ស្ម័គ្រចិត្តជាដើម",
    "targetNPlus2": "1.00",
    "targetNPlus3": "1"
  },
  {
    "id": "t1_114",
    "rowIdx": 114,
    "standardId": 4,
    "category": "SUB_INDICATOR",
    "code": "៦.៥",
    "title": "សាលារៀនមានទីលានកីឡារួមមាន៖ តារាបាល់ទះ បាល់ទាត់ បាល់បោះ វាយសី...",
    "budgetYearN1": "100,000",
    "targetNMinus1": "2",
    "targetN": "3",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- សាលារៀនមានទីតាំងសមស្របសម្រាប់រៀបចំទីលានកីឡា - សាលារៀនមានទីលានលេងកីឡាគ្រប់ប្រភេទ និងកំពុងដំណើរការ - សាលារៀនមានទីលានកីឡា តែមានសកម្មភាព ឬ មិនទាន់មានទីលានកីឡាគ្រប់គ្រាន់ នាយកសាលា និង គ.គ.ស. ត្រូវពិភាក្សាគ្នាដើម្បីកៀរគរមូលនិធិពីមាតាបិតា សប្បុរសជន ដើម្បីវិនិយោគ និងជួលគ្រូបង្រៀនឯកទេសកីឡាស្ម័គ្រចិត្តជាដើម",
    "targetNPlus2": "3.00",
    "targetNPlus3": "4"
  },
  {
    "id": "t1_115",
    "rowIdx": 115,
    "standardId": 5,
    "category": "STANDARD_HEADER",
    "code": "ស្តង់ដាទី៥៖ គណនេយ្យភាពរបស់សាលារៀន (៣សូចនាករគន្លឹះ និង ៦សូចនាកររង)",
    "title": "ស្តង់ដាទី៥៖ គណនេយ្យភាពរបស់សាលារៀន (៣សូចនាករគន្លឹះ និង ៦សូចនាកររង)",
    "budgetYearN1": "1,000,000",
    "targetNMinus1": "",
    "targetN": "",
    "targetNPlus1": "1,000,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "",
    "targetNPlus3": ""
  },
  {
    "id": "t1_116",
    "rowIdx": 116,
    "standardId": 5,
    "category": "KEY_INDICATOR",
    "code": "១",
    "title": "វេទិកាសាធារណៈ",
    "budgetYearN1": "400,000",
    "targetNMinus1": "2.00",
    "targetN": "4.00",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "5.00",
    "targetNPlus3": "6.00"
  },
  {
    "id": "t1_117",
    "rowIdx": 117,
    "standardId": 5,
    "category": "SUB_INDICATOR",
    "code": "១.១",
    "title": "សាលារៀនរៀបចំកម្មវិធីជួបប្រជុំជាមួយមាតាបិតា អ្នកអាណាព្យាបាលសិស្ស និងសហគមន៍",
    "budgetYearN1": "400,000",
    "targetNMinus1": "2",
    "targetN": "4",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "&bull;រៀបចំការប្រជុំដែលបង្កាញអំពីលទ្ធផល បញ្ហាប្រឈម ដំណោះស្រាយ និងទិសដៅបន្ត នៃការអភិវឌ្ឍសាលារៀនដែលឈរលើមូលដ្ឋានការបង្រៀន និងរៀន និងការដឹកនាំគ្រប់គ្រងសាលារៀន",
    "targetNPlus2": "5.00",
    "targetNPlus3": "6"
  },
  {
    "id": "t1_118",
    "rowIdx": 118,
    "standardId": 5,
    "category": "KEY_INDICATOR",
    "code": "២",
    "title": "ការផ្សព្វផ្សាយព័ត៌មានជាសាធារណៈ",
    "budgetYearN1": "200,000",
    "targetNMinus1": "2.00",
    "targetN": "4.00",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "5.00",
    "targetNPlus3": "6.00"
  },
  {
    "id": "t1_119",
    "rowIdx": 119,
    "standardId": 5,
    "category": "SUB_INDICATOR",
    "code": "២.១",
    "title": "លទ្ធផលតេស្តវាយតម្លៃស្តង់ដា និងព័ត៌មាននានាត្រូវបានអនុម័តដោយ គ.គ.ស និង/ឬ បិទផ្សាយជាសាធារណៈ",
    "budgetYearN1": "200,000",
    "targetNMinus1": "2",
    "targetN": "4",
    "targetNPlus1": "200,000",
    "reasonChangeNPlus1": "&bull;សាលារៀនត្រូវមានផែនការផ្សព្វផ្សាយសមិទ្ធផល និងសកម្មភាពនានាក្នុងឆ្នាំសិក្សានីមួយៗ ។ &bull; ប្រជុំពិភាក្សាជាមួយអាជ្ញាធរ សហគមន៍ និងគណៈកម្មការទ្រទ្រង់សាលារៀនតាមផែនការ",
    "targetNPlus2": "5.00",
    "targetNPlus3": "6"
  },
  {
    "id": "t1_120",
    "rowIdx": 120,
    "standardId": 5,
    "category": "KEY_INDICATOR",
    "code": "៣",
    "title": "ការទទួលបានការគាំទ្រពីថ្នាក់ជាតិ",
    "budgetYearN1": "400,000",
    "targetNMinus1": "28",
    "targetN": "33.67",
    "targetNPlus1": "400,000",
    "reasonChangeNPlus1": "",
    "targetNPlus2": "171",
    "targetNPlus3": "195"
  },
  {
    "id": "t1_121",
    "rowIdx": 121,
    "standardId": 5,
    "category": "SUB_INDICATOR",
    "code": "៣.១",
    "title": "នាយករងសាលា និងនាយកបានទទួលបានការប្រឹក្សាអនុវត្តដោយសាលារៀនគំរូ ពីនាយកសាលាដទៃ ឬមកពីថ្នាក់លើ",
    "budgetYearN1": "100,000",
    "targetNMinus1": "4",
    "targetN": "6",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- លិខិតចាត់តាំងជាផ្លូវការរបស់អ្នកផ្តល់ការប្រឹក្សា - បញ្ជីរាយនាមនាយក ទទួលបានការប្រឹក្សាអនុវត្តគ្រប់គ្រងតាមសាលារៀន និងនាយវិធីសាលារៀនគំរូ - ទិន្នន័យប្រព័ន្ធ PLP - របាយការណ៍លទ្ធផលនៃការអនុវត្ត",
    "targetNPlus2": "6.00",
    "targetNPlus3": "7"
  },
  {
    "id": "t1_122",
    "rowIdx": 122,
    "standardId": 5,
    "category": "SUB_INDICATOR",
    "code": "៣.២",
    "title": "លទ្ធផលនៃការអនុវត្តស្តង់ដារសាលារៀនគំរូតាមឆ្នាំ",
    "budgetYearN1": "100,000",
    "targetNMinus1": "50",
    "targetN": "60",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- តារាងទិន្នន័យវាយតម្លៃជាសាលារៀនគំរូតាមឆ្នាំ - ពិនិត្យក្នុងប្រព័ន្ធស្តង់ដារសាលារៀនគំរូ (ពិនិត្យក្នុងប្រព័ន្ធជាក់ស្ដែង)",
    "targetNPlus2": "65.00",
    "targetNPlus3": "68"
  },
  {
    "id": "t1_123",
    "rowIdx": 123,
    "standardId": 5,
    "category": "SUB_INDICATOR",
    "code": "៣.៣",
    "title": "ភាគរយគ្រូបង្រៀនបានទទួលបានប្រឹក្សាការអនុវត្តបច្ចេកទេសជំនាញថ្នាក់ដំបូង និង/ឬវិធីសាស្ត្របង្រៀនភាសាខ្មែរ និងគណិតវិទ្យា",
    "budgetYearN1": "100,000",
    "targetNMinus1": "30",
    "targetN": "35",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- បញ្ជីឈ្មោះគ្រូបង្រៀន ក្រុមបច្ចេកទេស និងគណៈគ្រប់គ្រងសាលារៀន ដែលមានបញ្ជីកត់ត្រាជំនួយបច្ចេកទេសថ្នាក់ក្រោមជាតិ និងថ្នាក់ជាតិ - តារាងកត់ត្រាទិន្នន័យ ព័ត៌មាន និងផ្តល់យោបល់ការជួយសម្រាប់សាលារៀនក្នុងការអនុវត្តសាលារៀនគំរូ",
    "targetNPlus2": "40.00",
    "targetNPlus3": "40"
  },
  {
    "id": "t1_124",
    "rowIdx": 124,
    "standardId": 5,
    "category": "SUB_INDICATOR",
    "code": "៣.៤",
    "title": "ភាគរយគ្រូបង្រៀនបំពេញសុសកិច្ចសិក្សាទៅសាលាដទៃ ក្នុងមួយឆ្នាំ",
    "budgetYearN1": "100,000",
    "targetNMinus1": "30",
    "targetN": "50",
    "targetNPlus1": "100,000",
    "reasonChangeNPlus1": "- ផែនការទស្សនកិច្ចសិក្សារបស់គ្រូបង្រៀន និងបុគ្គលិកប្រចាំឆ្នាំ - បញ្ជីកត់ត្រាមូលនិធិ ដើម្បីគាំទ្រដល់ដំណើរការសុសកិច្ចសិក្សា - របាយការណ៍ស្តីពីដំណើរការសុសកិច្ចសិក្សា និងលទ្ធផលនៃការអនុវត្ត (ភ្ជាប់ជាមួយរូបភាព) - បញ្ជីឈ្មោះគ្រូបង្រៀនបានទៅសុសកិច្ចសិក្សានៅសាលាដទៃ",
    "targetNPlus2": "60.00",
    "targetNPlus3": "80"
  }
];

export const INITIAL_TABLE2_DATA: ActivityBudgetRow[] = [
  {
    "id": "t2_2",
    "rowIdx": 2,
    "standardId": 0,
    "category": "GRAND_TOTAL",
    "code": "សរុប",
    "activity": "សរុប",
    "yearN": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN1": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN2": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN3": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    }
  },
  {
    "id": "t2_3",
    "rowIdx": 3,
    "standardId": 1,
    "category": "STANDARD_HEADER",
    "code": "ស្តង់ដារទី១ ៖ លទ្ធផលសិក្សារបស់សិស្ស",
    "activity": "ស្តង់ដារទី១ ៖ លទ្ធផលសិក្សារបស់សិស្ស",
    "yearN": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN1": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN2": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN3": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    }
  },
  {
    "id": "t2_4",
    "rowIdx": 4,
    "standardId": 1,
    "category": "ACTIVITY",
    "code": "",
    "activity": "១. ការប្រមូលកុមារចូលរៀន",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_5",
    "rowIdx": 5,
    "standardId": 1,
    "category": "ACTIVITY",
    "code": "",
    "activity": "២. កុមាររៀនបានគង់វង្សក្នុងសាលារៀន",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_6",
    "rowIdx": 6,
    "standardId": 1,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៣. លទ្ធផលសិក្សារបស់សិស្ស",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_7",
    "rowIdx": 7,
    "standardId": 1,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៤. ស្ថានភាពអាហារូបត្ថម្ភ",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_8",
    "rowIdx": 8,
    "standardId": 1,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៥. សីលធម៌ និងវិន័យសិស្ស",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_9",
    "rowIdx": 9,
    "standardId": 2,
    "category": "STANDARD_HEADER",
    "code": "ស្តង់ដារទី២ ៖ ការបង្រៀន និងរៀន",
    "activity": "ស្តង់ដារទី២ ៖ ការបង្រៀន និងរៀន",
    "yearN": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN1": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN2": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN3": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    }
  },
  {
    "id": "t2_10",
    "rowIdx": 10,
    "standardId": 2,
    "category": "ACTIVITY",
    "code": "",
    "activity": "១. ការអនុវត្តវិធីសាស្ត្របង្រៀន",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_11",
    "rowIdx": 11,
    "standardId": 2,
    "category": "ACTIVITY",
    "code": "",
    "activity": "២. ការអនុវត្តវិធីសិក្សា និងការបង្រៀន",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_12",
    "rowIdx": 12,
    "standardId": 2,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៣. សម្ភាររៀន និងបង្រៀន",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_13",
    "rowIdx": 13,
    "standardId": 2,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៤. ការជួយគាំទ្រសិស្ស",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_14",
    "rowIdx": 14,
    "standardId": 2,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៥. ដំណើរការបណ្ណាល័យ",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_15",
    "rowIdx": 15,
    "standardId": 2,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៦. ការធ្វើអធិការកិច្ចផ្ទៃក្នុង",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_16",
    "rowIdx": 16,
    "standardId": 2,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៧. ការប្រជុំបច្ចេកទេស",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_17",
    "rowIdx": 17,
    "standardId": 2,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៨. ការអនុវត្តកិច្ចសិក្សាក្រៅម៉ោង",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_18",
    "rowIdx": 18,
    "standardId": 2,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៩. ការអនុវត្តកម្រិតសីលធម៌ ចរិយាមរិយា",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_19",
    "rowIdx": 19,
    "standardId": 3,
    "category": "STANDARD_HEADER",
    "code": "ស្តង់ដារទី៣ ៖ ការចូលរួមពីសហគមន៍",
    "activity": "ស្តង់ដារទី៣ ៖ ការចូលរួមពីសហគមន៍",
    "yearN": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN1": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN2": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN3": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    }
  },
  {
    "id": "t2_20",
    "rowIdx": 20,
    "standardId": 3,
    "category": "ACTIVITY",
    "code": "",
    "activity": "១. ការបង្កើត និងដំណើរការគណៈកម្មការគ្រប់គ្រងសាលារៀន និងថ្នាក់រៀន",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_21",
    "rowIdx": 21,
    "standardId": 3,
    "category": "ACTIVITY",
    "code": "",
    "activity": "២. ការចូលរួមរបស់សហគមន៍",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_22",
    "rowIdx": 22,
    "standardId": 3,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៣. ការគាំទ្ររបស់សហគមន៍",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_23",
    "rowIdx": 23,
    "standardId": 4,
    "category": "STANDARD_HEADER",
    "code": "ស្តង់ដារទី៤ ៖ អភិបាលកិច្ចសាលារៀន",
    "activity": "ស្តង់ដារទី៤ ៖ អភិបាលកិច្ចសាលារៀន",
    "yearN": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN1": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN2": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN3": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    }
  },
  {
    "id": "t2_24",
    "rowIdx": 24,
    "standardId": 4,
    "category": "ACTIVITY",
    "code": "",
    "activity": "១. ការគ្រប់គ្រងរដ្ឋបាលទូទៅ",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_25",
    "rowIdx": 25,
    "standardId": 4,
    "category": "ACTIVITY",
    "code": "",
    "activity": "២. ការរៀបចំផែនការអភិវឌ្ឍន៍សាលារៀន",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_26",
    "rowIdx": 26,
    "standardId": 4,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៣. ការវាយតម្លៃបំពេញការងាររបស់បុគ្គលិក",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_27",
    "rowIdx": 27,
    "standardId": 4,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៤. វាយតម្លៃលទ្ធផលសិក្សា",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_28",
    "rowIdx": 28,
    "standardId": 4,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៥. ការលើកកម្ពស់សុខភាពសិក្សា និងអាហារូបត្ថម្ភ",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_29",
    "rowIdx": 29,
    "standardId": 4,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៦. ការអភិវឌ្ឍន៍ហេដ្ឋារចនាសម្ព័ន្ធ",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_30",
    "rowIdx": 30,
    "standardId": 5,
    "category": "STANDARD_HEADER",
    "code": "ស្តង់ដារទី៥ ៖ គណនេយ្យភាព",
    "activity": "ស្តង់ដារទី៥ ៖ គណនេយ្យភាព",
    "yearN": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN1": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN2": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    },
    "yearN3": {
      "state": "0",
      "partner": "0",
      "community": "0",
      "other": "0"
    }
  },
  {
    "id": "t2_31",
    "rowIdx": 31,
    "standardId": 5,
    "category": "ACTIVITY",
    "code": "",
    "activity": "១. ថវិកាសាធារណៈ",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_32",
    "rowIdx": 32,
    "standardId": 5,
    "category": "ACTIVITY",
    "code": "",
    "activity": "២. ការផ្សព្វផ្សាយព័ត៌មានជាសាធារណៈ",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  },
  {
    "id": "t2_33",
    "rowIdx": 33,
    "standardId": 5,
    "category": "ACTIVITY",
    "code": "",
    "activity": "៣. ការទទួលបានការគាំទ្រពីថ្នាក់ជាតិ",
    "yearN": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN1": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN2": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    },
    "yearN3": {
      "state": "",
      "partner": "",
      "community": "",
      "other": ""
    }
  }
];
