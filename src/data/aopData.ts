import { IndicatorRow, ActivityBudgetRow } from './bspData';
import { parseNumber, formatRiel, computeTable2Summaries } from '../utils/bspUtils';

export interface AopIndicatorRow {
  id: string;
  rowIdx: number;
  standardId: number;
  category: 'GRAND_TOTAL' | 'STANDARD_HEADER' | 'KEY_INDICATOR' | 'SUB_INDICATOR' | 'DISAGGREGATION';
  code: string;
  title: string;
  unit: string;                     // ឯកតា (%, នាក់, ដង, ខ្នង, របាយការណ៍...)
  currentResultN: string;           // លទ្ធផលសូចនាករឆ្នាំបច្ចុប្បន្ន (N)
  targetBudgetN1: string;           // គោលដៅសូចនាករគ្រោងថវិកា (N+1)
  stateBudgetN1: string;            // ឆ្នាំគ្រោងថវិកា (ឆ្នាំ N+1) - ថវិការដ្ឋ
  nonStateBudgetN1: string;         // ឆ្នាំគ្រោងថវិកា (ឆ្នាំ N+1) - ថវិកាក្រៅពីរដ្ឋ (ដៃគូ + សហគមន៍ + ផ្សេងៗ)
  totalBudgetN1: string;            // ឆ្នាំគ្រោងថវិកា (ឆ្នាំ N+1) - ថវិកាសរុប (រដ្ឋ + ក្រៅពីរដ្ឋ)
}

/**
 * Derives initial AOP indicator rows from 3-Year BSP Table 1 and Table 2.
 * Copies:
 * - code, title, category, standardId, rowIdx
 * - currentResultN = table1 row.targetN (លទ្ធផលឆ្នាំបច្ចុប្បន្ន N)
 * - targetBudgetN1 = table1 row.targetNPlus1 (គោលដៅ N+1)
 * - stateBudgetN1 = table1 row.budgetYearN1
 * - nonStateBudgetN1 = partner + community + other from matching Table 2 yearN1 row
 * - totalBudgetN1 = stateBudgetN1 + nonStateBudgetN1
 */
export function buildAopRowsFromBsp(
  table1Rows: IndicatorRow[],
  table2Rows?: ActivityBudgetRow[]
): AopIndicatorRow[] {
  // Build 1-to-1 map from Table 1 KEY_INDICATOR to Table 2 ACTIVITY
  const keyToAct = new Map<string, ActivityBudgetRow>();
  const t2Summaries = table2Rows ? computeTable2Summaries(table2Rows) : null;

  if (table2Rows) {
    for (let stdId = 1; stdId <= 5; stdId++) {
      const t1Keys = table1Rows.filter((r) => r.category === 'KEY_INDICATOR' && r.standardId === stdId);
      const t2Acts = table2Rows.filter((r) => r.category === 'ACTIVITY' && r.standardId === stdId);
      const count = Math.min(t1Keys.length, t2Acts.length);
      for (let i = 0; i < count; i++) {
        keyToAct.set(t1Keys[i].id, t2Acts[i]);
      }
    }
  }

  return table1Rows.map((row) => {
    // Determine unit
    let unit = '';
    const titleLower = row.title.toLowerCase();
    if (titleLower.includes('ភាគរយ') || row.targetN.includes('%') || row.targetNPlus1.includes('%')) {
      unit = '%';
    } else if (titleLower.includes('ចំនួនដង') || titleLower.includes('ដង')) {
      unit = 'ដង';
    } else if (titleLower.includes('សិស្ស') || titleLower.includes('កុមារ') || titleLower.includes('គ្រូ')) {
      unit = 'នាក់';
    } else if (titleLower.includes('អគារ') || titleLower.includes('ខ្នង')) {
      unit = 'ខ្នង';
    } else if (titleLower.includes('បន្ទប់')) {
      unit = 'បន្ទប់';
    } else if (row.targetN.includes('មាន') || row.targetNPlus1.includes('មាន') || titleLower.includes('របាយការណ៍')) {
      unit = 'របាយការណ៍';
    }

    const currentN = row.targetN || '';
    const targetN1 = row.targetNPlus1 || '';
    const stateBud = row.budgetYearN1 || (row.category === 'GRAND_TOTAL' ? '13,953,100' : '');

    // Compute non-state budget from Table 2 yearN1 (partner + community + other)
    let nonStateNum = 0;
    if (row.category === 'GRAND_TOTAL' && t2Summaries) {
      const y = t2Summaries.grandTotal.yearN1;
      nonStateNum = y.partner + y.community + y.other;
    } else if (row.category === 'STANDARD_HEADER' && t2Summaries) {
      const y = t2Summaries.standardTotals[row.standardId]?.yearN1;
      if (y) nonStateNum = y.partner + y.community + y.other;
    } else if (row.category === 'KEY_INDICATOR') {
      const act = keyToAct.get(row.id);
      if (act) {
        nonStateNum =
          parseNumber(act.yearN1.partner) +
          parseNumber(act.yearN1.community) +
          parseNumber(act.yearN1.other);
      }
    }

    const nonStateBud = nonStateNum > 0 ? formatRiel(nonStateNum) : '';
    const stateNum = parseNumber(stateBud);
    const totalBud = stateNum + nonStateNum > 0 ? formatRiel(stateNum + nonStateNum) : stateBud;

    return {
      id: `aop_${row.id}`,
      rowIdx: row.rowIdx,
      standardId: row.standardId,
      category: row.category,
      code: row.code,
      title: row.title,
      unit,
      currentResultN: currentN,
      targetBudgetN1: targetN1,
      stateBudgetN1: stateBud,
      nonStateBudgetN1: nonStateBud,
      totalBudgetN1: totalBud,
    };
  });
}
