import express from "express";
import { testEnvironmentVariable } from "../settings";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) =>
  res.status(200).json({ message: testEnvironmentVariable })
);

const stripe = require("stripe")(
  "sk_test_51IHPrGGrVUCQrQF7O08ccWSjjVbHOrhA5LCXcBeYy2d3jtq1I5yNIK28ePZQKHP2rXNjBKEa07GQMALUI6HdWMpy00ThIaEsO7"
);

indexRouter.post("/payment", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: req.body.currency,
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default indexRouter;
