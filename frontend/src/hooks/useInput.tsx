import { useState, useCallback } from 'react';

const useInput = (initialValue: string) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;

      setInputValue(value);
    },
    []
  );

  const resetValue = useCallback(() => {
    setInputValue('');
  }, []);

  return [inputValue, handleValue, resetValue] as const;
};

export default useInput;
