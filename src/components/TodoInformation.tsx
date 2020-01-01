import * as React from "react";

interface IProps {
  completedTodoCount: number;
}

const TodoInformation: React.FunctionComponent<IProps> = (
  {
    completedTodoCount
  }
) => {
  return (
    <div>총 3개의 아이템 중 {completedTodoCount}개가 완료되었습니다. </div>
  );
};

export default TodoInformation;
