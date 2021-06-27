require("dotenv").config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const stripeKey = process.env.STRIPE_KEY;
export const frontendUrl = process.env.FRONTEND_URL;
