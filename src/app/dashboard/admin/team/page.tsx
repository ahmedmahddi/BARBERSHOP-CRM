"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCheck,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define Barber interface
interface Barber {
  id: string;
  name: string;
  photo: string;
  description: string;
  position: string;
  rank: string;
  experience: string;
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  specializations: string[];
  email?: string;
  phone?: string;
  isActive: boolean;
}

// Ranks and positions options
const RANKS = ["Junior", "Mid-level", "Senior", "Master"];
const POSITIONS = ["Barber", "Stylist", "Colorist", "Manager"];
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const SPECIALIZATIONS = [
  "Haircuts",
  "Beard Trimming",
  "Styling",
  "Color Services",
  "Facial Hair Design",
  "Hot Towel Shaves",
  "Hair Treatments",
  "Kids Cuts",
];

export default function BarbersPage() {
  const { toast } = useToast();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Barber>>({
    name: "",
    photo: "",
    description: "",
    position: "",
    rank: "",
    experience: "",
    workingDays: [],
    workingHours: {
      start: "9:00 AM",
      end: "5:00 PM",
    },
    specializations: [],
    email: "",
    phone: "",
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);

  // Load barbers from localStorage on initial load
  useEffect(() => {
    const storedBarbers = localStorage.getItem("barbers");
    if (storedBarbers) {
      try {
        setBarbers(JSON.parse(storedBarbers));
      } catch (error) {
        console.error("Error loading barbers:", error);
        toast({
          title: "Error",
          description: "Failed to load barbers data",
          variant: "destructive",
        });
      }
    } else {
      // Default barbers if none exist
      const defaultBarbers: Barber[] = [
        {
          id: "james",
          name: "James Smith",
          photo:
            "https://readdy.ai/api/search-image?query=Professional%20male%20barber%20with%20beard%20wearing%20black%20apron%20in%20barbershop&width=400&height=500",
          description: "Expert in classic cuts and beard styling.",
          position: "Barber",
          rank: "Senior",
          experience: "8 years",
          workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          workingHours: {
            start: "9:00 AM",
            end: "5:00 PM",
          },
          specializations: ["Haircuts", "Beard Trimming", "Styling"],
          isActive: true,
        },
        {
          id: "bradley",
          name: "Bradley Cooper",
          photo:
            "https://readdy.ai/api/search-image?query=Professional%20male%20barber%20with%20tattoos%20wearing%20brown%20apron%20in%20barbershop&width=400&height=500",
          description: "Specializes in modern and trendy hairstyles.",
          position: "Stylist",
          rank: "Master",
          experience: "12 years",
          workingDays: [
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          workingHours: {
            start: "10:00 AM",
            end: "6:00 PM",
          },
          specializations: ["Haircuts", "Styling", "Hair Treatments"],
          isActive: true,
        },
        {
          id: "megan",
          name: "Megan Davis",
          photo:
            "https://readdy.ai/api/search-image?query=Professional%20female%20hairstylist%20in%20modern%20salon&width=400&height=500",
          description: "Creative colorist with an eye for detail.",
          position: "Colorist",
          rank: "Senior",
          experience: "7 years",
          workingDays: [
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          workingHours: {
            start: "11:00 AM",
            end: "7:00 PM",
          },
          specializations: ["Color Services", "Styling", "Hair Treatments"],
          isActive: true,
        },
        {
          id: "matthew",
          name: "Matthew Johnson",
          photo:
            "https://readdy.ai/api/search-image?query=Professional%20male%20barber%20with%20classic%20style%20in%20barbershop&width=400&height=500",
          description: "Traditional barber with exceptional shaving skills.",
          position: "Barber",
          rank: "Master",
          experience: "15 years",
          workingDays: ["Monday", "Tuesday", "Friday", "Saturday", "Sunday"],
          workingHours: {
            start: "8:00 AM",
            end: "4:00 PM",
          },
          specializations: [
            "Hot Towel Shaves",
            "Beard Trimming",
            "Facial Hair Design",
          ],
          isActive: true,
        },
      ];

      setBarbers(defaultBarbers);
      localStorage.setItem("barbers", JSON.stringify(defaultBarbers));
    }
  }, [toast]);

  // Save barbers to localStorage whenever they change
  useEffect(() => {
    if (barbers.length > 0) {
      localStorage.setItem("barbers", JSON.stringify(barbers));
    }
  }, [barbers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkingHoursChange = (type: "start" | "end", value: string) => {
    setFormData(prev => {
      // Make sure workingHours exists with default values if it doesn't
      const currentHours = prev.workingHours ?? {
        start: "9:00 AM",
        end: "5:00 PM",
      };
      return {
        ...prev,
        workingHours: {
          ...currentHours,
          [type]: value,
        },
      };
    });
  };

  const toggleWorkingDay = (day: string) => {
    setFormData(prev => {
      const currentDays = prev.workingDays || [];
      if (currentDays.includes(day)) {
        return {
          ...prev,
          workingDays: currentDays.filter(d => d !== day),
        };
      } else {
        return {
          ...prev,
          workingDays: [...currentDays, day],
        };
      }
    });
  };

  const toggleSpecialization = (spec: string) => {
    setFormData(prev => {
      const currentSpecs = prev.specializations || [];
      if (currentSpecs.includes(spec)) {
        return {
          ...prev,
          specializations: currentSpecs.filter(s => s !== spec),
        };
      } else {
        return {
          ...prev,
          specializations: [...currentSpecs, spec],
        };
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      // In a real application, you would upload to a server
      // Here we'll convert to base64 for demo purposes
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.position || !formData.rank) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isEditing) {
      // Update existing barber
      setBarbers(prev =>
        prev.map(barber =>
          barber.id === isEditing
            ? { ...barber, ...formData, id: isEditing }
            : barber
        )
      );

      toast({
        title: "Barber Updated",
        description: `${formData.name} has been updated successfully.`,
      });

      setIsEditing(null);
    } else {
      // Add new barber
      const newId = Date.now().toString();
      const newBarber: Barber = {
        ...(formData as Barber),
        id: newId,
        isActive: true,
      };

      setBarbers(prev => [...prev, newBarber]);

      toast({
        title: "Barber Added",
        description: `${formData.name} has been added to the team.`,
      });
    }

    resetForm();
    setIsAdding(false);
  };

  const editBarber = (id: string) => {
    const barberToEdit = barbers.find(barber => barber.id === id);
    if (barberToEdit) {
      setFormData(barberToEdit);
      setIsEditing(id);
      setIsAdding(true);
    }
  };

  const deleteBarber = (id: string) => {
    setBarbers(prev => prev.filter(barber => barber.id !== id));
    toast({
      title: "Barber Removed",
      description: "The barber has been removed from the system.",
    });
  };

  const toggleBarberStatus = (id: string) => {
    setBarbers(prev =>
      prev.map(barber =>
        barber.id === id ? { ...barber, isActive: !barber.isActive } : barber
      )
    );

    const barber = barbers.find(b => b.id === id);
    toast({
      title: barber?.isActive ? "Barber Deactivated" : "Barber Activated",
      description: `${barber?.name} is now ${
        barber?.isActive ? "inactive" : "active"
      }.`,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      photo: "",
      description: "",
      position: "",
      rank: "",
      experience: "",
      workingDays: [],
      workingHours: {
        start: "9:00 AM",
        end: "5:00 PM",
      },
      specializations: [],
      email: "",
      phone: "",
      isActive: true,
    });
    setIsEditing(null);
  };

  const cancelForm = () => {
    resetForm();
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-1 bg-amber-400 mr-4"></div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Manage Barbers
          </h2>
        </div>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Barber
          </Button>
        )}
      </div>

      {isAdding ? (
        <div className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] p-6">
          <h3 className="text-xl font-semibold mb-4 text-amber-300">
            {isEditing ? "Edit Barber" : "Add New Barber"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-zinc-300"
                  id="name-label"
                >
                  Full Name*
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  required
                  aria-labelledby="name-label"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1 text-zinc-300"
                  id="position-label"
                >
                  Position*
                </label>
                <Select
                  value={formData.position}
                  onValueChange={value => handleSelectChange("position", value)}
                  aria-labelledby="position-label"
                >
                  <SelectTrigger className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border border-amber-400/20 text-white">
                    {POSITIONS.map(pos => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1 text-zinc-300"
                  id="rank-label"
                >
                  Rank*
                </label>
                <Select
                  value={formData.rank}
                  onValueChange={value => handleSelectChange("rank", value)}
                  aria-labelledby="rank-label"
                >
                  <SelectTrigger className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400">
                    <SelectValue placeholder="Select rank" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border border-amber-400/20 text-white">
                    {RANKS.map(rank => (
                      <SelectItem key={rank} value={rank}>
                        {rank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1 text-zinc-300"
                  id="experience-label"
                >
                  Experience
                </label>
                <Input
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 5 years"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  aria-labelledby="experience-label"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1 text-zinc-300"
                  id="email-label"
                >
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email ?? ""}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  aria-labelledby="email-label"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1 text-zinc-300"
                  id="phone-label"
                >
                  Phone
                </label>
                <Input
                  name="phone"
                  value={formData.phone ?? ""}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  aria-labelledby="phone-label"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium mb-1 text-zinc-300"
                  id="description-label"
                >
                  Description
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Short bio or description"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 min-h-[100px]"
                  aria-labelledby="description-label"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1 text-zinc-300"
                  id="photo-label"
                >
                  Photo
                </label>
                <div
                  className="flex items-center space-x-4"
                  aria-labelledby="photo-label"
                >
                  {formData.photo && (
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <img
                        src={formData.photo}
                        alt="Barber preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="flex items-center justify-center px-4 py-2 border border-zinc-700 rounded-md cursor-pointer hover:border-amber-400 transition-colors">
                      <FontAwesomeIcon
                        icon={faUpload}
                        className="mr-2 text-amber-400"
                      />
                      <span className="text-zinc-300 text-sm">
                        {uploading
                          ? "Uploading..."
                          : formData.photo
                          ? "Change Photo"
                          : "Upload Photo"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                    </label>
                    <p className="text-xs text-zinc-500 mt-1">
                      Or paste an image URL in the field below:
                    </p>
                    <Input
                      name="photo"
                      value={formData.photo}
                      onChange={handleChange}
                      placeholder="Image URL"
                      className="w-full mt-1 rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs"
                      aria-label="Photo URL"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1 text-zinc-300"
                  id="working-hours-label"
                >
                  Working Hours
                </label>
                <div
                  className="grid grid-cols-2 gap-2"
                  aria-labelledby="working-hours-label"
                >
                  <div>
                    <label
                      className="block text-xs text-zinc-400 mb-1"
                      id="hours-start-label"
                    >
                      Start
                    </label>
                    <Select
                      value={formData.workingHours?.start ?? "9:00 AM"}
                      onValueChange={value =>
                        handleWorkingHoursChange("start", value)
                      }
                      aria-labelledby="hours-start-label"
                    >
                      <SelectTrigger className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-1 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 h-9">
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border border-amber-400/20 text-white">
                        {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"].map(
                          time => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      className="block text-xs text-zinc-400 mb-1"
                      id="hours-end-label"
                    >
                      End
                    </label>
                    <Select
                      value={formData.workingHours?.end ?? "5:00 PM"}
                      onValueChange={value =>
                        handleWorkingHoursChange("end", value)
                      }
                      aria-labelledby="hours-end-label"
                    >
                      <SelectTrigger className="w-full rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-1 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 h-9">
                        <SelectValue placeholder="End time" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border border-amber-400/20 text-white">
                        {[
                          "4:00 PM",
                          "5:00 PM",
                          "6:00 PM",
                          "7:00 PM",
                          "8:00 PM",
                        ].map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2 text-zinc-300"
                  id="working-days-label"
                >
                  Working Days
                </label>
                <div
                  className="grid grid-cols-2 gap-2"
                  aria-labelledby="working-days-label"
                  role="group"
                >
                  {DAYS.map(day => (
                    <button
                      key={day}
                      type="button"
                      className={`flex items-center px-3 py-2 rounded-md border ${
                        formData.workingDays?.includes(day)
                          ? "border-amber-400 bg-amber-400/10"
                          : "border-zinc-700 hover:border-zinc-600"
                      } cursor-pointer transition-colors`}
                      onClick={() => toggleWorkingDay(day)}
                      aria-pressed={formData.workingDays?.includes(day)}
                    >
                      <div
                        className={`w-4 h-4 rounded-sm border ${
                          formData.workingDays?.includes(day)
                            ? "bg-amber-400 border-amber-400"
                            : "border-zinc-600"
                        } mr-2 flex items-center justify-center`}
                      >
                        {formData.workingDays?.includes(day) && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-xs text-zinc-900"
                          />
                        )}
                      </div>
                      <span className="text-sm">{day}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2 text-zinc-300"
                  id="specializations-label"
                >
                  Specializations
                </label>
                <div
                  className="grid grid-cols-2 gap-2"
                  aria-labelledby="specializations-label"
                  role="group"
                >
                  {SPECIALIZATIONS.map(spec => (
                    <button
                      key={spec}
                      type="button"
                      className={`flex items-center px-3 py-2 rounded-md border ${
                        formData.specializations?.includes(spec)
                          ? "border-amber-400 bg-amber-400/10"
                          : "border-zinc-700 hover:border-zinc-600"
                      } cursor-pointer transition-colors`}
                      onClick={() => toggleSpecialization(spec)}
                      aria-pressed={formData.specializations?.includes(spec)}
                    >
                      <div
                        className={`w-4 h-4 rounded-sm border ${
                          formData.specializations?.includes(spec)
                            ? "bg-amber-400 border-amber-400"
                            : "border-zinc-600"
                        } mr-2 flex items-center justify-center`}
                      >
                        {formData.specializations?.includes(spec) && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-xs text-zinc-900"
                          />
                        )}
                      </div>
                      <span className="text-sm">{spec}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={cancelForm}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <FontAwesomeIcon
                  icon={isEditing ? faEdit : faPlus}
                  className="mr-2"
                />
                {isEditing ? "Update Barber" : "Add Barber"}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)] overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b border-amber-400/20">
                  <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                    Photo
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                    Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                    Position
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                    Experience
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                    Working Days
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                    Specializations
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-amber-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {barbers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-zinc-400">
                      No barbers found. Add your first barber to get started.
                    </td>
                  </tr>
                ) : (
                  barbers.map(barber => (
                    <tr
                      key={barber.id}
                      className="border-b border-zinc-700/50 transition-colors hover:bg-zinc-800/50"
                    >
                      <td className="p-4 align-middle">
                        {barber.photo ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                              src={barber.photo}
                              alt={barber.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                            <span className="text-lg font-semibold text-zinc-400">
                              {barber.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="font-medium">{barber.name}</div>
                        <div className="text-zinc-400 text-xs">
                          {barber.rank}
                        </div>
                      </td>
                      <td className="p-4 align-middle">{barber.position}</td>
                      <td className="p-4 align-middle">{barber.experience}</td>
                      <td className="p-4 align-middle">
                        <div className="flex flex-wrap gap-1">
                          {barber.workingDays?.map(day => (
                            <span
                              key={day}
                              className="px-2 py-1 text-xs bg-zinc-800 rounded-md"
                            >
                              {day.substring(0, 3)}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex flex-wrap gap-1">
                          {barber.specializations?.slice(0, 2).map(spec => (
                            <span
                              key={spec}
                              className="px-2 py-1 text-xs bg-amber-900/30 border border-amber-800/30 rounded-md text-amber-300"
                            >
                              {spec}
                            </span>
                          ))}
                          {barber.specializations?.length > 2 && (
                            <span className="px-2 py-1 text-xs bg-zinc-800 rounded-md">
                              +{barber.specializations.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            barber.isActive
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-950 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {barber.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => editBarber(barber.id)}
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button
                            onClick={() => toggleBarberStatus(barber.id)}
                            variant="outline"
                            size="sm"
                            className={`h-8 px-2 text-xs ${
                              barber.isActive
                                ? "border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                                : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                            }`}
                          >
                            {barber.isActive ? "Deactivate" : "Activate"}
                          </Button>
                          <Button
                            onClick={() => deleteBarber(barber.id)}
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
