# Your Trip Planner — الحزمة الكاملة

هذه الحزمة تحتوي على:

1. **`docs/ROADMAP.md`** — ابدأ من هنا. خارطة الطريق الكاملة: ما تم إصلاحه،
   ما تم بناؤه فعلياً، وخطة المراحل القادمة.
2. **`docs/AR_ARCHITECTURE.md`** — خطة مشروع الواقع المعزز الحقيقي (منفصلة عن الخط الزمني الأساسي).
3. **`server/`** — Backend جديد بالكامل (Node.js + Express + Prisma + Claude AI). راجع `server/README.md` للتشغيل.
4. **`web-app/`** — الموقع الأصلي، بعد إصلاح كل أخطاء البناء وربطه بالـ Backend الآمن.
5. **`mobile/`** — هيكل تطبيق الجوال (Expo/React Native). راجع `mobile/README.md` للتشغيل.

## تشغيل سريع (تطوير محلي)

```bash
# 1) شغّل الـ backend أولاً
cd server && npm install && cp .env.example .env
# افتح .env وضع ANTHROPIC_API_KEY على الأقل
npx prisma generate && npx prisma migrate dev --name init
npm run dev   # يعمل على http://localhost:4000

# 2) في نافذة طرفية أخرى، شغّل الموقع
cd web-app && npm install --legacy-peer-deps
npm run dev   # يعمل على http://localhost:5173

# 3) (اختياري) شغّل تطبيق الجوال
cd mobile && npm install
npx expo start
```
