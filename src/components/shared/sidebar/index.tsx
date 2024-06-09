// ** React Imports
import React, { useState } from "react";

// ** Next.js Components
import Link from "next/link";

// ** Constants
import { navLinks } from "@/constants";

// ** Custom Components
import NavItem from "./NavItem";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "../Logo";
import Button from "@/components/ui/Button";
import { auth } from "@/config/firebase";
import toast from "react-hot-toast";
import AlertDialog from "@/components/ui/AlertDialog";
import { useUserStore } from "@/store/use-user-store";

const Sidebar = () => {
  const setUser = useUserStore((state) => state.setUser);

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      setUser(null);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <aside className="bg-slate-100 dark:bg-gray-800 w-72 h-screen hidden lg:flex flex-col gap-4 p-6 shadow-md shadow-purple-200/50">
      {/* Logo */}
      <Logo />
      {/* Links */}
      <div className="flex-1 flex flex-col justify-between gap-y-4 py-4">
        <ul className="text-lg flex flex-col gap-y-2">
          {navLinks.map((link) => (
            <NavItem
              key={link.title}
              href={link.href}
              title={link.title}
              Icon={<link.icon />}
            />
          ))}
        </ul>

        {/* Bottom Actions  */}
        <div className="space-y-8">
          <ThemeSwitcher />
          {/* User PP */}
          {/* <p>{auth?.currentUser?.email}</p> */}
          <Button color="gray" onClick={() => setShowLogoutDialog(true)}>
            Logout
          </Button>
        </div>
      </div>
      {showLogoutDialog && (
        <AlertDialog
          handleCancel={() => setShowLogoutDialog(false)}
          handleContinue={handleLogout}
          title="Logout"
          message="Are you sure you want to logout?"
        />
      )}
    </aside>
  );
};

export default Sidebar;
