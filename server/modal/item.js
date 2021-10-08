const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoList = new Schema({
  name: {
    type: String,
    required: [true, "This field is required"],
  },
  created_at: {
    type: Date,
    required: [true, "this field is required"],
  },
  completed_at: {
    type: Date,
  },
  status: {
    type: Boolean,
  },
});

const List = mongoose.model("List", TodoList);

module.exports = List;
