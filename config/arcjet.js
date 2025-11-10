import arcjet from "arcjet";
import { ARCJET_KEY } from "./env.js";
import { shield, detectBot, tokenBucket } from "@arcjet/node";

const aj = arcjet({
  key: ARCJET_KEY || process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
