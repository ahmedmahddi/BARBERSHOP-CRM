-- Barbershop Booking System: Initial Schema Migration
-- This migration creates all required tables for the backend and aligns with the current codebase and DTOs.

-- 1. Barbers Table
CREATE TABLE IF NOT EXISTS barbers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  photo_url text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  duration integer NOT NULL,
  price numeric NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  barber_id uuid REFERENCES barbers(id),
  service_id uuid REFERENCES services(id),
  date date NOT NULL,
  time text NOT NULL,
  comments text,
  image_url text,
  agreement boolean DEFAULT false,
  status text DEFAULT 'pending' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- 4. Products Table (if used by your app, optional)
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  image_url text,
  stock integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- 5. Orders Table (if used by your app, optional)
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- 6. Order Items Table (if used by your app, optional)
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Indexes and constraints can be added as needed for optimization.
