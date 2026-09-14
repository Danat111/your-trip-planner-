import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

import authRoutes from './routes/auth.routes';
import tripPlannerRoutes from './routes/trip-planner.routes';
import tripsRoutes from './routes/trips.routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

// Basic abuse protection, especially important for the AI-generation endpoint
// since each call costs real money.
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/api/health', (_req, res) => res.json({ success: true, status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/trip-planner', tripPlannerRoutes);
app.use('/api/trips', tripsRoutes);

// Central error handler as a safety net for anything not caught in routes.
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`Trip Planner API listening on http://localhost:${port}`);
});
