"use client";

import { useEffect, useMemo, useState } from "react";

import { MiniChart } from "@/components/mini-chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { CarRow, DashboardSummary } from "@/lib/types";

export function DashboardPanel() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [cars, setCars] = useState<CarRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [summaryResponse, carsResponse] = await Promise.all([
          fetch("/api/dashboard/summary", { cache: "no-store" }),
          fetch("/api/dashboard/cars?limit=8", { cache: "no-store" }),
        ]);

        if (!summaryResponse.ok || !carsResponse.ok) {
          throw new Error("Unable to load dashboard data.");
        }

        const [summaryData, carsData] = await Promise.all([summaryResponse.json(), carsResponse.json()]);

        if (!isMounted) {
          return;
        }

        setSummary(summaryData.summary);
        setCars(carsData.cars);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unexpected error.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const averageMpg = useMemo(() => {
    if (cars.length === 0) {
      return 0;
    }

    const total = cars.reduce((acc, car) => acc + car.mpg_city, 0);
    return Math.round(total / cars.length);
  }, [cars]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total cars</CardDescription>
            <CardTitle className="text-2xl">{isLoading ? "..." : summary?.totalCars ?? 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Average price</CardDescription>
            <CardTitle className="text-2xl">{isLoading ? "..." : `$${summary?.averagePrice.toLocaleString() ?? "0"}`}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg city MPG</CardDescription>
            <CardTitle className="text-2xl">{isLoading ? "..." : averageMpg}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div>
              <CardTitle>Fuel efficiency snapshot</CardTitle>
              <CardDescription>Sample data grouped by make</CardDescription>
            </div>
            <Badge variant="secondary">Backend API</Badge>
          </div>
        </CardHeader>
        <CardContent>{cars.length > 0 ? <MiniChart cars={cars} /> : <p className="text-sm text-muted-foreground">No chart data yet.</p>}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cars dataset</CardTitle>
          <CardDescription>Data from /api/dashboard/cars</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Make</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Hwy MPG</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>{car.make}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell className="text-right">${car.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{car.mpg_highway}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
