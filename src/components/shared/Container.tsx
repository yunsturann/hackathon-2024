// ** React Imports
import React from "react";

// ** Utils
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {}

const Container = (props: ContainerProps) => {
  const { children, className } = props;

  return (
    <div
      className={cn(
        "max-w-6xl w-full  mx-auto px-6 lg:px-12 py-6 lg:py-12",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
