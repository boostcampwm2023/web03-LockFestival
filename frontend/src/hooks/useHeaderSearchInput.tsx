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

    if (realInputQuery === '' && location.pathname !== '/search') {
      setUrlBeforeSearch(location.pathname);
    }
  };

  const handleBlur = () => {
    if (debounceQuery === '') {
      setIsClickSearchButton(false);
    }
  };

  useEffect(() => {
    navigate(`/search?query=${debounceQuery}`);
  }, [debounceQuery]);

  useEffect(() => {
    if (location.pathname !== '/search') {
      setIsClickSearchButton(false);
      resetQuery();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (debounceQuery === '' && !isClickSearchButton) {
      navigate(urlBeforeSearch);
      resetQuery();
    }
  }, [isClickSearchButton]);

  return {
    realInputQuery,
    handleSearchInput,
    isClickSearchButton,
    handleBlur,
    setIsClickSearchButton,
  };
};

export default useHeaderSearchInput;
