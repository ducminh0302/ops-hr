# 🚀 Deployment Guide

## Prerequisites

Before deploying, make sure you have:
- ✅ A GitHub account
- ✅ A Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

---

## 📤 Step 1: Push to GitHub

### Option A: Create a New Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository (e.g., `ai-ops-hr-management`)
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)

### Option B: Push to Existing Repository

In your terminal, run:

```bash
cd d:\ai-ops---hr-management

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

---

## 🌐 Step 2: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. Click **"Add New Project"** or **"Import Project"**
3. **Import your GitHub repository:**
   - Click "Import" next to your repository
   - Or paste the GitHub URL
4. **Configure Project:**
   - Framework Preset: **Vite** (should auto-detect)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)
5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add variable:
     - Name: `API_KEY`
     - Value: `your_gemini_api_key_here`
     - Environment: **All** (Production, Preview, Development)
6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment to complete
8. Your app will be live at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - What's your project's name? ai-ops-hr-management
# - In which directory is your code located? ./
# - Want to override the settings? No

# Add environment variable
vercel env add API_KEY

# Deploy to production
vercel --prod
```

---

## ⚙️ Step 3: Set Environment Variables in Vercel

If you forgot to add environment variables during setup:

1. Go to your project dashboard on Vercel
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the sidebar
4. Add your variables:
   - **Name:** `API_KEY`
   - **Value:** Your Gemini API key
   - **Environments:** Select all (Production, Preview, Development)
5. Click **"Save"**
6. **Redeploy** your application:
   - Go to "Deployments" tab
   - Click "..." on the latest deployment
   - Click "Redeploy"

---

## 🔄 Updating Your Deployment

Every time you push to your `main` branch on GitHub, Vercel will automatically redeploy your application.

### Manual Update Process:

```bash
# Make your changes to the code
# ...

# Stage changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub (triggers auto-deploy)
git push origin main
```

---

## ✅ Verify Deployment

After deployment completes:

1. Visit your Vercel URL (e.g., `https://your-project-name.vercel.app`)
2. Test the AI Assistant features:
   - ✅ Try uploading a CV for screening
   - ✅ Generate a job description
   - ✅ Create interview questions
3. Check browser console for any errors

---

## 🐛 Troubleshooting

### Issue: "API_KEY environment variable not set"

**Solution:** Make sure you added the `API_KEY` environment variable in Vercel settings and redeployed.

### Issue: Build fails on Vercel

**Solution:** 
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Try building locally: `npm run build`

### Issue: Application works locally but not on Vercel

**Solution:**
- Verify environment variables are set correctly
- Check that API key has no leading/trailing spaces
- Ensure API key has proper permissions

### Issue: PDF upload not working

**Solution:**
- Check if PDF.js CDN is loading correctly
- Verify file size is under 10MB
- Ensure PDF is text-based (not image-based)

---

## 📊 Monitoring

After deployment, monitor your application:

1. **Vercel Analytics:** Available in your project dashboard
2. **Error Logs:** Check "Functions" tab for serverless function logs
3. **Build Logs:** Review build logs if deployment fails

---

## 🔐 Security Best Practices

- ✅ Never commit `.env` or `.env.local` files
- ✅ Keep your Gemini API key secret
- ✅ Rotate API keys periodically
- ✅ Set up API usage limits in Google AI Studio
- ✅ Use Vercel's environment variable encryption

---

## 📝 Custom Domain (Optional)

To use a custom domain:

1. Go to your Vercel project settings
2. Click **"Domains"**
3. Enter your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take 24-48 hours)

---

## 🎉 You're Done!

Your AI-powered HR Management System is now live and ready to use!

**Next Steps:**
- Share the URL with your team
- Start screening candidates
- Generate job descriptions
- Prepare for interviews with AI

Need help? Open an issue on GitHub or check the [Vercel documentation](https://vercel.com/docs).

