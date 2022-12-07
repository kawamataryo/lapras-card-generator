import { createContext, useCallback, useState } from 'react';

// set context type
type MessageContext = {
  message: string;
  setMessage: (text: string) => void;
};

// context default value
const defaultContext: MessageContext = {
  message: '',
  setMessage: () => {},
};

// context object
export const MessageContext = createContext<MessageContext>(defaultContext);

// custom Hook
export const useMessageCtx = (): MessageContext => {
  // state名はmessageContext typeのプロパティに合わせる。
  const [message, _setMessage] = useState('');
  // 関数名はmessageContext typeのプロパティに合わせる。
  const setMessage = useCallback((text: string): void => {
    _setMessage(text);
  }, []);
  return {
    message,
    setMessage,
  };
};
