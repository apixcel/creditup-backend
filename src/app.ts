import cors from "cors";
import express from "express";
import { google } from "googleapis";
import http from "http";
import morgan from "morgan";
import Stripe from "stripe";
import connectDB from "./config/db";
import globalErrorHandler from "./middlewares/globalError";
import { notFound } from "./middlewares/notFound";
import routes from "./routes";
const app = express();

export const stripe = new Stripe(process.env.STRIPE_KEY as string);

app.use(express.static("public"));
// app.use(cors({ origin: ["https://creditup-nine.vercel.app", "http://localhost:3000"] }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();
app.use(cors());
// google api
export const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

// Define API routes
app.use("/api/v1", routes);
app.get("/", (_, res) => {
  res.send("hello server 2.0");
});
const server = http.createServer(app);

const port = process.env.PORT || 5000;

app.use(globalErrorHandler);
app.use(notFound);
// run the server
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
