"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { mockAdmins } from "@/lib/utils";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "admin@barbershop.com",
    password: "admin123",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check credentials against mock data
    const admin = mockAdmins.find(
      admin =>
        admin.email === formData.email && admin.password === formData.password
    );

    if (admin) {
      // In a real app, we would set a proper auth token
      localStorage.setItem("barbershopAdmin", JSON.stringify(admin));

      toast({
        title: "Sign In Successful",
        description: `Welcome back, ${admin.name}!`,
      });

      router.push("/dashboard/admin");
    } else {
      toast({
        title: "Sign In Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      {/* Navigation */}
      <Header />

      <main className="flex-1 container py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="mx-auto w-full max-w-[400px] space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-10 h-1 bg-gold-400 mr-4"></div>
                <h1 className="text-2xl font-bold tracking-tighter bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                  ADMIN DASHBOARD
                </h1>
                <div className="w-10 h-1 bg-gold-400 ml-4"></div>
              </div>
              <p className="text-sm text-zinc-400 mt-2">
                Sign in to access the admin dashboard
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gold-400/5 rounded-xl blur-sm"></div>
              <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl p-6 border border-gold-400/20 shadow-gold">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1 text-zinc-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gold-400/20 bg-zinc-800/80 px-3 py-2 text-sm focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                      placeholder="admin@barbershop.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-1 text-zinc-300"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gold-400/20 bg-zinc-800/80 px-3 py-2 text-sm focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                      placeholder="admin123"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold"
                  >
                    Sign In
                  </Button>
                </form>
              </div>
            </div>

            <div className="text-center text-sm mt-6">
              <p className="text-zinc-500">Demo Credentials:</p>
              <p className="text-zinc-400">
                Email: admin@barbershop.com
                <br />
                Password: admin123
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
