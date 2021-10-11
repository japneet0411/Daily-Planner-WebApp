const express = require("express");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));
const routes = require("./routes/routes");

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./middleware/passport.config")(passport);

//connecting to react app
app.use(
  cors({
    origin: "http://localhost:3000", //origin
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/todoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/", routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});
