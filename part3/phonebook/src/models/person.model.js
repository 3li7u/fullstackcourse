const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({ name: String, number: String });

personSchema.set("toJSON", {
  transform: (_, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
