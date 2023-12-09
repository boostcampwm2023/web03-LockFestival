import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounceInput from './useDebounceInput';

const useHeaderSearchInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { debounceQuery, realInputQuery, setRealInputQuery, resetQuery } = useDebounceInput(200);
  const [isClickSearchButton, setIsClickSearchButton] = useState<boolean>(false);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRealInputQuery(e);
  };

  const handleBlur = () => {
    if (debounceQuery === '') {
      setIsClickSearchButton(false);
    }
  };

  useEffect(() => {
    if (debounceQuery !== '') {
      navigate(`/search?query=${debounceQuery}`);
    }
    if (debounceQuery === '' && isClickSearchButton) {
      navigate(`/search?query=${debounceQuery}`);
    }
  }, [debounceQuery]);

  useEffect(() => {
    if (location.pathname !== '/search') {
      setIsClickSearchButton(false);
      resetQuery();
      localStorage.setItem('lastVisited', location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isClickSearchButton && location.pathname !== 'search') {
      navigate('/search');
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
