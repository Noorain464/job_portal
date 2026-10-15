import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import client from "prom-client";
import mongoose from "mongoose";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: [
        process.env.FRONTEND_URL || 'https://job-portal-mu-blush.vercel.app',
        'http://localhost:5173'
    ],
    credentials: true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

client.collectDefaultMetrics();
const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2.5],
});
app.use((req, res, next) => {
  const end = httpDuration.startTimer();
  res.on("finish", () => {
    const route = req.route ? `${req.baseUrl}${req.route.path}` : "unmatched";
    end({ method: req.method, route, status: res.statusCode });
  });
  next();
});
// api's
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);



app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
app.get("/healthz", (_req, res) => res.status(200).send("ok")); // liveness: process is up
app.get("/readyz", (_req, res) =>                               // readiness: DB reachable
  mongoose.connection.readyState === 1
    ? res.status(200).send("ready")
    : res.status(503).send("db not connected"));
app.get("/version", (_req, res) =>
  res.json({ version: process.env.APP_VERSION || "dev" }));
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});