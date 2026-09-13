import express from "express";

const app = express();

const greeting = (req, res, next) => {
  console.log("Hello, this is a greeting middleware!");
  return next();
};

app.get("/", greeting, greeting, greeting, (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
