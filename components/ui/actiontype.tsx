import { cn } from "@/lib/utils"
import {
  ExportIcon,
  ImportIcon,
} from "@/public/assets/icons"

export type ActionType = "Contribution" | "Withdrawal"

interface ActionTypeProps {
  actionType: ActionType
  className?: string
}

const actionConfig: Record<
  ActionType,
  {
    border: string
    text: string
    iconColor: string
    Icon: React.ElementType
  }
> = {
  Contribution: {
    border: "border-emerald-500",
    text: "text-emerald-600",
    iconColor: "text-emerald-500",
    Icon: ImportIcon,
  },
  Withdrawal: {
    border: "border-red-500",
    text: "text-red-600",
    iconColor: "text-red-500",
    Icon: ExportIcon,
  },
}

export function TransactionType({ actionType = "Contribution", className }: ActionTypeProps) {
  const config = actionConfig[actionType] || {
    border: "border-gray-500",
    text: "text-gray-600",
    iconColor: "text-gray-500",
    Icon: () => null,
  }

  const { Icon } = config

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit text-sm font-medium border bg-white",
        config.border,
        config.text,
        className
      )}
    >
      <Icon className={cn("w-4 h-4", config.iconColor)} />
      {actionType}
    </div>
  )
}
