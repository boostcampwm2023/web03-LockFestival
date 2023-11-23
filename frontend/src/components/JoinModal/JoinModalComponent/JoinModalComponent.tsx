import { useState } from 'react';
import { ModalProps } from 'types/modal';

import useInput from '@hooks/useInput';
import StepOneContent from './StepOneContent/StepOneContent';
import StepTwoContent from './StepTwoContent/StepTwoContent';
import fetchJoin from '@apis/fetchJoin';
import useProfileQuery from '@hooks/useProfileQuery';

interface JoinModalProps {
  onClose: ModalProps['onClose'];
}

function JoinModalComponent({ onClose }: JoinModalProps) {
  const STEP1 = 0;
  const STEP2 = 1;
  const [step, setStep] = useState<number>(STEP1);
  const [nameInput, setNameInput] = useInput('');
  const [selectGenre, setSelectGenre] = useState<Set<string>>(new Set());
  const { refetch } = useProfileQuery();
  const selectGenreHandler = (idx: string) => {
    setSelectGenre((prevSet) => {
      const newSet = new Set(prevSet);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  const joinHandler = async () => {
    const userData = {
      nickname: nameInput,
      profileImageUrl: null,
      favoriteGenres: Array.from(selectGenre),
      favoriteThemes: [],
    };

    try {
      const { token } = await fetchJoin(userData);
      localStorage.setItem('accessToken', token);
      onClose();
      refetch();
    } catch (error) {
      alert('서버에러');
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === STEP1 && (
        <StepOneContent nameInput={nameInput} setNameInput={setNameInput} nextStep={nextStep} />
      )}
      {step === STEP2 && (
        <StepTwoContent
          selectGenre={selectGenre}
          setSelectGenre={selectGenreHandler}
          onClose={joinHandler}
        />
      )}
    </>
  );
}

export default JoinModalComponent;
