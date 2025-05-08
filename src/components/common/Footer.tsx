import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 py-8 sm:py-12 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h1 className="text-gold-400 font-bold text-xl mb-4">
              BARBER<span className="text-white">INO</span>
            </h1>
            <p className="text-zinc-400 mb-4">
              Your premium destination for stylish grooming
            </p>
            <p className="text-zinc-400 text-sm">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="mr-2 text-gold-400"
              />
              123 Style Street, Downtown, NY 10001
            </p>
            <p className="text-zinc-400 text-sm">
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-gold-400" />
              +1 (555) 123-4567
            </p>
            <p className="text-zinc-400 text-sm">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2 text-gold-400"
              />
              info@barberino.com
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
              HOURS
            </h3>
            <p className="text-zinc-400 mb-2">Monday - Friday: 9AM - 8PM</p>
            <p className="text-zinc-400 mb-2">Saturday: 10AM - 6PM</p>
            <p className="text-zinc-400 mb-2">Sunday: 10AM - 4PM</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
              LINKS
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
              NEWSLETTER
            </h3>
            <p className="text-zinc-400 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Input
                className="bg-zinc-800 border-none text-white sm:rounded-r-none"
                placeholder="Enter your email"
              />
              <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white sm:rounded-l-none !rounded-button cursor-pointer whitespace-nowrap shadow-gold">
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </div>
            <div className="flex space-x-4 mt-4">
              <a
                href="/"
                className="text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="/"
                className="text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="/"
                className="text-zinc-400 hover:text-gold-400 cursor-pointer transition-colors"
              >
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
          <p className="text-zinc-500 text-sm">
            © 2025 BARBERINO. All rights reserved. | Privacy Policy | Terms of
            Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
