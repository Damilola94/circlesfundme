"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

export type DateFilterMode = "daily" | "monthly";

export type FilterState = {
  email: string;
  dateMode: DateFilterMode;
  fromDate: string;
  toDate: string;
  month: string;
};

const defaultFilters: FilterState = {
  email: "",
  dateMode: "daily",
  fromDate: "",
  toDate: "",
  month: "",
};

function monthToRange(month: string): {
  fromDate: string;
  toDate: string;
} {
  if (!month) return { fromDate: "", toDate: "" };

  const [year, mon] = month.split("-").map(Number);

  const from = new Date(year, mon - 1, 1);
  const to = new Date(year, mon, 0);

  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;

  return {
    fromDate: fmt(from),
    toDate: fmt(to),
  };
}

export default function FilterModal({
  open,
  onClose,
  onApply,
  initialFilters,
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters,
  });

  const set = (patch: Partial<FilterState>) =>
    setFilters((prev) => ({
      ...prev,
      ...patch,
    }));

  const handleApply = () => {
    let resolved = { ...filters };

    if (filters.dateMode === "monthly" && filters.month) {
      const { fromDate, toDate } = monthToRange(filters.month);

      resolved = {
        ...resolved,
        fromDate,
        toDate,
      };
    }

    onApply(resolved);
    onClose();
  };

  const handleClear = () => {
    setFilters(defaultFilters);
    onApply(defaultFilters);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] font-outfit">
        <div className="flex flex-row items-center justify-between space-y-0">
          <h1 className="text-lg font-semibold">
            Filter Users
          </h1>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 mt-2">
          <div className="space-y-1.5">
            <Input
              label="Email Address"
              id="filter-email"
              type="email"
              placeholder="e.g. user@example.com"
              value={filters.email}
              onChange={(e) => set({ email: e.target.value })}
              className="rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Date Range
            </p>

            <div className="flex gap-2">
              {(["daily", "monthly"] as DateFilterMode[]).map(
                (mode) => (
                  <button
                    key={mode}
                    onClick={() =>
                      set({
                        dateMode: mode,
                        fromDate: "",
                        toDate: "",
                        month: "",
                      })
                    }
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                      filters.dateMode === mode
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {mode === "daily"
                      ? "Daily Range"
                      : "Monthly"}
                  </button>
                )
              )}
            </div>
          </div>

          {filters.dateMode === "daily" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Input
                  id="from-date"
                  label="From"
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) =>
                    set({ fromDate: e.target.value })
                  }
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                />
              </div>

              <div className="space-y-1.5">
                <Input
                  id="to-date"
                  label="To"
                  type="date"
                  value={filters.toDate}
                  min={filters.fromDate || undefined}
                  onChange={(e) =>
                    set({ toDate: e.target.value })
                  }
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {filters.dateMode === "monthly" && (
            <div className="space-y-1.5">
              <Input
                label="Select Month"
                id="month-picker"
                type="month"
                value={filters.month}
                onChange={(e) =>
                  set({ month: e.target.value })
                }
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent w-1/2"
              />

              {filters.month && (
                <p className="text-xs text-gray-400 mt-1">
                  Will query{" "}
                  <span className="font-medium text-gray-600">
                    {monthToRange(filters.month).fromDate}
                  </span>{" "}
                  →{" "}
                  <span className="font-medium text-gray-600">
                    {monthToRange(filters.month).toDate}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
            onClick={handleClear}
          >
            Clear All
          </Button>

          <Button
            className="flex-1 rounded-xl bg-gray-900 hover:bg-gray-800 text-white"
            onClick={handleApply}
          >
            Apply Filter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}