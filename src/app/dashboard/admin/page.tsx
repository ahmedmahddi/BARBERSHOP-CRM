"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mockDashboardStats, mockServices } from "@/lib/utils";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-1 bg-amber-400 mr-4"></div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
        </div>
        <div className="flex space-x-2">
          <Link href="/dashboard/admin/appointments">
            <Button className="border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10">
              Manage Appointments
            </Button>
          </Link>
          <Link href="/dashboard/admin/customers">
            <Button className="border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10">
              View Customers
            </Button>
          </Link>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-amber-200">
              Total Revenue
            </h3>
          </div>
          <div className="text-2xl font-bold text-amber-400">
            ${mockDashboardStats.totalRevenue.total.toFixed(2)}
          </div>
          <div className="text-xs text-zinc-400 mt-1">
            Services: ${mockDashboardStats.totalRevenue.services.toFixed(2)} |
            Products: ${mockDashboardStats.totalRevenue.products.toFixed(2)}
          </div>
        </div>

        <div className="rounded-lg border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-amber-200">
              Total Appointments
            </h3>
          </div>
          <div className="text-2xl font-bold text-amber-400">
            {mockDashboardStats.totalAppointments}
          </div>
          <div className="text-xs text-zinc-400 mt-1">
            Upcoming: {mockDashboardStats.upcomingAppointments}
          </div>
        </div>

        <div className="rounded-lg border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-amber-200">
              Loyalty Program
            </h3>
          </div>
          <div className="text-2xl font-bold text-amber-400">
            {mockDashboardStats.loyaltyProgram.activeMembers}
          </div>
          <div className="text-xs text-zinc-400 mt-1">
            Points: {mockDashboardStats.loyaltyProgram.totalPoints} | Discounts:{" "}
            {mockDashboardStats.loyaltyProgram.discountsRedeemed}
          </div>
        </div>

        <div className="rounded-lg border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-amber-200">
              Recent Sales
            </h3>
          </div>
          <div className="text-2xl font-bold text-amber-400">
            ${mockDashboardStats.recentSales.daily.toFixed(2)}
          </div>
          <div className="text-xs text-zinc-400 mt-1">
            Weekly: ${mockDashboardStats.recentSales.weekly.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Popular Services */}
      <div className="rounded-lg border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)]">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-amber-200">
            Popular Services
          </h3>
          <div className="mt-4 space-y-4">
            {mockDashboardStats.popularServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 text-center font-bold text-lg text-amber-400">
                    {service.bookings}
                  </div>
                  <div>
                    <div className="font-medium text-white">{service.name}</div>
                    <div className="text-sm text-zinc-400">Bookings</div>
                  </div>
                </div>
                <div className="w-32 bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-amber-400 h-2 rounded-full"
                    style={{
                      width: `${
                        (service.bookings /
                          Math.max(
                            ...mockDashboardStats.popularServices.map(
                              s => s.bookings
                            )
                          )) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] p-6">
          <h3 className="text-lg font-semibold mb-4 text-amber-200">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link href="/dashboard/admin/appointments">
              <Button className="w-full justify-start border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10">
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
                  className="mr-2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Manage Appointments
              </Button>
            </Link>
            <Link href="/dashboard/admin/customers">
              <Button className="w-full justify-start border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10">
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
                  className="mr-2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                View Customers
              </Button>
            </Link>
            <Link href="/dashboard/admin/products">
              <Button className="w-full justify-start border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10">
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
                  className="mr-2"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Manage Products
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] p-6">
          <h3 className="text-lg font-semibold mb-4 text-amber-200">
            Content Management
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2 text-white">
                Services & Prices
              </h4>
              <div className="text-sm text-zinc-400">
                Last updated: {new Date().toLocaleDateString()}
              </div>
              <Button className="mt-2 border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10">
                Update Content
              </Button>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2 text-white">Gallery</h4>
              <div className="text-sm text-zinc-400">6 images uploaded</div>
              <Button className="mt-2 border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10">
                Manage Gallery
              </Button>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2 text-white">
                Testimonials
              </h4>
              <div className="text-sm text-zinc-400">3 testimonials active</div>
              <Button className="mt-2 border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10">
                Edit Testimonials
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
