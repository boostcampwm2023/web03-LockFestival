import Button from '@components/Button/Button';
import { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import tw, { styled, css } from 'twin.macro';
import useNameValidation from './useNameValidation';
import useCheckNickNameQuery from '@hooks/query/useCheckNickNameQuery';

interface StepOneContentProps {
  nameInput: string;
  setNameInput: ChangeEventHandler;
  debounceInput: string;
  nextStep: MouseEventHandler;
}

const NOT_CHECK = 0;

function StepOneContent({ nameInput, debounceInput, setNameInput, nextStep }: StepOneContentProps) {
  const [isValidName, isDuplicated, checkValidation, warning] = useNameValidation(debounceInput);
  const { data, isSuccess, isError, refetch } = useCheckNickNameQuery(debounceInput);

  useEffect(() => {
    checkValidation(data, isSuccess, isError);
  }, [isError, isSuccess, data]);

  return (
    <StepOneContainer>
      <JoinModalInfo>Lock Festival에서 사용하실 닉네임을 입력하세요.</JoinModalInfo>
      <NameInputLabel>
        <NameInput value={nameInput} onChange={setNameInput} type="text" autoFocus />
        <InputButtonWrapper>
          <Button
            size="l"
            isIcon={false}
            onClick={() => {
              refetch();
            }}
          >
            <>중복확인</>
          </Button>
        </InputButtonWrapper>
      </NameInputLabel>
      <WarningTextWrapper>
        <WarningText isValid={warning.status}>{warning.message}</WarningText>
      </WarningTextWrapper>
      <ButtonWrapper>
        <Button
          isIcon={false}
          onClick={nextStep}
          disabled={!nameInput || !isValidName || isDuplicated === NOT_CHECK}
        >
          <>NEXT</>
        </Button>
      </ButtonWrapper>
    </StepOneContainer>
  );
}

export default StepOneContent;

const StepOneContainer = styled.div([
  tw`mt-[6rem] gap-[6rem]`,
  tw`mobile:(mt-8 gap-10)`,
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `,
]);

const WarningTextWrapper = styled.div([
  tw`w-full h-[4rem] mobile:(h-4)`,
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `,
]);

const JoinModalInfo = styled.div([tw`font-maplestory text-l text-white`, tw`mobile:(text-m)`]);

const NameInputLabel = styled.label([
  css`
    position: relative;
  `,
]);

const NameInput = styled.input([
  tw`w-[32rem] h-[3.6rem] font-pretendard text-m bg-white rounded-default pl-5 pr-[8.8rem] border-0`,
  tw`mobile:(w-[100%] h-[3.2rem] pl-3 pr-[7.2rem])`,
]);

const InputButtonWrapper = styled.div([
  css`
    position: absolute;
    top: 0;
    right: 0;
  `,
]);

const ButtonWrapper = styled.div([
  css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `,
]);

interface WarningTextProps {
  isValid: boolean;
}

const WarningText = styled.div<WarningTextProps>(({ isValid }) => {
  const warningTextStyle = [tw`font-pretendard text-m mobile:(text-s)`];

  if (isValid) {
    warningTextStyle.push(tw`text-green-light`);
  } else {
    warningTextStyle.push(tw`text-red-dark`);
  }

  return warningTextStyle;
});
