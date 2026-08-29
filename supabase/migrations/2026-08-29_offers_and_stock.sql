-- Adds support for time-limited offers (sale price + countdown) and
-- stock/edition tracking for prints on the "products" table.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

alter table products
  add column if not exists sale_price numeric,
  add column if not exists sale_end_date timestamptz,
  add column if not exists stock_quantity integer,
  add column if not exists edition_size integer;
