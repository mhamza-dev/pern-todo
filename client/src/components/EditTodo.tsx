import { Fragment, useState } from "react";
import { Todo } from "../types/todo";
interface Props{
    todo: Todo
}
function EditTodo({ todo }: Props) {
  const [description, setDescription] = useState<string>(todo.description);
  const updateTodo = async () => {
    try {
      await fetch(`http://localhost:5000/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
    } catch (error) {
      console.log(error);
    }
    window.location.href = "/";
  }
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning btn-sm"
        data-bs-toggle="modal"
        data-bs-target={`#Modal-${todo.id}`}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`Modal-${todo.id}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setDescription(todo.description)}
              >
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => updateTodo()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditTodo;
