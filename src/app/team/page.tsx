"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function TeamPage() {
  const [dateDropdowns, setDateDropdowns] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleDateDropdown = (barberId: number) => {
    setDateDropdowns(prev => ({
      ...prev,
      [barberId]: !prev[barberId],
    }));
  };

  const barbers = [
    {
      id: 1,
      name: "ARCHIE WILLIAMS",
      photo:
        "https://readdy.ai/api/search-image?query=Professional%20male%20barber%20with%20beard%20and%20tattoos%20wearing%20brown%20apron%20in%20modern%20barbershop%2C%20dramatic%20lighting%2C%20artistic%20portrait%2C%20high-end%20atmosphere%2C%20cinematic%20style&width=400&height=500&seq=8&orientation=portrait",
      description:
        "A versatile master of haircuts of any complexity who loves his job.",
      position: "Barber",
      rank: "Senior",
      experience: "8 years",
      availability: {
        day: "Tuesday",
        date: "May 14, 2024",
        slots: ["10:00 AM", "10:30 AM", "01:00 PM"],
      },
    },
    {
      id: 2,
      name: "BRADLEY JONES",
      photo:
        "https://readdy.ai/api/search-image?query=Professional%20male%20barber%20with%20full%20beard%20wearing%20beige%20apron%20in%20modern%20barbershop%2C%20dramatic%20lighting%2C%20artistic%20portrait%2C%20high-end%20atmosphere%2C%20cinematic%20style&width=400&height=500&seq=9&orientation=portrait",
      description:
        "Skilled, friendly, talks about fashion, so what else do you need from a barber?",
      position: "Barber",
      rank: "Senior",
      experience: "7 years",
      availability: {
        day: "Monday",
        date: "May 13, 2024",
        slots: ["11:00 AM", "02:30 PM", "04:00 PM"],
      },
    },
    {
      id: 3,
      name: "MELINA ADAMS",
      photo:
        "https://readdy.ai/api/search-image?query=Professional%20female%20stylist%20with%20blonde%20hair%20wearing%20black%20outfit%20in%20modern%20salon%2C%20dramatic%20lighting%2C%20artistic%20portrait%2C%20high-end%20atmosphere%2C%20cinematic%20style&width=400&height=500&seq=10&orientation=portrait",
      description:
        "Will make a tasty coffee & your new unique style you'll brag about.",
      position: "Stylist",
      rank: "Senior",
      experience: "11 years",
      availability: {
        day: "Wednesday",
        date: "May 15, 2024",
        slots: ["10:30 AM", "07:00 PM", "07:30 PM"],
      },
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-800 text-white overflow-x-hidden">
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-1 bg-gold-400 mr-4"></div>
              <h1 className="text-3xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
                OUR TEAM
              </h1>
              <div className="w-12 h-1 bg-gold-400 ml-4"></div>
            </div>

            <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
              Meet our team of experienced barbers and stylists who are
              dedicated to providing you with the premium grooming experience
              you deserve.
            </p>

            <div className="space-y-8">
              {barbers.map(barber => (
                <div
                  key={barber.id}
                  className="flex flex-col md:flex-row bg-zinc-900 rounded-xl overflow-hidden"
                >
                  <div className="w-full md:w-1/4 h-80 md:h-auto relative">
                    <img
                      src={barber.photo}
                      alt={barber.name}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="w-full md:w-1/3 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-800">
                    <h2 className="text-2xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent mb-3">
                      {barber.name}
                    </h2>

                    <p className="text-zinc-400 mb-6">{barber.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-zinc-400 w-24">Position</span>
                        <div className="flex-1 h-1 bg-gold-400/30 mx-3"></div>
                        <span>{barber.position}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-zinc-400 w-24">Rank</span>
                        <div className="flex-1 h-1 bg-gold-400/30 mx-3"></div>
                        <span>{barber.rank}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-zinc-400 w-24">Experience</span>
                        <div className="flex-1 h-1 bg-gold-400/30 mx-3"></div>
                        <span>{barber.experience}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link
                        href={`/team/${barber.id}`}
                        className="text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        Go to profile
                      </Link>
                    </div>
                  </div>

                  <div className="w-full md:w-5/12 p-6 bg-zinc-950/50 flex flex-col">
                    <h3 className="text-xl font-semibold text-zinc-300 mb-4">
                      CLOSEST AVAILABILITY
                    </h3>

                    <p className="text-lg mb-4">
                      {barber.availability.day}, {barber.availability.date}
                    </p>

                    <div className="grid grid-cols-5 gap-2 mb-6">
                      <button className="flex items-center justify-center p-3 rounded bg-zinc-700/50 text-zinc-400">
                        <FontAwesomeIcon
                          icon={faChevronLeft}
                          className="h-3 w-3"
                        />
                      </button>

                      {barber.availability.slots.map((slot, index) => (
                        <button
                          key={index}
                          className="py-3 px-2 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors text-center text-sm"
                        >
                          {slot}
                        </button>
                      ))}

                      <button className="flex items-center justify-center p-3 rounded bg-zinc-700/50 text-zinc-400">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="h-3 w-3"
                        />
                      </button>
                    </div>

                    <div className="relative mb-6">
                      <div
                        className="flex justify-between items-center border-t border-zinc-700 pt-4 mb-1 cursor-pointer"
                        onClick={() => toggleDateDropdown(barber.id)}
                      >
                        <span className="text-sm">All Dates & Times</span>
                        <button className="flex items-center justify-center p-1">
                          <FontAwesomeIcon
                            icon={
                              dateDropdowns[barber.id]
                                ? faChevronUp
                                : faChevronDown
                            }
                            className="h-3 w-3"
                          />
                        </button>
                      </div>

                      {dateDropdowns[barber.id] && (
                        <div className="mt-3 bg-zinc-800 rounded-lg p-4 border border-zinc-700 shadow-gold-sm">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-zinc-300 mb-2">
                                Upcoming Dates
                              </h4>
                              <ul className="space-y-2">
                                <li className="text-sm text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors">
                                  May 16, 2024
                                </li>
                                <li className="text-sm text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors">
                                  May 18, 2024
                                </li>
                                <li className="text-sm text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors">
                                  May 21, 2024
                                </li>
                                <li className="text-sm text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors">
                                  May 23, 2024
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-zinc-300 mb-2">
                                Available Times
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                <span className="text-sm text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors py-1">
                                  10:00 AM
                                </span>
                                <span className="text-sm text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors py-1">
                                  10:30 AM
                                </span>
                                <span className="text-sm text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors py-1">
                                  11:00 AM
                                </span>
                                <span className="text-sm text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors py-1">
                                  11:30 AM
                                </span>
                                <span className="text-sm text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors py-1">
                                  1:00 PM
                                </span>
                                <span className="text-sm text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors py-1">
                                  1:30 PM
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto">
                      <Link href="/booking">
                        <Button
                          variant="link"
                          className="w-full bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white rounded py-3 font-medium"
                        >
                          Book now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
                  Book an appointment with one of our skilled professionals
                  today.
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
