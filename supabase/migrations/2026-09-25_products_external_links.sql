-- Marketplace listing (Artfinder, DailyPaintWorks, ...) for a shop product.
-- When set, the product's buy button sends the customer to that listing
-- instead of adding the painting to the site's own cart.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

alter table products
  add column if not exists external_url text;
