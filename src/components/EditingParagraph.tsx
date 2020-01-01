import * as React from "react";
import { useEffect, useState } from "react";

interface IProps {
}
const EditingParagraph: React.FunctionComponent<IProps> = ({}) => {
  const [timer, setTimer] = useState(60000);
  useEffect(function () {
    const interval = setInterval(function () {
      // reference: https://rinae.dev/posts/a-complete-guide-to-useeffect-ko#%EC%9D%B4%ED%8E%99%ED%8A%B8%EA%B0%80-%EC%9E%90%EA%B8%89%EC%9E%90%EC%A1%B1-%ED%95%98%EB%8F%84%EB%A1%9D-%EB%A7%8C%EB%93%A4%EA%B8%B0
      setTimer(prevState => prevState - 1000);
      // setTimer(timer - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      수정 중입니다.
      {timer}
    </div>
  );
};

export default EditingParagraph;
