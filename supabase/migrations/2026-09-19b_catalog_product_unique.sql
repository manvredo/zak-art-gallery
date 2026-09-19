-- Guards against the catalog-numbering bug where a double-click on "Produkt
-- speichern" fired the save handler twice, and both runs raced past the
-- "does this product already have a catalog entry?" check before either had
-- inserted - creating two catalog rows for one product and quietly burning
-- a number (e.g. Portrait jumped to 8 with only 7 real portraits online).
-- The app now also disables the Save button while a save is in flight, but
-- this constraint is the hard backstop against it happening again.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

create unique index if not exists catalog_product_id_unique
  on catalog (product_id)
  where product_id is not null;
