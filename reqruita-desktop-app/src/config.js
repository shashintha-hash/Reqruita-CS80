/**
 * Backend URL — pick ONE:
 *
 * LOCAL DEV  (same Wi-Fi):  use your machine's LAN IP + port 3001
 * DEPLOYED   (any network):  use the Render / cloud URL
 */

// ── Local dev (same Wi-Fi) ──
export const BACKEND_URL = "http://172.20.10.4:3001";

// ── Deployed on Render (cross-network) ──
// export const BACKEND_URL = "https://YOUR-APP-NAME.onrender.com";

/**
 * Metered.ca TURN server API key (free — 50 GB/mo).
 * Sign up at: https://dashboard.metered.ca/signup
 * Create a free app, copy the API key, and paste it here.
 * Leave empty ("") for LAN-only mode (STUN-only, no TURN relay).
 */
export const METERED_API_KEY = "";
