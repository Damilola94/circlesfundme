import { cn } from "@/lib/utils";

export type StatusType =
  | "Active"
  | "Completed"
  | "Pending"
  | "Rejected"
  | "Waitlisted"
  | "Successful"
  | "Failed";

interface StatusProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string }> = {
  Active: {
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "bg-green-500",
  },
  Completed: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    dot: "bg-blue-500",
  },
  Pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    dot: "bg-yellow-500",
  },
  Waitlisted: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    dot: "bg-gray-500",
  },
  Rejected: {
    bg: "bg-red-100",
    text: "text-red-800",
    dot: "bg-red-800",
  },
  Successful: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    dot: "bg-emerald-600",
  },
  Failed: {
    bg: "bg-rose-100",
    text: "text-rose-800",
    dot: "bg-rose-600",
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
