import express from "express";
import { testEnvironmentVariable } from "../settings";

const stripe = require("stripe")(
  "sk_test_51IHPrGGrVUCQrQF7O08ccWSjjVbHOrhA5LCXcBeYy2d3jtq1I5yNIK28ePZQKHP2rXNjBKEa07GQMALUI6HdWMpy00ThIaEsO7"
);

const stripeRouter = express.Router();

stripeRouter.post("/payment", async (req, res) => {
  // const { items } = req.body;
  console.log("test message");
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: req.body.currency,
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default stripeRouter;
