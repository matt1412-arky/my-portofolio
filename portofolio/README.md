# Matthew Cahyadi — Portfolio v2

Next.js 14 · GitHub API auto-sync · Light/Dark mode · Real email via Resend

## ✨ Features
- 🌙 Light / Dark mode toggle (no flash on reload)
- 📬 Contact form → real email to `mattchris16@gmail.com` via **Resend**
- 🔄 GitHub API auto-sync (ISR, refreshes every 1 hour)
- 🖼️ Profile photo pulled from GitHub avatar
- 🎨 Custom cursor, scroll animations, skill bars
- 📱 Fully responsive

---

## 🚀 Deploy in 10 minutes (Free, No CC)

### Step 1 — Push to GitHub
```bash
cd portfolio
git init
git add .
git commit -m "portfolio v2"
git branch -M main
git remote add origin https://github.com/matt1412-arky/portfolio.git
git push -u origin main
```

### Step 2 — Get Resend API Key (Free)
1. Go to **[resend.com](https://resend.com)** → Sign up with email (no CC)
2. Dashboard → **API Keys** → Create API Key
3. Copy the key: `re_xxxxxxxxxxxxxxxx`

### Step 3 — Deploy on Vercel
1. Go to **[vercel.com](https://vercel.com)** → Sign in with GitHub
2. **Add New Project** → import your `portfolio` repo
3. Before clicking Deploy → **Environment Variables**:
   ```
   RESEND_API_KEY = re_xxxxxxxxxxxxxxxx
   ```
4. Click **Deploy** 🎉

Your site: `portfolio-matt1412-arky.vercel.app`

---

## 🛠 Local Development
```bash
npm install

# Create .env.local
echo "RESEND_API_KEY=re_your_key_here" > .env.local

npm run dev
# Open http://localhost:3000
```

---

## ✏️ Update Content
| What | Where |
|------|-------|
| Personal info, bio, email | `lib/data.js` → `PROFILE` |
| Work experience | `lib/data.js` → `EXPERIENCES` |
| Skills & levels | `lib/data.js` → `SKILLS` |
| Project descriptions | `lib/github.js` → `PROJECT_META` |
| Contact email destination | `app/api/contact/route.js` → `to:` field |

---

## 📁 Project Structure
```
├── app/
│   ├── api/contact/route.js  ← Resend email API
│   ├── layout.js             ← Root layout + theme anti-flash
│   ├── page.jsx              ← Main page (RSC + GitHub fetch)
│   ├── page.module.css       ← All page styles
│   └── globals.css           ← Design tokens (light + dark)
├── components/
│   ├── Nav.jsx               ← Navbar with theme toggle
│   ├── ThemeToggle.jsx       ← Sun/Moon button
│   ├── Cursor.jsx            ← Custom cursor
│   ├── Reveal.jsx            ← Scroll animations
│   ├── SkillBar.jsx          ← Animated skill bars
│   └── ContactForm.jsx       ← Form → /api/contact → Resend
├── lib/
│   ├── github.js             ← GitHub API + project metadata
│   └── data.js               ← All CV data
└── next.config.js
```
