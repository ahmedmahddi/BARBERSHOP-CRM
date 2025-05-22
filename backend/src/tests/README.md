# Backend Tests

This directory contains tests for the barbershop booking backend API.

## Test Structure

- `setup.ts`: Test setup and configuration
- `api/`: Tests for API endpoints
  - `barbers/`: Tests for barber endpoints
  - `bookings/`: Tests for booking endpoints
  - `services/`: Tests for service endpoints
  - `images/`: Tests for image upload endpoints
  - `products/`: Tests for product endpoints
  - `orders/`: Tests for order endpoints
- `middleware/`: Tests for middleware functions
- `utils/`: Tests for utility functions

## Running Tests

To run the tests, use the following commands:

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Test Environment

Tests use a separate environment configuration defined in `.env.test`. The test environment:

- Uses mocked Supabase client
- Runs on a different port (3002)
- Uses minimal logging

## Writing Tests

### Unit Tests

Unit tests should test individual functions and components in isolation. Mock any dependencies.

Example:

```typescript
import { describe, it, expect, vi } from "vitest";
import { someFunction } from "./path-to-function";

describe("someFunction", () => {
  it("should do something", () => {
    const result = someFunction();
    expect(result).toBe(expectedValue);
  });
});
```

### Integration Tests

Integration tests should test the interaction between components. For API endpoints, use Supertest.

Example:

```typescript
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../core/app";

describe("GET /api/endpoint", () => {
  it("should return data", async () => {
    const response = await request(app).get("/api/endpoint");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});
```

### Mocking

Use Vitest's mocking capabilities to mock dependencies:

```typescript
import { vi } from "vitest";

// Mock a module
vi.mock("module-name", () => ({
  functionName: vi.fn().mockReturnValue("mocked value"),
}));

// Mock a function
const mockFn = vi.fn().mockReturnValue("mocked value");
```
