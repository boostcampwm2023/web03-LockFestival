import tw, { css, styled } from 'twin.macro';
import { useState } from 'react';
import Label from '@components/Label/Label';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import Calendar from 'react-calendar';
import useTimeTableQuery from '@hooks/useTimeTableQuery';
import { FaArrowsRotate } from 'react-icons/fa6';
import { keyframes } from '@emotion/react';

const TimeTable = ({ themeId }: { themeId: number }) => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(today.getDate() + 7);
  const { data, isSuccess, isLoading, isError } = useTimeTableQuery(themeId, date);

  return (
    <Container>
      <TopWrapper>
        <Text>실시간 시간표 확인하기</Text>
      </TopWrapper>
      <CalendarWrapper>
        <Calendar
          onChange={setDate}
          formatDay={(_, date) => date.toLocaleDateString('ko-KR', { day: '2-digit' }).slice(0, -1)}
          value={date}
          minDate={new Date()}
          maxDate={oneWeekLater}
          minDetail="month"
          maxDetail="month"
          showNavigation={false}
        />
      </CalendarWrapper>
      <BottomWrapper>
        {isLoading ? (
          <Loading>
            <FaArrowsRotate size="30" />
          </Loading>
        ) : (
          <>
            {data?.map((timeData) =>
              timeData.possible ? (
                <Label isBorder={false} width="6rem" backgroundColor="green-light">
                  <LabelText>{timeData.time}</LabelText>
                </Label>
              ) : (
                <Label isBorder={false} width="6rem" backgroundColor="green-dark">
                  <LabelText>{timeData.time}</LabelText>
                </Label>
              )
            )}
          </>
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
    align-items: center;
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

const Text = styled.div([tw`font-pretendard text-m`]);

const BottomWrapper = styled.div([tw`grid grid-cols-4 gap-4`]);
const LabelText = styled.div(tw`mx-auto`);

const CalendarWrapper = styled.div([tw`font-pretendard text-s w-full`]);

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Loading = styled.div([
  tw`w-[30rem] h-[12.8rem] text-white`,
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${rotate} 1s infinite linear;
  `,
]);
