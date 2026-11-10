// Client service for MoEYS Strategic Planning AI assistant

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export async function chatWithAI(
  message: string,
  context?: unknown,
  chatHistory?: ChatMessage[]
): Promise<string> {
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, context, chatHistory }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${res.status}: Failed to generate AI reply`);
  }
  const data = await res.json();
  return data.reply;
}

export async function diagnoseStandards(
  schoolProfile: unknown,
  studentStats: unknown,
  infrastructure: unknown,
  challenges: string
): Promise<string> {
  const res = await fetch('/api/ai/diagnose', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ schoolProfile, studentStats, infrastructure, challenges }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${res.status}: Failed to diagnose standards`);
  }
  const data = await res.json();
  return data.analysis;
}

export async function suggestTargetsForTable1(
  indicators: unknown[],
  schoolContext: unknown
): Promise<string> {
  const res = await fetch('/api/ai/suggest-targets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ indicators, schoolContext }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${res.status}: Failed to suggest targets`);
  }
  const data = await res.json();
  return data.suggestions;
}

export async function suggestActivitiesForTable2(
  focusArea: string,
  budgetNeeds: string
): Promise<string> {
  const res = await fetch('/api/ai/suggest-activities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ focusArea, budgetNeeds }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${res.status}: Failed to suggest activities`);
  }
  const data = await res.json();
  return data.activities;
}

export async function generatePitchOrLetter(
  type: 'speech' | 'letter',
  schoolData: unknown,
  audience?: string
): Promise<string> {
  const res = await fetch('/api/ai/generate-pitch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, schoolData, audience }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${res.status}: Failed to generate pitch`);
  }
  const data = await res.json();
  return data.content;
}
