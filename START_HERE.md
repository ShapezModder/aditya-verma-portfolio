# 🚀 How to Start the Project

## ✅ Dependencies Installed

All required dependencies have been installed successfully!

## 📋 Prerequisites

Make sure you have:
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

## 🏃 Quick Start

### Step 1: Start the Development Server

Open your terminal in the project root directory and run:

```bash
npm run dev
```

### Step 2: Open in Browser

Once the server starts, you'll see:
```
✓ Ready in X.XXs
○ Local:        http://localhost:3000
```

Open your browser and navigate to:
**http://localhost:3000**

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (localhost:3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## ⚙️ Optional: Email Configuration (For Contact Form)

If you want the contact form to work, you need to set up email configuration:

### 1. Create `.env.local` file in the root directory

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

### 2. Get Gmail App Password (if using Gmail)

1. Go to https://myaccount.google.com/
2. Enable **2-Step Verification**
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Generate a new app password
5. Use that password as `EMAIL_PASS`

**Note:** The contact form will still work without this setup, but emails won't be sent.

For detailed instructions, see `CONTACT_SETUP.md`

---

## 🎯 Project Structure

```
startup-nextjs-1.0.0/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── projects/          # Projects page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── Projects/         # Project components
│   └── ...
├── public/                # Static files
│   └── project_images/   # Project images folder
└── styles/               # Global styles
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use?

If you see an error about port 3000 being in use:

```bash
# Windows PowerShell
$env:PORT=3001; npm run dev

# Or use a different port
npm run dev -- -p 3001
```

### Dependencies Issues?

If you encounter dependency errors:

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors?

Clear the Next.js cache:

```bash
rm -rf .next
npm run dev
```

---

## ✨ What You'll See

When you start the server, you'll see:

1. **Home Page** (`/`) - Hero section with tech stack and contact form
2. **About Page** (`/about`) - Your profile, education timeline, and certifications
3. **Projects Page** (`/projects`) - Your project gallery
4. **Contact Page** (`/contact`) - Contact form and direct contact info

---

## 🎨 Features

- ✅ Custom cursor (desktop only)
- ✅ Particle field background
- ✅ Smooth scrolling
- ✅ Glassmorphism UI
- ✅ Responsive design
- ✅ Dark theme
- ✅ Project gallery with reusable templates

---

## 📚 Next Steps

1. **Add Your Projects**: See `PROJECT_TEMPLATE_GUIDE.md`
2. **Customize Content**: Update pages in `app/` directory
3. **Add Images**: Place images in `public/` directory
4. **Configure Email**: Set up `.env.local` for contact form

---

## 🆘 Need Help?

- Check `CONTACT_SETUP.md` for email configuration
- Check `PROJECT_TEMPLATE_GUIDE.md` for adding projects
- Check `SETUP_COMPLETE.md` for project template setup

---

**Happy Coding! 🎉**

