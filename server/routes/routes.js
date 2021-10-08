const express = require("express");
const router = express.Router();
const List = require("./../modal/item");
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
