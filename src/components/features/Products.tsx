import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";

import React from "react";

const Products = () => {
  return (
    <section className="py-16 bg-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-12">
          <div className="w-12 h-1 bg-gold-400 mr-4"></div>
          <h2 className="text-4xl font-bold tracking-wider">
            PREMIUM PRODUCTS
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-lg">
            <div className="absolute inset-0 bg-gold-radial"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
            <div className="p-6">
              <div className="relative mb-6 rounded-xl overflow-hidden group-hover:shadow-gold">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://readdy.ai/api/search-image?query=Premium%20beard%20oil%20bottle%20with%20wooden%20background%2C%20professional%20grooming%20product%20photography%2C%20luxury%20packaging%2C%20dark%20moody%20lighting%2C%20high-end%20product%20shot%2C%20cinematic%20style%2C%20minimalist%20composition&width=300&height=300&seq=12&orientation=squarish"
                  alt="Beard Oil"
                  className="w-full h-64 object-cover object-center rounded-xl transform transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                Premium Beard Oil
              </h3>
              <p className="text-zinc-400 text-sm mb-6">
                Nourishing blend of natural oils for a healthy, shiny beard.
              </p>
              <div className="flex justify-between items-center backdrop-blur-sm p-3 rounded-xl bg-zinc-800/30">
                <span className="text-2xl font-bold bg-gold-gradient from-gold-300 to-gold-500 bg-clip-text text-transparent">
                  $29.99
                </span>
                <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold">
                  <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-lg">
            <div className="absolute inset-0 bg-gold-radial"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
            <div className="p-6">
              <div className="relative mb-6 rounded-xl overflow-hidden group-hover:shadow-gold">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20hair%20pomade%20in%20premium%20metal%20container%2C%20luxury%20hair%20styling%20product%2C%20dark%20moody%20product%20photography%2C%20high-end%20packaging%2C%20cinematic%20lighting%2C%20minimalist%20composition&width=300&height=300&seq=13&orientation=squarish"
                  alt="Hair Pomade"
                  className="w-full h-64 object-cover object-center rounded-xl transform transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                Styling Pomade
              </h3>
              <p className="text-zinc-400 text-sm mb-6">
                Strong hold matte finish pomade for perfect styling.
              </p>
              <div className="flex justify-between items-center backdrop-blur-sm p-3 rounded-xl bg-zinc-800/30">
                <span className="text-2xl font-bold bg-gold-gradient from-gold-300 to-gold-500 bg-clip-text text-transparent">
                  $24.99
                </span>
                <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold">
                  <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-lg">
            <div className="absolute inset-0 bg-gold-radial"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
            <div className="p-6">
              <div className="relative mb-6 rounded-xl overflow-hidden group-hover:shadow-gold">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://readdy.ai/api/search-image?query=Premium%20shaving%20cream%20in%20luxury%20glass%20jar%2C%20professional%20grooming%20product%2C%20dark%20moody%20product%20photography%2C%20high-end%20packaging%2C%20cinematic%20lighting%2C%20minimalist%20composition&width=300&height=300&seq=14&orientation=squarish"
                  alt="Shaving Cream"
                  className="w-full h-64 object-cover object-center rounded-xl transform transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                Luxury Shaving Cream
              </h3>
              <p className="text-zinc-400 text-sm mb-6">
                Rich lather cream for the smoothest shaving experience.
              </p>
              <div className="flex justify-between items-center backdrop-blur-sm p-3 rounded-xl bg-zinc-800/30">
                <span className="text-2xl font-bold bg-gold-gradient from-gold-300 to-gold-500 bg-clip-text text-transparent">
                  $34.99
                </span>
                <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold">
                  <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-lg">
            <div className="absolute inset-0 bg-gold-radial"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
            <div className="p-6">
              <div className="relative mb-6 rounded-xl overflow-hidden group-hover:shadow-gold">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20hair%20care%20kit%20with%20premium%20brushes%20and%20scissors%2C%20luxury%20grooming%20tools%2C%20dark%20moody%20product%20photography%2C%20high-end%20equipment%2C%20cinematic%20lighting%2C%20minimalist%20composition&width=300&height=300&seq=15&orientation=squarish"
                  alt="Grooming Kit"
                  className="w-full h-64 object-cover object-center rounded-xl transform transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                Professional Kit
              </h3>
              <p className="text-zinc-400 text-sm mb-6">
                Complete grooming kit with premium tools and products.
              </p>
              <div className="flex justify-between items-center backdrop-blur-sm p-3 rounded-xl bg-zinc-800/30">
                <span className="text-2xl font-bold bg-gold-gradient from-gold-300 to-gold-500 bg-clip-text text-transparent">
                  $89.99
                </span>
                <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold">
                  <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
