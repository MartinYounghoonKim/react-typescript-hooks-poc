import * as React from "react";
import { useEffect, useState } from "react";
import "./App.css";

interface IProps {
}
const Information: React.FunctionComponent<IProps> = (
  {
  }
) => {
  const [timer, setTimer] = useState(60000);
  useEffect(function () {
    const interval = setInterval(function () {
      setTimer(timer - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <div>
      수정 중입니다.
      {timer}
    </div>
  );
};

export default Information;
