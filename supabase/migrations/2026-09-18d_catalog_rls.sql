-- Row-level security for the catalog table: anyone can read (the shop
-- detail page shows the catalog number to every visitor), but only a
-- logged-in admin can create/edit/delete entries.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

alter table catalog enable row level security;

create policy "Catalog public read access"
  on catalog for select
  using (true);

create policy "Catalog authenticated insert"
  on catalog for insert
  with check (auth.role() = 'authenticated');

create policy "Catalog authenticated update"
  on catalog for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Catalog authenticated delete"
  on catalog for delete
  using (auth.role() = 'authenticated');
