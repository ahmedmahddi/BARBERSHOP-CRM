"use client";

import { faArrowRight, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Link from "next/link";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-zinc-800 text-white overflow-x-hidden">
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-1 bg-gold-400 mr-4"></div>
              <h1 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                OUR GALLERY
              </h1>
              <div className="w-12 h-1 bg-gold-400 ml-4"></div>
            </div>

            <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
              Explore our portfolio of premium haircuts, beard trims, and
              styling. Get inspired for your next visit and see the quality of
              our work.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="grid gap-6">
                <div className="relative group overflow-hidden rounded-xl hover:shadow-gold">
                  <div className="absolute inset-0 bg-gold-radial opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%20barber%20cutting%20hair%20of%20male%20client%20in%20modern%20barbershop%2C%20moody%20lighting%2C%20dark%20background%2C%20high-end%20atmosphere%2C%20barber%20wearing%20stylish%20outfit%2C%20focused%20on%20precision%20cutting%2C%20premium%20barbershop%20experience%2C%20cinematic%20style&width=400&height=300&seq=2&orientation=landscape"
                    alt="Barber cutting hair"
                    className="w-full h-auto object-cover object-top transform transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">Premium Haircut</p>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-xl hover:shadow-gold">
                  <div className="absolute inset-0 bg-gold-radial opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src="https://readdy.ai/api/search-image?query=Close-up%20of%20barber%20trimming%20beard%20with%20scissors%2C%20professional%20grooming%2C%20dark%20moody%20lighting%2C%20premium%20barbershop%20setting%2C%20focus%20on%20hands%20and%20tools%2C%20masculine%20atmosphere%2C%20high-end%20service%2C%20cinematic%20style&width=400&height=500&seq=3&orientation=portrait"
                    alt="Beard trimming"
                    className="w-full h-auto object-cover object-top transform transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">Beard Trimming</p>
                  </div>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl hover:shadow-gold">
                <div className="absolute inset-0 bg-gold-radial opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://readdy.ai/api/search-image?query=Stylish%20barber%20with%20tattoos%20giving%20haircut%20to%20client%2C%20full%20body%20shot%2C%20modern%20barbershop%20interior%2C%20dark%20moody%20lighting%2C%20professional%20equipment%2C%20premium%20atmosphere%2C%20black%20and%20orange%20color%20scheme%2C%20cinematic%20style&width=400&height=800&seq=4&orientation=portrait"
                  alt="Stylish barber"
                  className="w-full h-full object-cover object-top transform transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium">Modern Styling</p>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="relative group overflow-hidden rounded-xl hover:shadow-gold">
                  <div className="absolute inset-0 bg-gold-radial opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src="https://readdy.ai/api/search-image?query=Client%20getting%20hot%20towel%20treatment%20in%20premium%20barbershop%20chair%2C%20dark%20moody%20atmosphere%2C%20professional%20barber%20service%2C%20luxury%20experience%2C%20high-end%20barbershop%20interior%2C%20cinematic%20lighting%2C%20masculine%20setting&width=400&height=300&seq=5&orientation=landscape"
                    alt="Hot towel treatment"
                    className="w-full h-auto object-cover object-top transform transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">
                      Hot Towel Treatment
                    </p>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-xl hover:shadow-gold">
                  <div className="absolute inset-0 bg-gold-radial opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src="https://readdy.ai/api/search-image?query=Barber%20applying%20hair%20product%20to%20client%2C%20professional%20styling%20technique%2C%20premium%20barbershop%20interior%2C%20dark%20moody%20lighting%2C%20focus%20on%20technique%20and%20precision%2C%20high-end%20grooming%20experience%2C%20cinematic%20style&width=400&height=500&seq=6&orientation=portrait"
                    alt="Hair styling"
                    className="w-full h-auto object-cover object-top transform transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">
                      Professional Styling
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Gallery Section */}
            <div className="mt-16">
              <div className="flex items-center mb-8">
                <div className="w-8 h-1 bg-gold-400 mr-4"></div>
                <h2 className="text-2xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                  BEFORE & AFTER
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(item => (
                  <div
                    key={item}
                    className="flex gap-4 relative group overflow-hidden rounded-xl hover:shadow-gold bg-zinc-900 p-1"
                  >
                    <div className="relative flex-1 overflow-hidden rounded-l-lg">
                      <img
                        src={`https://readdy.ai/api/search-image?query=Man%20with%20messy%20long%20hair%20and%20beard%20before%20barber%20visit%2C%20side%20profile%2C%20natural%20lighting%2C%20neutral%20background%2C%20documentary%20style&width=300&height=400&seq=${
                          item + 10
                        }`}
                        alt={`Before ${item}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 left-2 bg-zinc-900/80 text-gold-400 text-xs py-1 px-2 rounded">
                        BEFORE
                      </div>
                    </div>
                    <div className="relative flex-1 overflow-hidden rounded-r-lg">
                      <img
                        src={`https://readdy.ai/api/search-image?query=Same%20man%20with%20fresh%20haircut%20and%20styled%20beard%2C%20side%20profile%2C%20professional%20lighting%2C%20premium%20barbershop%20background%2C%20confident%20look&width=300&height=400&seq=${
                          item + 14
                        }`}
                        alt={`After ${item}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 right-2 bg-zinc-900/80 text-gold-400 text-xs py-1 px-2 rounded">
                        AFTER
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-zinc-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gold-radial opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-30"></div>

          <div className="container relative px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-12 h-1 bg-gold-400 mr-4"></div>
                  <h2 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    READY FOR YOUR TRANSFORMATION?
                  </h2>
                  <div className="w-12 h-1 bg-gold-400 ml-4"></div>
                </div>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Book an appointment today and experience our premium barbering
                  services.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold px-8 py-6 text-lg"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
