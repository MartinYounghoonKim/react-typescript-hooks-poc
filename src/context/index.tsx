/**
 * @ref
 * - https://medium.com/vingle-tech-blog/react-hook-ec3f25c2d8fa
 * - https://velog.io/@public_danuel/trendy-react-usecontext
 * - https://ko.reactjs.org/docs/hooks-reference.html#usecontext
 */
import * as React from "react";
import { DOMAttributes, useContext, useEffect, useRef, useState } from "react";

const defaultValue = {
  state: {
    isEditing: false,
  },
  action: {
    toggleEditingId: (toggle: boolean) => {}
  }
};

const Context = React.createContext(defaultValue);

export const TimerProvider: React.FunctionComponent = ({ children }) => {
  const [isEditing, toggleEditingId] = useState(false);
  const state = { isEditing };
  const action = { toggleEditingId };
  return (
    <Context.Provider value={{ state, action }}>
      {children}
    </Context.Provider>
  );
};

type ITriggerProps = {
  tagname: string;
} & DOMAttributes<any>;

export const Trigger: React.FunctionComponent<ITriggerProps> & { defaultProps: Partial<ITriggerProps>} = (props: ITriggerProps) => {
  const { action: { toggleEditingId } } = useContext(Context);
  return React.createElement(props.tagname, {
    ...props,
    onDoubleClick: (event: React.MouseEvent) => {
      toggleEditingId(true);
      props.onDoubleClick && props.onDoubleClick(event);
    },
    onBlur: (event: React.FocusEvent) => {
      event.stopPropagation();
      toggleEditingId(false);
    }
  });
};

Trigger.defaultProps = {
  tagname: "li"
};

export const Timer: React.FunctionComponent = () => {
  const [timer, setTimer] = useState(60);
  const { state: { isEditing } } = useContext(Context);
  const currentTimer = useRef(60);

  useEffect(function () {
    if (!isEditing && currentTimer.current === 60) { return; }
    const interval = setInterval(function () {
      // reference: https://rinae.dev/posts/a-complete-guide-to-useeffect-ko#%EC%9D%B4%ED%8E%99%ED%8A%B8%EA%B0%80-%EC%9E%90%EA%B8%89%EC%9E%90%EC%A1%B1-%ED%95%98%EB%8F%84%EB%A1%9D-%EB%A7%8C%EB%93%A4%EA%B8%B0
      setTimer(prevState => prevState - 1);
      // setTimer(timer - 1000);
    }, 1000);
    return () => {
      setTimer(60);
      currentTimer.current = 60;
      clearInterval(interval);
    };
  }, [isEditing]);
  return isEditing ? (
    <div>
      수정중... {timer}전까지 수정을 완료해주세요.
    </div>
  ) : null;
};
