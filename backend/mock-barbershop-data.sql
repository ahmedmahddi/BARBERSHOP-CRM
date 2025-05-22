-- Mock data for Barbershop Booking System

-- Barbers
INSERT INTO barbers (id, name, email, phone, photo_url, description)
VALUES
  (gen_random_uuid(), 'James Smith', 'james@barber.com', '1234567890', NULL, 'Senior barber with 10 years experience'),
  (gen_random_uuid(), 'Bradley Jones', 'bradley@barber.com', '1234567891', NULL, 'Fade specialist and beard expert');

-- Services
INSERT INTO services (id, name, description, duration, price, image_url)
VALUES
  (gen_random_uuid(), 'Haircut', 'Classic men''s haircut', 30, 20.00, NULL),
  (gen_random_uuid(), 'Beard Trim', 'Professional beard grooming', 15, 10.00, NULL),
  (gen_random_uuid(), 'Shave', 'Traditional straight razor shave', 20, 15.00, NULL);



-- Bookings
-- Note: Replace the barber_id and service_id with real IDs from your database after inserting barbers/services, or use a SELECT to fetch them as needed.
-- The following is an example with placeholder UUIDs. Update them after initial insert if you want to test bookings.
INSERT INTO bookings (id, name, email, phone, barber_id, service_id, date, time, comments, image_url, agreement, status)
VALUES
  (gen_random_uuid(), 'John Doe', 'john@example.com', '143a0b5d-7fbb-4036-9f10-7fe420e2dd46', NULL, '440130fb-bcb0-4481-8534-c433dcc0dca4', '2025-05-12', '10:00', 'First time visit', NULL, true, 'confirmed'),
  (gen_random_uuid(), 'Jane Roe', 'jane@example.com', 'd7456438-fa8a-4526-b3cc-b58819169cb9', NULL, '440130fb-bcb0-4481-8534-c433dcc0dca4', '2025-05-13', '14:30', 'Wants a fade', NULL, true, 'pending');



-- After running, update NULLs for foreign keys with real UUIDs from your barbers, services, products, and orders tables if you want fully relational mock data.
