import * as React from 'react';
import './App.css';
import Information from "./Information";
import axios from "axios";
import { ITodo } from "./todo";
import { useEffect } from "react";

const App: React.FunctionComponent = () => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [text, setText] = React.useState("");
  const deleteTodo = async (id: string) => {
    const response  = await axios.delete(`https://todo-backend-modern-js.herokuapp.com/todos/${id}`);
    if (response.status === 200) {
      setTodos(todos.filter(v => v.id !== id))
    }
  };
  const addTodo = async (title: string) => {
    const response  = await axios.post("https://todo-backend-modern-js.herokuapp.com/todos", { title });
    if (response.status === 200) {
      setTodos(prevState => [...prevState, response.data]);
      setText("");
    }
  };
  const fetchTodos = async () => {
    const response = await axios.get("https://todo-backend-modern-js.herokuapp.com/todos");
    if (response.status === 200) {
      setTodos(response.data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); // 만약 빈 배열을 넣어주지 않는다면, 텍스트를 입력할 때마다 API를 호출하게 된다.
  return (
    <div className="App">
      <h1>React Hooks Todo app</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.keyCode === 13) {
              addTodo(text)
            }
          }}
        />
      </div>
      <ul>
        {todos.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button type="button" onClick={() => deleteTodo(id)}>X</button>
          </li>
        ))}
      </ul>
      <Information isTyping={text}/>
    </div>
  );
};

export default App;
