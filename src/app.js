import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import cartRoute from "./route/cartRoute.js";
import orderRoute from "./route/orderRoute.js";
import productRoute from "./route/productRoute.js";
import userRoute from "./route/userRoute.js";

// import userAuthMiddleware from "./middleware/userAuthMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

mongoose.connect(process.env.DATABASE_URI);
mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB");
});

const app = express();
const PORT = process.env.PORT || 8080;

// Helmet
app.use(helmet());

// CORS
app.use(cors());

// Rate Limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});
// app.use(limiter);

// Logger
app.use(morgan("dev"));

// JSON Body Parser
app.use(express.json());

// URL Encoded Body Parser
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//ใส่ userAuthMiddleWare ไปด้วย ใส่แค่ตรงนี้ก็
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
