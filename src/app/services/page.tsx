"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faScissors,
  faCut,
  faMagic,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  price: number;
  duration: string;
  includes: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "hair-beard",
    title: "HAIR & BEARD",
    description:
      "Our barbers will help you get a unique look of any complexity.",
    longDescription:
      "Our comprehensive hair and beard service is designed for the modern gentleman who values precision and style. Our expert barbers will work with you to create a personalized look that enhances your features and fits your lifestyle.",
    icon: <FontAwesomeIcon icon={faScissors} className="text-5xl" />,
    price: 29.99,
    duration: "45 min",
    includes: [
      "Professional consultation",
      "Premium shampoo and conditioning",
      "Precision haircut with your preferred technique",
      "Beard shaping and styling",
      "Hot towel service",
      "Styling with premium products",
    ],
  },
  {
    id: "shaving",
    title: "SHAVING",
    description:
      "Shaving with the application of thick foam and a soft massage.",
    longDescription:
      "Experience the luxury of a traditional straight razor shave. This service begins with a hot towel to open the pores, followed by the application of premium shaving cream and ends with a soothing aftershave treatment.",
    icon: <FontAwesomeIcon icon={faScissors} className="text-5xl" />,
    price: 24.99,
    duration: "30 min",
    includes: [
      "Hot towel preparation",
      "Premium shaving cream application",
      "Straight razor technique",
      "Aftershave treatment",
      "Facial massage",
      "Moisturizing finish",
    ],
  },
  {
    id: "trimming",
    title: "TRIMMING",
    description:
      "Best option for short hair, no scissors are used, quick procedure.",
    longDescription:
      "Our trimming service is perfect for maintaining your existing style or for those who prefer shorter hair. Using professional-grade clippers and precision guards, we ensure a consistent cut that keeps you looking sharp.",
    icon: <FontAwesomeIcon icon={faCut} className="text-5xl" />,
    price: 19.99,
    duration: "25 min",
    includes: [
      "Professional consultation",
      "Precision clipper work",
      "Neck and edge detailing",
      "Style maintenance advice",
      "Product recommendations",
      "Quick styling",
    ],
  },
  {
    id: "style-care",
    title: "STYLE & CARE",
    description:
      "We craft any ideas from the classics to the most daring decisions.",
    longDescription:
      "The ultimate grooming experience. This comprehensive service includes a custom haircut, beard styling, and facial treatment. Our master barbers will help you achieve any look from classic to contemporary with precision and care.",
    icon: <FontAwesomeIcon icon={faMagic} className="text-5xl" />,
    price: 39.99,
    duration: "60 min",
    includes: [
      "Extended consultation",
      "Premium wash and conditioning",
      "Custom haircut and styling",
      "Beard shaping and detailing",
      "Facial treatment with premium products",
      "Styling tutorial for home maintenance",
    ],
  },
];

interface PricingModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 rounded-2xl max-w-md w-full mx-4 relative border border-gold-400/10 shadow-gold">
        <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-gold-400 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center mr-4 text-gold-400">
            {service.icon}
          </div>
          <h3 className="text-2xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            {service.title}
          </h3>
        </div>
        <p className="text-zinc-400 mb-6">{service.longDescription}</p>
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-gold-400/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-zinc-400">Service Price</span>
            <span className="text-2xl font-bold bg-gold-gradient from-gold-300 to-gold-500 bg-clip-text text-transparent">
              ${service.price}
            </span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-zinc-400">Duration</span>
            <span className="text-white">{service.duration}</span>
          </div>
          <div className="space-y-2 text-sm text-zinc-400">
            {service.includes.map((item, index) => (
              <p key={index}>✓ {item}</p>
            ))}
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <Link href="/booking">
            <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white w-full !rounded-button shadow-gold">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Book Now
            </Button>
          </Link>
          <Button
            variant="outline"
            className="text-zinc-400 hover:text-gold-400 w-full border-zinc-700 hover:border-gold-400"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  service: ServiceItem;
  onBookNow: (serviceId: string) => void;
  onSeePricing: (service: ServiceItem) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onBookNow,
  onSeePricing,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-lg flex flex-col">
      <div className="absolute inset-0 bg-gold-radial opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
      <div className="relative">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-1 flex items-center justify-center group-hover:shadow-gold text-gold-400">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold mb-4 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent text-center">
          {service.title}
        </h3>
        <div className="flex items-center justify-center mb-2">
          <span className="text-2xl font-bold bg-gold-gradient from-gold-300 to-gold-500 bg-clip-text text-transparent">
            ${service.price}
          </span>
          <span className="text-zinc-500 text-sm ml-2">
            / {service.duration}
          </span>
        </div>
        <p className="text-zinc-400 mb-6 text-center">{service.description}</p>
        <div className="space-y-3 mt-auto ">
          <Button
            variant="link"
            className="text-white hover:text-gold-400 w-full border border-zinc-700 hover:border-gold-400 transition-all mb-3"
            onClick={() => onSeePricing(service)}
          >
            View details
          </Button>
          <Link href="/booking">
            <Button
              className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white w-full !rounded-button shadow-gold"
              onClick={() => onBookNow(service.id)}
            >
              Book now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null
  );

  const handleBookNow = (serviceId: string) => {
    // Handle booking logic here
    console.log(`Booking service: ${serviceId}`);
  };

  const handleSeePricing = (service: ServiceItem) => {
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-zinc-800 text-white overflow-x-hidden">
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-1 bg-gold-400 mr-4"></div>
              <h1 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                OUR SERVICES
              </h1>
              <div className="w-12 h-1 bg-gold-400 ml-4"></div>
            </div>

            <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
              We offer a range of premium barbering services tailored to meet
              your grooming needs. From classic haircuts to beard styling, our
              skilled barbers are ready to enhance your look.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {SERVICES_DATA.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onBookNow={handleBookNow}
                  onSeePricing={handleSeePricing}
                />
              ))}
            </div>

            {/* Premium Experience Section */}
            <div className="mt-24">
              <div className="flex items-center justify-center mb-8">
                <div className="w-10 h-1 bg-gold-400 mr-4"></div>
                <h2 className="text-2xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                  THE PREMIUM EXPERIENCE
                </h2>
                <div className="w-10 h-1 bg-gold-400 ml-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 p-6 group hover:shadow-gold transition-all">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                  <div className="text-gold-400 text-3xl mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-4xl font-bold">01</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Consultation
                  </h3>
                  <p className="text-zinc-400">
                    Every service begins with a thorough consultation to
                    understand your style preferences and needs.
                  </p>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 p-6 group hover:shadow-gold transition-all">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                  <div className="text-gold-400 text-3xl mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-4xl font-bold">02</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Premium Products
                  </h3>
                  <p className="text-zinc-400">
                    We use only high-quality grooming products to ensure
                    exceptional results every time.
                  </p>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-gold-400/10 p-6 group hover:shadow-gold transition-all">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
                  <div className="text-gold-400 text-3xl mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-4xl font-bold">03</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Expert Execution
                  </h3>
                  <p className="text-zinc-400">
                    Our master barbers bring years of experience and precision
                    to every cut and style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-zinc-900 relative">
          <div className="absolute inset-0 bg-gold-radial opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
          <div className="container mx-auto px-4 relative">
            <div className="flex items-center justify-center mb-12">
              <div className="w-10 h-1 bg-gold-400 mr-4"></div>
              <h2 className="text-2xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                WHAT OUR CLIENTS SAY
              </h2>
              <div className="w-10 h-1 bg-gold-400 ml-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "James Wilson",
                  text: "The attention to detail is incredible. My haircut and beard trim were exactly what I wanted. The hot towel service is a game-changer!",
                  service: "Hair & Beard",
                },
                {
                  name: "Michael Chen",
                  text: "I've never experienced a shave like this. The straight razor technique was precise and the hot towel treatment made it so relaxing.",
                  service: "Shaving",
                },
                {
                  name: "Robert Taylor",
                  text: "The Style & Care service is worth every penny. I left feeling like a new man with expert advice on how to maintain my look at home.",
                  service: "Style & Care",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="relative bg-zinc-800/50 p-6 rounded-xl border border-gold-400/10"
                >
                  <div className="text-gold-400 text-4xl opacity-20 absolute top-4 right-4">
                    "
                  </div>
                  <p className="text-zinc-300 mb-4 relative z-10">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-400">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gold-400">
                        {testimonial.service}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-zinc-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gold-radial opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>

          <div className="container relative px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-12 h-1 bg-gold-400 mr-4"></div>
                  <h2 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    READY TO EXPERIENCE OUR SERVICES?
                  </h2>
                  <div className="w-12 h-1 bg-gold-400 ml-4"></div>
                </div>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Book an appointment today and let our expert barbers transform
                  your look.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold px-8 py-6 text-lg"
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Pricing Modal */}
      <PricingModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
