import { useEffect, useState } from 'react';
import useInput from './useInput';
import { useLocation, useNavigate } from 'react-router-dom';

const useHeaderSearchInput = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchInput, setSearchInput] = useInput('');
  const [urlBeforeSearch, setUrlBeforeSearch] = useState<string>('/');
  const [isClickSearchButton, setIsClickSearchButton] = useState<boolean>(false);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (searchInput === '') {
      setUrlBeforeSearch(location.pathname);
    }
    setSearchInput(e);
  };

  const handleBlur = () => {
    if (searchInput === '') {
      setIsClickSearchButton(false);
    }
  };

  useEffect(() => {
    if (searchInput === '') {
      navigate(urlBeforeSearch);
      return;
    }
    navigate(`/search?query=${searchInput}`);
  }, [searchInput]);

  return {
    searchInput,
    handleSearchInput,
    isClickSearchButton,
    handleBlur,
    setIsClickSearchButton,
  };
};

export default useHeaderSearchInput;
