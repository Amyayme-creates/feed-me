# 🍴 Feed Me
### Plan it. Prep it. Cut the crap.

Your personal whole-foods meal planning app — built for Amy & Shawn.

---

## 🚀 Deploying to Vercel (Step by Step)

### What you need
- A free Vercel account (vercel.com)
- This folder (feedme/)
- About 5 minutes

---

### Step 1 — Create your Vercel account
1. Go to **vercel.com**
2. Click **Sign Up**
3. Choose **Continue with Google** (easiest — use your Gmail)
4. You're in! No credit card needed.

---

### Step 2 — Deploy the app

**Option A — Drag and Drop (easiest, no GitHub needed)**
1. On your Vercel dashboard, click **Add New → Project**
2. Scroll down and click **"Deploy from CLI or drag & drop"** or look for the **drag and drop** option
3. Drag the entire **feedme** folder into the upload area
4. Vercel will detect it's a React app automatically
5. Click **Deploy**
6. Wait about 60–90 seconds ⏳
7. You'll get a URL like: `https://feed-me-abc123.vercel.app` 🎉

**Option B — Via GitHub (best for future updates)**
1. Create a free GitHub account at github.com
2. Create a new repository called "feed-me"
3. Upload all these files to the repo
4. In Vercel, click **Add New → Project → Import Git Repository**
5. Select your feed-me repo
6. Click Deploy

---

### Step 3 — Add to your phone's home screen

**On iPhone (Safari):**
1. Open your Vercel URL in Safari
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it "Feed Me" and tap Add
5. It now lives on your home screen like a real app! 📱

**On Android (Chrome):**
1. Open your Vercel URL in Chrome
2. Tap the **three dots menu** (top right)
3. Tap **"Add to Home Screen"**
4. Tap Add
5. Done! 🎉

---

### Step 4 — Updating the app in future

When you want to add features or changes:
- **GitHub method:** Update the files in your GitHub repo → Vercel auto-deploys in ~60 seconds
- **Drag and drop method:** Re-drag the updated folder into Vercel

---

## 📁 File Structure

```
feedme/
├── public/
│   ├── index.html       ← App shell (don't edit)
│   └── manifest.json    ← Makes it installable on phones
├── src/
│   ├── App.jsx          ← THE APP — all your recipes and features live here
│   └── index.js         ← Entry point (don't edit)
├── package.json         ← Dependencies (don't edit)
├── vercel.json          ← Vercel build config (don't edit)
└── README.md            ← This file
```

**The only file you'll ever need to edit is `src/App.jsx`** — that's where all the app logic, recipes, and design live.

---

## ✨ Features

- 🗓 **AI Week Planner** — builds your dinner plan using your recipe library
- 🛒 **Smart Grocery List** — auto-generated from your week plan
- 📋 **Prep Schedule** — tasks and timing, with ✦ glycemic hack reminders
- 📖 **Recipe Library** — your real recipes, fully loaded
- 📎 **URL Recipe Importer** — paste any recipe link, AI extracts it
- ✏️ **Manual Recipe Entry** — type it in yourself
- ☀️ **Breakfast Prep Ideas** — protein-forward, prep-ahead options
- 🔔 **Evening Reminder** — push notification to prep for tomorrow's dinner
- 🌸 **Do Tonight Card** — home screen reminder of tonight's prep tasks

---

## 🌿 Your Household Profile

**Amy** — Menopause support, 120g protein/day, flavorless protein powder, insulin resistant
**Shawn** — No fish, 100g protein, building toward more beans & veg, insulin resistant
**Athlete (Aug+)** — 160g protein, grab-and-go, self-serve bowls

**The ✦ Glycemic Hack:** Cook pasta, rice, or potatoes → cool completely overnight → reheat.
Cooling forms resistant starch that lowers the glycemic index when reheated. Essential for insulin resistance management.

---

Built with love and a lot of lemon. 🍋
