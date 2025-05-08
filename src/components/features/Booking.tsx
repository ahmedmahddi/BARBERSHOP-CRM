import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Booking = () => {
  return (
    <section className="py-16 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-12">
          <div className="w-12 h-1 bg-gold-400 mr-4"></div>
          <h2 className="text-4xl font-bold tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
            BOOK AN APPOINTMENT
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-8 tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
              APPOINTMENT DETAILS
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-zinc-400">
                  Service
                </label>
                <Select>
                  <SelectTrigger className="bg-zinc-800 border-none text-white h-12 hover:border-gold-400/30 transition-colors">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="haircut">Haircut</SelectItem>
                    <SelectItem value="beard">Beard Trim</SelectItem>
                    <SelectItem value="styling">Styling</SelectItem>
                    <SelectItem value="facecare">Face Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm mb-2 text-zinc-400">
                  Barber
                </label>
                <Select>
                  <SelectTrigger className="bg-zinc-800 border-none text-white h-12 hover:border-gold-400/30 transition-colors">
                    <SelectValue placeholder="Choose your barber" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="james">James</SelectItem>
                    <SelectItem value="bradley">Bradley</SelectItem>
                    <SelectItem value="megan">Megan</SelectItem>
                    <SelectItem value="matthew">Matthew</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm mb-2 text-zinc-400">
                  Date & Time
                </label>
                <Select>
                  <SelectTrigger className="bg-zinc-800 border-none text-white h-12 hover:border-gold-400/30 transition-colors">
                    <SelectValue placeholder="Select date and time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">April 15, 2025 - 10:00 AM</SelectItem>
                    <SelectItem value="2">April 15, 2025 - 11:00 AM</SelectItem>
                    <SelectItem value="3">April 15, 2025 - 2:00 PM</SelectItem>
                    <SelectItem value="4">April 15, 2025 - 3:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-8 tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
              STYLE PREFERENCE (OPTIONAL)
            </h3>
            <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center h-[300px] flex flex-col items-center justify-center group hover:border-gold-400/30 transition-colors">
              <div className="text-5xl mb-4 text-zinc-600 group-hover:text-gold-500 transition-colors">
                <FontAwesomeIcon icon={faCloudUploadAlt} />
              </div>
              <p className="text-lg text-zinc-400 mb-2">
                Drag & Drop your image here
              </p>
              <p className="text-sm text-zinc-600 mb-4">OR</p>
              <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold">
                Browse images
              </Button>
              <p className="text-xs text-zinc-600 mt-4">
                Supported formats: JPG, PNG and GIF
              </p>
              <p className="text-xs text-zinc-600">Max size: 10mb</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-8 tracking-wider bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
              CUSTOMER INFORMATION
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-zinc-400">
                  Full name
                </label>
                <Input
                  className="bg-zinc-800 border-none text-white h-12 hover:border-gold-400/30 transition-colors"
                  placeholder="Your name & surname"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-zinc-400">
                  Email
                </label>
                <Input
                  className="bg-zinc-800 border-none text-white h-12 hover:border-gold-400/30 transition-colors"
                  placeholder="Your email address"
                  type="email"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-zinc-400">
                  Phone number
                </label>
                <Input
                  className="bg-zinc-800 border-none text-white h-12 hover:border-gold-400/30 transition-colors"
                  placeholder="Your mobile phone number"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-zinc-400">
                  Comments (optional)
                </label>
                <Textarea
                  className="bg-zinc-800 border-none text-white min-h-[120px] hover:border-gold-400/30 transition-colors"
                  placeholder="Any extra requirements?"
                />
              </div>
              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="mr-2 bg-zinc-900 border-zinc-700 hover:border-gold-400/30 transition-colors"
                    id="agreement"
                  />
                  <label htmlFor="agreement" className="text-sm text-zinc-400 ">
                    I agree to the processing of personal data
                  </label>
                </div>
                <Button className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white w-full h-12 text-lg !rounded-button shadow-gold">
                  Confirm appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
