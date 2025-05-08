import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex flex-col justify-center h-[calc(100vh-80px)] max-w-2xl px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
            <span className="block mb-2">"Your Private"</span>
            <span className="block text-[2.5rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem] tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent leading-[1.1]">
              STYLEBENDER
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl font-normal mt-4">
              is waiting for You!
            </span>
          </h1>
          <div className="flex flex-wrap gap-4 sm:gap-6 my-8 sm:my-12">
            <div className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-gold-400 group hover:shadow-gold transition-all duration-300">
              <div className="text-center">
                <div className="text-gold-400 font-bold group-hover:text-gold-500 transition-colors">
                  CONSULT
                </div>
                <div className="text-gold-400 font-bold group-hover:text-gold-500 transition-colors">
                  ONLINE!
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-zinc-600 group hover:shadow-gold transition-all duration-300">
              <div className="text-center">
                <div className="text-white font-bold group-hover:text-gold-400 transition-colors">
                  10+
                </div>
                <div className="text-zinc-400 text-sm group-hover:text-gold-300 transition-colors">
                  YEARS OF EXPERIENCE
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-zinc-600 group hover:shadow-gold transition-all duration-300">
              <div className="text-center">
                <div className="text-white font-bold group-hover:text-gold-400 transition-colors">
                  15+
                </div>
                <div className="text-zinc-400 text-sm group-hover:text-gold-300 transition-colors">
                  CERTIFIED SPECIALISTS
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-zinc-600 group hover:shadow-gold transition-all duration-300">
              <div className="text-center">
                <div className="text-white font-bold group-hover:text-gold-400 transition-colors">
                  500+
                </div>
                <div className="text-zinc-400 text-sm group-hover:text-gold-300 transition-colors">
                  MONTHLY CUSTOMERS
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-2xl">
              <span className="text-zinc-400">since</span>
              <span className="text-gold-400 font-bold italic ml-2">2013</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
