import axios from 'axios';

/**
 * All third-party travel API calls happen HERE, on the server, using keys
 * loaded from environment variables. The frontend never sees these keys —
 * it only talks to our own /api/* endpoints. This is the fix for the
 * critical issue in the original prototype, which called these APIs
 * directly from the browser with embedded secrets.
 *
 * Every call is defensive: if a key is missing or the provider errors out,
 * we return a typed "unavailable" result instead of throwing, so the trip
 * generator can still produce a plan with partial data.
 */

interface ProviderResult<T> {
  available: boolean;
  data?: T;
  error?: string;
}

export async function getWeatherForecast(lat: number, lon: number): Promise<ProviderResult<any>> {
  const key = process.env.OPENWEATHERMAP_API_KEY;
  if (!key) return { available: false, error: 'OPENWEATHERMAP_API_KEY not configured' };

  try {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: { lat, lon, appid: key, units: 'metric' },
      timeout: 8000,
    });
    return { available: true, data };
  } catch (err: any) {
    return { available: false, error: err.message };
  }
}

export async function searchPlaces(query: string): Promise<ProviderResult<any>> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return { available: false, error: 'GOOGLE_PLACES_API_KEY not configured' };

  try {
    const { data } = await axios.get(
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      { params: { query, key }, timeout: 8000 },
    );
    return { available: true, data };
  } catch (err: any) {
    return { available: false, error: err.message };
  }
}

export async function searchNearbyAttractions(lat: number, lon: number): Promise<ProviderResult<any>> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return { available: false, error: 'GOOGLE_PLACES_API_KEY not configured' };

  try {
    const { data } = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      { params: { location: `${lat},${lon}`, radius: 20000, type: 'tourist_attraction', key }, timeout: 8000 },
    );
    return { available: true, data };
  } catch (err: any) {
    return { available: false, error: err.message };
  }
}

// Amadeus uses OAuth2 client-credentials; token is cached in-memory on the server.
let amadeusToken: { value: string; expiresAt: number } | null = null;

async function getAmadeusToken(): Promise<string | null> {
  const key = process.env.AMADEUS_API_KEY;
  const secret = process.env.AMADEUS_API_SECRET;
  if (!key || !secret) return null;

  if (amadeusToken && amadeusToken.expiresAt > Date.now()) {
    return amadeusToken.value;
  }

  try {
    const { data } = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({ grant_type: 'client_credentials', client_id: key, client_secret: secret }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 8000 },
    );
    amadeusToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
    return amadeusToken.value;
  } catch {
    return null;
  }
}

export async function searchHotels(cityCode: string, checkIn: string, checkOut: string): Promise<ProviderResult<any>> {
  const token = await getAmadeusToken();
  if (!token) return { available: false, error: 'Amadeus not configured or auth failed' };

  try {
    const { data } = await axios.get('https://test.api.amadeus.com/v2/shopping/hotel-offers', {
      params: { cityCode, checkInDate: checkIn, checkOutDate: checkOut, adults: 2 },
      headers: { Authorization: `Bearer ${token}` },
      timeout: 8000,
    });
    return { available: true, data };
  } catch (err: any) {
    return { available: false, error: err.message };
  }
}
