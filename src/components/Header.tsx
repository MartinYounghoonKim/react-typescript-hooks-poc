import * as React from 'react';

interface IProps {
  addTodo(text: string, cb: () => void): void;

}
const Header: React.FunctionComponent<IProps> = (
  {
    addTodo,
  }
) => {
  const [text, setText] = React.useState("");
  return (
    <>
      <h1>React Hooks Todo app</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.keyCode === 13) {
              addTodo(text, () => setText(""))
            }
          }}
        />
      </div>
    </>
  );
};

export default Header;