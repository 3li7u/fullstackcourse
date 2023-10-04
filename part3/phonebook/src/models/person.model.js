const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "{PATH} must be at least 3, but got {VALUE}"],
  },
  number: {
    type: String,
    required: true,
    minLength: [8, "{PATH} must be at least 8, but got {VALUE}"],
  },
});

personSchema.set("toJSON", {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
