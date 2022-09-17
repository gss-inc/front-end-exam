import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { deleteTodo, fetcher, postTodo, updateTodo } from './axiosHelpers';

/**
 * Schema type for todos
 *
 * {
 * task: string;
 * check: boolean;
 * }
 *
 */
export default function App() {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [newTodo, setNewTodo] = useState({
    task: '',
    done: false,
  });
  const [openInput, setOpenInput] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);

  const refetcher = useCallback(async () => {
    axios(
      'https://gss-lab-test-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json'
    ).then((res) => {
      if (!res.data) return;

      const todos = [];

      Object.entries(res.data).forEach((resTodos) => {
        const newObj = { ...resTodos[1], id: resTodos[0] };

        todos.push(newObj);
      });

      setTodos(todos);
      setLoader(false);
    });
  }, []);

  const deleteHandler = async (id) => {};

  const editHandler = (id) => {};

  const checkHandler = async (id, value) => {};

  const updateHandler = async (id, value, e) => {};

  const submitHandler = async (e) => {};

  // Getter Fetcher
  useEffect(() => {
    setLoader(true);
    fetcher(
      'https://gss-lab-test-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json'
    ).then((res) => {
      if (!res.data) return;

      const todos = [];

      Object.entries(res.data).forEach((resTodos) => {
        const newObj = { ...resTodos[1], id: resTodos[0] };

        todos.push(newObj);
      });

      setLoader(false);
    });
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        maxWidth: '100%',
        height: '100%',
      }}
    >
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '400px',
          width: '100%',
        }}
      >
        <h1 style={{ marginBottom: 30 }}>Todos</h1>
        <ul style={{ width: 500, height: 500, overflowY: 'auto' }}>
          {loader ? (
            <p style={{ textAlign: 'center' }}>Loading...</p>
          ) : (
            todos.map((todo) => (
              <li
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  listStyle: 'none',
                  marginBottom: 20,
                }}
                key={todo.id}
              >
                <span
                  style={{
                    textDecoration: todo.check ? 'line-through' : 'none',
                  }}
                >
                  {todo.task}
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <button
                    onClick={() => {
                      const upTodo = { ...todo, check: !todo.check };

                      return checkHandler(todo.id, upTodo);
                    }}
                    type="button"
                    id="check"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      editHandler(todo.id);
                      setNewTodo((prev) => ({ ...prev, task: '' }));
                      setOpenInput((prevState) => !prevState);
                    }}
                    type="button"
                    id="edit"
                    disabled={openInput}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteHandler(todo.id)} type="button">
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <form
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 30,
          }}
        >
          <label htmlFor={openInput ? 'edit-todo' : 'new-todo'}>
            {openInput ? 'Editing Todo' : 'New Todo'}
          </label>
          <input
            type="text"
            id={openInput ? 'edit-todo' : 'new-todo'}
            value={newTodo.task}
            placeholder={openInput ? todoToEdit.task : ''}
            onChange={(e) => {
              const handler = openInput
                ? setNewTodo({ ...todoToEdit, task: e.target.value })
                : setNewTodo((prevState) => ({
                    ...prevState,
                    task: e.target.value,
                  }));
              return handler;
            }}
          />
          {openInput && (
            <button
              onClick={() => {
                setNewTodo((prev) => ({ ...prev, task: '' }));
                setOpenInput(false);
              }}
              type="submit"
            >
              Cancel
            </button>
          )}
          <button
            onClick={(e) => {
              openInput
                ? updateHandler(todoToEdit.id, newTodo, e)
                : submitHandler(e);
            }}
            type="submit"
            disabled={!newTodo.task}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
