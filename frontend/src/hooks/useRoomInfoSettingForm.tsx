import { useState } from 'react';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import useInput from './useInput';
import { useRecoilValue } from 'recoil';
import { roomInfoAtom } from '@store/chatRoom';
import { RoomInfo } from 'types/chat';

export interface Theme {
  themeId: number;
  posterImageUrl: string;
  branchName: string;
  themeName: string;
}

const useRoomInfoSettingForm = () => {
  const currentRoomInfo = useRecoilValue(roomInfoAtom) as RoomInfo;

  const {
    themeId,
    posterImageUrl,
    branchName,
    themeName,
    appointmentDate,
    recruitmentMembers,
    currentMembers,
    recruitmentCompleted,
    appointmentCompleted,
    contents,
  } = currentRoomInfo;

  const themeData = { themeId, posterImageUrl, branchName, themeName };
  const [isClickCalendar, setIsClickCalendar] = useState<boolean>(false);
  const [date, setDate] = useState<Value>(new Date(appointmentDate));
  const [memberCount, setMemberCount] = useState<string>(recruitmentMembers.toString());
  const [theme, setTheme] = useState<Theme | undefined>(themeData);
  const [newContents, setNewContents] = useInput(contents);
  const [isReservation, setIsReservation] = useState<boolean>(appointmentCompleted);
  const [isRecruitment, setIsRecruitment] = useState<boolean>(recruitmentCompleted);

  const handleMemberCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberCount(e.target.value);
  };

  const checkValidate = () => {
    //TODO: 예외처리 및 안내 문구 추가
    if (!theme || !newContents || currentMembers > Number(memberCount)) {
      return false;
    }
    //바뀐 정보가 없는 경우
    if (
      themeId === theme.themeId &&
      contents === newContents &&
      new Date(appointmentDate).toLocaleString() === date?.toLocaleString() &&
      isReservation === appointmentCompleted &&
      isRecruitment === recruitmentCompleted &&
      recruitmentMembers.toString() === memberCount
    ) {
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
    newContents,
    setNewContents,
    isReservation,
    setIsReservation,
    isRecruitment,
    setIsRecruitment,
    checkValidate,
  };
};

export default useRoomInfoSettingForm;
