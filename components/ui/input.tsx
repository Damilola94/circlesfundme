import type React from "react";
import { forwardRef, useState } from "react";
import { cn, formatAmount, formatMoney } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(props.value || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;

      if (type === "money") {
        const formatted = formatMoney(rawValue);
        setInternalValue(formatted);
        onChange?.({
          ...e,
          target: {
            ...e.target,
            value: formatted,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      } else {
        onChange?.(e);
      }
    };

    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-900 font-outfit mb-2">
            {label}
          </label>
        )}
        <input
          type={type === "money" ? "text" : type}
          className={cn(
            "flex font-outfit h-10 w-full rounded-full border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          value={type === "money" ? internalValue : props.value}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
