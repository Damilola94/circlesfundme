import { cn } from "@/lib/utils";

export type StatusType =
  | "Approved"
  | "Pending"
  | "Waitlist"
  | "Completed"
  | "Rejected"
  | "Active"
  | "Successful"
  | "Failed"
  | "Awaiting"
  | "Abandoned"
  | "Processing"
  | "Processed"
  | "Confirmed"
  | "Queued";

interface StatusProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string }> = {
  Approved: {
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "bg-green-500",
  },
  Pending: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    dot: "bg-amber-500",
  },
  Processing: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
    dot: "bg-indigo-500",
  },
  Processed: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    dot: "bg-blue-500",
  },
  Queued: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    dot: "bg-purple-500",
  },
  Awaiting: {
    bg: "bg-cyan-100",
    text: "text-cyan-800",
    dot: "bg-cyan-500",
  },
  Waitlist: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    dot: "bg-gray-500",
  },
  Rejected: {
    bg: "bg-red-100",
    text: "text-red-800",
    dot: "bg-red-500",
  },
  Completed: {
    bg: "bg-sky-100",
    text: "text-sky-800",
    dot: "bg-sky-500",
  },
  Successful: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    dot: "bg-emerald-600",
  },
  Confirmed: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    dot: "bg-emerald-600",
  },
  Active: {
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "bg-green-500",
  },
  Failed: {
    bg: "bg-rose-100",
    text: "text-rose-800",
    dot: "bg-rose-600",
  },
  Abandoned: {
    bg: "bg-stone-100",
    text: "text-stone-800",
    dot: "bg-stone-600",
  },
};

export function TransactionStatus({ status, className }: StatusProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex font-outfit items-center gap-2 px-3 py-1.5 rounded-full w-fit text-xs font-medium",
        config.bg,
        config.text,
        className,
      )}
    >
      <div className={cn("w-2 h-2 rounded-full", config.dot)} />
      {status}
    </div>
  );
}
