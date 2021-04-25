const mongoose = require("mongoose");

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log("Illegal number of arguments");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb://fullstack:${password}@cluster0-shard-00-00.wzmyz.mongodb.net:27017,cluster0-shard-00-01.wzmyz.mongodb.net:27017,cluster0-shard-00-02.wzmyz.mongodb.net:27017/note-app?ssl=true&replicaSet=atlas-ie509p-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log("person saved");
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => console.log(person));
    mongoose.connection.close();
  });
}
