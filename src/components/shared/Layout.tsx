import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "./sidebar";
import MobileNav from "./mobile-navbar";
import Provider from "./providers";
import { auth } from "@/config/firebase";
import { publicPages } from "@/constants";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "@/store/use-user-store";
import Loading from "./Loading";
import AdminSidebar from "../admin/AdminSidebar";
import AdminMobileBar from "../admin/AdminMobilebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isLoading, fetchUser, user } = useUserStore((state) => state);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (authUser) => {
      if (!authUser && !publicPages.includes(router.pathname)) {
        router.push("/auth/login");
      } else if (authUser && publicPages.includes(router.pathname)) {
        router.push("/");
      } else if (
        user?.user_type === "company" &&
        router.pathname.startsWith("/admin")
      ) {
        router.replace("/");
      } else if (
        user?.user_type === "admin" &&
        !router.pathname.startsWith("/admin")
      ) {
        router.replace("/admin");
      }
      if (user === null) fetchUser(authUser?.uid || "");
    });

    return () => sub();
  }, [fetchUser, router, user?.user_type, user]);

  const inAuthPages = publicPages.includes(router.pathname);

  if (inAuthPages) {
    return (
      <>
        <Toaster />

        <div className="bg-gray-700 min-h-screen w-full flex items-center justify-center p-8">
          <div className="w-full max-w-[600px] bg-white p-6 rounded-xl space-y-4">
            {children}
          </div>
        </div>
      </>
    );
  }

  if (isLoading || user === null) return <Loading />;

  if (user?.user_type === "admin") {
    return (
      <Provider>
        <main className="font-public-sans min-h-screen w-full flex flex-col bg-white text-black dark:bg-gray-800 dark:text-white lg:flex-row relative">
          {/* Toast Container */}
          <Toaster />

          {/* Sidebar */}
          <AdminSidebar />

          {/* MobileNav */}
          <AdminMobileBar />

          <div className="flex-1 lg:max-h-screen overflow-y-auto">
            {children}
          </div>
        </main>
      </Provider>
    );
  }

  return (
    <Provider>
      <main className="font-public-sans min-h-screen w-full flex flex-col bg-white text-black dark:bg-gray-800 dark:text-white lg:flex-row relative">
        {/* Toast Container */}
        <Toaster />

        {/* Sidebar */}
        <Sidebar />

        {/* MobileNav */}
        <MobileNav />

        <div className="flex-1 lg:max-h-screen overflow-y-auto">{children}</div>
      </main>
    </Provider>
  );
};

export default Layout;
