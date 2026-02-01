# PerpDEX Deployment Guide

This guide covers deploying PerpDEX to Vercel with Supabase as the database.

## Prerequisites

1. [Vercel Account](https://vercel.com)
2. [Supabase Account](https://supabase.com)
3. [WalletConnect Cloud Account](https://cloud.walletconnect.com)

## Step 1: Set Up Supabase

1. Create a new Supabase project
2. Go to **Settings > Database** and copy the connection string
3. Replace `[YOUR-PASSWORD]` with your database password
4. Enable SSL in connection settings for production

### Database Schema

Run the following SQL in Supabase SQL Editor:

```sql
-- Create enums
CREATE TYPE role AS ENUM ('user', 'admin');
CREATE TYPE chain_type AS ENUM ('evm', 'tron', 'solana');
CREATE TYPE transaction_type AS ENUM (
  'connect_bonus', 'x_connect', 'x_disconnect',
  'discord_connect', 'discord_disconnect', 'daily_post',
  'referral_bonus', 'admin_adjustment', 'other'
);

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(128) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  role role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_signed_in TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Wallet profiles table
CREATE TABLE wallet_profiles (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(128) NOT NULL UNIQUE,
  chain_type chain_type NOT NULL,
  total_points INTEGER NOT NULL DEFAULT 0,
  connect_bonus_claimed BOOLEAN NOT NULL DEFAULT FALSE,
  x_connected BOOLEAN NOT NULL DEFAULT FALSE,
  x_username VARCHAR(64),
  x_connected_at TIMESTAMP,
  discord_connected BOOLEAN NOT NULL DEFAULT FALSE,
  discord_username VARCHAR(64),
  discord_connected_at TIMESTAMP,
  referral_code VARCHAR(16) UNIQUE,
  referred_by VARCHAR(16),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Task completions table
CREATE TABLE task_completions (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(128) NOT NULL,
  task_type VARCHAR(64) NOT NULL,
  points_awarded INTEGER NOT NULL,
  completion_date VARCHAR(10),
  metadata TEXT,
  completed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Points history table
CREATE TABLE points_history (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(128) NOT NULL,
  transaction_type transaction_type NOT NULL,
  points_change INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_wallet_profiles_wallet ON wallet_profiles(wallet_address);
CREATE INDEX idx_task_completions_wallet ON task_completions(wallet_address);
CREATE INDEX idx_points_history_wallet ON points_history(wallet_address);
```

## Step 2: Configure WalletConnect

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy the **Project ID**

## Step 3: Set Up Social OAuth (Optional)

### X (Twitter) OAuth

1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create a new app
3. Enable OAuth 2.0
4. Set callback URL: `https://your-domain.vercel.app/api/social/x/callback`
5. Copy Client ID and Client Secret

### Discord OAuth

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to OAuth2 settings
4. Add redirect URL: `https://your-domain.vercel.app/api/social/discord/callback`
5. Copy Client ID and Client Secret

## Step 4: Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables (see below)
4. Deploy

## Environment Variables

### Required

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Supabase PostgreSQL connection string |
| `JWT_SECRET` | Secret for JWT signing (min 32 chars) |
| `ADMIN_WALLET_ADDRESS` | Admin wallet address |
| `ADMIN_PASSWORD` | Admin panel password |

### Optional - Social OAuth

| Variable | Description |
|----------|-------------|
| `X_CLIENT_ID` | Twitter OAuth Client ID |
| `X_CLIENT_SECRET` | Twitter OAuth Client Secret |
| `X_BEARER_TOKEN` | Twitter API Bearer Token |
| `DISCORD_CLIENT_ID` | Discord OAuth Client ID |
| `DISCORD_CLIENT_SECRET` | Discord OAuth Client Secret |

### Optional - Frontend

| Variable | Description |
|----------|-------------|
| `VITE_APP_TITLE` | App title (default: PerpDEX) |
| `VITE_APP_LOGO` | App logo URL |
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect Project ID |

### Optional - Storage (Supabase)

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `SUPABASE_STORAGE_BUCKET` | Storage bucket name |

### Optional - External APIs

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key (for AI features) |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key |

## Step 5: Update OAuth Redirect URIs

After deployment, update your OAuth redirect URIs:

- **X (Twitter)**: `https://your-domain.vercel.app/api/social/x/callback`
- **Discord**: `https://your-domain.vercel.app/api/social/discord/callback`

## Step 6: Custom Domain (Optional)

1. Go to Vercel project settings
2. Add your custom domain
3. Update DNS records as instructed
4. Update OAuth redirect URIs with new domain

## Troubleshooting

### Database Connection Issues

- Ensure SSL is enabled in Supabase
- Check that the connection string includes `?sslmode=require`

### OAuth Callback Errors

- Verify redirect URIs match exactly (including trailing slashes)
- Check that OAuth credentials are correct

### Wallet Connection Issues

- Ensure WalletConnect Project ID is set
- Check browser console for errors

## Support

For issues, please open a GitHub issue or contact the development team.
