const express = require("express");
const rootRouter = require("./routes/index");
const app = express();

app.get("/", (req, res) => {
  res.send("Hi there from index.js");
});

app.use("/api/v1", rootRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found/Invalid route",
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
