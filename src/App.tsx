import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import './App.css';
import axios from "axios";
import { ITodo } from "./@types/todo";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import TodoInformation from "./components/TodoInformation";
import { Timer, TimerProvider } from "./context";

function doneTodoItemCount (todos: ITodo[]): number {
  console.log("doneTodoItemCount 함수가 호출되었습니다.");
  return todos.filter(v => !!v.completed).length;
}

interface IDeleteTodoAction {
  type: "DELETE_TODO";
  id: string;
}
interface IAddTodoAction {
  type: "ADD_TODO";
  todo: ITodo;
}
interface IFetchTodoAction {
  type: "FETCH_TODOS";
  todos: ITodo[];
}
interface IUpdateTodoAction {
  type: "UPDATE_TODO";
  todo: ITodo;
}

type IActionTypes = IDeleteTodoAction | IAddTodoAction | IFetchTodoAction | IUpdateTodoAction;

function reducer (state: ITodo[], action: IActionTypes): ITodo[] {
  switch (action.type) {
    case "DELETE_TODO":
      return state.filter(v => v.id !== action.id);
    case "ADD_TODO":
      return [...state, action.todo];
    case "FETCH_TODOS":
      return action.todos;
    case "UPDATE_TODO":
      return state.map(todo => todo.id === action.todo.id ? action.todo : todo);
    default:
      return state;
  }
}

const App: React.FunctionComponent = () => {
  const [isEditing, setEditing] = React.useState(false);
  const [state, dispatch] = useReducer(reducer, []);

  const deleteTodo = useCallback(async (id: string) => {
    const response  = await axios.delete(`https://todo-backend-modern-js.herokuapp.com/todos/${id}`);
    if (response.status === 200) {
      dispatch({ type: "DELETE_TODO", id });
    }
  }, []);
  const addTodo = useCallback(async (title: string, cb: () => void) => {
    const response  = await axios.post("https://todo-backend-modern-js.herokuapp.com/todos", { title });
    if (response.status === 200) {
      dispatch({ type: "ADD_TODO",  todo: response.data });
      cb();
    }
  }, []);

  const fetchTodos = useCallback(async () => {
    const response = await axios.get("https://todo-backend-modern-js.herokuapp.com/todos");
    if (response.status === 200) {
      dispatch({ type: "FETCH_TODOS", todos: response.data });
    }
  }, []);
  const updateTodo = useCallback(async (id: string, title: string) => {
    const response = await axios.patch(`https://todo-backend-modern-js.herokuapp.com/todos/${id}`, { title });
    if (response.status === 200) {
      dispatch({ type: "UPDATE_TODO", todo: response.data });
      setEditing(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);
  // @ref: https://overreacted.io/ko/a-complete-guide-to-useeffect/#%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EA%B2%8C-%EC%9D%B4%ED%8E%99%ED%8A%B8%EB%A5%BC-%EB%B9%84%EA%B5%90%ED%95%98%EB%8A%94-%EB%B2%95%EC%9D%84-%EA%B0%80%EB%A5%B4%EC%B9%98%EA%B8%B0
  // 만약 빈 배열을 넣어주지 않는다면, 텍스트를 입력할 때마다 API를 호출하게 된다.
  const completedTodoCount = useMemo(() => doneTodoItemCount(state), [state]);
  // const completedTodoCount = doneTodoItemCount(todos);
  return (
    <TimerProvider>
      <div className="App">
        <Header addTodo={addTodo}/>
        <TodoList
          todos={state}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          setEditing={setEditing}
        />
        <Timer />
        <TodoInformation completedTodoCount={completedTodoCount}/>
      </div>
    </TimerProvider>
  );
};

export default App;
