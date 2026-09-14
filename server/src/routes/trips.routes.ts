import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AuthedRequest, requireAuth } from '../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

const saveTripSchema = z.object({
  destination: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.string(),
  travelStyle: z.string(),
  interests: z.array(z.string()),
  accommodation: z.string(),
  plan: z.unknown(), // the AI-generated plan object, stored as-is
});

// GET /api/trips - list the current user's saved trips
router.get('/', async (req: AuthedRequest, res) => {
  const trips = await prisma.trip.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: trips.map(serializeTrip) });
});

// POST /api/trips - save a newly generated trip
router.post('/', async (req: AuthedRequest, res) => {
  const parsed = saveTripSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: parsed.error.flatten() });
  }
  const d = parsed.data;

  const trip = await prisma.trip.create({
    data: {
      userId: req.userId!,
      destination: d.destination,
      startDate: new Date(d.startDate),
      endDate: new Date(d.endDate),
      budget: d.budget,
      travelStyle: d.travelStyle,
      interests: JSON.stringify(d.interests),
      accommodation: d.accommodation,
      planJson: JSON.stringify(d.plan),
    },
  });

  res.status(201).json({ success: true, data: serializeTrip(trip) });
});

// DELETE /api/trips/:id
router.delete('/:id', async (req: AuthedRequest, res) => {
  const trip = await prisma.trip.findUnique({ where: { id: req.params.id } });
  if (!trip || trip.userId !== req.userId) {
    return res.status(404).json({ success: false, error: 'Trip not found' });
  }
  await prisma.trip.delete({ where: { id: trip.id } });
  res.json({ success: true });
});

function serializeTrip(trip: any) {
  return {
    ...trip,
    interests: JSON.parse(trip.interests),
    plan: JSON.parse(trip.planJson),
    planJson: undefined,
  };
}

export default router;
