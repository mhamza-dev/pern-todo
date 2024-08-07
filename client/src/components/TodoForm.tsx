import { Fragment, useRef } from 'react'

function TodoForm() {
  const todoInput = useRef<HTMLInputElement>(null);
  const createTodo = async (e: any) => {
    e.preventDefault();
      const body = { description: todoInput.current?.value };
      await fetch('http://localhost:5000/todos', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)})

      window.location.href = '/'
  }

  return (
    <Fragment>
      <form onSubmit={(e) => createTodo(e)}>
        <div className="d-flex">
          <input
            ref={todoInput}
            type="text"
            className="form-control"
            placeholder="Add a new todo"
          />
          <button type="submit" className="btn btn-primary ms-2">
            Add
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default TodoForm