// Merch catalogue shown on /shop.
//
// PRICES ARE ALSO SET IN api/merch-checkout.js — that file is the one Stripe
// charges from (anything in the browser can be edited). Change both together.
//
// Fulfilment: orders land in Stripe with the item, size and shipping address.
// Each one is then placed with the print-on-demand partner (Printful) by hand,
// until the Printful API is wired up. The camo tee is an all-over print, which
// costs more to produce than a standard tee — hence the higher price.

export const TEE_SIZES = ["S", "M", "L", "XL", "XXL"];

export const SHIPPING_EUR = 5; // flat rate, UK / IE / EU — keep in sync with the API

export const MERCH = [
  { id: "tee-black", kind: "tee", name: "Basic tee — Black", price: 28, tag: "TEE",
    shirt: "#141416", chest: "/merch/logo-bone.png", stage: "#FFFFFF",
    desc: "Heavyweight black tee. Oversized boxy fit. Small chest logo, large logo across the back." },
  { id: "tee-white", kind: "tee", name: "Basic tee — White", price: 28, tag: "TEE",
    shirt: "#FFFFFF", chest: "/merch/logo-ink.png", stage: "#E4E2DA",
    desc: "Heavyweight white tee. Oversized boxy fit. Small chest logo, large logo across the back." },
  { id: "tee-camo", kind: "tee", name: "Basic tee — Woodland Camo", price: 35, tag: "TEE",
    shirt: "camo", chest: "/merch/logo-filled.png", stage: "#FFFFFF",
    desc: "All-over woodland camo. Oversized boxy fit. Small chest logo, large logo across the back." },
  { id: "stk-pack", kind: "sticker", name: "Sticker pack (6)", price: 12, tag: "PACK",
    stage: "#E4E2DA",
    desc: "Six die-cut matte vinyl stickers: the full logo and the monkey head, in white, black, camo and lime." },
];

export const merchById = (id) => MERCH.find((m) => m.id === id);
