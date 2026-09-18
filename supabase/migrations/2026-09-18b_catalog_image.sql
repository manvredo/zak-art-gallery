-- Adds a small thumbnail to each catalog entry so the work list is a
-- visual reference, not just text rows.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

alter table catalog
  add column if not exists image_url text;
