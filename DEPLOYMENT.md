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

## Step 3: Set Up Social OAuth

Social OAuth (X/Twitter and Discord) requires careful configuration of callback URLs. The system automatically detects the correct callback URL based on your deployment environment.

### OAuth Callback URL Priority

The system determines the callback URL in the following order:

| Priority | Source | Use Case |
|----------|--------|----------|
| 1 | `OAUTH_CALLBACK_BASE_URL` env var | Production with custom domain |
| 2 | `VERCEL_URL` env var (auto-set) | Vercel preview deployments |
| 3 | Request headers | Development / other platforms |
| 4 | `http://localhost:3000` | Local development |

### X (Twitter) OAuth Setup

1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create a new app or select existing app
3. Go to **User authentication settings**
4. Enable **OAuth 2.0**
5. Set **Type of App** to "Web App, Automated App or Bot"
6. Add **Callback URI / Redirect URL**:
   - For custom domain: `https://your-domain.com/api/social/x/callback`
   - For Vercel default: `https://your-project.vercel.app/api/social/x/callback`
7. Add **Website URL**: Your app's homepage
8. Copy **Client ID** and **Client Secret**

### Discord OAuth Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or select existing
3. Go to **OAuth2 > General**
4. Add **Redirects**:
   - For custom domain: `https://your-domain.com/api/social/discord/callback`
   - For Vercel default: `https://your-project.vercel.app/api/social/discord/callback`
5. Copy **Client ID** and **Client Secret**

### Important: Multiple Redirect URIs

Both X and Discord allow multiple redirect URIs. You can add all of these to support different environments:

```
# Local development
http://localhost:3000/api/social/x/callback
http://localhost:3000/api/social/discord/callback

# Vercel preview (replace with your project name)
https://your-project.vercel.app/api/social/x/callback
https://your-project.vercel.app/api/social/discord/callback

# Production custom domain
https://perpx.fi/api/social/x/callback
https://perpx.fi/api/social/discord/callback
```

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

### OAuth Configuration

| Variable | Description |
|----------|-------------|
| `OAUTH_CALLBACK_BASE_URL` | **Required for custom domain**. Your production URL (e.g., `https://perpx.fi`) |
| `X_CLIENT_ID` | Twitter OAuth Client ID |
| `X_CLIENT_SECRET` | Twitter OAuth Client Secret |
| `X_BEARER_TOKEN` | Twitter API Bearer Token (for tweet verification) |
| `DISCORD_CLIENT_ID` | Discord OAuth Client ID |
| `DISCORD_CLIENT_SECRET` | Discord OAuth Client Secret |

### Frontend

| Variable | Description |
|----------|-------------|
| `VITE_APP_TITLE` | App title (default: PerpDEX) |
| `VITE_APP_LOGO` | App logo URL |
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect Project ID |

### Storage (Supabase)

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `SUPABASE_STORAGE_BUCKET` | Storage bucket name |

### External APIs

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key (for AI features) |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key |

## Step 5: Configure Custom Domain

When using a custom domain, you must set `OAUTH_CALLBACK_BASE_URL`:

1. Go to Vercel project settings
2. Add your custom domain (e.g., `perpx.fi`)
3. Update DNS records as instructed
4. **Add environment variable**: `OAUTH_CALLBACK_BASE_URL=https://perpx.fi`
5. **Update OAuth redirect URIs** in X and Discord developer portals

### Vercel Environment Variable Setup

```bash
# In Vercel Dashboard > Settings > Environment Variables

OAUTH_CALLBACK_BASE_URL=https://perpx.fi
```

Without this setting, OAuth callbacks will fail when users access your site via the custom domain.

## Step 6: Verify OAuth Configuration

After deployment, verify your OAuth setup:

1. Visit `https://your-domain.com/api/social/status`
2. You should see:
```json
{
  "x": { "configured": true, "clientIdSet": true },
  "discord": { "configured": true, "clientIdSet": true }
}
```

## Troubleshooting

### OAuth Callback Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `x_auth_invalid` | Missing code/state | Check redirect URI matches exactly |
| `x_auth_expired` | State expired (>10 min) | User took too long, retry |
| `x_token_failed` | Token exchange failed | Verify Client Secret is correct |
| `discord_auth_denied` | User cancelled | Normal behavior |

### Common OAuth Issues

**"Redirect URI mismatch" error:**
- Ensure the redirect URI in your OAuth app settings matches exactly
- Check for trailing slashes (include or exclude consistently)
- Verify `OAUTH_CALLBACK_BASE_URL` is set correctly for custom domains

**OAuth works on Vercel default domain but not custom domain:**
- Set `OAUTH_CALLBACK_BASE_URL` environment variable
- Add custom domain redirect URI to OAuth app settings

**OAuth works locally but not in production:**
- Add production redirect URI to OAuth app settings
- Check that environment variables are set in Vercel

### Database Connection Issues

- Ensure SSL is enabled in Supabase
- Check that the connection string includes `?sslmode=require`

### Wallet Connection Issues

- Ensure WalletConnect Project ID is set
- Check browser console for errors

## Support

For issues, please open a GitHub issue or contact the development team.
