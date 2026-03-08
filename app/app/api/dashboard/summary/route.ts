import { NextResponse } from "next/server";

import { sampleCars } from "@/lib/sample-data";
import type { CarRow } from "@/lib/types";
import { createServerSupabase } from "@/lib/supabase/server";

function summarizeCars(cars: CarRow[]) {
  const totalCars = cars.length;
  const totalPrice = cars.reduce((sum, car) => sum + car.price, 0);
  const averagePrice = totalCars ? Math.round(totalPrice / totalCars) : 0;
  const bestHighwayMpg = cars.reduce((best, car) => Math.max(best, car.mpg_highway), 0);

  return {
    totalCars,
    averagePrice,
    bestHighwayMpg,
  };
}

export async function GET() {
  const supabase = createServerSupabase();

  if (!supabase) {
    return NextResponse.json({
      source: "sample",
      summary: summarizeCars(sampleCars),
    });
  }

  const { data, error } = await supabase.from("cars").select("id, make, model, year, price, mpg_city, mpg_highway");

  if (error || !data) {
    return NextResponse.json({ source: "sample", summary: summarizeCars(sampleCars), warning: error?.message });
  }

  return NextResponse.json({
    source: "supabase",
    summary: summarizeCars(data as CarRow[]),
  });
}
