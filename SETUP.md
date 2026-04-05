# LifeTrack - Setup Guide

LifeTrack is a comprehensive personal progress tracking application that helps you manage your learning goals, budget, daily expenses, and diary entries.

## Features

- **Learning Progress Tracker**: Track your daily learning goals across different skills and difficulty levels
- **Smart Budget System**: Manage monthly budget with fixed expenses, daily rolling budget, and automated calculations
- **Expense Tracker**: Record and categorize daily expenses with automatic budget recalculation
- **AI-Powered Insights**: Get automated financial insights using Google Gemini AI
- **Daily Diary**: Keep private daily journal entries with mood tracking
- **Secure Authentication**: Email and password authentication with Supabase
- **Real-time Data**: All data stored securely in Supabase with Row Level Security

## Prerequisites

- Node.js 20 or higher
- A Supabase account (free tier available)
- A Google AI Studio API key (for AI insights feature)

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Once your project is created, go to Project Settings > API
3. Copy your project URL and anon/public key

### 2. Environment Variables

1. Copy the `.env.local` file and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. For AI insights, add your Google AI API key:

```bash
GOOGLE_GENAI_API_KEY=your_google_ai_api_key
```

Get your Google AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 3. Database Setup

The database schema has already been created with the migration. Your Supabase database includes:

- **learning_goals**: Stores user learning goals
- **daily_learning_progress**: Tracks daily progress for each goal
- **budget_config**: User budget configuration
- **expenses**: Daily expense records
- **diary_entries**: Personal diary entries

All tables have Row Level Security enabled to ensure data privacy.

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Application

Development mode:
```bash
npm run dev
```

The application will be available at `http://localhost:9002`

Production build:
```bash
npm run build
npm start
```

### 6. Create Your First User

1. Navigate to your Supabase project dashboard
2. Go to Authentication > Users
3. Click "Add User" and create a user with email and password
4. Use these credentials to log in to the application

Or you can enable email signups in Supabase:
1. Go to Authentication > Providers
2. Enable Email provider
3. Configure email templates as needed

## Using the Application

### Dashboard
The dashboard provides an overview of:
- Today's budget and spending
- Learning progress for the day
- Diary entry status
- Monthly savings

### Learning Tracker
1. Go to the Learning page
2. Add learning goals with skill name, difficulty, and daily target
3. Track your daily progress

### Budget Management
1. Go to Settings to configure your monthly budget
2. Set fixed expenses that are deducted from your available budget
3. Add daily expenses in the Budget page
4. View spending patterns and insights in Reports

### Diary
1. Navigate to the Diary page
2. Write daily entries with:
   - What you did today
   - What you learned
   - Challenges faced
   - Plans for tomorrow
   - Your mood

### AI Insights
1. Go to Reports page
2. Click "Generate Insights" to get AI-powered analysis of your spending habits
3. Requires Google AI API key to be configured

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Google Gemini via Genkit
- **UI**: Shadcn/ui components with Tailwind CSS
- **Charts**: Recharts

## Security Features

- Row Level Security on all database tables
- Server-side authentication checks
- Secure session management
- Environment variable protection for API keys

## Troubleshooting

### Build Errors
If you encounter build errors, ensure:
- All environment variables are set correctly
- Node.js version is 20 or higher
- Dependencies are installed correctly

### Authentication Issues
- Verify Supabase credentials in .env.local
- Check if user exists in Supabase dashboard
- Ensure email confirmation is disabled in Supabase (Auth > Email Auth > Confirm email is unchecked)

### Database Connection Issues
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Check if database migration was applied successfully
- Ensure RLS policies are active

## Support

For issues or questions, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
