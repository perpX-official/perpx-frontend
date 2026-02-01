# Original UI/UX Files for Vercel Deployment

This folder contains the original UI/UX files without the "Coming Soon" overlay.
These files are intended for use when deploying to Vercel with a custom domain.

## Files Included

- `Earn.tsx` - Liquidity pools and lending page (fully functional version)
- `Stake.tsx` - Staking page
- `Stats.tsx` - Statistics and analytics page
- `Referral.tsx` - Referral program page
- `Dashboard.tsx` - User dashboard page

## How to Use

To enable the full UI without Coming Soon overlays:

1. Replace the corresponding files in `client/src/pages/` with these versions
2. Or modify the current pages to remove the `<ComingSoonOverlay />` component and the filter/blur classes

## Notes

- The current production version shows a semi-transparent Coming Soon overlay
- The background UI is visible but blurred (grayscale-[0.5] blur-[2px] opacity-20)
- This gives users a preview of what's coming while indicating the feature is not yet available
