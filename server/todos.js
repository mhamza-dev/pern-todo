const pool = require("./db");

const getAllTodos = async (_req, res) => {
  try {
    const results = await pool.query("SELECT * FROM todos");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query("SELECT * FROM todos WHERE id = $id", [
      id,
    ]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const createTodo = async (req, res) => {
  const { description } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO todos(description) VALUES($1) RETURNING *",
      [description]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const results = await pool.query(
      "UPDATE todos SET description = $1 WHERE id = $2 RETURNING *",
      [description, id]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
};
