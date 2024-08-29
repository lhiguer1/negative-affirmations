var express = require("express");
var logger = require("morgan");
var swaggerUi = require("swagger-ui-express");
var YAML = require("yaml");
var fs = require("fs");
var path = require("path");

// List of negative affirmations
const affirmations = require("./affirmations.json");

var app = express();

app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger UI
const file = fs.readFileSync(path.join(__dirname, "openapi.yml"), "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route to get paginated negative affirmations
app.get("/api/affirmations", (req, res) => {
  // Parse query parameters
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 5;

  // Ensure 'page' and 'limit' are positive integers
  if (page < 1) page = 1;
  if (limit < 1) limit = 1;

  // Calculate start and end indices for pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Slice the array to get the required number of affirmations for the current page
  const responseAffirmations = affirmations.slice(startIndex, endIndex);

  // Calculate total pages
  const totalAffirmations = affirmations.length;
  const totalPages = Math.ceil(totalAffirmations / limit);

  // Send the response with pagination metadata
  res.status(200).json({
    totalAffirmations,
    totalPages,
    currentPage: page,
    limit,
    affirmations: responseAffirmations,
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
