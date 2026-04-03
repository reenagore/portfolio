const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const env = require("./config/env");
const healthRoutes = require("./routes/health.routes");
const adminRoutes = require("./routes/admin.routes");
const contactRoutes = require("./routes/contact.routes");
const articleRoutes = require("./routes/article.routes");
const podcastRoutes = require("./routes/podcast.routes");
const uploadRoutes = require("./routes/upload.routes");
const bookingRoutes = require("./routes/booking.routes");
const paymentRoutes = require("./routes/payment.routes");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");
const { globalLimiter } = require("./middleware/rateLimit.middleware");
const eventPageRoutes = require("./routes/event.routes");
const productPageRoutes = require("./routes/product.routes");
const galleryPageRoutes = require("./routes/gallery.routes");
const programRegistrationRoutes = require("./routes/programRegistration.routes");
const bookPreorderRoutes = require("./routes/preorder.routes");
const programmeOrderRoutes = require("./routes/programOrder.routes");

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

app.use((req, res, next) => {
  if (req.originalUrl === "/api/payments/webhook" && Buffer.isBuffer(req.body)) {
    req.rawBody = req.body.toString("utf8");
    try {
      req.body = JSON.parse(req.rawBody);
    } catch (error) {
      req.body = {};
    }
  }
  next();
});

app.use(globalLimiter);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

if (!env.isProduction) {
  app.use(morgan("dev"));
}

app.use("/api/health", healthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/events", eventPageRoutes);
app.use("/api/products", productPageRoutes);
app.use("/api/galleries", galleryPageRoutes);
app.use("/api/program-registrations", programRegistrationRoutes);
app.use("/api/book-preorders", bookPreorderRoutes);
app.use("/api/programme-orders", programmeOrderRoutes);


app.use(notFound);
app.use(errorHandler);

module.exports = app;