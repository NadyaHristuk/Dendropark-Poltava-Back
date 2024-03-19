const authRouter = require("./auth");
const documentsRouter = require("./documents");
const eventsRouter = require("./events");
const locationsRouter = require("./locations");
const productsRouter = require("./products");
const donationsRouter = require("./donations");
const servicesRouter = require("./services");
const trialsRouter = require("./trials");

module.exports = {
  authRouter,
  eventsRouter,
  locationsRouter,
  productsRouter,
  donationsRouter,
  servicesRouter,
  trialsRouter,
  documentsRouter,
};
