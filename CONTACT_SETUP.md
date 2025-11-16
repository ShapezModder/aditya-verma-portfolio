# Contact Form Setup Guide

The contact form requires email configuration to send messages. Follow these steps:

## Step 1: Create Environment Variables File

Create a file named `.env.local` in the root directory of your project (same level as `package.json`).

## Step 2: Add Your Email Configuration

Add the following to your `.env.local` file:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

## Step 3: Get Gmail App Password (if using Gmail)

1. Go to your Google Account: https://myaccount.google.com/
2. Enable **2-Step Verification** if not already enabled
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)"
5. Enter "Portfolio Contact Form" as the name
6. Click "Generate"
7. Copy the 16-character password (spaces don't matter)
8. Paste it as `EMAIL_PASS` in your `.env.local` file

**Important:** Use the App Password, NOT your regular Gmail password.

## Step 4: Restart Your Development Server

After creating/updating `.env.local`, restart your Next.js development server:

```bash
# Stop the server (Ctrl+C)
# Then restart it
npm run dev
```

## Troubleshooting

### Error: "Email configuration is missing"
- Make sure `.env.local` exists in the project root
- Check that `EMAIL_USER` and `EMAIL_PASS` are set
- Restart the development server after creating/updating the file

### Error: "Authentication failed"
- Verify you're using an App Password (not your regular password)
- Make sure 2-Step Verification is enabled on your Google Account
- Double-check the email address in `EMAIL_USER`

### Error: "Connection failed"
- Check your internet connection
- Verify SMTP settings (Gmail: smtp.gmail.com, port 587)
- Some networks block SMTP ports - try a different network

## Testing

Once configured, fill out the contact form and submit. You should receive an email at `adityaverma9777@gmail.com`.

## Security Note

Never commit `.env.local` to version control. It's already in `.gitignore` by default.


