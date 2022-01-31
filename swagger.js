// Run an express server, and serve up swagger ui with the two open api specifications
const path = require("path");
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");

var options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: "swagger/openapi-companies.yaml",
        name: "MWNZ companies",
      },
      {
        url: "swagger/openapi-xml.yaml",
        name: "MWNZ companies source XML",
      },
    ],
  },
};

app.use("/swagger", express.static(path.join(__dirname, "swagger")));
app.use("/", swaggerUi.serve, swaggerUi.setup(null, options));

var port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log("Swagger running at http://localhost:" + port + "/");
});
