import useInput from './useInput';
import { useEffect, useState } from 'react';

const useDebounceInput = (delayTime: number = 500) => {
  const [debounceQuery, setDebounceQuery] = useState('');

  const [realInputQuery, setRealInputQuery, resetRealInputQuery] = useInput('');

  const resetQuery = () => {
    setDebounceQuery('');
    resetRealInputQuery();
  };

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      setDebounceQuery(realInputQuery);
    }, delayTime);

    return () => clearInterval(debounceTime);
  }, [realInputQuery]);

  return { debounceQuery, realInputQuery, setRealInputQuery, resetQuery };
};

export default useDebounceInput;
