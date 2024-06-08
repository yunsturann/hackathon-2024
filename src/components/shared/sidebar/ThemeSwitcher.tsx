// ** React Imports
import { useEffect, useState } from "react";

// ** Next-Theme
import { useTheme } from "next-themes";

// ** Icons
import { FiMoon, FiSun } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  textClass?: string;
  hasText?: boolean;
}

export default function ThemeSwitcher(props: ThemeSwitcherProps) {
  const { textClass, hasText = true } = props;

  const { setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      className="flex pl-0.5 items-center text-lg font-semibold"
      onClick={toggleTheme}
    >
      {isDark ? (
        <div
          className={cn(
            "text-base flex items-center gap-4 dark:text-white",
            textClass
          )}
        >
          <FiSun size={24} />
          {hasText && "Light Theme"}
        </div>
      ) : (
        <div
          className={cn(
            "text-base flex items-center gap-4 dark:text-white",
            textClass
          )}
        >
          <FiMoon size={24} />
          {hasText && "Dark Theme"}
        </div>
      )}
    </button>
  );
}
