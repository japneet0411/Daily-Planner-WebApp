const express = require("express");

const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: true }));
const routes = require("./routes/routes");

const cors = require("cors");

const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/todoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/", routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});
