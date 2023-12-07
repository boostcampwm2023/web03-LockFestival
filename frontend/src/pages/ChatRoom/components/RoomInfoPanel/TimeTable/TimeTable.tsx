import tw, { css, styled } from 'twin.macro';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { useState } from 'react';
import { mockTimeTableData } from '@pages/ChatRoom/mock/mockTimeTableData';
import Label from '@components/Label/Label';

const TimeTable = ({ themeId }: { themeId: number }) => {
  const [rotation, setRotation] = useState<number>(0);

  const handlerGetTime = (e: React.MouseEvent) => {
    if (e.currentTarget instanceof HTMLButtonElement) {
      const currentRotation = rotation + 360;
      e.currentTarget.style.transform = `rotate(${currentRotation}deg)`;
      setRotation(currentRotation);

      //TODO: 실시간 시간표 불러오는 API 추가
    }
  };

  return (
    <Container>
      <TopWrapper>
        <Text>실시간 시간표 확인하기</Text>
        <IconButton onClick={handlerGetTime}>
          <FaArrowRotateRight color="white" size={16} />
        </IconButton>
      </TopWrapper>
      <BottomWrapper>
        {mockTimeTableData.map((timeData) =>
          timeData.possible ? (
            <Label isBorder={false} width="6rem" backgroundColor="green-light">
              <LableText>{timeData.time}</LableText>
            </Label>
          ) : (
            <Label isBorder={false} width="6rem" backgroundColor="green-dark">
              <LableText>{timeData.time}</LableText>
            </Label>
          )
        )}
      </BottomWrapper>
    </Container>
  );
};

export default TimeTable;

const Container = styled.div([
  css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
]);
const TopWrapper = styled.div([
  css`
    display: flex;
    align-items: center;
    gap: 1.2rem;
  `,
  tw`text-white`,
]);

const Text = styled.div([tw`font-pretendard text-l`]);

const IconButton = styled.button([
  css`
    transition: transform 1s ease;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
  `,
]);

const BottomWrapper = styled.div([tw`grid grid-cols-4 gap-2`]);
const LableText = styled.div(tw`mx-auto`);
