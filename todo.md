# PerpX TODO

## Current Tasks

## Recently Completed
- [x] Implement demo account system with virtual balance (10,000 USDT)
- [x] Add order execution logic (Market/Limit/Stop orders)
- [x] Implement position management with Long/Short support
- [x] Add PnL (Profit/Loss) calculation based on real-time prices
- [x] Create order history and trade history tracking
- [x] Display positions, open orders, and completed trades

## Recently Completed
- [x] Integrate real TradingView widget for live market data on Trade page
- [x] Configure TradingView widget for multiple trading pairs (BTC, ETH, SOL, BNB, XRP)
- [x] Support both Perpetual and Spot trading modes with appropriate chart configurations

## Recently Completed
- [x] Fix mobile header button on Privacy/Terms pages - show Launch App instead of Connect Wallet

## Recently Completed
- [x] Fix header navigation - still showing Perpetual/Portfolio/etc menu on Privacy and Terms pages (fixed route mismatch: /privacy → /privacy-policy, /terms → /terms-of-service)

## Previous Attempts
- [x] Add scroll to top on page load for Privacy Policy and Terms of Service pages
- [x] Show minimal header (logo, language selector, Launch App only) on Privacy and Terms pages (incomplete - navigation still showing)

## Recently Completed
- [x] Debug and fix Privacy Policy and Terms of Service - language switching not working (fixed language key mismatch: ja/zh → jp/cn)

## Previous Attempts
- [x] Fix TypeError in Privacy Policy and Terms of Service pages when switching languages (incomplete - still not working)

## Recently Completed
- [x] Translate Privacy Policy page full content
- [x] Translate Terms of Service page full content

## Recently Completed
- [x] Translate API page content (REST API, WebSocket API, buttons)
- [x] Translate VIP page content (tier names, features, buttons)
- [x] Translate Docs page content (section titles, descriptions)
- [x] Translate footer links (Privacy Policy, Terms of Service)

## Recently Completed
- [x] Debug and fix mobile menu translations - Stats and More (server restarted)

## Previous Attempt (Failed)
- [x] Fix mobile menu - translate Stats and More menu items (not working)

## Recently Completed
- [x] Make percentage buttons (25%, 50%, 75%, 100%) clickable to auto-fill amount

## Recently Completed
- [x] Change nav.more translation key to just 'more'

## Recently Completed
- [x] Fix More menu dropdown items - translate descriptions for Feedback, VIP, API, Documentation, Blog, Discord
- [x] Fix navigation bar - translate "Stats" label

## Previously Completed
- [x] Fix Stats page - add missing translations for data labels
- [x] Add translations for More menu pages (Feedback, VIP, API, Docs, Blog)
- [x] Complete multi-language support for all pages

## Completed Today
- [x] Add translations for Referral, Dashboard (Portfolio) pages
- [x] Add Roadmap section translations to Home page
- [x] Add translation infrastructure for Stats page

## In Progress
- [x] Add Roadmap section translations to Home page

## Recently Completed (Previous Session)
- [x] Expand translation dictionary with Home and Trade content
- [x] Update Home page hero section with full translation support
- [x] Update Trade page with full translation support

## Recently Completed
- [x] Fix PerpX logo size to match text height in header
- [x] Update hero section with original marketing content based on strategy
- [x] Add Perpetual/Spot tabs to trading page
- [x] Fix mobile bugs and ensure responsive design works properly

## Completed Features
- [x] Basic website structure with multi-page layout
- [x] RainbowKit wallet integration
- [x] Multi-language support (EN/JA/ZH)
- [x] Rewards page with task system
- [x] TradingView chart integration
- [x] Mobile trading interface rebuild
- [x] Transparent logo background



## Current Tasks

## Recently Completed
- [x] Research major DEX platforms infrastructure and deployment methods
- [x] Analyze user management systems (registration, authentication)
- [x] Investigate backend/database architecture for scalability
- [x] Document hosting providers and CDN strategies
- [x] Create deployment guide based on DEX best practices



## Current Tasks

## Recently Completed
- [x] Add VIP tier details modal showing complete benefits list
- [x] Implement "詳細を見る" button click handler
- [x] Display all tier-specific features in modal



## Restore Changes After Sandbox Reset
- [x] Copy argr.jpg to client/public/
- [x] Update Home.tsx to add background image behind text
- [x] Add demo button to Header.tsx (PC & mobile)
- [x] Optimize vite.config.ts for build memory usage
- [x] Test all changes in browser
- [x] Create checkpoint if build succeeds


## Current Tasks
- [x] Add Earn and Stake menu items back to header navigation
- [x] Adjust background image size and position to fit properly in hero section (right-aligned)


## Current Tasks
- [x] Create Stake page with assets table showing APY (Annual Percentage Yield)
- [x] Add multi-language support for Stake page


## New Tasks
- [x] Restore Airdrop page
- [x] Fix demo functionality to ensure it works properly
- [x] Research official Perp DEX GitHub repositories (dYdX, GMX, Hyperliquid, etc.)
- [x] Document architecture, smart contract integration, and deployment requirements
- [x] Create implementation roadmap for real trading functionality


## Urgent Tasks (Before Publishing)
- [x] Identify and fix pages with errors
- [x] Fix demo mode - show wallet connect screen after clicking "DEMO Exit"
- [x] Test all pages to ensure no errors
- [x] Create checkpoint for publishing to production URL


## Urgent Fix
- [x] Create Earn page to fix 404 error
- [x] Add multi-language support for Earn page


## Critical Fix
- [x] Fix Earn page to display header
- [x] Ensure demo mode works on Earn page


## URGENT - DEMO Exit Fix
- [x] Fix DEMO Exit to show Connect Wallet screen when demo mode is turned off
- [x] Ensure page reloads and displays Connect Wallet button prominently when demo is OFF


## Connect Wallet Screen for All Pages
- [x] Add Connect Wallet screen to Portfolio page when demo mode is OFF
- [x] Add Connect Wallet screen to Referral page when demo mode is OFF
- [x] Add Connect Wallet screen to Rewards page when demo mode is OFF
- [x] Add Connect Wallet screen to Earn page when demo mode is OFF
- [x] Add Connect Wallet screen to Stake page when demo mode is OFF


## UI Improvements
- [x] Improve Connect Wallet screen UI design (make it more attractive)
- [x] Modify Trade page to show chart and trading panel normally, only show connect modal when Buy/Sell is clicked


## X/Twitter Header Redesign
- [x] Remove "Next-Gen Perpetual Trading" tagline (similar to Aster)
- [x] Remove right side 3-column text (100x Leverage, Zero Fees, 24/7 Trading)
- [x] Change PerpDEX X symbol to regular letter X
- [x] Confirm new tagline with user: "Perpetual Trading Reimagined"
- [x] Generate new header image
- [x] Rewrite markdown document: Japanese explanations + English X posts


## X/Twitter Header Image v3
- [x] Create header image with right-aligned text (PerpX + Perpetual Trading Reimagined on the right side)

## X/Twitter Calendar Revisions
- [x] Remove all emojis from post content
- [x] Add X bio/profile description section
- [x] Generate announcement image for first post

## X/Twitter Posting Calendar
- [x] Create posting calendar from Jan 27 to Dec 31
- [x] Add Japanese explanations for each post (intent and strategy)
- [x] Remove emojis and add bio section

## Bug Fixes
- [x] Fix dark screen issue on custom domain (dev server works, need to republish)
- [ ] Remove Manus watermark (need to find and remove)
- [ ] Create new checkpoint and republish

## X Bio Revision
- [ ] Create abstract, innovative bio options (no feature details)

## Launch Roadmap
- [ ] Research PerpDEX infrastructure and deployment strategies
- [ ] Create comprehensive launch roadmap document
- [ ] Document server/infrastructure decisions (Alibaba Cloud vs others)
- [ ] Clarify DNS/domain management (Netim, Cloudflare, Manus)
- [ ] Plan X posting automation with Google Sheets

## Deployment Issues
- [x] Fix perpx.fi domain access issue (checkpoint created)
- [x] Verify dev server is working
- [x] Create new checkpoint with latest code (version: 59147634)
- [x] User clicked Publish button (confirmed published)
- [x] Diagnose perpx.fi blank screen issue (React not loading in production)
- [ ] Contact Manus support about production build issue
- [x] Prepare GitHub export (workaround solution)

## GitHub Export & Vercel Deployment
- [x] Create GitHub export guide
- [x] Prepare .gitignore and repository files (.gitignore already exists)
- [x] Create README.md for GitHub repository
- [x] Create clean export archive
- [ ] User: Create GitHub repository
- [ ] User: Push code to GitHub
- [ ] User: Deploy on Vercel
- [ ] User: Connect perpx.fi domain to Vercel

## Deployment
- [x] Create checkpoint for custom domain deployment
- [ ] Configure custom domain in Management UI
- [ ] Publish to production


## Alibaba Cloud Setup (Optional)
- [x] Research Alibaba Cloud registration process
- [x] Create detailed setup guide with domain connection
- [x] Evaluate timing for cloud infrastructure (currently not needed for UI/UX phase)


## Blockchain Platform Selection
- [x] Research EVM-compatible chains for PerpDEX development
- [x] Compare ease of development, tooling, and ecosystem
- [x] Evaluate gas costs, speed, and security
- [x] Create recommendation for PerpX smart contract deployment (Base recommended)


## Base Development Environment Setup
- [x] Install Hardhat and dependencies
- [x] Create Base project structure
- [x] Configure Base Sepolia testnet connection
- [x] Create comprehensive setup guide
- [x] Create sample PerpX demo contract
- [x] Create deployment and interaction scripts


## PerpDEX Model Selection
- [x] Research AMM-based Perpetual DEX model (Perpetual Protocol, Drift, GMX)
- [x] Research Order Book-based model (Hyperliquid, Zeta, LogX)
- [x] Research Hybrid model (dYdX, Aevo, ParaDEX)
- [x] Research Oracle-based model (GMX, Gains Network)
- [x] Compare implementation complexity, liquidity requirements, and user experience
- [x] Create comprehensive PerpDEX model comparison guide
- [x] Recommendation: Oracle型 (GMX方式) - lowest cost, fastest launch, no market makers needed


## GMX-Style Implementation (Oracle + Liquidity Pool)
- [x] Create detailed GMX-style implementation guide
- [x] Document smart contract architecture (Liquidity Pool, Position Manager, Oracle Integration)
- [x] Create cost breakdown and timeline ($85K-$180K, 5-8 months)
- [x] Explain development complexity vs other models (easiest option)

## GitHub Migration & Infrastructure
- [x] Explain GitHub migration process from Manus
- [x] Document backend infrastructure requirements (currently not needed)
- [x] Clarify smart contract vs backend server roles
- [x] Create scalability guide for high user volume (Base handles it)
- [x] Explain Alibaba Cloud / AWS integration strategy (not needed now, AWS recommended for future)


## UI/UX Updates
- [x] Remove demo mode button from header
- [x] Ensure wallet connection is required
- [x] Add proper error handling for wallet connection
- [ ] Test updated UI
- [ ] Create checkpoint with changes


## Full-Stack Upgrade (Backend + Database)
- [x] Upgrade project to full-stack with database and user management
- [x] Create database schema for rewards system (walletUsers, taskCompletions tables)
- [x] Implement backend API for rewards (getProfile, claimConnectBonus, connectX, disconnectX, connectDiscord, disconnectDiscord, completeDailyPost)
- [x] Connect frontend to backend APIs via tRPC
- [x] Implement JST 00:00 daily task reset logic on server side
- [x] Add persistent user data storage (points, social connections, task history)
- [ ] Test full rewards flow end-to-end
- [ ] Create checkpoint with full-stack implementation


## OAuth & Admin Dashboard Implementation
- [x] Implement X (Twitter) OAuth 2.0 authentication flow
- [x] Implement Discord OAuth 2.0 authentication flow
- [x] Create Admin Dashboard page for user management
- [x] Add user list view with points and connection status
- [x] Add admin-only route protection
- [x] Configure OAuth environment variables (X_CLIENT_ID, X_CLIENT_SECRET, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET)
- [x] Configure ADMIN_PASSWORD for admin dashboard
- [ ] Clean up Manus-related code traces from codebase
- [ ] Remove/replace Manus comments and references
- [ ] Update package names and environment variable references
- [ ] Test OAuth flow on published site


## Production Blank Screen Fix
- [ ] Diagnose production blank screen issue
- [ ] Fix build/deployment configuration
- [ ] Test on published URL
- [ ] Verify OAuth flow works


## MetaMask Only Integration
- [x] Remove WalletConnect/RainbowKit dependency
- [x] Implement MetaMask direct connection
- [ ] Test on production


## X OAuth Error Fix
- [x] Diagnose X OAuth "Something went wrong" error (callback URL mismatch)
- [x] Fix callback URL to use production domain instead of internal server URL
- [ ] Test OAuth flow after fix
