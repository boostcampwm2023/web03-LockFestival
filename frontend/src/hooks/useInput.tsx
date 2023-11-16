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

  return [inputValue, handleValue] as const;
};

export default useInput;
