const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    "mongodb+srv://merazmi-01:Tg035b035.@playgrounddb-efcji.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.log(err));

//Schema Setup
const todoSchema = new mongoose.Schema({
  todoTask: String,
});
const Todos = mongoose.model("Todos", todoSchema);

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// const todoList = [
//   { todoTask: "Master the node JS", duedate: "14 April 2020", id: 1 },
//   { todoTask: "Build an app for portfolio", duedate: "10 April 2020", id: 2 },
//   { todoTask: "Buy grocery", duedate: "7 April 2020", id: 3 },
// ];

app.get("/", (req, res) => {
  Todos.find({}, (err, allTodos) => {
    if (err) {
      console.log(err);
    } else {
      res.render("todo-list", { allTodos });
    }
  });
});
app.post("/", (req, res) => {
  let todoTask = req.body.todoTask;
  const newTodo = { todoTask };
  Todos.create(newTodo, (err, newCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});
app.get("/add-todo", (req, res) => {
  res.render("todo-add");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
