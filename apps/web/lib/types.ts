export type CarRow = {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mpg_city: number;
  mpg_highway: number;
};

export type DashboardSummary = {
  totalCars: number;
  averagePrice: number;
  bestHighwayMpg: number;
};
