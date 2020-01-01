import * as React from "react";

const MemoizedComponent: React.FunctionComponent<{ title: string }> = React.memo(({ title }) => {
  console.log(`TestComponent rendering test with title:%c${title}`, "color:red");

  return (<></>);
});

export default MemoizedComponent;