import React, { useState } from "react";
import ThemeSwitcher from "../shared/sidebar/ThemeSwitcher";
import { IoMdMenu } from "react-icons/io";
import Logo from "../shared/Logo";
import Button from "../ui/Button";
import { auth } from "@/config/firebase";
import toast from "react-hot-toast";

const AdminMobileBar = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <header className="flex lg:hidden justify-between items-center p-5 shadow-md shadow-purple-200/50">
      {/* Logo */}

      <Logo size="medium" />

      <div className="flex gap-x-6 items-center">
        {/* Theme Switcher */}
        <ThemeSwitcher hasText={false} />
        {/* Logout */}

        <Button color="gray" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminMobileBar;
