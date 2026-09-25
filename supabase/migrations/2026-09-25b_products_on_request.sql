-- "On request" products (e.g. large formats): the price is hidden and the buy
-- button becomes an enquiry that opens the contact form for this artwork.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

alter table products
  add column if not exists on_request boolean not null default false;
