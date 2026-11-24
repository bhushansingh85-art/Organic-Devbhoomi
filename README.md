# Organic Devbhoomi

A Next.js + TypeScript storefront starter for **Organic Devbhoomi — From Nature to Your Home**.

## Included in this first frontend build
- Responsive modern-minimal homepage (white + forest green)
- Mountain + leaf brand mark as inline SVG
- Seasonal hero, categories, product cards, journal and newsletter sections
- Product search and category filters
- Product quick-view modal and wishlist interaction
- Black animated side-basket with quantity controls
- Light/dark theme toggle (desktop)
- Dev AI chat widget (UI demo only)
- Firebase initialization scaffold with Email/Google auth dependencies ready
- Mobile bottom navigation

## Run locally
1. Install Node.js 20 or newer.
2. In this folder run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Firebase setup
1. Create a Firebase project with help from a parent/guardian if needed for account or billing setup.
2. Enable Email/Password and Google providers in Firebase Authentication.
3. Create a Firestore database and Storage bucket.
4. Copy `.env.example` to `.env.local` and fill in the Firebase web app configuration.
5. Add restrictive Firestore and Storage security rules before using real customer data.

Firebase is **not connected yet** in this starter because project credentials and provider configuration have not been supplied. `app/firebase.ts` initializes Firebase only when credentials are present.

## Important before real launch
- Replace sample product data and remote demo images with verified inventory and owned/licensed images.
- Implement server-verified order creation, stock reservation and payment verification.
- Never trust prices, discounts, delivery charges or role claims sent by the browser.
- Keep privileged admin actions in trusted server code; assign roles with Firebase custom claims.
- Configure Firebase App Check, rate limits, backups and monitoring.
- Add real delivery partner/location integration before advertising live GPS tracking.
- Connect a real AI API on the server before enabling Dev AI for customer data or actions.
- Payment gateway, Maps, messaging and AI providers may incur charges. Test in sandbox mode first.

This is a frontend prototype and integration-ready starter, not a production-ready commerce backend.

## Starter security rules
- `firestore.rules` and `storage.rules` are conservative starter examples.
- Review and test them in the Firebase Emulator before deployment.
- The `admin` custom claim must be assigned only by trusted Admin SDK code; never let a browser set it.
- The order/review rules intentionally require trusted server functions for creation and verification.
