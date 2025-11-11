import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// GET all subscriptions
subscriptionRouter.get("/", (req, res) => {
  res.send({
    method: "GET",
    title: "Fetch all subscription details of the user",
  });
});

// GET one subscription by ID
subscriptionRouter.get("/:id", (req, res) => {
  res.send({
    method: "GET",
    title: `Fetch subscription details for ID ${req.params.id}`,
  });
});

// POST (create new subscription)
subscriptionRouter.post("/", authorize, createSubscription);
// subscriptionRouter.post("/", (req, res) => {
//   console.log(req.headers.authorization);
//   res.json({ ok: true });
// });

// PUT (update existing subscription)
subscriptionRouter.put("/:id", (req, res) => {
  res.send({
    method: "PUT",
    title: `Update subscription with ID ${req.params.id}`,
  });
});

// DELETE (remove subscription)
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({
    method: "DELETE",
    title: `Delete subscription with ID ${req.params.id}`,
  });
});

// GET (subscriptions for a specific user)
subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({
    method: "GET",
    title: `Fetch subscriptions for user ID ${req.params.id}`,
  });
});

// PUT (cancel subscription)
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({
    method: "PUT",
    title: `Cancel subscription with ID ${req.params.id}`,
  });
});

// GET (upcoming renewals)
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ method: "GET", title: "Fetch all upcoming renewals" });
});

export default subscriptionRouter;
