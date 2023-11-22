import Button from '@components/Button/Button';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import tw, { styled, css } from 'twin.macro';

interface StepOneContentProps {
  nameInput: string;
  setNameInput: ChangeEventHandler;
  nextStep: MouseEventHandler;
}

function StepOneContent({ nameInput, setNameInput, nextStep }: StepOneContentProps) {
  const checkDuplicated = () => {
    //TODO: 닉네임 중복확인 API 호출
  };

  return (
    <>
      <TopWrapper>
        <JoinModalInfo>Lock Festival에서 사용하실 닉네임을 입력하세요.</JoinModalInfo>
        <NameInput value={nameInput} onChange={setNameInput} type="text" />
        <InputButtonWrapper>
          <Button size="l" isIcon={false} onClick={checkDuplicated}>
            <>중복확인</>
          </Button>
        </InputButtonWrapper>
        <WarningText isValid={true}>사용가능한 닉네임입니다!</WarningText>
      </TopWrapper>

      <ButtonWrapper>
        <Button isIcon={false} onClick={nextStep} disabled={!nameInput}>
          <>NEXT</>
        </Button>
      </ButtonWrapper>
    </>
  );
}

export default StepOneContent;

const TopWrapper = styled.div([
  css`
    position: relative;
    display: flex;
    gap: 4rem;
    margin-top: 6.4rem;
    height: 27.2rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
]);

const JoinModalInfo = styled.div([tw`font-maplestory text-l text-white`]);

const NameInput = styled.input([
  tw`font-pretendard text-m bg-white rounded-default pl-5 pr-[8.8rem]`,
  css`
    width: 32rem;
    height: 3.6rem;
    border: 0;
  `,
]);

const InputButtonWrapper = styled.div([
  css`
    position: absolute;
    top: 12.9rem;
    left: 33rem;
  `,
]);

const ButtonWrapper = styled.div([
  css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `,
  tw`
    p-4
  `,
]);

interface WarningTextProps {
  isValid: boolean;
}

const WarningText = styled.div<WarningTextProps>(({ isValid }) => {
  const warningTextStyle = [
    tw`font-pretendard text-m `,
    css`
      margin-top: -2rem;
    `,
  ];

  if (isValid) {
    warningTextStyle.push(tw`text-green-light`);
  } else {
    warningTextStyle.push(tw`text-red-dark`);
  }

  return warningTextStyle;
});
