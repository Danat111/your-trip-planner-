import { Router } from 'express';
import { z } from 'zod';
import { generateAiTripPlan } from '../services/ai-trip-planner.service';
import { getWeatherForecast, searchNearbyAttractions, searchPlaces } from '../services/external-apis.service';

const router = Router();

const generateSchema = z.object({
  destination: z.string().min(2),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.enum(['budget', 'mid-range', 'luxury']),
  travelStyle: z.string(),
  interests: z.array(z.string()).default([]),
  accommodation: z.string().default('hotel'),
});

// POST /api/trip-planner/generate
// Public-facing endpoint: looks up the destination, pulls weather + attractions
// from our secure server-side proxy, then asks the real AI service to turn all
// of that into a day-by-day plan.
router.post('/generate', async (req, res) => {
  const parsed = generateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: parsed.error.flatten() });
  }
  const params = parsed.data;

  try {
    const placeResult = await searchPlaces(params.destination);
    const location = placeResult.available
      ? placeResult.data?.results?.[0]?.geometry?.location
      : undefined;

    const [weatherResult, attractionsResult] = await Promise.all([
      location ? getWeatherForecast(location.lat, location.lng) : Promise.resolve({ available: false }),
      location ? searchNearbyAttractions(location.lat, location.lng) : Promise.resolve({ available: false }),
    ]);

    const aiPlan = await generateAiTripPlan({
      ...params,
      weatherContext: weatherResult.available ? (weatherResult as any).data : undefined,
      attractionsContext: attractionsResult.available ? (attractionsResult as any).data?.results : undefined,
    });

    return res.json({
      success: true,
      data: {
        destination: { name: params.destination, location: location ?? null },
        dates: { start: params.startDate, end: params.endDate },
        liveDataAvailable: {
          weather: weatherResult.available,
          attractions: attractionsResult.available,
          places: placeResult.available,
        },
        aiPlan,
      },
    });
  } catch (err: any) {
    return res.status(502).json({ success: false, error: err.message || 'Failed to generate trip plan' });
  }
});

export default router;
