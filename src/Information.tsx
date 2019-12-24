import * as React from 'react';
import './App.css';

interface IProps {
  isTyping: string;
}
const Information: React.FunctionComponent<IProps> = (
  {
    isTyping
  }
) => {
  return (
    <div>
      {isTyping ? "현재 입력중..." : ""}
    </div>
  );
};

export default Information;
