const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("dotenv").config({ path: ".variables.env" });
const {
  authRouter,
  eventsRouter,
  locationsRouter,
  productsRouter,
  donationsRouter,
  servicesRouter,
  trialsRouter,
  documentsRouter,
} = require("./routes/api");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);
app.use("/api/trials", trialsRouter);
app.use("/api/documents", documentsRouter);
app.use("/api/products", productsRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/donations", donationsRouter);
app.use("/api/services", servicesRouter);

// Serve Static Files from React App
app.use(express.static(path.join(__dirname, 'public')));

// SPA Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



module.exports = app;
