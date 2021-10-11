const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoList = new Schema({
  username: {
    type: String,
    required: [true, "This field is required"],
  },
  password: {
    type: String,
    required: [true, "this field is required"],
  },
});

const User = mongoose.model("User", TodoList);

module.exports = User;
