// ** React Imports
import { forwardRef } from "react";

// ** Utils
import { cn } from "@/lib/utils";

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  necessary?: boolean;
  options: { value: string; label: string }[];
}

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  (props, ref) => {
    const { className, error, label, options, necessary, ...rest } = props;

    return (
      <div className="flex-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            {label} {necessary && <span className="text-red-500">*</span>}
          </label>
        )}
        <select
          ref={ref}
          {...rest}
          className={cn(
            "outline-none p-2 block w-full transition duration-300 ease-in-out text-black dark:text-white dark:bg-gray-600 rounded-md border border-gray-300 dark:border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50",
            className
          )}
        >
          {!necessary && (
            <option value="" className="text-gray-400">
              Select an item ...
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

SelectBox.displayName = "SelectBox";

export default SelectBox;
