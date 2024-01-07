import { useState } from 'react';
import './App.css'
import TodoList from './TodoList'
import { v4 as uuid } from 'uuid'

function App() {

  const [todos, setTodos] = useState([
    { id: "1", name: "test" }
  ]);

  //mock api call
  const createTodos = async (item: string) => {
    await new Promise((res) => setTimeout(res, 1000));
    return {
      id: uuid(),
      name: item+"[value from server]",
    };
  }
  //handle call api and update state
  const handleCreateTodo = async (item: string) => {
    const result = await createTodos(item);
    setTodos((i) => [...i, result]);
  }

  return (
    <>
      <h1>useOptimistic</h1>
      <div className="card">
        <TodoList
          items={todos}
          createItem={handleCreateTodo} />
      </div>
    </>
  )
}

export default App
