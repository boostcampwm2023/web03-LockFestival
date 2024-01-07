import { useEffect, useState } from 'react';
import { ModalProps } from 'types/modal';

import StepOneContent from './StepOneContent/StepOneContent';
import StepTwoContent from './StepTwoContent/StepTwoContent';
import useJoinMutation from '@hooks/mutation/useJoinMutation';
import { JoinData } from 'types/profile';
import useDebounceInput from '@hooks/useDebounceInput';
import tw, { styled } from 'twin.macro';
interface JoinModalProps {
  onClose: ModalProps['onClose'];
}

function JoinModalComponent({ onClose }: JoinModalProps) {
  const STEP1 = 0;
  const STEP2 = 1;
  const [step, setStep] = useState<number>(STEP1);
  const { realInputQuery, debounceQuery, setRealInputQuery } = useDebounceInput(300);
  const [selectGenre, setSelectGenre] = useState<Set<string>>(new Set());
  const [userData, setUserData] = useState<JoinData>();
  const { mutate } = useJoinMutation(userData);

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
      nickname: debounceQuery,
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
    <JoinModalContainer>
      {step === STEP1 && (
        <StepOneContent
          nameInput={realInputQuery}
          debounceInput={debounceQuery}
          setNameInput={setRealInputQuery}
          nextStep={nextStep}
        />
      )}
      {step === STEP2 && (
        <StepTwoContent
          selectGenre={selectGenre}
          setSelectGenre={selectGenreHandler}
          joinHandler={joinHandler}
        />
      )}
    </JoinModalContainer>
  );
}

const JoinModalContainer = styled.div([
  tw`
    w-auto p-5
    desktop:(min-w-[54rem])
    tablet:(min-w-[54rem])
    mobile:(w-[85vw] max-w-[46rem])
  `,
]);

export default JoinModalComponent;
