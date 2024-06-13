"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.stripe = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const googleapis_1 = require("googleapis");
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const stripe_1 = __importDefault(require("stripe"));
const db_1 = __importDefault(require("./config/db"));
const globalError_1 = __importDefault(require("./middlewares/globalError"));
const notFound_1 = require("./middlewares/notFound");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
exports.stripe = new stripe_1.default(process.env.STRIPE_KEY);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://creditup-nine.vercel.app/");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)({ origin: ["https://creditup-nine.vercel.app", "http://localhost:3000"] }));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Connect to Database
(0, db_1.default)();
// google api
exports.auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});
// Define API routes
app.use("/api/v1", routes_1.default);
app.get("/", (_, res) => {
    res.send("hello server");
});
const server = http_1.default.createServer(app);
const port = process.env.PORT || 5000;
app.use(globalError_1.default);
app.use(notFound_1.notFound);
// run the server
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
