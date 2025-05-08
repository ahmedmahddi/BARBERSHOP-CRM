# Project Structure

```
tajroba/
├── .next/                   # Next.js build output
├── public/
│   └── images/
│       └── products/        # Product images
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── booking/
│   │   │   └── confirmation/
│   │   │       └── [bookingId]/
│   │   ├── checkout/
│   │   │   └── confirmation/
│   │   │       └── [orderId]/
│   │   ├── dashboard/
│   │   │   └── admin/
│   │   │       ├── appointments/
│   │   │       ├── content/
│   │   │       ├── customers/
│   │   │       └── products/
│   │   ├── gallery/
│   │   ├── services/
│   │   ├── shop/
│   │   │   └── [productId]/
│   │   ├── team/
│   │   ├── globals.css      # Global CSS styles
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page component
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── admin/
│   │   ├── cart/
│   │   ├── common/
│   │   │   ├── Footer.tsx   # Footer component
│   │   │   ├── Header.tsx   # Header/navigation component
│   │   │   └── Hero.tsx     # Hero section component
│   │   ├── features/
│   │   ├── ui/              # UI component library
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   └── use-toast.ts
│   │   ├── theme-provider.tsx # Theme provider component
│   │   └── theme-toggle.tsx   # Theme toggle component
│   ├── lib/                 # Utility libraries and functions
│   │   ├── supabase.ts      # Supabase client configuration
│   │   ├── translations.ts  # Internationalization translations
│   │   ├── types.ts         # TypeScript type definitions
│   │   └── utils.ts         # Utility functions
│   └── tests/               # Test files
├── components.json          # Component configuration
├── next-env.d.ts            # TypeScript definitions for Next.js
├── next.config.js           # Next.js configuration
├── package-lock.json
├── package.json             # Project dependencies
├── postcss.config.js        # PostCSS configuration
├── README.md
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Application Structure

This is a Next.js web application for an e-commerce or service-based business with the following key sections:

- **Booking System**: Handles service bookings with confirmation pages
- **Shop**: E-commerce functionality with product pages and checkout process
- **Dashboard**: Admin interface for managing:
  - Appointments
  - Content
  - Customers
  - Products
- **Team**: Staff or team member information
- **Gallery**: Likely showcases work or products
- **Services**: Service offerings

### Technology Stack

- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Database**: Likely Supabase (based on supabase.ts)
- **Languages**: TypeScript/JavaScript
- **Internationalization**: Custom translation system

### Key Components

- Header and footer present throughout the application
- Hero section for main landing page
- Custom UI components following a design system
- Theme toggle for light/dark mode support

## Project Summary

Based on a comprehensive code analysis, this project appears to be a barbershop/salon business application with the following characteristics:

### Business Model

- **Name**: The business appears to be named "Zied's Barber" or "BARBERINO"
- **Focus**: Premium barbershop/grooming services with product sales
- **Established**: Since 2013 (according to Hero component)

### Frontend Architecture

- Modern React application built with Next.js 14
- Component-based architecture with reusable UI components
- Responsive design with mobile and desktop layouts
- Dark/light theme support via theme-toggle and theme-provider

### Main Features

1. **Services Booking System**

   - Online appointment scheduling
   - Barber selection
   - Service selection from catalog
   - Confirmation and management

2. **E-commerce Store**

   - Product catalog (hair and beard products)
   - Shopping cart functionality
   - Checkout process
   - Order confirmation

3. **Admin Dashboard**

   - Appointment management
   - Content management
   - Customer database
   - Product inventory
   - Sales analytics
   - Staff management

4. **Customer-facing Features**
   - Team/barber profiles
   - Service gallery
   - Loyalty program
   - Contact information

### Data Structure

- Products with name, description, price, images
- Services with duration, price, description
- Appointments with customer details, service, barber, date/time
- Customer profiles with contact info and purchase history
- Administrative roles and permissions

### External Integrations

- Likely integration with Supabase for backend database
- Social media links (Facebook, Instagram, TikTok)
- Email subscription system

### Design Elements

- Gold and dark color scheme (zinc-800/900 with gold accents)
- Custom UI components based on Radix UI primitives
- FontAwesome icons
- Responsive design patterns

This application combines e-commerce functionality with service booking capabilities, creating a comprehensive digital presence for a barbershop business. The codebase is well-structured, using modern React patterns and Next.js features for optimal performance and SEO.
