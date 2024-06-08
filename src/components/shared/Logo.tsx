// ** Nextjs Imports
import Link from "next/link";

// ** Utils
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const sizes = {
  icon: {
    small: 20,
    medium: 30,
    large: 50,
  },
  text: {
    small: "text-lg",
    medium: "text-2xl",
    large: "text-3xl",
  },
};

const Logo = ({ size }: LogoProps) => {
  const iconSize = sizes.icon[size || "large"];
  const textSize = sizes.text[size || "large"];

  return (
    <Link href={"/"} className="flex items-center gap-3" draggable>
      {/* <Image
        src="/images/logo.jpeg"
        alt="Company Logo"
        width={iconSize}
        height={iconSize}
        className="rounded-full"
      /> */}
      <h2
        className={cn(
          "font-bold tracking-wide text-transparent bg-gradient-to-r bg-clip-text from-blue-400 to-green-600",
          textSize
        )}
      >
        ECOSCORE
      </h2>
    </Link>
  );
};

export default Logo;
