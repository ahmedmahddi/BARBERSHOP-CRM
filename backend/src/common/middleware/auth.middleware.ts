import { Request, Response, NextFunction } from "express";
import { supabase } from "../../core/supabase.client";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/** Verifies Supabase JWT for authenticated routes */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  
  // For development purposes only - allow a specific dev token
  // IMPORTANT: This should be removed in production
  if (token === 'ADMIN_TOKEN_FOR_DEVELOPMENT') {
    console.log('Using development admin token');
    // Set a mock admin user
    req.user = {
      id: 'admin-dev',
      email: 'admin@example.com',
      role: 'admin'
    };
    next();
    return;
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
      return;
    }

    // Add user to request object for use in controllers
    req.user = data.user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res
      .status(500)
      .json({ error: "Internal server error during authentication" });
  }
}
