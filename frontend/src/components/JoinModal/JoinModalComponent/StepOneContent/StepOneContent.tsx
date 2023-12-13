import Button from '@components/Button/Button';
import { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import tw, { styled, css } from 'twin.macro';
import useNameValidation from './useNameValidation';
import userInstance from '@config/userInstance';
import { useQuery } from '@tanstack/react-query';

interface StepOneContentProps {
  nameInput: string;
  setNameInput: ChangeEventHandler;
  debounceInput: string;
  nextStep: MouseEventHandler;
}

const NOT_CHECK = 0;

const fetchCheckNickName = async (nickname: string) => {
  const response = await userInstance({
    method: 'get',
    url: `/users/check-nickname/${nickname}`,
  });

  return response.data;
};

function StepOneContent({ nameInput, debounceInput, setNameInput, nextStep }: StepOneContentProps) {
  const [isValidName, isDuplicated, checkValidation, warning] = useNameValidation(debounceInput);
  const { data, isSuccess, isError, refetch } = useQuery<boolean>({
    queryKey: ['checkNickName', debounceInput],
    queryFn: () => fetchCheckNickName(debounceInput),
    staleTime: 0,
    enabled: false,
  });

  useEffect(() => {
    checkValidation(data, isSuccess, isError);
  }, [isError, isSuccess, data]);

  return (
    <>
      <TopWrapper>
        <JoinModalInfo>Lock Festival에서 사용하실 닉네임을 입력하세요.</JoinModalInfo>
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
      </TopWrapper>
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
    </>
  );
}

export default StepOneContent;

const TopWrapper = styled.div([
  css`
    position: relative;
    display: flex;
    gap: 4rem;
    margin-top: 13.4rem;
    height: 14.2rem;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  `,
]);

const WarningTextWrapper = styled.div([
  css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 6rem;
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
    top: 5.6rem;
    left: 32.9rem;
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
