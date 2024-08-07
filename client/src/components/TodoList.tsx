import { Fragment, useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { Todo } from "../types/todo";
import EditTodo from "./EditTodo";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const deleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTodos = async () => {
    try {
      const response = await fetch(`http://localhost:5000/todos`, {
        method: "GET",
      });
      const resJson = await response.json();
      setTodos(resJson);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <Fragment>
      <div className="container">
        <h2 className="text-center">To-Do List</h2>
        <TodoForm />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id}>
                <th scope="row">{index + 1}</th>
                <td>{todo.description}</td>
                <td className="d-flex">
                  <EditTodo todo={todo} />
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default TodoList;
