const express = require("express");
const cors = require("cors");
const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./todos");
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.get("/", (_request, respnse) => {
  respnse.status(200).json("Home Page");
});

app.get("/todos", getAllTodos);
app.post("/todos", createTodo);
app.delete("/todos", deleteTodo);
app.get("/todos/:id", getTodo);
app.put("/todos/:id", updateTodo);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
