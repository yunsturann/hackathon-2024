// import React, { useEffect } from "react";
// import { Toaster } from "react-hot-toast";
// import Sidebar from "./sidebar";
// import MobileNav from "./mobile-navbar";
// import Provider from "./providers";
// import { auth } from "@/config/firebase";
// import { publicPages } from "@/constants";
// import { useRouter } from "next/router";
// import { onAuthStateChanged } from "firebase/auth";
// import { useUserStore } from "@/store/use-user-store";
// import Loading from "./Loading";

// const Layout = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();

//   const { isLoading, fetchUser, user } = useUserStore((state) => state);

//   useEffect(() => {
//     const sub = onAuthStateChanged(auth, (user) => {
//       if (!user && !publicPages.includes(router.pathname)) {
//         router.push("/auth/login");
//       } else if (user && publicPages.includes(router.pathname)) {
//         router.push("/");
//       }
//       fetchUser(user?.uid || "");
//     });

//     return () => sub();
//   }, [fetchUser, router]);

//   const inAuthPages = publicPages.includes(router.pathname);

//   if (inAuthPages) {
//     return (
//       <>
//         <Toaster />

//         <div className="bg-gray-700 h-screen w-full flex items-center justify-center px-8">
//           <div className="w-full max-w-[600px] bg-white p-6 rounded-xl space-y-4">
//             {children}
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (isLoading) return <Loading />;

//   return (
//     <Provider>
//       <main className="font-public-sans min-h-screen w-full flex flex-col bg-white text-black dark:bg-gray-800 dark:text-white lg:flex-row relative">
//         {/* Toast Container */}
//         <Toaster />

//         {/* Sidebar */}
//         <Sidebar />

//         {/* MobileNav */}
//         <MobileNav />

//         <div className="flex-1 lg:max-h-screen overflow-y-auto">{children}</div>
//       </main>
//     </Provider>
//   );
// };

// export default Layout;
