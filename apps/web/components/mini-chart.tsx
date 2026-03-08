import type { CarRow } from "@/lib/types";

type MiniChartProps = {
  cars: CarRow[];
};

export function MiniChart({ cars }: MiniChartProps) {
  const chartRows = cars.slice(0, 6);
  const maxValue = Math.max(...chartRows.map((car) => car.mpg_city), 1);

  return (
    <div className="space-y-3">
      {chartRows.map((car) => {
        const width = Math.max(8, Math.round((car.mpg_city / maxValue) * 100));
        return (
          <div key={car.id} className="grid grid-cols-[120px_1fr_40px] items-center gap-3">
            <p className="truncate text-xs text-muted-foreground">{car.make}</p>
            <div className="h-2 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${width}%` }} />
            </div>
            <p className="text-xs font-medium">{car.mpg_city}</p>
          </div>
        );
      })}
    </div>
  );
}
