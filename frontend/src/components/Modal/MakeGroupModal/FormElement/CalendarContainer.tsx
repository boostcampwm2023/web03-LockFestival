import 'react-calendar/dist/Calendar.css';
import Label from '@components/Label/Label';
import tw, { styled, css } from 'twin.macro';
import Calendar from 'react-calendar';

import { Value } from 'react-calendar/dist/cjs/shared/types';

interface Props {
  isClickCalendar: boolean;
  setIsClickCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  date: Value;
  setDate: React.Dispatch<React.SetStateAction<Value>>;
}

const CalendarContainer = ({ isClickCalendar, setIsClickCalendar, date, setDate }: Props) => {
  return (
    <>
      <Label isBorder={false} font="maplestory" size="l" width="12rem">
        <Text>날짜</Text>
      </Label>
      <CalendarButton onClick={() => setIsClickCalendar((prev) => !prev)}>
        <>{date?.toLocaleString('ko-kr').slice(0, 12)}</>
      </CalendarButton>
      {isClickCalendar && (
        <CalendarWrapper>
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={() => setIsClickCalendar(false)}
            minDate={new Date()}
            formatDay={(_, date) =>
              date.toLocaleDateString('ko-KR', { day: '2-digit' }).slice(0, -1)
            }
          />
        </CalendarWrapper>
      )}
    </>
  );
};

const Text = styled.div([tw`mx-auto`]);

const CalendarWrapper = styled.div([
  css`
    position: absolute;
    z-index: 2;
    top: 3.8rem;
    left: 12rem;
  `,
]);

const CalendarButton = styled.button([
  tw`font-pretendard w-[24rem] h-[3.6rem] bg-white rounded-[2rem] pl-[1rem] text-l`,
]);

export default CalendarContainer;
