-- Reserve a shop product for one specific customer (e.g. a commissioned
-- painting that's waiting for payment). A reserved product stays visible in
-- the shop as "Reserved" and can't be bought there; only the customer who
-- knows the access code can buy it via the "Client access" page.
--
-- The codes live in their own table WITHOUT a public read policy, because the
-- products table is readable by every visitor (select *) - a code stored there
-- would be visible to anyone. The client-access and checkout API routes read
-- this table with the service role key.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

alter table products
  add column if not exists reserved boolean not null default false;

create table if not exists product_reservations (
  product_id bigint primary key references products(id) on delete cascade,
  customer_name text,
  access_code text not null,
  created_at timestamptz not null default now()
);

create index if not exists product_reservations_access_code_idx
  on product_reservations (access_code);

alter table product_reservations enable row level security;

create policy "Reservations authenticated read"
  on product_reservations for select
  using (auth.role() = 'authenticated');

create policy "Reservations authenticated insert"
  on product_reservations for insert
  with check (auth.role() = 'authenticated');

create policy "Reservations authenticated update"
  on product_reservations for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Reservations authenticated delete"
  on product_reservations for delete
  using (auth.role() = 'authenticated');
