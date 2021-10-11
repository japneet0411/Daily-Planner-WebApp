const express = require("express");
const router = express.Router();
const List = require("./../modal/item");
var passport = require("passport");
const User = require("./../modal/user");
const bcrypt = require("bcryptjs");
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        // console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).send("User Created");
    }
  });
});

router.get("/user", (req, res) => {
  res.send(req.user);
});
router.delete("/:id", async (req, res) => {
  await List.findOneAndDelete({ _id: req.params.id })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
router.get("/", async function (req, res) {
  await List.find({})
    .then((data) => res.send({ data: data }))
    .catch((err) => console.log(err));
});
router.get("/:id", async function (req, res) {
  await List.findOne({ _id: req.params.id })
    .then((data) => res.send({ data: data }))
    .catch((err) => console.log(err));
});
router.post("/", async function (req, res) {
  if (req.body) {
    console.log(req.body);
    const item = new List({
      name: req.body.name,
      created_at: req.body.create,
      completed_at: req.body.complete,
      status: req.body.status,
    });
    await item
      .save()
      .then(() => {
        console.log("Added");
      })
      .catch((err) => console.log(err));
  } else {
    res.json({
      error: "Input field is empty, please enter something",
    });
  }
});
router.put("/", async function (req, res) {
  await List.updateOne(
    { _id: req.body.id },
    { $set: { status: req.body.status } }
  )
    .then((response) => res.send({ response: response }))
    .catch((err) => console.log(err));
});
module.exports = router;
