const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = [
  "NODE_ENV",
  "PORT",
  "CLIENT_URL",
  "MONGODB_URI",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "ADMIN_EMAIL",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "ADMIN_COOKIE_NAME",
  "PAYSTACK_SECRET_KEY",
  "PAYSTACK_PUBLIC_KEY",
  "PAYSTACK_CALLBACK_URL",
  "PAYSTACK_CURRENCY",
];

const missingEnvVars = requiredEnvVars.filter(
  (key) => !process.env[key] || process.env[key].trim() === ""
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

const env = {
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL,
  mongoUri: process.env.MONGODB_URI,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFromEmail: process.env.RESEND_FROM_EMAIL,
  adminEmail: process.env.ADMIN_EMAIL,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  adminCookieName: process.env.ADMIN_COOKIE_NAME,
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
  paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY,
  paystackCallbackUrl: process.env.PAYSTACK_CALLBACK_URL,
  paystackCurrency: process.env.PAYSTACK_CURRENCY || "KES",
  isProduction: process.env.NODE_ENV === "production",
};

module.exports = env;