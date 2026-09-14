# Your Trip Planner — Mobile (Expo / React Native)

A real, runnable starting point for the phone app — not a mockup. It talks
to the exact same backend as the website (`/server`), so auth, saved trips,
and AI trip generation are shared logic, not duplicated.

## What's here
- Tab navigation: Home, Trip Planner (calls the live AI endpoint), Profile
- `src/api/client.ts` — typed client for every backend endpoint, with token storage
- `src/theme/tokens.ts` — same brand colors as the web app

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android) or press `i` / `a` for a simulator.

Set `EXPO_PUBLIC_API_BASE_URL` to your backend's URL (in a `.env` file or
your shell) before running — on a physical device this must be your
computer's LAN IP, not `localhost`.

## Next steps to take this from starter → production
1. Build the login/register screens against `/api/auth/*` (already wired in `client.ts`).
2. Build "My Trips" (list/detail) against `/api/trips`.
3. Add push notifications (Expo Notifications) for trip reminders.
4. Add offline caching (e.g. a lightweight store + AsyncStorage) so a saved
   itinerary is viewable without a connection.
5. Set up EAS Build for App Store / Play Store submission
   (`npx eas build`), once you're ready to publish.
