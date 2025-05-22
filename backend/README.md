# Barbershop Booking Backend

Backend API for barbershop booking system built with Node.js, Express, TypeScript, and Supabase.

## Features

- Barber management (admin only)
- Service offerings management (admin only)
- Booking system (public, no auth required)
- Image uploads for style references
- Supabase integration for database, auth, and storage

## Directory Structure

```
backend/
  src/
    api/
      barbers/      # Barber management endpoints
      services/     # Service management endpoints
      bookings/     # Booking management endpoints
      images/       # Image upload endpoints
    common/
      configs/      # Environment and app configurations
      middleware/   # Auth, validation, logging middleware
      utils/        # Helper functions
      validators/   # Zod validators
      types/        # TypeScript types and interfaces
    core/           # App setup, Supabase client, error handling
    tests/          # Unit and integration tests
    index.ts        # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. Copy `.env.example` to `.env` and update with your Supabase credentials:
   ```
   cp .env.example .env
   ```

### Development

Start the development server:

```
npm run dev
```

### Testing

Run tests:

```
npm test
```

### Building for Production

Build the application:

```
npm run build
```

Start the production server:

```
npm start
```

## API Endpoints

### Barbers

- `GET /api/barbers` - Get all barbers
- `GET /api/barbers/:id` - Get barber by ID
- `POST /api/barbers` - Create barber (admin only)
- `PUT /api/barbers/:id` - Update barber (admin only)
- `DELETE /api/barbers/:id` - Delete barber (admin only)

### Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Bookings

- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create booking (public)
- `PUT /api/bookings/:id` - Update booking status (admin only)

### Images

- `POST /api/images/upload` - Upload image for booking
- `GET /api/images/:id` - Get image by ID
