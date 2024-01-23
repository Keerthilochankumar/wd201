const express = require("express");
var csrf = require("tiny-csrf");
var cookieParser = require("cookie-parser");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("shh! some secret string"));
app.use(csrf("this_should_be_32_character_long", ["POST", "PUT", "DELETE"]));
app.use(express.static(path.join(__dirname, "public")));

async function addInitialValues() {
  try {
    const val =await Todo.findOne({title:"Task 1"})
    if(!val){
    await Todo.bulkCreate([
      { title: "Task 1", dueDate: "2024-01-23" , completed:false },
      { title: "Task 2", dueDate: "2024-01-24" ,completed:false},
      { title: "Task 3", dueDate: "2024-01-25" ,completed:false},
      { title: "Task 4", dueDate: "2024-01-22" ,completed:true},
    ]);
    console.log("Initial values added successfully.");
  }}
 catch (error) {
    console.error("Error adding initial values:", error);
  }
}
addInitialValues();

app.set("view engine", "ejs");
app.get("/", async (request, response) => {
  try {
    const overduetodos = await Todo.overdue();
    const duetodaytodos = await Todo.dueToday();
    const duelatertodos = await Todo.dueLater();
    const completedtodos = await Todo.completedTodos();

    if (request.accepts("html")) {
      response.render("index", {
        title: "To-Do Manager",
        overduetodos,
        duetodaytodos,
        duelatertodos,
        completedtodos,
        csrfToken: request.csrfToken(),
      });
    } else {
      response.json({
        overduetodos,
        duetodaytodos,
        duelatertodos,
        completedtodos,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);

  }
});

app.get("/", async function(request, response) {
   return response.redirect("/");
});

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");

  try {
    const todos = await Todo.findAll({
      order: [["id", "ASC"]],
    });
    return response.json(todos);
  } catch (error) {
    console.log(error);
    return response.status(500).send(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const todo = await Todo.findByPk(request.params.id);
    const updatedTodo = await todo.setCompletionStatus(request.body.completed);
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE

  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
  try {
    const result = await Todo.remove(request.params.id)
console.log(result, "asdfasdfsdf")
    return response.json({ "result":'hello world' });
  } catch (error) {
    return response.status(422).json(error);
  }
});

module.exports = app;