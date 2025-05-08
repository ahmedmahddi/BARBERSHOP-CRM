import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "hair-beard",
    title: "HAIR & BEARD",
    description:
      "Our barbers will help you get a unique look of any complexity.",
    icon: "https://static.readdy.ai/image/adde559475a0f72960147999b378fa11/81dd64276d151ca2da148d3c80b56526.png",
    price: 29.99,
  },
  {
    id: "shaving",
    title: "SHAVING",
    description:
      "Shaving with the application of thick foam and a soft massage.",
    icon: "https://static.readdy.ai/image/adde559475a0f72960147999b378fa11/81dd64276d151ca2da148d3c80b56526.png",
    price: 24.99,
  },
  {
    id: "trimming",
    title: "TRIMMING",
    description:
      "Best option for short hair, no scissors are used, quick procedure.",
    icon: "https://static.readdy.ai/image/adde559475a0f72960147999b378fa11/81dd64276d151ca2da148d3c80b56526.png",
    price: 19.99,
  },
  {
    id: "style-care",
    title: "STYLE & CARE",
    description:
      "We craft any ideas from the classics to the most daring decisions.",
    icon: "https://static.readdy.ai/image/adde559475a0f72960147999b378fa11/81dd64276d151ca2da148d3c80b56526.png",
    price: 39.99,
  },
];

interface PricingModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-8 rounded-2xl max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-gold-400 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
        <div className="flex items-center mb-6">
          <img
            src={service.icon}
            alt={service.title}
            className="w-16 h-16 mr-4"
          />
          <h3 className="text-2xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            {service.title}
          </h3>
        </div>
        <p className="text-zinc-400 mb-6">{service.description}</p>
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-zinc-400">Service Price</span>
            <span className="text-2xl font-bold text-gold-400">
              ${service.price}
            </span>
          </div>
          <div className="space-y-2 text-sm text-zinc-400">
            <p>✓ Professional consultation</p>
            <p>✓ Premium products used</p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <Button
            className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white w-full !rounded-button shadow-gold"
            onClick={() => {
              onClose();
              // You can add booking logic here if needed
            }}
          >
            Book Now
          </Button>
          <Button
            variant="link"
            className="text-zinc-400 hover:text-gold-400 w-full"
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
      <div className="absolute inset-0 bg-gold-radial"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
      <div className="relative">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-1 group-hover:shadow-gold">
          <img
            src={service.icon}
            alt={service.title}
            className="w-full h-full"
          />
        </div>
        <h3 className="text-xl font-bold mb-4 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent text-center">
          {service.title}
        </h3>
        <p className="text-zinc-400 mb-6 text-center min-h-[48px]">
          {service.description}
        </p>
        <div className="space-y-3 mt-auto">
          <Button
            variant="link"
            className="text-white hover:text-gold-400 w-full border border-zinc-700 backdrop-blur-sm hover:border-gold-400 transition-all"
            onClick={() => onSeePricing(service)}
          >
            See pricing
          </Button>
          <Button
            className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white w-full !rounded-button shadow-gold"
            onClick={() => onBookNow(service.id)}
          >
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
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
    <section className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8 sm:mb-12">
          <div className="w-8 sm:w-12 h-1 bg-gold-400 mr-2 sm:mr-4"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider">
            SERVICES WE PROVIDE
          </h2>
          <Button
            variant="ghost"
            className="ml-auto text-gold-400 hover:text-gold-500"
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {SERVICES_DATA.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onBookNow={handleBookNow}
              onSeePricing={handleSeePricing}
            />
          ))}
        </div>
      </div>
      <PricingModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};

export default Services;
