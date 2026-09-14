/**
 * Secure replacement for the old `apiAggregator`.
 *
 * The previous implementation called Amadeus / Google Places / OpenWeatherMap
 * directly from the browser with API keys read from `process.env`, which:
 *   1) doesn't work in a Vite browser bundle (no `process.env` at runtime), and
 *   2) would expose secret keys to anyone opening devtools, even if it did.
 *
 * This client only ever talks to OUR OWN backend (see /server). The backend
 * holds every secret and does the real work: live data lookups + calling
 * Claude to generate the itinerary.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export interface TripPlanParams {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  interests: string[];
  travelStyle: string;
  accommodation: string;
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const secureApiClient = {
  async generateTripPlan(params: TripPlanParams): Promise<ApiResult<any>> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/trip-planner/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      if (!res.ok) {
        return { success: false, error: json.error || `Request failed (${res.status})` };
      }
      return { success: true, data: json.data };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  },

  async login(email: string, password: string): Promise<ApiResult<{ token: string; user: any }>> {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    return res.ok ? { success: true, data: json.data } : { success: false, error: json.error };
  },

  async register(name: string, email: string, password: string): Promise<ApiResult<{ token: string; user: any }>> {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await res.json();
    return res.ok ? { success: true, data: json.data } : { success: false, error: json.error };
  },

  async saveTrip(token: string, trip: unknown): Promise<ApiResult<any>> {
    const res = await fetch(`${API_BASE_URL}/api/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(trip),
    });
    const json = await res.json();
    return res.ok ? { success: true, data: json.data } : { success: false, error: json.error };
  },
};
