# رفع Salezeus على Hostinger Business (React + Node.js)

المشروع يعمل في الإنتاج كتطبيق **Node واحد**:
- Express يخدم الـ API (`/api`) والصور (`/uploads`)
- ونفس السيرفر يخدم واجهة React بعد `vite build` من مجلد `dist/`

هذا الأنسب لخطة **Business Web Hosting** في Hostinger (Node.js Web App).

---

## 0) قبل أي رفع — تجهيز محلي

### 0.1 تأكد أن الموقع يبني محلياً

```bash
npm install
npm run server:install
npm run build
NODE_ENV=production npm start
```

افتح `http://localhost:8787` وتأكد أن:
- الصفحة الرئيسية تظهر
- `/admin/login` يفتح
- `/api/health` يرجع `{ ok: true }`

### 0.2 غيّر كلمة مرور الأدمن قبل الإنتاج

في Hostinger ستضع Environment Variables (لا ترفع `.env` الحقيقي على Git):

| Variable | قيمة مقترحة |
|----------|-------------|
| `NODE_ENV` | `production` |
| `ADMIN_EMAIL` | إيميلك الحقيقي |
| `ADMIN_PASSWORD` | كلمة مرور قوية جداً |
| `HOST` | `0.0.0.0` |
| `PORT` | اتركه لـ Hostinger إن كان يضبطه تلقائياً |

### 0.3 ارفع الكود على GitHub

1. أنشئ مستودع خاص (Private مفضّل).
2. ادفع المشروع (بدون `node_modules` وبدون `server/.env` وبدون `server/data/content.json` إن أردت بداية نظيفة).
3. تأكد أن `.gitignore` يستثني: `node_modules`, `dist`, `server/.env`, `server/uploads/*`.

---

## 1) في hPanel — إنشاء Node.js Web App

1. ادخل [hPanel](https://hpanel.hostinger.com).
2. من الشريط: **Websites → Add Website**.
3. اختر **Node.js Web App** (متاح في Business / Cloud).
4. اربط الدومين (مثل `salezeus.com` أو subdomain مؤقت).
5. طريقة الرفع المفضّلة: **GitHub**.
   - اربط حساب GitHub.
   - اختر الريبو والـ branch (عادة `main`).

مرجع Hostinger: [How to add a Node.js Web App](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)

---

## 2) إعدادات الـ Build / Start (مهم جداً)

في شاشة إعداد التطبيق ضع تقريباً:

| إعداد | القيمة |
|--------|--------|
| **Node.js version** | `20.x` أو `22.x` |
| **Root directory** | `/` (جذر المشروع) |
| **Install command** | `npm install && npm --prefix server install` |
| **Build command** | `npm run build` |
| **Start / Output / Entry** | `npm start` أو `node server/index.js` |
| **Application root (إن طُلب لتشغيل Node)** | `server` أحياناً — حسب واجهة Hostinger |

### ملاحظة عن واجهة Hostinger

- لو النظام اكتشف Vite كـ frontend فقط: غيّر يدوياً لتشغيل **Express** بعد البناء.
- الهدف النهائي: بعد البناء يوجد مجلد `dist/` في الجذر، و`npm start` يشغّل `server/index.js` الذي يخدم `dist` + API.

لو Hostinger يطلب **Entry file** فقط:
- Entry: `server/index.js`
- Build: لازم يعمل `npm run build` قبل التشغيل حتى يوجد `dist`.

---

## 3) Environment Variables في hPanel

من لوحة التطبيق → **Environment Variables** أضف:

```text
NODE_ENV=production
ADMIN_EMAIL=your-real-email@domain.com
ADMIN_PASSWORD=StrongPasswordHere123!
HOST=0.0.0.0
```

لا تترك كلمة مرور ضعيفة أو افتراضية على الإنتاج — اضبط `ADMIN_EMAIL` و`ADMIN_PASSWORD` من Environment Variables / `server/.env`.

---

## 4) Deploy الأول

1. اضغط **Deploy**.
2. راقب الـ Deployment logs:
   - تثبيت الحزم
   - نجاح `vite build`
   - تشغيل السيرفر بدون `EADDRINUSE`
3. افتح الدومين:
   - `/` الموقع
   - `/api/health`
   - `/admin/login`

### أول دخول للأدمن

1. سجّل دخول.
2. أول تحميل يعمل **seed** للمحتوى من بيانات الموقع الحالية.
3. عدّل ما تريد واضغط **Save**.
4. حدّث الصفحة العامة وتأكد أن المحتوى ظهر.

---

## 5) SSL والدومين

1. في hPanel → **Domains / SSL**: فعّل **Free SSL** (Let's Encrypt).
2. فعّل إعادة التوجيه من HTTP → HTTPS.
3. إن كان الدومين خارج Hostinger: اضبط DNS:
   - `A` للـ root → IP الاستضافة
   - أو Nameservers الخاصة بـ Hostinger

---

## 6) ما يجب أن يعمل بعد الرفع (Checklist كامل)

### الموقع العام
- [ ] الصفحة الرئيسية وكل الأقسام
- [ ] العربية / الإنجليزية
- [ ] About / Services / Portfolio / Insights / Contact
- [ ] روابط SPA مثل `/services/branding` لا تعطي 404 بعد Refresh
- [ ] الصور الثابتة من `/images` و`/team`
- [ ] الصور المرفوعة من الأدمن عبر `/uploads/...`

### الأدمن `/admin`
- [ ] Login يعمل
- [ ] حفظ الفريق / الخدمات / المشاريع / المقالات
- [ ] Page copy
- [ ] Site images
- [ ] إظهار العناصر على الهوم
- [ ] رفع صورة مضغوطة ثم Save ثم ظهورها في الموقع

### الـ API
- [ ] `GET /api/health`
- [ ] `GET /api/public/content` بعد أول Save

---

## 7) أفكار مهمة عشان يظل شغال 100%

### أ) تطبيق واحد أفضل من اثنين
على Business: شغّل React + Node معاً (كما هو معدّ الآن).  
تجنّب رفع `dist` كـ static منفصل + API منفصل إلا إذا كنت تعرف تعمّل reverse proxy يدوياً.

### ب) الملفات الدائمة
- المحتوى: `server/data/content.json`
- الصور: `server/uploads/`

احمِها:
- فعّل **Daily Backups** في Hostinger.
- بعد أي تعديل كبير: نزّل نسخة من `content.json` و`uploads` من File Manager.

### ج) لا تعتمد على Vite proxy في الإنتاج
الـ proxy في `vite.config.ts` للتطوير فقط.  
في الإنتاج الطلبات تذهب لنفس الدومين (`/api`, `/uploads`) وهذا صحيح مع Express الحالي.

### د) حجم الرفع والذاكرة
- الصور تُضغط في المتصفح قبل الحفظ.
- راقب استخدام RAM/CPU في لوحة Node App.
- لو الـ build يفشل بسبب الذاكرة: ابنِ محلياً وادفع `dist` (أقل تفضيلاً) أو رقِّي لـ Cloud.

### هـ) الأمان
- غيّر `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
- لا تشارك التوكن.
- قيّد من يعرف رابط `/admin` إن أمكن.
- لاحقاً يفضّل JWT/DB بدل ملف JSON عند نمو المحتوى.

### و) إعادة النشر
كل `git push` على الـ branch المتصل يعيد البناء عادة.  
تذكّر: إعادة Deploy قد تمسح ملفات لو الاستضافة تعيد إنشاء البيئة من الصفر.

**حل عملي للمحتوى:**
1. بعد كل فترة انسخ `server/data/content.json` و`server/uploads` احتياطياً.
2. أو انقل التخزين لاحقاً لـ Object Storage / قاعدة بيانات.

### ز) مسار الملفات داخل Hostinger
أحياناً Working Directory يكون جذر الريبو. تأكد أن:
- `dist/` موجود بعد البناء بجانب `server/`
- السيرفر يقرأ `../dist` من داخل `server/` (هذا مضبوط في الكود)

---

## 8) أوامر مفيدة بعد الربط بـ GitHub

على جهازك:

```bash
git add .
git commit -m "Prepare production deploy for Hostinger"
git push origin main
```

ثم في hPanel → Redeploy إن لم يبدأ تلقائياً.

---

## 9) استكشاف أعطال شائعة

| المشكلة | السبب المحتمل | الحل |
|---------|---------------|------|
| الموقع يفتح لكن `/api/health` يفشل | Start command يشغّل Vite فقط أو static | تأكد أن التشغيل `node server/index.js` |
| Refresh على `/about` يعطي 404 | SPA fallback غير مفعّل | تأكد وجود `dist` وأن السيرفر يخدم `index.html` |
| الأدمن يحفظ ولا يظهر في الموقع | حفظ فشل / سيرفر قديم | افحص Network لـ `PUT /api/admin/content` و`GET /api/public/content` |
| الصور تختفي بعد Redeploy | مسح `uploads` | خذ Backup قبل Redeploy |
| `EADDRINUSE` محلياً | منفذ 8787 مشغول | أوقف العملية القديمة |
| Login يرفض | Env vars غير مضبوطة | راجع `ADMIN_EMAIL` / `ADMIN_PASSWORD` في hPanel |

---

## 10) مسار مستقبلي أقوى (اختياري)

لو المحتوى والصور كبروا جداً:
1. **VPS** على Hostinger + Nginx + PM2
2. أو الإبقاء على Business مع تخزين الصور على S3-compatible storage
3. استبدال JSON بقاعدة بيانات (PostgreSQL / Mongo)

للمرحلة الحالية: **Business + Node Web App واحد** كافٍ ويعمل بالكامل مع إعدادات هذا المشروع.
