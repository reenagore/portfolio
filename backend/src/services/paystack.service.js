const axios = require("axios");
const crypto = require("crypto");
const env = require("../config/env");

const paystackClient = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${env.paystackSecretKey}`,
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

const initializeTransaction = async (payload) => {
  const { data } = await paystackClient.post("/transaction/initialize", payload);
  return data;
};

const verifyTransaction = async (reference) => {
  const { data } = await paystackClient.get(`/transaction/verify/${reference}`);
  return data;
};

const verifyWebhookSignature = (rawBody, signature) => {
  if (!env.paystackWebhookSecret || !signature || !rawBody) {
    return false;
  }

  const hash = crypto
    .createHmac("sha512", env.paystackWebhookSecret)
    .update(rawBody)
    .digest("hex");

  return hash === signature;
};

module.exports = {
  initializeTransaction,
  verifyTransaction,
  verifyWebhookSignature,
};