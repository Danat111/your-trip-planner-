import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Talks to the exact same backend as the web app (see /server). This is the
 * whole point of building a real backend first: the web app and the mobile
 * app share one source of truth for auth, trips, and AI generation instead
 * of duplicating logic (or, worse, duplicating embedded API keys).
 */

// Point this at your deployed API. For local development on a physical
// device, use your computer's LAN IP instead of localhost (e.g. 192.168.x.x).
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000';

const TOKEN_KEY = 'trip_planner_token';

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function setToken(token: string): Promise<void> {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function clearToken(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || `Request failed (${res.status})`);
  }
  return json.data as T;
}

export const api = {
  login: (email: string, password: string) =>
    request<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    request<{ token: string; user: any }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  generateTripPlan: (params: {
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    interests: string[];
    travelStyle: string;
    accommodation: string;
  }) =>
    request<any>('/api/trip-planner/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  listTrips: () => request<any[]>('/api/trips'),

  saveTrip: (trip: unknown) =>
    request<any>('/api/trips', { method: 'POST', body: JSON.stringify(trip) }),

  deleteTrip: (id: string) => request<void>(`/api/trips/${id}`, { method: 'DELETE' }),
};
