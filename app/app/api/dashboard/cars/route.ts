import { NextRequest, NextResponse } from "next/server";

import { sampleCars } from "@/lib/sample-data";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = Number(limitParam ?? "12");
  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 50) : 12;

  const supabase = createServerSupabase();

  if (!supabase) {
    return NextResponse.json({
      source: "sample",
      cars: sampleCars.slice(0, safeLimit),
    });
  }

  const { data, error } = await supabase
    .from("cars")
    .select("id, make, model, year, price, mpg_city, mpg_highway")
    .order("id", { ascending: true })
    .limit(safeLimit);

  if (error) {
    return NextResponse.json({ source: "sample", cars: sampleCars.slice(0, safeLimit), warning: error.message });
  }

  return NextResponse.json({
    source: "supabase",
    cars: data,
  });
}
