// Utility functions for MoEYS BSP-3Years calculations, data syncing, and exports
import { IndicatorRow, ActivityBudgetRow } from '../data/bspData';

export function parseNumber(val: string | number | undefined | null): number {
  if (val === undefined || val === null) return 0;
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  const cleaned = val.replace(/,/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export function formatRiel(val: number | string | undefined | null): string {
  const num = typeof val === 'number' ? val : parseNumber(val);
  return Math.round(num).toLocaleString('en-US');
}

export interface Table1Summaries {
  grandTotalBudgetN1: number;
  grandTotalTargetN1: number;
  standardTotals: Record<number, { budgetN1: number; targetN1: number; targetN1Budget: number }>;
}

export function computeTable1Summaries(rows: IndicatorRow[]): Table1Summaries {
  const standardTotals: Record<number, { budgetN1: number; targetN1: number; targetN1Budget: number }> = {};

  for (let i = 1; i <= 5; i++) {
    standardTotals[i] = { budgetN1: 0, targetN1: 0, targetN1Budget: 0 };
  }

  let grandTotalBudgetN1 = 0;
  let grandTotalTargetN1 = 0;

  // First check if there is an explicit GRAND_TOTAL row
  const grandTotalRow = rows.find((r) => r.category === 'GRAND_TOTAL');
  if (grandTotalRow) {
    grandTotalBudgetN1 = parseNumber(grandTotalRow.budgetYearN1);
    grandTotalTargetN1 = parseNumber(grandTotalRow.targetNPlus1);
  }

  // Calculate totals per standard
  rows.forEach((row) => {
    if (row.standardId >= 1 && row.standardId <= 5) {
      if (row.category === 'STANDARD_HEADER') {
        const b = parseNumber(row.budgetYearN1);
        const t = parseNumber(row.targetNPlus1);
        if (b > 0) standardTotals[row.standardId].budgetN1 = b;
        if (t > 0) {
          standardTotals[row.standardId].targetN1 = t;
          standardTotals[row.standardId].targetN1Budget = t;
        }
      }
    }
  });

  // If STANDARD_HEADER was 0, sum sub-indicators
  for (let stdId = 1; stdId <= 5; stdId++) {
    if (standardTotals[stdId].budgetN1 === 0) {
      const sumBudget = rows
        .filter((r) => r.standardId === stdId && r.category === 'KEY_INDICATOR')
        .reduce((sum, r) => sum + parseNumber(r.budgetYearN1), 0);
      standardTotals[stdId].budgetN1 = sumBudget;
    }
    if (standardTotals[stdId].targetN1 === 0) {
      const sumTarget = rows
        .filter((r) => r.standardId === stdId && r.category === 'KEY_INDICATOR')
        .reduce((sum, r) => sum + parseNumber(r.targetNPlus1), 0);
      standardTotals[stdId].targetN1 = sumTarget;
      standardTotals[stdId].targetN1Budget = sumTarget;
    }
  }

  // If grand total row was missing or 0, sum standard totals
  if (grandTotalBudgetN1 === 0) {
    grandTotalBudgetN1 = Object.values(standardTotals).reduce((sum, s) => sum + s.budgetN1, 0);
  }
  if (grandTotalTargetN1 === 0) {
    grandTotalTargetN1 = Object.values(standardTotals).reduce((sum, s) => sum + s.targetN1, 0);
  }

  return {
    grandTotalBudgetN1,
    grandTotalTargetN1,
    standardTotals,
  };
}

export interface YearBudgetBreakdown {
  total: number;
  state: number;
  partner: number;
  community: number;
  other: number;
}

export interface Table2Summaries {
  grandTotal: {
    yearN: YearBudgetBreakdown;
    yearN1: YearBudgetBreakdown;
    yearN2: YearBudgetBreakdown;
    yearN3: YearBudgetBreakdown;
  };
  standardTotals: Record<
    number,
    {
      yearN: YearBudgetBreakdown;
      yearN1: YearBudgetBreakdown;
      yearN2: YearBudgetBreakdown;
      yearN3: YearBudgetBreakdown;
    }
  >;
}

export function computeTable2Summaries(rows: ActivityBudgetRow[]): Table2Summaries {
  const createEmptyBreakdown = (): YearBudgetBreakdown => ({
    total: 0,
    state: 0,
    partner: 0,
    community: 0,
    other: 0,
  });

  const grandTotal = {
    yearN: createEmptyBreakdown(),
    yearN1: createEmptyBreakdown(),
    yearN2: createEmptyBreakdown(),
    yearN3: createEmptyBreakdown(),
  };

  const standardTotals: Table2Summaries['standardTotals'] = {};
  for (let i = 1; i <= 5; i++) {
    standardTotals[i] = {
      yearN: createEmptyBreakdown(),
      yearN1: createEmptyBreakdown(),
      yearN2: createEmptyBreakdown(),
      yearN3: createEmptyBreakdown(),
    };
  }

  const addRowToBreakdown = (row: ActivityBudgetRow, target: Table2Summaries['grandTotal']) => {
    (['yearN', 'yearN1', 'yearN2', 'yearN3'] as const).forEach((yearKey) => {
      const year = row[yearKey];
      const s = parseNumber(year.state);
      const p = parseNumber(year.partner);
      const c = parseNumber(year.community);
      const o = parseNumber(year.other);
      const tot = s + p + c + o;

      target[yearKey].state += s;
      target[yearKey].partner += p;
      target[yearKey].community += c;
      target[yearKey].other += o;
      target[yearKey].total += tot;
    });
  };

  // Only aggregate ACTIVITY rows to avoid double-counting headers
  const activityRows = rows.filter((r) => r.category === 'ACTIVITY');
  activityRows.forEach((row) => {
    addRowToBreakdown(row, grandTotal);
    if (row.standardId >= 1 && row.standardId <= 5) {
      addRowToBreakdown(row, standardTotals[row.standardId]);
    }
  });

  // If grand total row exists in data with non-zero state, sync it
  const gtRow = rows.find((r) => r.category === 'GRAND_TOTAL');
  if (gtRow) {
    if (parseNumber(gtRow.yearN.state) > 0 && grandTotal.yearN.state === 0) {
      grandTotal.yearN.state = parseNumber(gtRow.yearN.state);
      grandTotal.yearN.total = grandTotal.yearN.state;
    }
    if (parseNumber(gtRow.yearN1.state) > 0 && grandTotal.yearN1.state === 0) {
      grandTotal.yearN1.state = parseNumber(gtRow.yearN1.state);
      grandTotal.yearN1.total = grandTotal.yearN1.state;
    }
  }

  return {
    grandTotal,
    standardTotals,
  };
}

export function exportToCSV(filename: string, headers: string[], rows: (string | number)[][]): void {
  const escapeCell = (cell: string | number | undefined | null): string => {
    if (cell === undefined || cell === null) return '""';
    const str = String(cell);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return `"${str}"`;
  };

  const csvContent =
    '\uFEFF' +
    [headers.map(escapeCell).join(','), ...rows.map((row) => row.map(escapeCell).join(','))].join(
      '\r\n'
    );

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Map Table 1 KEY_INDICATOR rows (26) 1-to-1 with Table 2 ACTIVITY rows (26) by sequential order within each Standard (1..5)
function buildIndicatorActivityIndexMap(
  table1: IndicatorRow[],
  table2: ActivityBudgetRow[]
): {
  keyToAct: Map<string, ActivityBudgetRow>;
  actToKey: Map<string, IndicatorRow>;
  stdToT2Header: Map<number, ActivityBudgetRow>;
  stdToT1Header: Map<number, IndicatorRow>;
} {
  const keyToAct = new Map<string, ActivityBudgetRow>();
  const actToKey = new Map<string, IndicatorRow>();
  const stdToT2Header = new Map<number, ActivityBudgetRow>();
  const stdToT1Header = new Map<number, IndicatorRow>();

  for (let stdId = 1; stdId <= 5; stdId++) {
    const t1Header = table1.find((r) => r.category === 'STANDARD_HEADER' && r.standardId === stdId);
    const t2Header = table2.find((r) => r.category === 'STANDARD_HEADER' && r.standardId === stdId);
    if (t1Header) stdToT1Header.set(stdId, t1Header);
    if (t2Header) stdToT2Header.set(stdId, t2Header);

    const t1Keys = table1.filter((r) => r.category === 'KEY_INDICATOR' && r.standardId === stdId);
    const t2Acts = table2.filter((r) => r.category === 'ACTIVITY' && r.standardId === stdId);

    const count = Math.min(t1Keys.length, t2Acts.length);
    for (let i = 0; i < count; i++) {
      keyToAct.set(t1Keys[i].id, t2Acts[i]);
      actToKey.set(t2Acts[i].id, t1Keys[i]);
    }
  }

  return { keyToAct, actToKey, stdToT2Header, stdToT1Header };
}

function getSourceTotal(src: { state: string; partner: string; community: string; other: string }): number {
  return parseNumber(src.state) + parseNumber(src.partner) + parseNumber(src.community) + parseNumber(src.other);
}

// Distribute a new parent KEY_INDICATOR budget proportionally across its child SUB_INDICATOR rows
function scaleSubIndicatorsForKeys(
  rows: IndicatorRow[],
  keyBudgetUpdates: Map<string, { budgetYearN1: string; targetNPlus1: string }>
): IndicatorRow[] {
  // Group SUB_INDICATOR indices by preceding KEY_INDICATOR id
  const subGroups = new Map<string, number[]>();
  let currentKeyId: string | null = null;

  rows.forEach((row, idx) => {
    if (row.category === 'KEY_INDICATOR') {
      currentKeyId = row.id;
      subGroups.set(currentKeyId, []);
    } else if (row.category === 'STANDARD_HEADER' || row.category === 'GRAND_TOTAL') {
      currentKeyId = null;
    } else if (row.category === 'SUB_INDICATOR' && currentKeyId) {
      subGroups.get(currentKeyId)?.push(idx);
    }
  });

  const next = rows.map((r) => ({ ...r }));

  subGroups.forEach((subIndices, keyId) => {
    const upd = keyBudgetUpdates.get(keyId);
    if (!upd || subIndices.length === 0) return;

    const newB = parseNumber(upd.budgetYearN1);
    const newT = parseNumber(upd.targetNPlus1);

    const oldBSum = subIndices.reduce((s, idx) => s + parseNumber(next[idx].budgetYearN1), 0);
    const oldTSum = subIndices.reduce((s, idx) => s + parseNumber(next[idx].targetNPlus1), 0);

    let allocatedB = 0;
    let allocatedT = 0;

    subIndices.forEach((idx, pos) => {
      const isLast = pos === subIndices.length - 1;
      if (newB > 0) {
        const valB = isLast
          ? Math.max(0, newB - allocatedB)
          : oldBSum > 0
          ? Math.round((parseNumber(next[idx].budgetYearN1) / oldBSum) * newB / 100) * 100
          : Math.round(newB / subIndices.length);
        allocatedB += valB;
        next[idx].budgetYearN1 = formatRiel(valB);
      }
      if (newT > 0) {
        const valT = isLast
          ? Math.max(0, newT - allocatedT)
          : oldTSum > 0
          ? Math.round((parseNumber(next[idx].targetNPlus1) / oldTSum) * newT / 100) * 100
          : Math.round(newT / subIndices.length);
        allocatedT += valT;
        next[idx].targetNPlus1 = formatRiel(valT);
      }
    });
  });

  return next;
}

// Two-way sync functions between Table 1 and Table 2
export function syncTable1ToTable2(
  table1: IndicatorRow[],
  table2: ActivityBudgetRow[]
): ActivityBudgetRow[] {
  const { actToKey } = buildIndicatorActivityIndexMap(table1, table2);
  const t1Summaries = computeTable1Summaries(table1);
  const t1GrandTotal = table1.find((r) => r.category === 'GRAND_TOTAL');
  const t1BudgetN1 = t1GrandTotal?.budgetYearN1 || formatRiel(t1Summaries.grandTotalBudgetN1);
  const t1TargetN1 = t1GrandTotal?.targetNPlus1 || formatRiel(t1Summaries.grandTotalTargetN1);

  return table2.map((row) => {
    if (row.category === 'GRAND_TOTAL') {
      return {
        ...row,
        yearN: { ...row.yearN, state: t1BudgetN1 },
        yearN1: { ...row.yearN1, state: t1TargetN1 },
      };
    }
    if (row.category === 'STANDARD_HEADER') {
      const stdHdr = table1.find(
        (r) => r.category === 'STANDARD_HEADER' && r.standardId === row.standardId
      );
      const b = stdHdr?.budgetYearN1 || formatRiel(t1Summaries.standardTotals[row.standardId]?.budgetN1 || 0);
      const t = stdHdr?.targetNPlus1 || formatRiel(t1Summaries.standardTotals[row.standardId]?.targetN1 || 0);
      return {
        ...row,
        yearN: { ...row.yearN, state: b },
        yearN1: { ...row.yearN1, state: t },
      };
    }
    if (row.category === 'ACTIVITY') {
      const keyRow = actToKey.get(row.id);
      if (keyRow) {
        return {
          ...row,
          yearN: {
            ...row.yearN,
            state: keyRow.budgetYearN1 || row.yearN.state,
          },
          yearN1: {
            ...row.yearN1,
            state: keyRow.targetNPlus1 || row.yearN1.state,
          },
        };
      }
    }
    return row;
  });
}

export function syncTable2ToTable1(
  table2: ActivityBudgetRow[],
  table1: IndicatorRow[]
): IndicatorRow[] {
  const { keyToAct } = buildIndicatorActivityIndexMap(table1, table2);
  const t2Summaries = computeTable2Summaries(table2);
  const keyBudgetUpdates = new Map<string, { budgetYearN1: string; targetNPlus1: string }>();

  const updated = table1.map((row) => {
    if (row.category === 'GRAND_TOTAL') {
      const gtN = t2Summaries.grandTotal.yearN.state || t2Summaries.grandTotal.yearN.total;
      const gtN1 = t2Summaries.grandTotal.yearN1.state || t2Summaries.grandTotal.yearN1.total;
      return {
        ...row,
        ...(gtN > 0 ? { budgetYearN1: formatRiel(gtN) } : {}),
        ...(gtN1 > 0 ? { targetNPlus1: formatRiel(gtN1) } : {}),
      };
    }
    if (row.category === 'STANDARD_HEADER') {
      const st = t2Summaries.standardTotals[row.standardId];
      if (st) {
        const sN = st.yearN.state || st.yearN.total;
        const sN1 = st.yearN1.state || st.yearN1.total;
        return {
          ...row,
          ...(sN > 0 ? { budgetYearN1: formatRiel(sN) } : {}),
          ...(sN1 > 0 ? { targetNPlus1: formatRiel(sN1) } : {}),
        };
      }
    }
    if (row.category === 'KEY_INDICATOR') {
      const act = keyToAct.get(row.id);
      if (act) {
        const aN = parseNumber(act.yearN.state) || getSourceTotal(act.yearN);
        const aN1 = parseNumber(act.yearN1.state) || getSourceTotal(act.yearN1);
        const newB = aN > 0 ? formatRiel(aN) : row.budgetYearN1;
        const newT = aN1 > 0 ? formatRiel(aN1) : row.targetNPlus1;
        keyBudgetUpdates.set(row.id, { budgetYearN1: newB, targetNPlus1: newT });
        return {
          ...row,
          budgetYearN1: newB,
          targetNPlus1: newT,
        };
      }
    }
    return row;
  });

  return scaleSubIndicatorsForKeys(updated, keyBudgetUpdates);
}

/**
 * Roll forward to Next Year ("នៅឆ្នាំបន្ទាប់ ត្រូវយកទិន្នន័យតារាងទី២ កំណត់ក្នុងស្តង់ដា និងសូចនាករ តារាងទី១ គោលដៅសមិទ្ធិកម្ម"):
 * - Table 2's yearN1 becomes the new Table 1 Financial Law budget (budgetYearN1)
 * - Table 2's yearN2 becomes the new Table 1 Target N+1 budget (targetNPlus1)
 * - Performance target columns shift forward by 1 year (targetNMinus1 <- targetN, targetNPlus2 <- targetNPlus3)
 * - Table 2 shifts forward by 1 year (yearN <- yearN1, yearN1 <- yearN2, yearN2 <- yearN3)
 */
export function applyTable2NextYearToTable1(
  table1: IndicatorRow[],
  table2: ActivityBudgetRow[]
): { nextTable1: IndicatorRow[]; nextTable2: ActivityBudgetRow[] } {
  const { keyToAct } = buildIndicatorActivityIndexMap(table1, table2);
  const t2Summaries = computeTable2Summaries(table2);
  const keyBudgetUpdates = new Map<string, { budgetYearN1: string; targetNPlus1: string }>();

  const nextT1Draft = table1.map((row) => {
    if (row.category === 'GRAND_TOTAL') {
      const gtN1 = t2Summaries.grandTotal.yearN1.total || t2Summaries.grandTotal.yearN1.state;
      const gtN2 = t2Summaries.grandTotal.yearN2.total || t2Summaries.grandTotal.yearN2.state;
      return {
        ...row,
        budgetYearN1: gtN1 > 0 ? formatRiel(gtN1) : row.budgetYearN1,
        targetNPlus1: gtN2 > 0 ? formatRiel(gtN2) : row.targetNPlus1,
      };
    }

    if (row.category === 'STANDARD_HEADER') {
      const st = t2Summaries.standardTotals[row.standardId];
      const sN1 = st ? st.yearN1.total || st.yearN1.state : 0;
      const sN2 = st ? st.yearN2.total || st.yearN2.state : 0;
      return {
        ...row,
        budgetYearN1: sN1 > 0 ? formatRiel(sN1) : row.budgetYearN1,
        targetNPlus1: sN2 > 0 ? formatRiel(sN2) : row.targetNPlus1,
      };
    }

    if (row.category === 'KEY_INDICATOR') {
      const act = keyToAct.get(row.id);
      const aN1 = act ? getSourceTotal(act.yearN1) : 0;
      const aN2 = act ? getSourceTotal(act.yearN2) : 0;
      const newB = aN1 > 0 ? formatRiel(aN1) : row.budgetYearN1;
      const newT = aN2 > 0 ? formatRiel(aN2) : row.targetNPlus1;
      keyBudgetUpdates.set(row.id, { budgetYearN1: newB, targetNPlus1: newT });

      return {
        ...row,
        budgetYearN1: newB,
        targetNPlus1: newT,
        targetNMinus1: row.targetN || row.targetNMinus1,
        targetNPlus2: row.targetNPlus3 || row.targetNPlus2,
      };
    }

    // SUB_INDICATOR & DISAGGREGATION: shift indicator target years forward
    return {
      ...row,
      targetNMinus1: row.targetN || row.targetNMinus1,
      targetNPlus2: row.targetNPlus3 || row.targetNPlus2,
    };
  });

  const nextTable1 = scaleSubIndicatorsForKeys(nextT1Draft, keyBudgetUpdates);

  const nextTable2 = table2.map((row) => ({
    ...row,
    yearN: { ...row.yearN1 },
    yearN1: { ...row.yearN2 },
    yearN2: { ...row.yearN3 },
    yearN3: { ...row.yearN3 },
  }));

  return { nextTable1, nextTable2 };
}

