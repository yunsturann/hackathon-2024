// ** React Imports
import React, { forwardRef } from "react";

// ** Utils
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  necessary?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, error, type = "text", necessary = false, ...rest } = props;

  return (
    <div className="flex-1">
      {props.label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          {props.label} {necessary && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        {...rest}
        className={cn(
          "outline-none py-2 block w-full transition duration-300 ease-in-out text-black dark:text-white dark:bg-gray-600 px-4 rounded-md border border-gray-300 dark:border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50",
          className
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
