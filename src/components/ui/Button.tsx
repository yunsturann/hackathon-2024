// ** React Imports
import React, { forwardRef } from "react";

// ** Utils
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "gray" | "blue" | "dark" | "green" | "orange" | "purple" | "red";
}

const colors = {
  gray: "bg-gray-100 border-gray-300 text-black hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:hover:bg-gray-600 focus:ring-gray-500 dark:focus:ring-gray-500",
  blue: "bg-blue-500 border-blue-600 text-white hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-500 dark:border-blue-600 dark:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-500",
  dark: "bg-gray-800 border-gray-900 text-white hover:bg-gray-700 focus:ring-gray-500 dark:bg-gray-800 dark:border-gray-900 dark:text-white dark:hover:bg-gray-900 dark:focus:ring-gray-500",
  green:
    "bg-green-500 border-green-600 text-white hover:bg-green-600 focus:ring-green-500 dark:bg-green-500 dark:border-green-600 dark:text-white dark:hover:bg-green-600 dark:focus:ring-green-500",
  orange:
    "bg-orange-500 border-orange-600 text-white hover:bg-orange-600 focus:ring-orange-500 dark:bg-orange-500 dark:border-orange-600 dark:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-500",
  purple:
    "bg-purple-500 border-purple-600 text-white hover:bg-purple-600 focus:ring-purple-500 dark:bg-purple-500 dark:border-purple-600 dark:text-white dark:hover:bg-purple-600 dark:focus:ring-purple-500",
  red: "bg-red-500 border-red-600 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-500 dark:border-red-600 dark:text-white dark:hover:bg-red-600 dark:focus:ring-red-500",
};
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, color = "gray", ...rest } = props;

  return (
    <button
      ref={ref}
      {...rest}
      className={cn(
        "w-full py-2 px-4 border rounded-lg tracking-wide transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-opacity-50",
        {},
        colors[color],
        className
      )}
    />
  );
});

Button.displayName = "Button";

export default Button;
