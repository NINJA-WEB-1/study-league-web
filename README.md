# 🏆 Study League — دوري الإنجاز

تطبيق ويب لمتابعة وتقييم الطلاب أسبوعياً مع نظام ترتيب وإشعارات فورية.

## 🚀 الميزات

- **لوحة الطالب** — تقييم أسبوعي، عرض الترتيب، إشعارات تعديلات المشرف
- **لوحة المشرف** — إدارة الطلاب، مراجعة التقييمات، إضافة درجة التنظيم
- **تحديث فوري** — Firebase Realtime listeners لكل المستخدمين
- **وضع الليل** — Dark mode كامل
- **Google Sheets** — تصدير تلقائي للتقييمات

## 🛠️ التقنيات المستخدمة

- HTML / CSS / JavaScript (Vanilla)
- Firebase Firestore (قاعدة البيانات)
- Google Apps Script (تصدير Sheets)
- GitHub Pages (الاستضافة)

## 📁 هيكل الملفات

```
study-league/
├── index.html    ← التطبيق الرئيسي
├── NINJA.jpg     ← شعار NINJA
├── Code.gs       ← كود Google Apps Script
└── README.md     ← هذا الملف
```

## ⚙️ طريقة الإعداد

### 1. Firebase
- أنشئ مشروع على [Firebase Console](https://console.firebase.google.com)
- فعّل Firestore Database
- انسخ بيانات الإعداد في `index.html`

### 2. Google Apps Script (اختياري)
- افتح Google Sheets جديد
- من القائمة: Extensions → Apps Script
- الصق محتوى `Code.gs`
- انشره كـ Web App وانسخ الرابط
- الصق الرابط في لوحة المشرف ← إعدادات Sheets

### 3. GitHub Pages
- ارفع الملفات على GitHub
- من إعدادات الـ Repository: Settings → Pages
- اختار Source: `main` branch → `/root`
- الموقع هيكون متاح على: `https://username.github.io/repo-name`

## 🔐 بيانات الدخول الافتراضية

| الدور | اسم المستخدم | كلمة المرور |
|-------|-------------|-------------|
| مشرف | donia | Donia1597532468HanafY |
| طالب | (يحدده المشرف) | (يحددها المشرف) |

## 📋 نظام التقييم

| المعيار | الدرجة | من يقيّم |
|---------|--------|---------|
| الالتزام | /5 | الطالب |
| الاستمرارية | /5 | الطالب |
| الجدول | /1 | الطالب |
| التنظيم | /5 | المشرف |
| **المجموع** | **/16** | |

---
Made with ❤️ by NINJA
