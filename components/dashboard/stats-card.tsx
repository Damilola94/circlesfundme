import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface StatsCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground font-outfit">{title}</p>
            <p className="text-3xl font-bold text-black mt-3 font-outfit">{value}</p>
          </div>
          <div className={`p-3 rounded-full bg-[#00A86B26] mt-3`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
