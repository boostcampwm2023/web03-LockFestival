import { useState } from 'react';
import { ModalProps } from 'types/modal';

import useInput from '@hooks/useInput';
import StepOneContent from './StepOneContent/StepOneContent';
import StepTwoContent from './StepTwoContent/StepTwoContent';

interface JoinModalProps {
  onClose: ModalProps['onClose'];
}

function JoinModalComponent({ onClose }: JoinModalProps) {
  const STEP1 = 0;
  const STEP2 = 1;
  const [step, setStep] = useState<number>(STEP1);
  const [nameInput, setNameInput] = useInput('');
  const [selectGenre, setSelectGenre] = useState<Set<number>>(new Set());

  const selectGenreHandler = (idx: number) => {
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
          onClose={() => {
            //TODO: 회원가입 API 호출
            console.log(nameInput, selectGenre);
            onClose();
          }}
        />
      )}
    </>
  );
}

export default JoinModalComponent;
