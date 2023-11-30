import { useState } from 'react';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import useInput from './useInput';

export interface Theme {
  themeId: number;
  posterImageUrl: string;
  branchName: string;
  themeName: string;
}

const useCreateRecruitmentForm = () => {
  const [isClickCalendar, setIsClickCalendar] = useState<boolean>(false);
  const [date, setDate] = useState<Value>(new Date());

  const [memberCount, setMemberCount] = useState<string>('2');

  const [theme, setTheme] = useState<Theme>();

  const [contents, setContents] = useInput('');

  const [isReservation, setIsReservation] = useState<boolean>(false);

  const handleMemberCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberCount(e.target.value);
  };

  const checkValidate = () => {
    if (!theme || !contents) {
      return false;
    }

    return true;
  };

  return {
    isClickCalendar,
    setIsClickCalendar,
    date,
    setDate,
    memberCount,
    handleMemberCount,
    theme,
    setTheme,
    contents,
    setContents,
    isReservation,
    setIsReservation,
    checkValidate,
  };
};

export default useCreateRecruitmentForm;
