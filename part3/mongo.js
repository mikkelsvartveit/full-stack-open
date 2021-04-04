const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
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

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

/* const note = new Note({
  content: "HTML is Easy",
  date: new Date(),
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
}); */

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
