# Tunga Elementary School — School Management System

Official web-based management system for **Tunga Elementary School**, Barangay Tunga, Moalboal, Cebu (School ID: 119502).

---

## FEATURES
- **Dashboard** — School info, enrollment stats, key metrics, team photo
- **Grade Levels** — Manage Kinder to Grade 6 with sections and advisers
- **Announcements** — Post announcements with priority levels (normal/important/urgent)
- **Memos** — Create and manage school memos
- **Report Modules** — Create custom modules (DRRM, GAD, SBFP, etc.) with sub-reports
- **PPSSH MOVs** — All 6 PPSSH domains with strands, MOV management, custom strands
- **Teacher MOV Uploads** — Create categories for teacher document uploads

---

## HOW TO DEPLOY ON VERCEL (FREE) — Step by Step

### PREREQUISITES (Install these first)

**Step 1: Install Node.js**
- Go to: https://nodejs.org
- Download and install the **LTS version** (green button)
- After installing, restart your computer

**Step 2: Install Git**
- Go to: https://git-scm.com/downloads
- Download and install for your OS (Windows/Mac)

**Step 3: Create a GitHub Account** (if you don't have one)
- Go to: https://github.com
- Click "Sign up" and create a free account

**Step 4: Create a Vercel Account**
- Go to: https://vercel.com
- Click "Sign Up" → "Continue with GitHub"
- Authorize Vercel to access your GitHub

---

### DEPLOYMENT STEPS

**Step 5: Upload project to GitHub**

Open your terminal (Command Prompt on Windows, Terminal on Mac) and run these commands one by one:

```bash
# Navigate to the project folder
cd tunga-es-web

# Install dependencies
npm install

# Test locally first (optional)
npm run dev
# Visit http://localhost:3000 in your browser to see it working
# Press Ctrl+C to stop

# Initialize Git
git init
git add .
git commit -m "Tunga Elementary School website"

# Create a new repository on GitHub:
# 1. Go to https://github.com/new
# 2. Repository name: tunga-elementary-school
# 3. Keep it Public
# 4. Click "Create repository"
# 5. Copy the URL (looks like: https://github.com/YOUR_USERNAME/tunga-elementary-school.git)

# Connect and push to GitHub (replace YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/tunga-elementary-school.git
git branch -M main
git push -u origin main
```

**Step 6: Deploy on Vercel**

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Find your **"tunga-elementary-school"** repository and click **"Import"**
4. Leave all settings as default (Vercel auto-detects Next.js)
5. Click **"Deploy"**
6. Wait 1-2 minutes... Done! Your site is live!

**Step 7: Get Your URL**
- Vercel will give you a URL like: `https://tunga-elementary-school.vercel.app`
- You can also add a custom domain in Vercel settings

---

### UPDATING THE WEBSITE

After making any changes to the code:

```bash
git add .
git commit -m "Updated website"
git push
```

Vercel automatically redeploys when you push to GitHub!

---

## PROJECT STRUCTURE

```
tunga-es-web/
├── app/
│   ├── layout.js          # HTML layout, metadata, title
│   ├── page.js            # Main application (all 7 modules)
│   └── globals.css         # All styles
├── public/
│   ├── logo.jpg           # School logo
│   └── team.jpg           # Team photo
├── package.json           # Dependencies
├── next.config.js         # Next.js config (static export)
└── README.md              # This file
```

---

## DATA STORAGE

Currently uses **localStorage** (browser-based). Data is stored on each user's device.

For shared data across all users (recommended for production):
- **Firebase Firestore** (free tier: 1GB storage, 50K reads/day)
- **Supabase** (free tier: 500MB database)

---

## DEVELOPED FOR

**School Principal:** William A. Buquia, Dev.Ed.D.
**Rater:** Marcelita S. Dignos, Ed.D., CESO IV
**Schools Division:** Cebu Province, Region VII — Central Visayas
**School Year:** 2025–2026
