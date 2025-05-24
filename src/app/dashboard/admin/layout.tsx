"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { type Admin } from "@/lib/utils";
import Logo from "@/assets/images/LogoNK.png";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem("barbershopAdmin");
    if (!adminData) {
      router.push("/dashboard");
      return;
    }

    // Verify admin data
    try {
      const admin = JSON.parse(adminData) as Admin;
      if (!admin.email || !admin.role) {
        localStorage.removeItem("barbershopAdmin");
        router.push("/dashboard");
      }
    } catch (error) {
      localStorage.removeItem("barbershopAdmin");
      router.push("/dashboard");
    }
  }, [router]);

  const isActive = (path: string) => pathname?.includes(path);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="grid min-h-screen w-full bg-zinc-900 text-white lg:grid-cols-[280px_1fr]">
      <div
        className={`fixed inset-y-0 left-0 z-50 h-screen w-[280px] transform border-r border-amber-400/20 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 shadow-[0_0_20px_rgba(251,191,36,0.15)] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[70px] items-center justify-between border-b border-amber-400/20 px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src={Logo}
                alt="logo"
                width={42}
                height={42}
                className="h-12 w-12"
              />
              <span className="font-bold text-xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                NK Barbershop
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-zinc-400 hover:text-white"
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <div className="px-6 py-2">
              <div className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                Management
              </div>
            </div>
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="/dashboard/admin"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-zinc-800 ${
                  pathname === "/dashboard/admin"
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Dashboard
              </Link>
              <Link
                href="/dashboard/admin/appointments"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-zinc-800 ${
                  isActive("/appointments")
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Appointments
              </Link>
              <Link
                href="/dashboard/admin/customers"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-zinc-800 ${
                  isActive("/customers")
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Customers
              </Link>

              <Link
                href="/dashboard/admin/team"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-zinc-800 ${
                  isActive("/team")
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Team
              </Link>

              <Link
                href="/dashboard/admin/schedule"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-zinc-800 ${
                  isActive("/schedule")
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <path d="M8 14h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 18h.01"></path>
                  <path d="M12 18h.01"></path>
                  <path d="M16 18h.01"></path>
                </svg>
                Schedule
              </Link>

              <div className="px-3 py-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
              </div>

              <div className="px-2 py-2">
                <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
                  Store
                </div>
              </div>

              <Link
                href="/dashboard/admin/products"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-zinc-800 ${
                  isActive("/products")
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Products
              </Link>

              <Link
                href="/dashboard/admin/orders"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-zinc-800 ${
                  isActive("/orders")
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Orders
              </Link>

              <div className="px-2 py-2">
                <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
                  Website
                </div>
              </div>

              <Link
                href="/dashboard/admin/content"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-zinc-800 ${
                  isActive("/content")
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Content
              </Link>
            </nav>
          </div>
          <div className="mt-auto border-t border-amber-400/20 p-4">
            <button
              onClick={() => {
                localStorage.removeItem("barbershopAdmin");
                router.push("/dashboard");
              }}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-amber-400/30 px-4 py-2 text-sm text-amber-400 transition-colors hover:bg-amber-400/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:col-start-2">
        <header className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-sm border-b border-amber-400/20 px-6 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-zinc-400 hover:text-white mr-4"
              aria-label="Open sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent flex-1 truncate">
              {pathname === "/dashboard/admin" && "Dashboard"}
              {isActive("/appointments") && "Appointments"}
              {isActive("/customers") && "Customers"}
              {isActive("/products") && "Products"}
              {isActive("/orders") && "Orders"}
              {isActive("/content") && "Content Management"}
            </h1>
            <div>
              <span className="text-zinc-400 text-sm">Admin</span>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-zinc-900">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
