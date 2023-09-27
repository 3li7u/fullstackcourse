const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const inputLength = process.argv.length;
const number = process.argv[4];
const URI = `mongodb+srv://3li7u:${password}@cluster0.b8cbl.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(URI);
const personSchema = new mongoose.Schema({ name: String, number: String });
const Person = mongoose.model("Person", personSchema);

if (inputLength === 3) {
  Person.find().then((res) => {
    console.log(res);
    mongoose.connection.close();
  });
} else if (inputLength === 5) {
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then((res) => {
    console.log("New Person has been added successfully");
    console.log(res);
    mongoose.connection.close();
  });
} else {
  console.log("Missing argument, Enter Password and/or Name & Phone Number");
  process.exit(1);
}
