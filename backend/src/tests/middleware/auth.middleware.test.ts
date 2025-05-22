import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { supabase } from "../../core/supabase.client";

// Mock the request, response and next function
const mockRequest = () => {
  return {
    headers: {
      authorization: "Bearer test-token",
    },
  } as Request;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const mockNext = vi.fn();

describe("Auth Middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call next() when token is valid", async () => {
    // Mock the Supabase auth response for a valid token
    (supabase.auth.getUser as any).mockResolvedValueOnce({
      data: {
        user: { id: "test-user-id", email: "test@example.com" },
      },
      error: null,
    });

    const req = mockRequest();
    const res = mockResponse();

    await authMiddleware(req, res, mockNext);

    // Check that the user was added to the request
    expect(req.user).toEqual({ id: "test-user-id", email: "test@example.com" });
    // Check that next was called
    expect(mockNext).toHaveBeenCalled();
    // Check that status and json were not called
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 401 when no token is provided", async () => {
    const req = { headers: {} } as Request;
    const res = mockResponse();

    await authMiddleware(req, res, mockNext);

    // Check that status and json were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unauthorized: Missing or invalid token",
    });
    // Check that next was not called
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 401 when token is invalid", async () => {
    // Mock the Supabase auth response for an invalid token
    (supabase.auth.getUser as any).mockResolvedValueOnce({
      data: { user: null },
      error: { message: "Invalid token" },
    });

    const req = mockRequest();
    const res = mockResponse();

    await authMiddleware(req, res, mockNext);

    // Check that status and json were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unauthorized: Invalid token",
    });
    // Check that next was not called
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 500 when authentication throws an error", async () => {
    // Mock the Supabase auth to throw an error
    (supabase.auth.getUser as any).mockRejectedValueOnce(
      new Error("Internal error")
    );

    const req = mockRequest();
    const res = mockResponse();

    // Mock console.error to prevent test output noise
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await authMiddleware(req, res, mockNext);

    // Check that status and json were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal server error during authentication",
    });
    // Check that next was not called
    expect(mockNext).not.toHaveBeenCalled();

    // Restore console.error
    consoleSpy.mockRestore();
  });
});
