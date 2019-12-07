
const mainRoutes = require("./routes/main");


module.exports = function(app) {
  app.use("/api", mainRoutes);
};
