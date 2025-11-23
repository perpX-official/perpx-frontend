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
