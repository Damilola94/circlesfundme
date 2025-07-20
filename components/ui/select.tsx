"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  className,
  placeholder = "Select an option",
}: CustomSelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-outfit">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 text-left text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
            <span className="block truncate text-gray-900 font-outfit">
              {selectedOption?.label || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    cn(
                      "cursor-pointer select-none py-2 px-4 font-outfit",
                      active ? "bg-teal-100 text-teal-900" : "text-gray-900"
                    )
                  }
                >
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
