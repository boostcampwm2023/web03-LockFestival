import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounceInput from './useDebounceInput';

const useHeaderSearchInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { debounceQuery, realInputQuery, setRealInputQuery, resetQuery } = useDebounceInput(200);
  const [urlBeforeSearch, setUrlBeforeSearch] = useState<string>('/');
  const [isClickSearchButton, setIsClickSearchButton] = useState<boolean>(false);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRealInputQuery(e);
    if (realInputQuery === '') {
      setUrlBeforeSearch(location.pathname);
    }
  };

  const handleBlur = () => {
    if (realInputQuery === '') {
      setIsClickSearchButton(false);
    }
  };

  useEffect(() => {
    if (debounceQuery === '') {
      navigate(urlBeforeSearch);
      resetQuery();
      return;
    }
    if (debounceQuery !== '') {
      navigate(`/search?query=${debounceQuery}`);
      return;
    }
  }, [debounceQuery]);

  return {
    realInputQuery,
    handleSearchInput,
    isClickSearchButton,
    handleBlur,
    setIsClickSearchButton,
  };
};

export default useHeaderSearchInput;
