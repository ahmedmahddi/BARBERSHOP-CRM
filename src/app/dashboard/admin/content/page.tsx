"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  mockContent,
  mockServices,
  type Service,
  type ContentBlock,
} from "@/lib/utils";

export default function ContentPage() {
  const { toast } = useToast();
  const [content, setContent] = useState<ContentBlock[]>(mockContent);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingGallery, setEditingGallery] = useState(false);
  const [editingTestimonials, setEditingTestimonials] = useState(false);

  const handleServiceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setServices(prev =>
      prev.map(service =>
        service.id === editingService.id ? editingService : service
      )
    );

    // Update content block
    setContent(prev =>
      prev.map(block =>
        block.section === "services"
          ? {
              ...block,
              content: services.map(s =>
                s.id === editingService.id ? editingService : s
              ),
            }
          : block.section === "prices"
          ? {
              ...block,
              content: services.map(s => ({ name: s.name, price: s.price })),
            }
          : block
      )
    );

    toast({
      title: "Service Updated",
      description: "The service has been updated successfully.",
    });

    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-1 bg-amber-400 mr-4"></div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Content Management
          </h2>
        </div>
      </div>

      {/* Services & Prices */}
      <div className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] p-6">
        <h3 className="text-lg font-semibold mb-4 text-amber-200">
          Services & Prices
        </h3>
        <div className="space-y-4">
          {services.map(service => (
            <div
              key={service.id}
              className="flex items-center justify-between border-b border-zinc-700/50 pb-4"
            >
              <div>
                <h4 className="font-medium text-white">{service.name}</h4>
                <p className="text-sm text-zinc-400">{service.description}</p>
                <div className="text-sm mt-1 text-zinc-300">
                  <span className="text-amber-400">
                    ${service.price.toFixed(2)}
                  </span>{" "}
                  • {service.duration} mins • {service.bookings} bookings
                </div>
              </div>
              <Button
                className="border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10"
                onClick={() => setEditingService(service)}
              >
                Edit
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Management */}
      <div className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-amber-200">Gallery</h3>
          <Button
            className="border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10"
            onClick={() => setEditingGallery(true)}
          >
            Manage Images
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400"
            >
              Image {i}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Management */}
      <div className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-amber-200">Testimonials</h3>
          <Button
            className="border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10"
            onClick={() => setEditingTestimonials(true)}
          >
            Manage Testimonials
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="rounded-lg border border-zinc-700/50 bg-zinc-800/30 p-4"
            >
              <div className="h-12 w-12 rounded-full bg-zinc-700 mb-3"></div>
              <h4 className="font-medium text-white">Customer Name</h4>
              <p className="text-sm text-zinc-400 mt-2">
                "Sample testimonial text here..."
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-amber-400/20 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)] p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Edit Service
            </h3>
            <form onSubmit={handleServiceUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-300">
                  Name
                </label>
                <input
                  type="text"
                  value={editingService.name}
                  onChange={e =>
                    setEditingService({
                      ...editingService,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-amber-400/30 bg-zinc-800/80 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-300">
                  Description
                </label>
                <textarea
                  value={editingService.description}
                  onChange={e =>
                    setEditingService({
                      ...editingService,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-amber-400/30 bg-zinc-800/80 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-300">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingService.price}
                  onChange={e =>
                    setEditingService({
                      ...editingService,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full rounded-md border border-amber-400/30 bg-zinc-800/80 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-300">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={editingService.duration}
                  onChange={e =>
                    setEditingService({
                      ...editingService,
                      duration: parseInt(e.target.value),
                    })
                  }
                  className="w-full rounded-md border border-amber-400/30 bg-zinc-800/80 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  className="border-amber-400/30 text-zinc-300 hover:bg-zinc-800"
                  onClick={() => setEditingService(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-zinc-900 font-medium rounded-lg shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Edit Modal */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-amber-400/20 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)] p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Manage Gallery
              </h3>
              <Button
                className="border border-amber-400/30 text-zinc-300 hover:bg-zinc-800"
                onClick={() => setEditingGallery(false)}
              >
                Close
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div
                  key={i}
                  className="relative aspect-square bg-zinc-800 rounded-lg"
                >
                  <Button
                    className="absolute top-2 right-2 border border-amber-400/30 text-white bg-zinc-800/80 hover:bg-amber-400/10"
                    size="sm"
                  >
                    Replace
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setEditingGallery(false)}
                className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-zinc-900 font-medium rounded-lg shadow-[0_0_10px_rgba(251,191,36,0.3)]"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Edit Modal */}
      {editingTestimonials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-amber-400/20 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.2)] p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Manage Testimonials
              </h3>
              <Button
                className="border border-amber-400/30 text-zinc-300 hover:bg-zinc-800"
                onClick={() => setEditingTestimonials(false)}
              >
                Close
              </Button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="border border-zinc-700/50 rounded-lg bg-zinc-800/30 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Customer Name"
                        className="font-medium border-0 bg-transparent p-0 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <textarea
                        placeholder="Testimonial text..."
                        className="w-full border border-amber-400/30 rounded-md bg-zinc-800 p-2 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        rows={3}
                      />
                    </div>
                    <Button className="text-rose-400 border-rose-500/30 hover:bg-rose-500/10">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4 border border-amber-400/30 text-white bg-zinc-800 hover:bg-amber-400/10">
                Add New Testimonial
              </Button>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setEditingTestimonials(false)}
                className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-zinc-900 font-medium rounded-lg shadow-[0_0_10px_rgba(251,191,36,0.3)]"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
