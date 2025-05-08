# Database Schema for Barbershop CRM

Based on a detailed analysis of the codebase, here's a proposed database schema using Supabase (PostgreSQL).

## Core Tables

### users

- `id` (uuid, PK)
- `email` (varchar, unique)
- `password_hash` (varchar)
- `role` (enum: 'customer', 'admin', 'manager', 'barber', 'stylist')
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `last_login` (timestamp)
- `is_active` (boolean)
- `auth_provider` (varchar, nullable) # For OAuth providers
- `provider_id` (varchar, nullable) # External provider user ID

### profiles

- `id` (uuid, PK, FK to users.id)
- `first_name` (varchar)
- `last_name` (varchar)
- `phone` (varchar)
- `avatar_url` (varchar)
- `bio` (text)
- `preferences` (jsonb)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `preferred_language` (varchar, default: 'en')
- `marketing_consent` (boolean, default: false)
- `last_visit` (timestamp, nullable)

### staff

- `id` (uuid, PK, FK to users.id)
- `position` (enum: 'barber', 'stylist', 'manager', 'receptionist')
- `rank` (enum: 'junior', 'senior', 'master')
- `experience_years` (integer)
- `start_date` (date)
- `specialties` (varchar[])
- `bio` (text)
- `is_featured` (boolean)
- `photo_url` (varchar)
- `calendar_id` (uuid, FK to calendars.id)
- `availability_exceptions` (jsonb) # For one-off changes to availability
- `commission_rate` (decimal, nullable)
- `social_links` (jsonb, nullable) # Instagram, Facebook, etc.

### product_categories

- `id` (uuid, PK)
- `name` (varchar)
- `slug` (varchar, unique)
- `description` (text, nullable)
- `parent_id` (uuid, FK to product_categories.id, nullable) # For nested categories
- `image_url` (varchar, nullable)
- `is_active` (boolean, default: true)
- `sort_order` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### products

- `id` (uuid, PK)
- `name` (varchar)
- `description` (text)
- `price` (decimal)
- `discount_price` (decimal, nullable)
- `stock` (integer)
- `category_id` (uuid, FK to product_categories.id)
- `image_url` (varchar)
- `is_featured` (boolean)
- `sales_count` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `sku` (varchar, unique)
- `weight` (decimal, nullable) # For shipping calculations
- `is_taxable` (boolean, default: true)
- `metadata` (jsonb, nullable) # Additional product details
- `is_active` (boolean, default: true)
- `low_stock_threshold` (integer, default: 10) # For inventory alerts

### services

- `id` (uuid, PK)
- `name` (varchar)
- `description` (text)
- `duration` (integer, minutes)
- `price` (decimal)
- `category` (varchar)
- `is_active` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `image_url` (varchar)
- `is_featured` (boolean)
- `sort_order` (integer)
- `staff_types` (varchar[]) # Which staff positions can provide this service

### appointments

- `id` (uuid, PK)
- `guest_name` (varchar, NOT NULL)
- `guest_email` (varchar, NOT NULL)
- `guest_phone` (varchar, NOT NULL)
- `staff_id` (uuid, FK to staff.id)
- `service_id` (uuid, FK to services.id)
- `start_time` (timestamp)
- `end_time` (timestamp)
- `status` (enum: 'confirmed', 'pending', 'cancelled', 'completed', default: 'pending')
- `status_updated_at` (timestamp, nullable)
- `status_updated_by` (uuid, FK to users.id, nullable) # Staff who confirmed/cancelled
- `price` (decimal) # Copied from service at booking time
- `discount_applied` (decimal, default: 0) # Percentage discount
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `reference_image_url` (varchar, nullable) # Style preference image
- `customer_comments` (text, nullable)
- `cancellation_reason` (text, nullable)
- `terms_agreement` (boolean, default: false) # Consent to data processing
- `feedback_id` (uuid, FK to feedback.id, nullable)

### appointment_notifications

- `id` (uuid, PK)
- `appointment_id` (uuid, FK to appointments.id)
- `notification_type` (enum: 'confirmation', 'reminder', 'cancellation')
- `sent_at` (timestamp)
- `recipient_email` (varchar)
- `template_used` (varchar)
- `sent_by` (uuid, FK to users.id, nullable) # Staff who triggered it (or system)
- `success` (boolean, default: true)

### orders

- `id` (uuid, PK)
- `customer_id` (uuid, FK to users.id)
- `order_number` (varchar, unique)
- `status` (enum: 'pending', 'processing', 'shipped', 'delivered', 'cancelled')
- `subtotal` (decimal)
- `shipping_fee` (decimal)
- `tax` (decimal)
- `total` (decimal)
- `payment_intent_id` (varchar)
- `payment_method` (varchar)
- `shipping_address_id` (uuid, FK to addresses.id)
- `billing_address_id` (uuid, FK to addresses.id)
- `notes` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `tracking_number` (varchar, nullable)
- `shipping_provider` (varchar, nullable)
- `payment_status` (enum: 'pending', 'paid', 'failed', 'refunded')
- `refund_amount` (decimal, nullable)
- `coupon_id` (uuid, FK to coupons.id, nullable)
- `gift_card_id` (uuid, FK to gift_cards.id, nullable)
- `gift_card_amount_used` (decimal, nullable)

### order_items

- `id` (uuid, PK)
- `order_id` (uuid, FK to orders.id)
- `product_id` (uuid, FK to products.id)
- `quantity` (integer)
- `unit_price` (decimal)
- `subtotal` (decimal)
- `created_at` (timestamp)
- `tax_rate` (decimal)
- `discount_amount` (decimal, default: 0)

## Supporting Tables

### addresses

- `id` (uuid, PK)
- `user_id` (uuid, FK to users.id)
- `address_line1` (varchar)
- `address_line2` (varchar)
- `city` (varchar)
- `state` (varchar)
- `postal_code` (varchar)
- `country` (varchar)
- `is_default` (boolean)
- `address_type` (enum: 'shipping', 'billing', 'both')
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `phone` (varchar, nullable)
- `notes` (text, nullable)

### calendars

- `id` (uuid, PK)
- `staff_id` (uuid, FK to staff.id)
- `working_hours` (jsonb) # JSON structure for weekly schedule
- `exceptions` (jsonb) # Store holiday, time off, etc.
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `timezone` (varchar, default: 'UTC')

### time_slots

- `id` (uuid, PK)
- `calendar_id` (uuid, FK to calendars.id)
- `start_time` (timestamp)
- `end_time` (timestamp)
- `is_available` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `max_appointments` (integer, default: 1) # For group appointments
- `is_recurring` (boolean, default: false)
- `recurring_pattern` (jsonb, nullable) # For recurring availability
- `display_time` (varchar, nullable) # Formatted time for UI display

### loyalty_transactions

- `id` (uuid, PK)
- `user_id` (uuid, FK to users.id)
- `points` (integer)
- `transaction_type` (enum: 'earn', 'redeem')
- `source` (enum: 'purchase', 'appointment', 'referral', 'promotion')
- `reference_id` (uuid) # Could be order_id or appointment_id
- `notes` (text)
- `created_at` (timestamp)
- `expiry_date` (timestamp, nullable)
- `created_by` (uuid, FK to users.id, nullable)

### cart_items

- `id` (uuid, PK)
- `user_id` (uuid, FK to users.id)
- `product_id` (uuid, FK to products.id)
- `quantity` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `saved_for_later` (boolean, default: false)
- `session_id` (varchar, nullable) # For guests
- `coupon_id` (uuid, FK to coupons.id, nullable)

### coupons

- `id` (uuid, PK)
- `code` (varchar, unique)
- `description` (text)
- `discount_type` (enum: 'percentage', 'fixed_amount')
- `discount_value` (decimal)
- `min_purchase_amount` (decimal, nullable)
- `max_discount_amount` (decimal, nullable)
- `start_date` (timestamp)
- `expiry_date` (timestamp)
- `max_uses` (integer, nullable)
- `current_uses` (integer, default: 0)
- `is_active` (boolean, default: true)
- `applies_to` (enum: 'all', 'products', 'services', 'categories')
- `applicable_ids` (uuid[], nullable) # IDs of products, services, or categories
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `created_by` (uuid, FK to users.id)

### gift_cards

- `id` (uuid, PK)
- `code` (varchar, unique)
- `initial_value` (decimal)
- `current_balance` (decimal)
- `purchaser_id` (uuid, FK to users.id, nullable)
- `recipient_email` (varchar, nullable)
- `recipient_name` (varchar, nullable)
- `message` (text, nullable)
- `purchase_date` (timestamp)
- `expiry_date` (timestamp, nullable)
- `is_active` (boolean, default: true)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `last_used` (timestamp, nullable)
- `order_id` (uuid, FK to orders.id, nullable) # Order where it was purchased

### gift_card_transactions

- `id` (uuid, PK)
- `gift_card_id` (uuid, FK to gift_cards.id)
- `order_id` (uuid, FK to orders.id, nullable)
- `amount` (decimal)
- `transaction_type` (enum: 'purchase', 'redemption', 'refund')
- `created_at` (timestamp)
- `notes` (text, nullable)

### inventory_movements

- `id` (uuid, PK)
- `product_id` (uuid, FK to products.id)
- `quantity` (integer) # Positive for additions, negative for reductions
- `reason` (enum: 'purchase', 'sale', 'return', 'adjustment', 'damage', 'transfer')
- `reference_id` (uuid, nullable) # Could be order_id or other reference
- `stock_before` (integer)
- `stock_after` (integer)
- `notes` (text, nullable)
- `created_at` (timestamp)
- `created_by` (uuid, FK to users.id)

### content_blocks

- `id` (uuid, PK)
- `page` (varchar)
- `section` (varchar)
- `title` (varchar)
- `content` (text)
- `media_url` (varchar)
- `is_active` (boolean)
- `sort_order` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `language` (varchar, default: 'en') # For multi-language content
- `created_by` (uuid, FK to users.id)
- `metadata` (jsonb, nullable) # Additional styling/configuration

### reviews

- `id` (uuid, PK)
- `user_id` (uuid, FK to users.id)
- `product_id` (uuid, FK to products.id, nullable)
- `service_id` (uuid, FK to services.id, nullable)
- `staff_id` (uuid, FK to staff.id, nullable)
- `rating` (integer)
- `comment` (text)
- `is_verified` (boolean)
- `is_published` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `reply` (text, nullable)
- `reply_date` (timestamp, nullable)
- `helpful_count` (integer, default: 0)

### gallery_items

- `id` (uuid, PK)
- `title` (varchar)
- `description` (text)
- `image_url` (varchar)
- `category` (varchar)
- `is_featured` (boolean)
- `sort_order` (integer)
- `staff_id` (uuid, FK to staff.id, nullable) # If work is associated with specific barber
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `alt_text` (varchar) # For accessibility
- `tags` (varchar[])

### notifications

- `id` (uuid, PK)
- `user_id` (uuid, FK to users.id)
- `title` (varchar)
- `message` (text)
- `type` (enum: 'appointment', 'order', 'promotion', 'system')
- `status` (enum: 'unread', 'read')
- `reference_id` (uuid, nullable) # appointment_id, order_id, etc.
- `action_url` (varchar, nullable)
- `created_at` (timestamp)
- `read_at` (timestamp, nullable)
- `expiry_date` (timestamp, nullable)
- `priority` (enum: 'low', 'normal', 'high', default: 'normal')

### site_settings

- `id` (uuid, PK)
- `key` (varchar)
- `value` (text)
- `group` (varchar)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `description` (text, nullable)
- `is_public` (boolean, default: false) # Whether visible to public API

### translations

- `id` (uuid, PK)
- `language_code` (varchar) # e.g., 'en', 'fr'
- `namespace` (varchar) # e.g., 'common', 'booking'
- `key` (varchar) # e.g., 'nav.gallery', 'booking.title'
- `value` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `is_approved` (boolean, default: true)
- `notes` (text, nullable)

### email_templates

- `id` (uuid, PK)
- `name` (varchar)
- `subject` (varchar)
- `body` (text)
- `type` (enum: 'appointment_confirmation', 'order_confirmation', 'reminder', 'marketing')
- `is_active` (boolean)
- `language` (varchar, default: 'en')
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `variables` (jsonb) # Variables that can be used in template
- `last_used` (timestamp, nullable)

### feedback

- `id` (uuid, PK)
- `user_id` (uuid, FK to users.id, nullable) # Nullable since feedback might be from guests
- `appointment_id` (uuid, FK to appointments.id, nullable)
- `order_id` (uuid, FK to orders.id, nullable)
- `rating` (integer)
- `comment` (text, nullable)
- `created_at` (timestamp)
- `feedback_type` (enum: 'service', 'product', 'general')
- `staff_response` (text, nullable)
- `is_published` (boolean, default: false)
- `guest_email` (varchar, nullable) # For guest feedback
- `guest_name` (varchar, nullable) # For guest feedback

### payments

- `id` (uuid, PK)
- `order_id` (uuid, FK to orders.id, nullable)
- `appointment_id` (uuid, FK to appointments.id, nullable)
- `amount` (decimal)
- `currency` (varchar, default: 'USD')
- `payment_method` (varchar)
- `status` (enum: 'pending', 'completed', 'failed', 'refunded')
- `transaction_id` (varchar)
- `created_at` (timestamp)
- `gateway` (varchar) # Payment processor used
- `metadata` (jsonb, nullable) # Additional payment details

### referrals

- `id` (uuid, PK)
- `referrer_id` (uuid, FK to users.id)
- `referred_email` (varchar)
- `status` (enum: 'pending', 'registered', 'completed')
- `created_at` (timestamp)
- `completed_at` (timestamp, nullable)
- `reward_points` (integer, nullable)
- `reward_claimed` (boolean, default: false)
- `code` (varchar, unique) # Referral code

### reports

- `id` (uuid, PK)
- `name` (varchar)
- `type` (enum: 'sales', 'appointments', 'inventory', 'customers', 'staff')
- `date_range` (daterange)
- `parameters` (jsonb)
- `result_data` (jsonb)
- `created_at` (timestamp)
- `created_by` (uuid, FK to users.id)
- `is_scheduled` (boolean, default: false)
- `schedule` (jsonb, nullable) # For recurring reports

### sessions

- `id` (uuid, PK)
- `user_id` (uuid, FK to users.id, nullable)
- `expires_at` (timestamp)
- `created_at` (timestamp)
- `ip_address` (varchar)
- `user_agent` (varchar)
- `is_active` (boolean, default: true)
- `last_activity` (timestamp)

## Relationships

1. **Users to Profiles**: One-to-one
2. **Users to Staff**: One-to-one (for staff members)
3. **Staff to Calendars**: One-to-one
4. **Calendars to TimeSlots**: One-to-many
5. **Staff to Appointments**: One-to-many (as service providers)
6. **Services to Appointments**: One-to-many
7. **Users to Orders**: One-to-many
8. **Orders to OrderItems**: One-to-many
9. **Products to OrderItems**: One-to-many
10. **Users to Addresses**: One-to-many
11. **Users to LoyaltyTransactions**: One-to-many
12. **Users to CartItems**: One-to-many
13. **Products to CartItems**: One-to-many
14. **Users to Reviews**: One-to-many
15. **Users to Notifications**: One-to-many
16. **Staff to GalleryItems**: One-to-many
17. **Users to Feedback**: One-to-many
18. **Appointments to Feedback**: One-to-one
19. **Orders to Payments**: One-to-many
20. **Appointments to Payments**: One-to-many
21. **Users to Referrals**: One-to-many (as referrers)
22. **Users to Sessions**: One-to-many
23. **ProductCategories to Products**: One-to-many
24. **ProductCategories to ProductCategories**: One-to-many (parent-child)
25. **Coupons to Orders**: One-to-many
26. **Coupons to CartItems**: One-to-many
27. **GiftCards to GiftCardTransactions**: One-to-many
28. **Users to GiftCards**: One-to-many (as purchasers)
29. **Products to InventoryMovements**: One-to-many
30. **Appointments to AppointmentNotifications**: One-to-many

## Database Indexes

- `users`: email
- `appointments`: staff_id, start_time, status
- `appointments`: guest_email, guest_phone
- `appointment_notifications`: appointment_id, notification_type
- `orders`: customer_id, order_number, status, created_at
- `products`: category_id, is_featured, sku, is_active
- `services`: category, is_active, is_featured
- `staff`: position, is_featured
- `time_slots`: calendar_id, start_time, is_available
- `translations`: language_code, namespace, key
- `content_blocks`: page, section, language
- `notifications`: user_id, status, created_at
- `referrals`: referrer_id, code, status
- `payments`: order_id, appointment_id, status
- `feedback`: user_id, appointment_id, rating
- `sessions`: user_id, expires_at
- `coupons`: code, is_active, expiry_date
- `gift_cards`: code, is_active, purchaser_id
- `inventory_movements`: product_id, created_at
- `product_categories`: slug, parent_id

## Security and Row-Level Policies

Using Supabase's Row Level Security (RLS):

1. **Users/Profiles**: Users can read/update only their own profile
2. **Staff**: Admin/managers can read/update all staff; staff can read all staff but update only their own profile
3. **Appointments**: Staff can read appointments associated with them; admin/managers can read/update all appointments; public can create new pending appointments
4. **Orders/OrderItems**: Users can read only their own orders; admin/managers can read/update all orders
5. **Products/Services**: Public read access; write access only for admin/managers
6. **Content/Gallery**: Public read access; write access only for admin/managers
7. **Notifications**: Users can read only their own notifications
8. **SiteSettings/Translations**: Public read access; write access only for admin users
9. **Payments**: Users can read their own payment records; admin/managers can read/update all payments
10. **Analytics/Reports**: Read/write access only for admin/managers
11. **Coupons/GiftCards**: Public read for active records; write access only for admin/managers
12. **Inventory**: Read/write access only for admin/managers

## Storage Configurations

### appointment-images Bucket

```sql
-- Create storage bucket for appointment images
INSERT INTO storage.buckets (id, name)
VALUES ('appointment-images', 'Appointment Images')
ON CONFLICT DO NOTHING;

-- Add policies for appointment images
CREATE POLICY "Public users can upload appointment images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'appointment-images');

-- Allow staff to view all appointment images
CREATE POLICY "Staff can view all appointment images"
ON storage.objects FOR SELECT
USING (bucket_id = 'appointment-images' AND
       EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('admin', 'manager', 'barber', 'stylist')));
```

## Database Views

### admin_appointments_view

```sql
CREATE OR REPLACE VIEW admin_appointments_view AS
SELECT
  a.id,
  a.start_time,
  a.end_time,
  a.status,
  a.price,
  a.discount_applied,
  a.guest_name AS customer_name,
  a.guest_email AS email,
  a.guest_phone AS phone,
  s.name AS service,
  CONCAT(p.first_name, ' ', p.last_name) AS barber,
  TO_CHAR(a.start_time, 'Month DD, YYYY') AS date,
  TO_CHAR(a.start_time, 'HH:MI AM') AS time,
  a.reference_image_url,
  a.customer_comments,
  EXISTS(SELECT 1 FROM appointment_notifications
         WHERE appointment_id = a.id AND notification_type = 'confirmation') AS email_sent
FROM
  appointments a
JOIN
  services s ON a.service_id = s.id
JOIN
  staff st ON a.staff_id = st.id
JOIN
  users u ON st.id = u.id
JOIN
  profiles p ON u.id = p.id
ORDER BY
  a.created_at DESC;
```

## Initial Data Seed

Define initial data for:

1. Admin users
2. Default services categories
3. Featured products
4. Working hours templates
5. Sample content blocks for website pages
6. Base translations for supported languages (English, French)
7. Email templates for various notifications
8. Default site settings
9. Commission rates for staff positions
10. Default loyalty program rules
11. Product categories hierarchy
12. Sample coupons and promotions

## Migrations and Versioning

Implement database migration scripts for:

1. Initial schema setup
2. Adding new fields safely
3. Transforming existing data
4. Backup procedures
5. Languages and translations support
6. Analytics and reporting features
7. User session management
8. Gift cards and coupon system
9. Inventory management system
