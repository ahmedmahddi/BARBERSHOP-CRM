// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client";
import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import Gallery from "@/components/features/Gallery";
import Services from "@/components/features/Services";
import Products from "@/components/features/Products";

import Team from "@/components/features/Team";
import Booking from "@/components/features/Booking";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-800 text-white overflow-x-hidden">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <Hero />
      {/* About us Section */}
      {/* Services Section */}
      <Services />
      {/* Products Section */}
      <Products />
      {/* Team Section */}
      <Team />
      {/* Gallery Section */}
      <Gallery />
      {/* Booking Section */}
      <Booking />
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default App;
