// ** React Imports
import { useState } from "react";

// ** Next.js Imports
import Link from "next/link";

// ** Icons
import { IoMdMenu } from "react-icons/io";

// ** Custom Components

import ThemeSwitcher from "../sidebar/ThemeSwitcher";
import Logo from "../Logo";
import HamburgerMenu from "./HamburgerMenu";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <header className="flex lg:hidden justify-between items-center p-5 shadow-md shadow-purple-200/50">
      {/* Logo */}

      <Logo size="medium" />

      <div className="flex gap-x-6 items-center">
        {/* Theme Switcher */}
        <ThemeSwitcher hasText={false} />
        {/* Menu Icon */}
        <div className="flex items-center gap-x-4">
          <div
            className="text-3xl cursor-pointer hover:opacity-50 transition duration-300"
            onClick={() => setIsOpen(true)}
          >
            <IoMdMenu />
          </div>
        </div>

        <HamburgerMenu isOpen={isOpen} onClose={onClose} />
      </div>
    </header>
  );
};

export default MobileNav;
