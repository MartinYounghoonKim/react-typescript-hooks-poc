import * as React from 'react';
import { ITodo } from "../@types/todo";
import { useEffect, useState } from "react";

interface IProps {
  todos: ITodo[];

  setEditing(isEditing: boolean): void;
  deleteTodo(id: string): void;
  updateTodo(id: string, text: string): void;
}
const TodoList: React.FunctionComponent<IProps> = (
  {
    todos,
    setEditing,
    updateTodo,
    deleteTodo
  }
) => {
  const inputRef = React.useRef<any>(null);
  const [editingId, setEditingId] = useState("");
  const [editingTodo, setEditingTodo] = useState("");
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [editingId]);

  useEffect(() => {
    console.log("변경되었습니다.");
    setEditingId("");
    setEditingTodo("");
  }, [todos]);

  return (
    <ul>
      {todos.map(({ id, title }) => (
        <li
          key={id}
          onDoubleClick={() => {
            setEditing(true);
            setEditingTodo(title);
            setEditingId(id);
          }}
        >
          {editingId !== id ? title : (
            <input
              ref={(inputElement) => { inputRef.current = inputElement; }}
              value={editingTodo}
              onChange={(event) => {
                setEditingTodo(event.currentTarget.value);
              }}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  updateTodo(id, editingTodo);
                }
              }}
              onBlur={() => {
                setEditing(false);
                setEditingId("");
                setEditingTodo("");
              }}
            />
          )}
          <button type="button" onClick={() => deleteTodo(id)}>X</button>
        </li>
      ))}
    </ul>
  )
};

export default TodoList;
