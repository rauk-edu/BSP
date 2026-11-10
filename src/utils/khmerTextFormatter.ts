/**
 * Utility for formatting Khmer text, paragraphs, and dash/bullet lists.
 * Enforces proper Khmer typography:
 * 1. Paragraph indentation (ការចូលកថាខណ្ឌ)
 * 2. Breaking chained inline dashes (`- កកក - ខខខ`) into separate lines
 * 3. Hanging indent (មិនឱ្យអក្សរចុះបន្ទាត់ចូលទៅក្រោមសញ្ញា - ឡើយ)
 */

export interface ContentBlock {
  type: 'header' | 'paragraph' | 'bullet';
  text: string;
}

/**
 * Splits chained inline bullet points (e.g. "- Item 1 - Item 2 &bull; Item 3") into an array of clean items.
 * Preserves hyphenated words (e.g. School-Based) and year ranges (e.g. ២០២៦-២០២៨).
 */
export function splitKhmerBullets(rawText: string | undefined | null): string[] {
  if (!rawText || !rawText.trim()) return [];

  // Normalize HTML entities and alternative bullets to standard newline dash
  let normalized = rawText
    .replace(/&bull;/gi, '\n- ')
    .replace(/[•●▪]/g, '\n- ')
    .replace(/\r\n/g, '\n');

  // Split inline chained dashes:
  // Match whitespace followed by a dash and whitespace or Khmer words: e.g. " - "
  // Do NOT match hyphens inside words (e.g. "កង់-ម៉ូតូ", "School-Based") or year ranges "២០២៦-២០២៨"
  normalized = normalized.replace(/([^\n])\s+-\s+([^\d\s\-])/g, '$1\n- $2');

  // Split lines
  const rawLines = normalized.split('\n');
  const items: string[] = [];

  for (const line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check if line contains inline chained dashes that didn't have space before them
    // e.g. "អត្ថបទ។ - ចំណុចថ្មី"
    const subSegments = trimmed.split(/(?<=\S)\s*-\s+(?=[^\d\s\-])/);

    for (const seg of subSegments) {
      const cleanSeg = seg.trim().replace(/^[-•*]\s*/, '').trim();
      if (cleanSeg) {
        items.push(cleanSeg);
      }
    }
  }

  return items;
}

/**
 * Normalizes text so that all chained inline dashes are broken into clean lines starting with "- "
 */
export function normalizeKhmerBulletString(rawText: string | undefined | null): string {
  if (!rawText || !rawText.trim()) return '';
  const bullets = splitKhmerBullets(rawText);
  if (bullets.length === 0) return '';
  return bullets.map((b) => `- ${b}`).join('\n');
}

/**
 * Parses multi-paragraph structured text (like School History) into headers, paragraphs, and bullets.
 */
export function parseKhmerContentBlocks(rawText: string | undefined | null): ContentBlock[] {
  if (!rawText || !rawText.trim()) return [];

  const normalized = rawText
    .replace(/&bull;/gi, '\n- ')
    .replace(/[•●▪]/g, '\n- ')
    .replace(/\r\n/g, '\n')
    // Break inline dashes
    .replace(/([^\n])\s+-\s+([^\d\s\-])/g, '$1\n- $2');

  const lines = normalized.split('\n');
  const blocks: ContentBlock[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // 1. Header (starts with * or #)
    if (line.startsWith('*') || line.startsWith('#')) {
      const headerText = line.replace(/^[*#]+\s*/, '').trim();
      if (headerText) {
        blocks.push({ type: 'header', text: headerText });
      }
      continue;
    }

    // 2. Bullet point (starts with - or sub-segmented)
    if (line.startsWith('-') || line.startsWith('•')) {
      // Check if there are further inline dashes
      const subSegments = line.split(/(?<=\S)\s*-\s+(?=[^\d\s\-])/);
      for (const seg of subSegments) {
        const cleanSeg = seg.trim().replace(/^[-•*]\s*/, '').trim();
        if (cleanSeg) {
          blocks.push({ type: 'bullet', text: cleanSeg });
        }
      }
      continue;
    }

    // 3. Regular narrative paragraph
    blocks.push({ type: 'paragraph', text: line });
  }

  return blocks;
}
