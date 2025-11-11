import aj from "../config/arcjet.js";

const arcjetMiddleWare = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
      // provide IP manually if missing
      ip: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
    });

    // guards
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({ error: "Rate limit exceeded" });
      if (decision.reason.isBot())
        return res.status(403).json({ error: "Bot detected" });

      return res.status(403).json({ error: "Access denied" });
    }

    next();
  } catch (error) {
    console.log("ARCJET ERROR:", error);
    next(error);
  }
};

export default arcjetMiddleWare;
