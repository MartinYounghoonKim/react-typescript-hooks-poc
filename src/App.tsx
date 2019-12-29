import * as React from 'react';
import './App.css';
import Information from "./Information";
import axios from "axios";
import { ITodo } from "./todo";

const App: React.FunctionComponent = () => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    axios.get("https://todo-backend-modern-js.herokuapp.com/todos")
      .then(res => {
        setTodos(res.data);
      });
  }, []); // 만약 빈 배열을 넣어주지 않는다면, 텍스트를 입력할 때마다 API를 호출하게 된다.
  return (
    <div className="App">
      <h1>React Hooks Todo app</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        />
      </div>
      <ul>
        {todos.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button type="button" onClick={() => setTodos(todos.filter(v => v.id !== id))}>X</button>
          </li>
        ))}
      </ul>
      <Information isTyping={text}/>
    </div>
  );
};

export default App;
