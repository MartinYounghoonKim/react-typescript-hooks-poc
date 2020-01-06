import * as React from 'react';
import { ITodo } from "../@types/todo";
import { useEffect, useState } from "react";
import MemoizedComponent from "./Memoized";
import { Trigger } from "../context";

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
        <Trigger key={id} onDoubleClick={() => { setEditingTodo(title); setEditingId(id);}}>
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
          <MemoizedComponent title={title}/>
        </Trigger>
      ))}
    </ul>
  )
};

export default TodoList;
