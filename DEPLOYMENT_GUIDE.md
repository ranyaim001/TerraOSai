# 🚀 TerraOS Deployment Guide

This guide will help you deploy TerraOS to the web and access it on your iPhone.

## 1. Deploy to Vercel (Web)

Vercel is the easiest way to host Next.js applications.

### Prerequisites
- A [GitHub](https://github.com) account.
- A [Vercel](https://vercel.com) account (you can sign up with GitHub).

### Steps
1.  **Push your code to GitHub**:
    - Ensure your project is pushed to a GitHub repository.
    - If you haven't already:
        ```bash
        git add .
        git commit -m "Ready for deployment"
        git push origin main
        ```

2.  **Import Project in Vercel**:
    - Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** -> **"Project"**.
    - Find your `TerraOSai` repository and click **"Import"**.

3.  **Configure Project**:
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `app` (IMPORTANT: Click "Edit" and select the `app` folder).
    - **Environment Variables**: If you have any API keys (e.g., for stocks or news), add them here.
    - Click **"Deploy"**.

4.  **Wait for Deployment**:
    - Vercel will build your app. Once done, you'll get a live URL (e.g., `https://terraos-ai.vercel.app`).

---

## 2. Access on iPhone (Mobile)

Once deployed, you can turn TerraOS into a mobile app experience.

### Steps
1.  **Open Safari** on your iPhone.
2.  **Navigate** to your deployed Vercel URL (e.g., `https://terraos-ai.vercel.app`).
3.  Tap the **Share** button (square with arrow pointing up) at the bottom of the screen.
4.  Scroll down and tap **"Add to Home Screen"**.
5.  Name it **"TerraOS"** and tap **"Add"**.

### Result
- You will now have a TerraOS icon on your home screen.
- Tapping it will open the app in full-screen mode (standalone), looking and feeling like a native app.
