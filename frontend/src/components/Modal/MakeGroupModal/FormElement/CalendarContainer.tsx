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
          />
        </CalendarWrapper>
      )}
    </>
  );
};

const Container = styled.div([
  tw`w-full p-4 mx-auto text-l`,
  tw`desktop:(w-auto)`,
  css`
    display: flex;
  `,
]);

const Wrapper = styled.div([]);

const FormElement = styled.div([
  tw`h-[4rem] mb-4 w-auto`,
  css`
    position: relative;
    display: flex;
    column-gap: 2rem;
    align-items: center;
    justify-self: center;
  `,
]);

const Text = styled.div([tw`mx-auto`]);

const CalendarWrapper = styled.div([
  css`
    position: absolute;
    z-index: 2;
    top: 3.8rem;
    left: 12rem;
  `,
]);

const Input = styled.input([
  tw`font-pretendard w-[24rem] h-[3.6rem] bg-white rounded-[2rem] pl-[1rem] text-l`,
]);

const CalendarButton = styled.button([
  tw`font-pretendard w-[24rem] h-[3.6rem] bg-white rounded-[2rem] pl-[1rem] text-l`,
]);

const Button = styled.button<{ isSelected: boolean }>(({ isSelected }) => [
  tw`w-[10rem] h-[2.8rem] text-gray-dark text-l font-pretendard rounded-[2rem]`,
  css`
    background-color: ${isSelected ? '#1AB93D' : '#1F371D'};
  `,
]);

const RangeInput = styled.input([
  css`
    width: 20rem;
    background-color: red;
    color: white;
  `,
]);

const SelectThemeContainer = styled.div([
  tw`text-m`,
  css`
    display: flex;
    align-items: center;
    flex-direction: column;
  `,
]);

const SelectImg = styled.img([tw`w-[6rem] h-[9rem]`]);

export default CalendarContainer;
