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

// Two-way sync functions between Table 1 and Table 2
export function syncTable1ToTable2(
  table1: IndicatorRow[],
  table2: ActivityBudgetRow[]
): ActivityBudgetRow[] {
  const t1GrandTotal = table1.find((r) => r.category === 'GRAND_TOTAL');
  const t1BudgetN1 = t1GrandTotal?.budgetYearN1 || '14,052,700';
  const t1TargetN1 = t1GrandTotal?.targetNPlus1 || '13,953,100';

  return table2.map((row) => {
    if (row.category === 'GRAND_TOTAL') {
      return {
        ...row,
        yearN: {
          ...row.yearN,
          state: t1BudgetN1,
        },
        yearN1: {
          ...row.yearN1,
          state: t1TargetN1,
        },
      };
    }
    return row;
  });
}

export function syncTable2ToTable1(
  table2: ActivityBudgetRow[],
  table1: IndicatorRow[]
): IndicatorRow[] {
  const t2GrandTotal = table2.find((r) => r.category === 'GRAND_TOTAL');
  const t2YearNState = t2GrandTotal?.yearN.state || '';
  const t2YearN1State = t2GrandTotal?.yearN1.state || '';

  return table1.map((row) => {
    if (row.category === 'GRAND_TOTAL') {
      return {
        ...row,
        ...(t2YearNState ? { budgetYearN1: t2YearNState } : {}),
        ...(t2YearN1State ? { targetNPlus1: t2YearN1State } : {}),
      };
    }
    return row;
  });
}
