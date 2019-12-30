import * as React from 'react';
import { ITodo } from "../todo";

interface IProps {
  todos: ITodo[];

  deleteTodo(id: string): void;
}
const TodoList: React.FunctionComponent<IProps> = (
  {
    todos,
    deleteTodo
  }
) => (
  <ul>
    {todos.map(({ id, title }) => (
      <li key={id}>
        {title}
        <button type="button" onClick={() => deleteTodo(id)}>X</button>
      </li>
    ))}
  </ul>
);

export default TodoList;