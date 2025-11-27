# Vercel Deployment Guide

## Prerequisites
1. A GitHub repository with your frontend code pushed
2. A Vercel account (sign up at https://vercel.com)
3. Your backend deployed to Heroku (or another hosting service)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin master
   ```

2. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/new
   - Sign in with GitHub
   - Click "Import Project"
   - Select your frontend repository

3. **Configure Project Settings**:
   - Framework Preset: Vite (should auto-detect)
   - Root Directory: `./` (or leave default)
   - Build Command: `npm run build` (should auto-detect)
   - Output Directory: `dist` (should auto-detect)

4. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-app.herokuapp.com/api`
     - Replace `your-backend-app` with your actual Heroku app name
   - Make sure to add it for Production, Preview, and Development environments

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```
   - Follow the prompts
   - For production deployment: `vercel --prod`

4. **Set Environment Variables**:
   ```bash
   vercel env add VITE_API_URL
   ```
   - Enter: `https://your-backend-app.herokuapp.com/api`
   - Select environments: Production, Preview, Development

## Important Notes

- **CORS**: Make sure your Heroku backend has CORS configured to allow requests from your Vercel domain
- **Environment Variables**: The `VITE_API_URL` must be set in Vercel's dashboard/CLI, not in a `.env` file (Vite env vars must start with `VITE_`)
- **Automatic Deployments**: Vercel will automatically deploy when you push to your main branch
- **Preview Deployments**: Every pull request gets a preview deployment URL

## Troubleshooting

- If API calls fail, check that `VITE_API_URL` is correctly set in Vercel
- Check browser console for CORS errors
- Verify your backend is running and accessible
- Check Vercel build logs for any build errors

