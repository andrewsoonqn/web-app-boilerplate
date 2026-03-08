create table if not exists public.cars (
  id bigint generated always as identity primary key,
  make text not null,
  model text not null,
  year int not null check (year >= 1900 and year <= 2100),
  price numeric(10,2) not null check (price >= 0),
  mpg_city int not null check (mpg_city >= 0),
  mpg_highway int not null check (mpg_highway >= 0),
  created_at timestamptz not null default now()
);

create index if not exists idx_cars_make on public.cars(make);
create index if not exists idx_cars_year on public.cars(year);

alter table public.cars enable row level security;

drop policy if exists "Allow read access to cars" on public.cars;
create policy "Allow read access to cars"
  on public.cars
  for select
  using (true);
