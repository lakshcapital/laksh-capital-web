// Server-only Sanity client with write access. Used by API routes
// to create documents (e.g. newsletter subscribers).
//
// Do NOT import this from a client component — the SANITY_API_TOKEN
// must never leak to the browser.

import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

export const serverClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
