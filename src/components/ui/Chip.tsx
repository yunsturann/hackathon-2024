import React, { forwardRef } from "react";

// ** Utils
import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "low" | "medium" | "high" | "gray";
  customColor?: string;
}

const colors = {
  low: "bg-green-200 text-black/70 dark:bg-green-100 dark:text-black/70",
  medium: "bg-yellow-200 text-black/70 dark:text-black/70",
  high: "bg-red-200 text-black/70 dark:text-black/70",
  gray: "bg-gray-200 text-black/70",
};

const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const { className, color = "gray", customColor, ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      draggable
      className={cn(
        "py-1 px-2.5 rounded-full text-black dark:text-white text-sm tracking-tighter",
        className,
        colors[color]
      )}
      style={{ backgroundColor: customColor }}
    />
  );
});

Chip.displayName = "Chip";

export default Chip;
