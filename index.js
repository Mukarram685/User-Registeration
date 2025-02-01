// import express from "express";
// import  connectDB from "./DB/Connection.js";


// const app = express();

// app.get("/api", (req, res) => {
//     res.send("Hello World!");
// });


// connectDB();

// app.listen(3000, () => {
//     console.log("App listening on port 3000!");
// })


// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const authRoutes = require("./routes/auth");

import express from "express";
import  connectDB from "./DB/Connection.js";
import bodyParser from "body-parser";
import authRoutes from "./Routes/Auth.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
 connectDB();


// Routes
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


