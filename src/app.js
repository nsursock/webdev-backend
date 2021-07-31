require("dotenv").config();
// const { stripeKey, frontendUrl } = require("./settings");
const stripe = require("stripe")(process.env.EXPRESS_STRIPE_KEY);
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("."), function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.EXPRESS_FRONTEND_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const YOUR_DOMAIN = process.env.EXPRESS_FRONTEND_URL;

app.post("/payment", bodyParser.json(), async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: req.body.currency,
          product_data: {
            name: "WebDev - Nicolas Sursock",
            images: ["https://source.unsplash.com/500x500/?abstract"],
          },
          unit_amount: req.body.amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/thanks`,
    cancel_url: `${YOUR_DOMAIN}`,
  });

  res.json({ id: session.id });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log("Running on port", PORT));
