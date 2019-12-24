import * as React from 'react';
import './App.css';
import Information from "./Information";

const App: React.FunctionComponent = () => {
  const [text, setText] = React.useState("");
  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        />
      </div>
      <Information isTyping={text}/>
    </div>
  );
};

export default App;
