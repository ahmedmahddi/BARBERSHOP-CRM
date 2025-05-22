import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || "2097152", 10), // 2MB in bytes
  ALLOWED_FILE_TYPES: (
    process.env.ALLOWED_FILE_TYPES || "image/jpeg,image/png"
  ).split(","),
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

export default ENV;
