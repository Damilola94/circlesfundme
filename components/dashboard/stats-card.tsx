import { Card, CardContent } from "@/components/ui/card";
import React from "react";
interface StatsCardProps {
  title: string
  value: React.ReactNode
  icon: React.ReactNode
  period?: string
  onPeriodChange?: (value: string) => void
}

export function StatsCard({
  title,
  value,
  icon,
  period,
  onPeriodChange,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground font-outfit">
              {title}
            </p>
            <p className="text-3xl font-bold text-black mt-3 font-outfit">
              {value}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {onPeriodChange && (
              <select
                value={period}
                onChange={(e) => onPeriodChange(e.target.value)}
                className="text-xs border rounded-full px-2 py-1 font-outfit"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            )}
            <div className="p-3 rounded-full bg-[#00A86B26]">
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
