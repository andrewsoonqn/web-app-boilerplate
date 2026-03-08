insert into public.cars (make, model, year, price, mpg_city, mpg_highway)
values
  ('Toyota', 'Corolla', 2020, 18990, 30, 38),
  ('Honda', 'Civic', 2021, 20500, 31, 40),
  ('Tesla', 'Model 3', 2022, 39990, 130, 120),
  ('Ford', 'Escape', 2019, 17600, 23, 31),
  ('Hyundai', 'Elantra', 2023, 21900, 33, 42),
  ('Mazda', 'CX-5', 2022, 27400, 24, 30),
  ('Subaru', 'Impreza', 2020, 20100, 28, 36),
  ('Kia', 'Niro', 2021, 24800, 49, 53)
on conflict do nothing;
