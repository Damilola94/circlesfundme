"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import useGetQuery from "@/hooks/useGetQuery";
import { toast } from "react-toastify";
import { formatDate, formatCurrency, formatFullName } from "@/lib/utils";
import {
  User,
  tabs,
  schemeTabs,
  savingsSubTabs,
  SchemeMode,
  SavingsSubTab,
  FilterState,
} from "./types";
import { useSearchParams } from "next/navigation";
import TabsSearchHeader from "@/components/ui/tabs-search-header";
import { SchemeStatsCard } from "@/components/user-management/scheme-stats-card";
import FilterModal from "@/components/ui/user-filter-modal";

export default function UserManagement() {
  const [schemeMode, setSchemeMode] = useState<SchemeMode>(undefined);
  const searchParams = useSearchParams();
  const statusParams = searchParams.get("status");
  const [selectedTab, setSelectedTab] = useState<string | number>(
    statusParams || "all-users"
  );

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    email: "",
    dateMode: "daily",
    fromDate: "",
    toDate: "",
    month: "",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [metaData, setMetaData] = useState({
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  const currentTabStatus = tabs.find((tab) => tab.id === selectedTab)?.status;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput);
      setPageNumber(1);
    }, 600);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const buildQueryParams = () => {
    const q: Record<string, any> = {
      SchemeMode: schemeMode,
      status: currentTabStatus,
      PageNumber: pageNumber,
      PageSize: pageSize,
    };

    if (searchTerm) q.SearchKey = searchTerm;
    if (activeFilters.email) q.SearchKey = activeFilters.email;
    if (activeFilters.fromDate) q.FromDate = activeFilters.fromDate;
    if (activeFilters.toDate) q.ToDate = activeFilters.toDate;

    return q;
  };

  const { data, status, error, refetch } = useGetQuery({
    endpoint: "adminusermanagement/users",
    pQuery: buildQueryParams(),
    queryKey: [
      "users",
      schemeMode,
      currentTabStatus,
      pageNumber,
      pageSize,
      searchTerm,
      activeFilters,
    ],
    auth: true,
  });

  const { data: schemeMetrics, status: schemeMetricsStatus } = useGetQuery({
    endpoint: "admindashboard/scheme-metrics",
    queryKey: ["scheme-metrics"],
    auth: true,
  });

  const schemes = schemeMetrics?.isSuccess ? schemeMetrics.data.schemes : [];

  useEffect(() => {
    if (status === "success") {
      if (data?.isSuccess) {
        setUsers(data.data);

        setMetaData(data.metaData);
      } else {
        toast.error(data?.message || "Failed to fetch users.");
        setUsers([]);
      }
    }
    if (status === "error") {
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message || "Something went wrong."
          : "Something went wrong."
      );
      setUsers([]);
    }
  }, [data, status, error]);

  const handleSchemeModeChange = (mode: SchemeMode) => {
    setSchemeMode(mode);
    setSelectedTab("all-users");
    setUsers([]);
    setSearchInput("");
    setSearchTerm("");
    setPageNumber(1);
  };

  const handleTabChange = (tabId: string | number) => {
    setUsers([]);
    setSelectedTab(tabId);
    setSearchInput("");
    setSearchTerm("");
    setPageNumber(1);
  };

  const handleApplyFilter = (filters: FilterState) => {
    setActiveFilters(filters);
    setPageNumber(1);
    setUsers([]);
  };

  const hasActiveFilters =
    !!activeFilters.email || !!activeFilters.fromDate || !!activeFilters.toDate;

  const isLoading = status === "loading";
  const isError =
    status === "error" || (status === "success" && data && !data.isSuccess);

  return (
    <div className="overflow-x-auto 1140:overflow-visible flex-1 space-y-6 p-6">
      <div>
        {schemeMetricsStatus === "loading" ? (
          <div className="flex items-center">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span>Loading scheme metrics...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemes.map((scheme: any) => (
              <SchemeStatsCard
                key={scheme.schemeType}
                name={scheme.schemeName}
                total={scheme.totalUsers}
                active={scheme.activeUsers}
                inactive={scheme.deactivatedUsers}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {schemeTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleSchemeModeChange(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all font-outfit ${
              schemeMode === tab.id
                ? "bg-white text-primary-600  border-primary-600  shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <TabsSearchHeader
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        searchTerm={searchInput}
        onSearchChange={(v) => setSearchInput(v)}
        onFilterClick={() => setFilterOpen(true)}
        isLoading={isLoading}
        secondaryFilter
      />

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 -mt-2">
          {activeFilters.email && (
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
              Email: {activeFilters.email}
              <button
                onClick={() =>
                  handleApplyFilter({ ...activeFilters, email: "" })
                }
                className="ml-1 hover:text-green-900"
              >
                ×
              </button>
            </span>
          )}
          {(activeFilters.fromDate || activeFilters.toDate) && (
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
              {activeFilters.fromDate} → {activeFilters.toDate}
              <button
                onClick={() =>
                  handleApplyFilter({
                    ...activeFilters,
                    fromDate: "",
                    toDate: "",
                    month: "",
                  })
                }
                className="ml-1 hover:text-green-900"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-9 gap-4 min-w-[800px] px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit w-full">
        <div>Name</div>
        <div>Date Joined</div>
        <div>Scheme</div>
        <div>Contribution Amount (₦)</div>
        <div>Amount Contributed (₦)</div>
        <div>Loan-Ready Amount (₦)</div>
        <div>Eligible Loan (₦)</div>
        <div>Amount Repaid (₦)</div>
        <div></div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-gray-500">Loading users...</span>
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">Failed to load users.</p>
            <Button onClick={refetch} variant="outline">
              Try Again
            </Button>
          </div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <Card
              key={user.userId}
              className="shadow-sm bg-white min-w-[800px]"
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-9 w-full gap-4 items-center font-outfit">
                  <div className="font-medium text-gray-900">
                    {formatFullName(user.name)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(user.dateJoined)}
                  </div>
                  <div className="text-sm text-gray-600">{user.scheme}</div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(user.contribution)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(user.totalContribution)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(user.contributionAmountToQualifyForLoan)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(user.eligibleLoan)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(user.totalRepaidAmount)}
                  </div>
                  <Link href={`/user-management/${user.userId}`}>
                    <Button
                      size="sm"
                      className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-3 text-xs"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No users found.</p>
        )}
      </div>

      {!isLoading && !isError && (
        <Pagination
          current={metaData.currentPage}
          onPageChange={(p) => setPageNumber(p)}
          onRowChange={(s) => {
            setPageSize(s);
            setPageNumber(1);
          }}
          pageSize={metaData.pageSize}
          total={metaData.totalCount}
        />
      )}

      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFilter}
        initialFilters={activeFilters}
      />
    </div>
  );
}
