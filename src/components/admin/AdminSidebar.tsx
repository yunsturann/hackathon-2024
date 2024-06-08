import React, { useState } from "react";
import ThemeSwitcher from "../shared/sidebar/ThemeSwitcher";
import Button from "../ui/Button";
import AlertDialog from "../ui/AlertDialog";
import Logo from "../shared/Logo";
import { auth } from "@/config/firebase";
import toast from "react-hot-toast";
import NavItem from "../shared/sidebar/NavItem";
import { FaHome, FaRecycle } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";

const AdminSidebar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
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
          <NavItem href="/admin" title="Home" Icon={<FaHome />} />
          <NavItem
            href="/admin/recycle"
            title="Create Point"
            Icon={<FaRecycle />}
          />
          <NavItem
            href="/admin/recycle/create"
            title="Create Point"
            Icon={<IoAddOutline />}
          />
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

export default AdminSidebar;
