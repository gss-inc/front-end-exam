import axios from 'axios';

export const fetcher = async () =>
  await axios(
    'https://gss-lab-test-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json'
  );

export const postTodo = async (newTodo) =>
  await axios.post(
    'https://gss-lab-test-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json',
    newTodo
  );

export const updateTodo = async (id, value) =>
  await axios.put(
    `https://gss-lab-test-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`,
    value
  );

export const deleteTodo = async (id) =>
  await axios.delete(
    `https://gss-lab-test-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`
  );
