import { useEffect, useState } from 'react';
import { ModalProps } from 'types/modal';

import useInput from '@hooks/useInput';
import StepOneContent from './StepOneContent/StepOneContent';
import StepTwoContent from './StepTwoContent/StepTwoContent';
import useJoinMutation from '@hooks/mutation/useJoinMutations';
import { JoinData } from 'types/profile';
interface JoinModalProps {
  onClose: ModalProps['onClose'];
}

function JoinModalComponent({ onClose }: JoinModalProps) {
  const STEP1 = 0;
  const STEP2 = 1;
  const [step, setStep] = useState<number>(STEP1);
  const [nameInput, setNameInput] = useInput('');
  const [selectGenre, setSelectGenre] = useState<Set<string>>(new Set());
  const [userData, setUserData] = useState<JoinData>();
  const { mutate, status } = useJoinMutation(userData);

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

  useEffect(() => {
    if (userData) {
      mutate();
      onClose();
    }
  }, [userData]);

  const joinHandler = () => {
    const totalUserData = {
      nickname: nameInput,
      profileImageUrl: null,
      favoriteGenres: Array.from(selectGenre),
      favoriteThemes: [],
    };
    setUserData(totalUserData);
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
          joinHandler={joinHandler}
        />
      )}
    </>
  );
}

export default JoinModalComponent;
