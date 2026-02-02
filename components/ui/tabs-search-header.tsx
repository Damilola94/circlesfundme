"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Update based on your button path
import React from "react";

interface TabItem {
    id: string | number;
    label: string;
}

interface TabsSearchHeaderProps {
    tabs: TabItem[];
    selectedTab?: string | number;
    onTabChange: (id: string | number) => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;

    onFilterClick?: () => void;
    secondaryFilter?: boolean;
    isLoading?: boolean;
}

export default function TabsSearchHeader({
    tabs,
    selectedTab,
    onTabChange,
    searchTerm,
    onSearchChange,
    onFilterClick,
    secondaryFilter = false,
    isLoading = false,
}: TabsSearchHeaderProps) {
    return (
        <div className="flex min-w-[800px] justify-between items-end border-b-2 pb-0">
            <div className="flex space-x-1 bg-gray-100 rounded-lg w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        disabled={isLoading}
                        className={`px-4 py-2 text-sm font-medium font-outfit transition-colors disabled:opacity-50 ${selectedTab === tab.id
                            ? "border-b-2 border-primary-700 text-primary-700"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {secondaryFilter && <div className="flex items-center space-x-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        disabled={isLoading}
                        className="w-64 pl-10"
                    />
                </div>
                <Button
                    className="bg-primary-900 hover:bg-primary-700"
                    disabled={isLoading}
                    onClick={onFilterClick}
                >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
            </div>}
        </div>
    );
}
