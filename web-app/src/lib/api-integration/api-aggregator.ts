/**
 * @deprecated DO NOT USE — kept only for reference.
 *
 * This file calls third-party APIs directly from the browser using
 * `process.env.*` secrets, which does not work in a Vite bundle and, if it
 * did, would ship secret API keys to every visitor's browser. It has been
 * replaced by `secure-api-client.ts`, which calls our own backend
 * (see /server) — that backend is the only place these keys should live.
 * This file is left in place only so the original logic (data shaping,
 * itinerary distribution) can be referenced; it is not imported anywhere.
 *
 * API Aggregator Layer
 *
 * This module provides a unified interface for accessing various travel-related APIs.
 * It handles authentication, caching, error handling, and data normalization.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Types for API providers
export enum ApiProvider {
  AMADEUS = 'amadeus',
  OPENWEATHERMAP = 'openweathermap',
  GOOGLE_PLACES = 'google_places',
  TRIPADVISOR = 'tripadvisor',
}

// Configuration interface for API clients
interface ApiConfig {
  baseURL: string;
  apiKey: string;
  apiSecret?: string;
  timeout?: number;
}

// Extended Axios request config with API properties
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  apiKey?: string;
  apiSecret?: string;
}

// Cache interface
interface CacheItem {
  data: any;
  timestamp: number;
  expiry: number;
}

// API response interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  source: ApiProvider;
  cached?: boolean;
}

// Weather data interface
interface WeatherData {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  cod: string;
  message: number;
  cnt: number;
}

// Place data interface
interface PlaceData {
  results: Array<{
    business_status: string;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    icon: string;
    name: string;
    photos?: Array<{
      height: number;
      html_attributions: string[];
      photo_reference: string;
      width: number;
    }>;
    place_id: string;
    plus_code?: {
      compound_code: string;
      global_code: string;
    };
    rating: number;
    reference: string;
    types: string[];
    user_ratings_total: number;
  }>;
  status: string;
}

// Hotel data interface
interface HotelData {
  data: Array<{
    type: string;
    hotel: {
      type: string;
      hotelId: string;
      chainCode: string;
      dupeId: string;
      name: string;
      rating: string;
      cityCode: string;
      latitude: number;
      longitude: number;
      amenities: string[];
    };
    offers: Array<{
      id: string;
      checkInDate: string;
      checkOutDate: string;
      rateCode: string;
      rateFamilyEstimated: {
        code: string;
        type: string;
      };
      room: {
        type: string;
        typeEstimated: {
          category: string;
          beds: number;
          bedType: string;
        };
        description: {
          text: string;
        };
      };
      guests: {
        adults: number;
      };
      price: {
        currency: string;
        base: string;
        total: string;
        taxes: Array<{
          code: string;
          amount: string;
          included: boolean;
        }>;
      };
    }>;
  }>;
}

/**
 * API Client class for handling API requests
 */
class ApiClient {
  private client: AxiosInstance;
  private cache: Map<string, CacheItem> = new Map();
  private provider: ApiProvider;
  private authToken: string = '';
  private tokenExpiry?: number;
  private apiConfig: ApiConfig;

  constructor(provider: ApiProvider, config: ApiConfig) {
    this.provider = provider;
    this.apiConfig = config;
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Add request interceptor for authentication
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const extendedConfig = config as ExtendedAxiosRequestConfig;
        // Add authentication headers based on provider
        switch (this.provider) {
          case ApiProvider.AMADEUS:
            extendedConfig.apiKey = this.apiConfig.apiKey;
            extendedConfig.apiSecret = this.apiConfig.apiSecret;
            extendedConfig.headers['Authorization'] = `Bearer ${await this.getAmadeusToken(this.apiConfig.apiKey, this.apiConfig.apiSecret)}`;
            break;
          case ApiProvider.OPENWEATHERMAP:
            // OpenWeatherMap uses query parameter for API key
            extendedConfig.params = { ...extendedConfig.params, appid: this.apiConfig.apiKey };
            break;
          case ApiProvider.GOOGLE_PLACES:
            // Google Places uses query parameter for API key
            extendedConfig.params = { ...extendedConfig.params, key: this.apiConfig.apiKey };
            break;
          case ApiProvider.TRIPADVISOR:
            extendedConfig.headers['X-TripAdvisor-API-Key'] = this.apiConfig.apiKey;
            break;
        }
        return extendedConfig;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get authentication token for Amadeus API
   */
  private async getAmadeusToken(apiKey: string, apiSecret?: string): Promise<string> {
    // Check if we have a valid token
    if (this.authToken && this.tokenExpiry && this.tokenExpiry > Date.now()) {
      return this.authToken;
    }

    // Get new token
    try {
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.authToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      return this.authToken;
    } catch (error) {
      console.error('Failed to get Amadeus token:', error);
      throw new Error('Authentication failed');
    }
  }

  /**
   * Make an API request with caching
   */
  public async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    params?: any,
    data?: any,
    cacheTime: number = 5 * 60 * 1000 // 5 minutes default cache time
  ): Promise<ApiResponse<T>> {
    // Generate cache key
    const cacheKey = `${this.provider}:${method}:${endpoint}:${JSON.stringify(params)}:${JSON.stringify(data)}`;

    // Check cache
    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem && cachedItem.expiry > Date.now()) {
      return {
        success: true,
        data: cachedItem.data,
        source: this.provider,
        cached: true,
      };
    }

    // Make request
    try {
      const config: AxiosRequestConfig = {
        method,
        url: endpoint,
        params,
        data,
      };

      const response: AxiosResponse = await this.client.request(config);

      // Cache successful response
      if (cacheTime > 0) {
        this.cache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now(),
          expiry: Date.now() + cacheTime,
        });
      }

      return {
        success: true,
        data: response.data,
        source: this.provider,
        cached: false,
      };
    } catch (error: any) {
      console.error(`API request failed for ${this.provider}:`, error);
      return {
        success: false,
        error: error.message || 'Unknown error',
        source: this.provider,
        cached: false,
      };
    }
  }

  /**
   * Clear cache for this provider
   */
  public clearCache(): void {
    this.cache.clear();
  }
}

/**
 * API Aggregator class for accessing multiple travel APIs
 */
export class ApiAggregator {
  private clients: Map<ApiProvider, ApiClient> = new Map();

  constructor(config: Record<ApiProvider, ApiConfig>) {
    // Initialize API clients
    Object.entries(config).forEach(([provider, providerConfig]) => {
      this.clients.set(provider as ApiProvider, new ApiClient(provider as ApiProvider, providerConfig));
    });
  }

  /**
   * Get API client for a specific provider
   */
  private getClient(provider: ApiProvider): ApiClient {
    const client = this.clients.get(provider);
    if (!client) {
      throw new Error(`API client for ${provider} not configured`);
    }
    return client;
  }

  /**
   * Search for flights
   */
  public async searchFlights(params: {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children?: number;
    infants?: number;
    travelClass?: string;
    nonStop?: boolean;
    currencyCode?: string;
    maxPrice?: number;
  }): Promise<ApiResponse<any>> {
    return this.getClient(ApiProvider.AMADEUS).request(
      '/v2/shopping/flight-offers',
      'GET',
      params
    );
  }

  /**
   * Search for hotels
   */
  public async searchHotels(params: {
    cityCode: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    roomQuantity?: number;
    priceRange?: string;
    currency?: string;
    ratings?: string[];
  }): Promise<ApiResponse<HotelData>> {
    return this.getClient(ApiProvider.AMADEUS).request<HotelData>(
      '/v3/shopping/hotel-offers',
      'GET',
      params
    );
  }

  /**
   * Get weather forecast for a location
   */
  public async getWeatherForecast(params: {
    lat: number;
    lon: number;
    units?: string;
    lang?: string;
  }): Promise<ApiResponse<WeatherData>> {
    return this.getClient(ApiProvider.OPENWEATHERMAP).request<WeatherData>(
      '/data/2.5/forecast',
      'GET',
      params
    );
  }

  /**
   * Search for places
   */
  public async searchPlaces(params: {
    query?: string;
    location?: string;
    radius?: number;
    type?: string;
    language?: string;
  }): Promise<ApiResponse<PlaceData>> {
    return this.getClient(ApiProvider.GOOGLE_PLACES).request<PlaceData>(
      '/maps/api/place/textsearch/json',
      'GET',
      params
    );
  }

  /**
   * Get place details
   */
  public async getPlaceDetails(params: {
    place_id: string;
    fields?: string;
    language?: string;
  }): Promise<ApiResponse<any>> {
    return this.getClient(ApiProvider.GOOGLE_PLACES).request(
      '/maps/api/place/details/json',
      'GET',
      params
    );
  }

  /**
   * Search for attractions
   */
  public async searchAttractions(params: {
    location_id: string;
    language?: string;
  }): Promise<ApiResponse<any>> {
    return this.getClient(ApiProvider.TRIPADVISOR).request(
      '/attractions',
      'GET',
      params
    );
  }

  /**
   * Generate a trip plan based on user preferences
   */
  public async generateTripPlan(params: {
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    interests: string[];
    travelStyle: string;
    accommodation: string;
  }): Promise<ApiResponse<any>> {
    try {
      // Get destination coordinates
      const destinationResult = await this.searchPlaces({
        query: params.destination,
        type: 'locality',
      });

      if (!destinationResult.success || !destinationResult.data?.results?.length) {
        throw new Error('Destination not found');
      }

      const destination = destinationResult.data.results[0];
      const location = destination.geometry.location;
      
      // Get weather forecast
      const weatherResult = await this.getWeatherForecast({
        lat: location.lat,
        lon: location.lng,
        units: 'metric',
      });

      // Search for hotels
      const hotelsResult = await this.searchHotels({
        cityCode: params.destination,
        checkInDate: params.startDate,
        checkOutDate: params.endDate,
        adults: 2,
      });

      // Search for attractions
      const attractionsResult = await this.searchPlaces({
        location: `${location.lat},${location.lng}`,
        radius: 50000,
        type: 'tourist_attraction',
      });

      // Generate trip plan
      const tripPlan = {
        destination: {
          name: params.destination,
          location: location,
          formattedAddress: destination.formatted_address,
        },
        dates: {
          start: params.startDate,
          end: params.endDate,
        },
        weather: weatherResult.success ? weatherResult.data : null,
        accommodations: hotelsResult.success && hotelsResult.data?.data ? 
          hotelsResult.data.data.slice(0, 5).map((hotel: any) => ({
            name: hotel.hotel.name,
            rating: hotel.hotel.rating,
            price: hotel.offers[0].price,
            amenities: hotel.hotel.amenities,
          })) : [],
        attractions: attractionsResult.success && attractionsResult.data?.results ?
          attractionsResult.data.results.slice(0, 10).map((place: any) => ({
            name: place.name,
            address: place.formatted_address,
            rating: place.rating,
            photos: place.photos,
          })) : [],
        dailyItinerary: this.generateDailyItinerary(
          params.startDate,
          params.endDate,
          attractionsResult.success && attractionsResult.data?.results ? attractionsResult.data.results : [],
          weatherResult.success ? weatherResult.data : null
        ),
      };

      return {
        success: true,
        data: tripPlan,
        source: ApiProvider.AMADEUS, // Main source, though it's aggregated
        cached: false,
      };
    } catch (error: any) {
      console.error('Failed to generate trip plan:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate trip plan',
        source: ApiProvider.AMADEUS,
        cached: false,
      };
    }
  }

  /**
   * Generate daily itinerary based on attractions and weather
   */
  private generateDailyItinerary(startDate: string, endDate: string, attractions: any[], weather: any): any[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Distribute attractions across days
    const attractionsPerDay = Math.min(3, Math.ceil(attractions.length / days));
    
    const itinerary = [];
    
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      
      const dayAttractions = attractions.slice(
        i * attractionsPerDay,
        (i + 1) * attractionsPerDay
      );
      
      // Get weather for this day if available
      let dayWeather = null;
      if (weather && weather.list) {
        // Find weather forecast closest to this day
        const targetDate = currentDate.toISOString().split('T')[0];
        dayWeather = weather.list.find((item: any) => 
          item.dt_txt.startsWith(targetDate)
        );
      }
      
      itinerary.push({
        day: i + 1,
        date: currentDate.toISOString().split('T')[0],
        weather: dayWeather ? {
          description: dayWeather.weather[0].description,
          temperature: dayWeather.main.temp,
          icon: dayWeather.weather[0].icon,
        } : null,
        activities: dayAttractions.map(attraction => ({
          name: attraction.name,
          location: attraction.geometry?.location,
          rating: attraction.rating,
          type: 'attraction',
        })),
      });
    }
    
    return itinerary;
  }

  /**
   * Clear all caches
   */
  public clearAllCaches(): void {
    this.clients.forEach(client => client.clearCache());
  }
}

// Export default configuration
export const defaultApiConfig: Record<ApiProvider, ApiConfig> = {
  [ApiProvider.AMADEUS]: {
    baseURL: 'https://test.api.amadeus.com',
    apiKey: process.env.AMADEUS_API_KEY || '',
    apiSecret: process.env.AMADEUS_API_SECRET || '',
    timeout: 15000,
  },
  [ApiProvider.OPENWEATHERMAP]: {
    baseURL: 'https://api.openweathermap.org',
    apiKey: process.env.OPENWEATHERMAP_API_KEY || '',
    timeout: 10000,
  },
  [ApiProvider.GOOGLE_PLACES]: {
    baseURL: 'https://maps.googleapis.com',
    apiKey: process.env.GOOGLE_PLACES_API_KEY || '',
    timeout: 10000,
  },
  [ApiProvider.TRIPADVISOR]: {
    baseURL: 'https://api.tripadvisor.com/api/v1',
    apiKey: process.env.TRIPADVISOR_API_KEY || '',
    timeout: 10000,
  },
};

// Create and export default instance
export const apiAggregator = new ApiAggregator(defaultApiConfig);
export default apiAggregator;
