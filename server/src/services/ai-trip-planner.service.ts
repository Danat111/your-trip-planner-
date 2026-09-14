import Anthropic from '@anthropic-ai/sdk';

/**
 * This is the *real* AI feature: instead of the prototype's fixed
 * "distribute attractions evenly across days" logic, we send the
 * destination, dates, budget, interests and any live data we could
 * fetch (weather, attractions) to Claude and ask it to reason about
 * a genuinely personalized day-by-day itinerary, with a JSON schema
 * we can render directly in the UI.
 */

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface TripPlanRequest {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelStyle: string;
  interests: string[];
  accommodation: string;
  weatherContext?: unknown;
  attractionsContext?: unknown;
}

export interface AiDayPlan {
  day: number;
  date: string;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  estimatedCost: string;
  tips: string;
}

export interface AiTripPlan {
  summary: string;
  days: AiDayPlan[];
  budgetBreakdown: { category: string; estimate: string }[];
  packingTips: string[];
}

const SYSTEM_PROMPT = `You are a professional travel planner. You produce realistic,
specific, day-by-day itineraries tailored to the traveler's stated budget, interests,
and travel style. Use any weather or attraction data provided to make sensible choices
(e.g. suggest indoor activities on rainy days). Respond ONLY with valid JSON matching
this exact TypeScript type, with no markdown fences and no commentary:

type TripPlan = {
  summary: string; // 2-3 sentences overview of the trip
  days: {
    day: number;
    date: string; // YYYY-MM-DD
    title: string; // short theme for the day
    morning: string;
    afternoon: string;
    evening: string;
    estimatedCost: string; // e.g. "$40-60"
    tips: string;
  }[];
  budgetBreakdown: { category: string; estimate: string }[];
  packingTips: string[];
};`;

export async function generateAiTripPlan(req: TripPlanRequest): Promise<AiTripPlan> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not configured on the server');
  }

  const userPrompt = `Plan a trip with these details:
- Destination: ${req.destination}
- Dates: ${req.startDate} to ${req.endDate}
- Budget level: ${req.budget}
- Travel style: ${req.travelStyle}
- Interests: ${req.interests.join(', ') || 'general sightseeing'}
- Accommodation preference: ${req.accommodation}
${req.weatherContext ? `- Weather forecast data: ${JSON.stringify(req.weatherContext).slice(0, 2000)}` : ''}
${req.attractionsContext ? `- Nearby attractions data: ${JSON.stringify(req.attractionsContext).slice(0, 3000)}` : ''}

Return the JSON now.`;

  const message = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 4000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('AI response contained no text content');
  }

  const cleaned = textBlock.text.trim().replace(/^```json\s*|```$/g, '');
  try {
    return JSON.parse(cleaned) as AiTripPlan;
  } catch {
    throw new Error('Failed to parse AI response as JSON');
  }
}
