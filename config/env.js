import { config } from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "development"}.local`;

config({ path: envFile });

// QSTASH_URL="https://qstash.upstash.io"
// QSTASH_TOKEN="eyJVc2VySUQiOiJiMDRkOGVhZS1kZGY2LTQxMGItYTc3ZS04ZDkwMzkxYzc0OTkiLCJQYXNzd29yZCI6IjI2NTA1YjZhYjYyNjQyNzM4NTc5MDgwODEyOWFhNTdkIn0="
// QSTASH_CURRENT_SIGNING_KEY="sig_7acuSgmaqyKYGU4iDeCckR5SQDdz"
// QSTASH_NEXT_SIGNING_KEY="sig_5KPdb6LuNUveGYDPQUtd3PaJHp3g"

// aizen aizen@gmail.com aizen
//  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTEyYWI4MmFiMTQwZDE2M2IzODIwM2IiLCJpYXQiOjE3NjI4MzEyMzQsImV4cCI6MTc2MzQzNjAzNH0.lfuVQHzXFlg-tP3ccbBCZyw-DPS_xvLmMgx-hlFpkjQ"

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  ARCJET_KEY,
  ARCJET_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;
