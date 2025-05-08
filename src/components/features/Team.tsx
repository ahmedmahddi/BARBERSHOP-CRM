import {
  faArrowRight,
  faCalendarAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";

import React from "react";

const Team = () => {
  return (
    <section className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-12">
          <div className="w-12 h-1 bg-gold-400 mr-4"></div>
          <h2 className="text-4xl font-bold tracking-wider">
            OUR TALENTED BARBERS
          </h2>
          <Button
            variant="ghost"
            className="ml-auto text-gold-400 hover:text-gold-500"
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="group relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-lg">
            <div className="absolute inset-0 bg-gold-radial"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/30">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-gold-400 mr-2"
                  />
                  <span className="text-white">4.9</span>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20male%20barber%20with%20beard%20and%20tattoos%20wearing%20brown%20apron%20in%20modern%20barbershop%2C%20dramatic%20lighting%2C%20artistic%20portrait%2C%20high-end%20atmosphere%2C%20cinematic%20style&width=400&height=500&seq=8&orientation=portrait"
                  alt="Barber Archie"
                  className="w-full h-[500px] object-cover object-center transform transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent backdrop-blur-sm">
                <div className="relative">
                  <p className="inline-block bg-gold-400 text-white text-sm px-3 py-1 rounded-full mb-2">
                    Barber
                  </p>
                  <h3 className="text-2xl font-bold mb-2 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    ARCHIE
                  </h3>
                  <p className="text-zinc-300 text-sm mb-4">
                    A versatile master of haircuts of any complexity who loves
                    his job.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="link"
                      className="text-white hover:text-gold-400 p-0 justify-start group"
                    >
                      Go to profile
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 transform transition-transform group-hover:translate-x-2"
                      />
                    </Button>
                    <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      Check availability
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-lg">
            <div className="absolute inset-0 bg-gold-radial"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/30">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-gold-400 mr-2"
                  />
                  <span className="text-white">4.8</span>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20male%20barber%20with%20full%20beard%20wearing%20beige%20apron%20in%20modern%20barbershop%2C%20dramatic%20lighting%2C%20artistic%20portrait%2C%20high-end%20atmosphere%2C%20cinematic%20style&width=400&height=500&seq=9&orientation=portrait"
                  alt="Barber Bradley"
                  className="w-full h-[500px] object-cover object-center transform transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent backdrop-blur-sm">
                <div className="relative">
                  <p className="inline-block bg-gold-400 text-white text-sm px-3 py-1 rounded-full mb-2">
                    Barber
                  </p>
                  <h3 className="text-2xl font-bold mb-2 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    BRADLEY
                  </h3>
                  <p className="text-zinc-300 text-sm mb-4">
                    Skilled, friendly, talks about fashion, so what else do you
                    need from a barber?
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="link"
                      className="text-white hover:text-gold-400 p-0 justify-start group"
                    >
                      Go to profile
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 transform transition-transform group-hover:translate-x-2"
                      />
                    </Button>
                    <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      Check availability
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-lg">
            <div className="absolute inset-0 bg-gold-radial"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/30">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-gold-400 mr-2"
                  />
                  <span className="text-white">4.9</span>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20female%20stylist%20with%20blonde%20hair%20wearing%20black%20outfit%20in%20modern%20salon%2C%20dramatic%20lighting%2C%20artistic%20portrait%2C%20high-end%20atmosphere%2C%20cinematic%20style&width=400&height=500&seq=10&orientation=portrait"
                  alt="Stylist Melina"
                  className="w-full h-[500px] object-cover object-center transform transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent backdrop-blur-sm">
                <div className="relative">
                  <p className="inline-block bg-gold-400 text-white text-sm px-3 py-1 rounded-full mb-2">
                    Stylist
                  </p>
                  <h3 className="text-2xl font-bold mb-2 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    MELINA
                  </h3>
                  <p className="text-zinc-300 text-sm mb-4">
                    Will make a tasty coffee & your new unique style you'll brag
                    about.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="link"
                      className="text-white hover:text-gold-400 p-0 justify-start group"
                    >
                      Go to profile
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 transform transition-transform group-hover:translate-x-2"
                      />
                    </Button>
                    <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      Check availability
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-lg">
            <div className="absolute inset-0 bg-gold-radial"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient from-transparent via-gold-400 to-transparent opacity-50"></div>
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/30">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-gold-400 mr-2"
                  />
                  <span className="text-white">4.7</span>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20male%20barber%20with%20full%20beard%20and%20tattoos%20in%20vintage%20vest%2C%20artistic%20pose%20near%20window%2C%20dramatic%20lighting%2C%20high-end%20barbershop%2C%20cinematic%20style&width=400&height=500&seq=11&orientation=portrait"
                  alt="Barber Matteo"
                  className="w-full h-[500px] object-cover object-center transform transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent backdrop-blur-sm">
                <div className="relative">
                  <p className="inline-block bg-gold-400 text-white text-sm px-3 py-1 rounded-full mb-2">
                    Barber
                  </p>
                  <h3 className="text-2xl font-bold mb-2 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                    MATTEO
                  </h3>
                  <p className="text-zinc-300 text-sm mb-4">
                    Italian art in his head, English scissors in his hands, meet
                    Matteo!
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="link"
                      className="text-white hover:text-gold-400 p-0 justify-start group"
                    >
                      Go to profile
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 transform transition-transform group-hover:translate-x-2"
                      />
                    </Button>
                    <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      Check availability
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
