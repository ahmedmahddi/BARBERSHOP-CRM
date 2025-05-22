import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Product type definition
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  sales: number;
};

// Mock products data
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Hair Pomade",
    description: "Strong hold, high shine pomade for a classic look",
    price: 18.99,
    image: "/images/products/pomade.svg",
    stock: 100,
    sales: 0,
  },
  {
    id: 2,
    name: "Beard Oil",
    description: "Nourishing oil to soften and condition your beard",
    price: 22.5,
    image: "/images/products/beard-oil.svg",
    stock: 100,
    sales: 0,
  },
  {
    id: 3,
    name: "Shaving Cream",
    description: "Luxurious cream for a smooth, comfortable shave",
    price: 14.99,
    image: "/images/products/shaving-cream.svg",
    stock: 100,
    sales: 0,
  },
  {
    id: 4,
    name: "Hair Scissors",
    description: "Professional-grade scissors for home trimming",
    price: 34.95,
    image: "/images/products/pomade.svg",
    stock: 100,
    sales: 0,
  },
  {
    id: 5,
    name: "Beard Brush",
    description: "Boar bristle brush for styling and detangling",
    price: 19.99,
    image: "/images/products/beard-oil.svg",
    stock: 100,
    sales: 0,
  },
  {
    id: 6,
    name: "Styling Clay",
    description: "Medium hold, matte finish clay for textured styles",
    price: 17.5,
    image: "/images/products/hair-clay.svg",
    stock: 100,
    sales: 0,
  },
  {
    id: 7,
    name: "Aftershave Balm",
    description: "Soothing balm to reduce irritation after shaving",
    price: 24.99,
    image: "/images/products/aftershave-balm.svg",
    stock: 100,
    sales: 0,
  },
  {
    id: 8,
    name: "Styling Gel",
    description: "Strong hold gel for sleek, controlled styles",
    price: 16.95,
    image: "/images/products/styling-gel.svg",
    stock: 100,
    sales: 0,
  },
];

export type Admin = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

export const mockAdmins = [
  {
    id: 1,
    name: "Admin",
    email: "admin@barbershop.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Manager",
    email: "manager@barbershop.com",
    password: "manager456",
    role: "manager",
  },
];

export const mockDashboardStats = {
  totalRevenue: {
    total: 4875.5,
    services: 3240.25,
    products: 1635.25,
  },
  totalAppointments: 348,
  upcomingAppointments: 42,
  loyaltyProgram: {
    activeMembers: 125,
    totalPoints: 8750,
    discountsRedeemed: 36,
  },
  recentSales: {
    daily: 485.75,
    weekly: 2430.5,
  },
  popularServices: [
    { name: "Classic Haircut", bookings: 78 },
    { name: "Beard Trim", bookings: 64 },
    { name: "Hot Towel Shave", bookings: 52 },
    { name: "Hair & Beard Combo", bookings: 45 },
  ],
};

export const mockServices = [
  {
    id: 1,
    name: "Classic Haircut",
    price: 35,
    duration: 30,
    description: "Traditional haircut with clippers and scissors",
    bookings: 78,
  },
  {
    id: 2,
    name: "Beard Trim",
    price: 25,
    duration: 20,
    description: "Shape and maintain your beard for a clean look",
    bookings: 64,
  },
  {
    id: 3,
    name: "Hot Towel Shave",
    price: 40,
    duration: 45,
    description: "Relaxing traditional wet shave with hot towel treatment",
    bookings: 52,
  },
  {
    id: 4,
    name: "Hair & Beard Combo",
    price: 55,
    duration: 50,
    description: "Complete grooming package for hair and beard",
    bookings: 45,
  },
  {
    id: 5,
    name: "Hair Coloring",
    price: 75,
    duration: 90,
    description: "Professional hair coloring and styling service",
    bookings: 38,
  },
  {
    id: 6,
    name: "Kid's Haircut",
    price: 25,
    duration: 20,
    description: "Haircuts for children 12 and under",
    bookings: 30,
  },
];

export type Appointment = {
  id: number;
  customer: string;
  email: string;
  phone: string;
  service: string;
  price: number;
  barber: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
  emailReminder: boolean;
  discountApplied: number;
};

export const mockAppointments: Appointment[] = [
  {
    id: 1,
    customer: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    service: "Classic Haircut",
    price: 35,
    barber: "Archie",
    date: "May 15, 2024",
    time: "10:00 AM",
    status: "confirmed",
    emailReminder: true,
    discountApplied: 0,
  },
  {
    id: 2,
    customer: "Michael Johnson",
    email: "michael@example.com",
    phone: "(555) 987-6543",
    service: "Hair & Beard Combo",
    price: 55,
    barber: "Bradley",
    date: "May 16, 2024",
    time: "2:30 PM",
    status: "pending",
    emailReminder: false,
    discountApplied: 0,
  },
  {
    id: 3,
    customer: "Robert Williams",
    email: "robert@example.com",
    phone: "(555) 456-7890",
    service: "Hot Towel Shave",
    price: 40,
    barber: "Matteo",
    date: "May 17, 2024",
    time: "11:15 AM",
    status: "cancelled",
    emailReminder: false,
    discountApplied: 0,
  },
  {
    id: 4,
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    service: "Hair Coloring",
    price: 75,
    barber: "Melina",
    date: "May 18, 2024",
    time: "3:00 PM",
    status: "confirmed",
    emailReminder: true,
    discountApplied: 10,
  },
];

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  bookings: number;
};

export type ContentBlock = {
  section: string;
  content: any;
};

export const mockContent: ContentBlock[] = [
  {
    section: "services",
    content: mockServices,
  },
  {
    section: "prices",
    content: mockServices.map(s => ({ name: s.name, price: s.price })),
  },
  {
    section: "gallery",
    content: [
      {
        id: 1,
        url: "/images/gallery/image1.jpg",
        alt: "Barbershop gallery image 1",
      },
      {
        id: 2,
        url: "/images/gallery/image2.jpg",
        alt: "Barbershop gallery image 2",
      },
      {
        id: 3,
        url: "/images/gallery/image3.jpg",
        alt: "Barbershop gallery image 3",
      },
      {
        id: 4,
        url: "/images/gallery/image4.jpg",
        alt: "Barbershop gallery image 4",
      },
      {
        id: 5,
        url: "/images/gallery/image5.jpg",
        alt: "Barbershop gallery image 5",
      },
      {
        id: 6,
        url: "/images/gallery/image6.jpg",
        alt: "Barbershop gallery image 6",
      },
    ],
  },
  {
    section: "testimonials",
    content: [
      {
        id: 1,
        name: "David Miller",
        text: "Best haircut I've ever had. The hot towel shave was amazing!",
        rating: 5,
      },
      {
        id: 2,
        name: "James Wilson",
        text: "Great atmosphere and professional service. Highly recommend the beard trim.",
        rating: 4,
      },
      {
        id: 3,
        name: "Thomas Brown",
        text: "Excellent service and attention to detail. Will definitely be back!",
        rating: 5,
      },
    ],
  },
];

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  referralCount: number;
  totalSpent: number;
  haircuts: {
    date: string;
    service: string;
    barber: string;
    price: number;
  }[];
  purchases: {
    date: string;
    product: string;
    price: number;
  }[];
};

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    loyaltyPoints: 650,
    referralCount: 2,
    totalSpent: 485.5,
    haircuts: [
      {
        date: "May 10, 2024",
        service: "Classic Haircut",
        barber: "Archie",
        price: 35,
      },
      {
        date: "Apr 12, 2024",
        service: "Hair & Beard Combo",
        barber: "Bradley",
        price: 55,
      },
      {
        date: "Mar 5, 2024",
        service: "Classic Haircut",
        barber: "Archie",
        price: 35,
      },
    ],
    purchases: [
      { date: "May 10, 2024", product: "Premium Hair Pomade", price: 18.99 },
      { date: "Apr 12, 2024", product: "Beard Oil", price: 22.5 },
    ],
  },
  {
    id: 2,
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "(555) 987-6543",
    loyaltyPoints: 320,
    referralCount: 0,
    totalSpent: 275.25,
    haircuts: [
      {
        date: "May 5, 2024",
        service: "Hot Towel Shave",
        barber: "Matteo",
        price: 40,
      },
      {
        date: "Mar 22, 2024",
        service: "Classic Haircut",
        barber: "Archie",
        price: 35,
      },
    ],
    purchases: [
      { date: "May 5, 2024", product: "Aftershave Balm", price: 24.99 },
    ],
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    loyaltyPoints: 520,
    referralCount: 3,
    totalSpent: 630.75,
    haircuts: [
      {
        date: "May 8, 2024",
        service: "Hair Coloring",
        barber: "Melina",
        price: 75,
      },
      {
        date: "Apr 2, 2024",
        service: "Hair Coloring",
        barber: "Melina",
        price: 75,
      },
      {
        date: "Feb 28, 2024",
        service: "Hair Coloring",
        barber: "Melina",
        price: 75,
      },
    ],
    purchases: [
      { date: "May 8, 2024", product: "Styling Clay", price: 17.5 },
      { date: "Apr 2, 2024", product: "Hair Scissors", price: 34.95 },
      { date: "Feb 28, 2024", product: "Styling Gel", price: 16.95 },
    ],
  },
];

// Order type definitions
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  email: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
}

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 1,
    customerId: 101,
    customerName: "Alex Johnson",
    email: "alex@example.com",
    date: "2023-04-15T10:30:00",
    items: [
      {
        productId: 1,
        productName: "Premium Pomade",
        quantity: 2,
        price: 24.99,
      },
      { productId: 3, productName: "Beard Oil", quantity: 1, price: 19.99 },
    ],
    totalAmount: 69.97,
    status: "completed",
  },
  {
    id: 2,
    customerId: 102,
    customerName: "Sarah Wilson",
    email: "sarah@example.com",
    date: "2023-04-16T14:45:00",
    items: [
      { productId: 2, productName: "Hair Wax", quantity: 1, price: 18.99 },
      { productId: 4, productName: "Shaving Cream", quantity: 1, price: 12.99 },
    ],
    totalAmount: 31.98,
    status: "processing",
  },
  {
    id: 3,
    customerId: 103,
    customerName: "Michael Brown",
    email: "michael@example.com",
    date: "2023-04-17T09:15:00",
    items: [
      {
        productId: 5,
        productName: "Aftershave Balm",
        quantity: 1,
        price: 22.99,
      },
    ],
    totalAmount: 22.99,
    status: "pending",
  },
  {
    id: 4,
    customerId: 104,
    customerName: "Emily Davis",
    email: "emily@example.com",
    date: "2023-04-18T16:20:00",
    items: [
      {
        productId: 1,
        productName: "Premium Pomade",
        quantity: 3,
        price: 24.99,
      },
      { productId: 6, productName: "Hair Tonic", quantity: 2, price: 17.99 },
    ],
    totalAmount: 110.95,
    status: "completed",
  },
  {
    id: 5,
    customerId: 105,
    customerName: "David Miller",
    email: "david@example.com",
    date: "2023-04-19T11:10:00",
    items: [
      { productId: 7, productName: "Beard Brush", quantity: 1, price: 15.99 },
    ],
    totalAmount: 15.99,
    status: "cancelled",
  },
  {
    id: 6,
    customerId: 106,
    customerName: "Jessica Taylor",
    email: "jessica@example.com",
    date: "2023-04-20T13:25:00",
    items: [
      { productId: 2, productName: "Hair Wax", quantity: 2, price: 18.99 },
      { productId: 8, productName: "Styling Gel", quantity: 1, price: 14.99 },
    ],
    totalAmount: 52.97,
    status: "processing",
  },
];
