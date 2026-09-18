-- Genre field on shop products (Landscape/Animal/Still Life/...), so a sale
-- can auto-generate the matching work-catalog entry without asking again.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

alter table products
  add column if not exists genre text;
