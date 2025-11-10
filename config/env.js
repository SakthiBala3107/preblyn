import { config } from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "development"}.local`;

config({ path: envFile });

// QSTASH_URL="https://qstash.upstash.io"
// QSTASH_TOKEN="eyJVc2VySUQiOiJiMDRkOGVhZS1kZGY2LTQxMGItYTc3ZS04ZDkwMzkxYzc0OTkiLCJQYXNzd29yZCI6IjI2NTA1YjZhYjYyNjQyNzM4NTc5MDgwODEyOWFhNTdkIn0="
// QSTASH_CURRENT_SIGNING_KEY="sig_7acuSgmaqyKYGU4iDeCckR5SQDdz"
// QSTASH_NEXT_SIGNING_KEY="sig_5KPdb6LuNUveGYDPQUtd3PaJHp3g"

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  ARCJET_KEY,
  ARCJET_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;
