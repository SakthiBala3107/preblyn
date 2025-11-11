import { config } from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "development"}.local`;

config({ path: envFile });

// aizen aizen@gmail.com aizen
//  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTEyYWI4MmFiMTQwZDE2M2IzODIwM2IiLCJpYXQiOjE3NjI4MzEyMzQsImV4cCI6MTc2MzQzNjAzNH0.lfuVQHzXFlg-tP3ccbBCZyw-DPS_xvLmMgx-hlFpkjQ"

export const {
  PORT,
  SERVER_URL,
  EMAIL_PASSWORD,
  NODE_ENV,
  DB_URI,
  ARCJET_KEY,
  ARCJET_ENV,
  QSTASH_URL,
  QSTASH_TOKEN,
  QSTASH_CURRENT_SIGNING_KEY,
  QSTASH_NEXT_SIGNING_KEY,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;
