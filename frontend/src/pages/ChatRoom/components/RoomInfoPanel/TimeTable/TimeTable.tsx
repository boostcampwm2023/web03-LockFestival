import tw, { css, styled } from 'twin.macro';
import { useState } from 'react';
import Label from '@components/Label/Label';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import Calendar from 'react-calendar';
import useTimeTableQuery from '@hooks/useTimeTableQuery';
import { FaArrowsRotate } from 'react-icons/fa6';
import { keyframes } from '@emotion/react';
import { getStringByDate } from '@utils/dateUtil';

interface Props {
  themeId: number;
  website: string;
}

const TimeTable = ({ themeId, website }: Props) => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const { data, isLoading } = useTimeTableQuery(themeId, date);

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
          minDate={today}
          minDetail="month"
          maxDetail="month"
        />
      </CalendarWrapper>

      {isLoading ? (
        <Loading>
          <FaArrowsRotate size="30" />
        </Loading>
      ) : (
        <>
          {data && data.length > 0 ? (
            <TimeTableWrapper>
              {data?.map((timeData) =>
                timeData.possible ? (
                  <Label
                    key={timeData.time}
                    isBorder={false}
                    width="6rem"
                    backgroundColor="green-light"
                  >
                    <LabelText>{timeData.time}</LabelText>
                  </Label>
                ) : (
                  <Label
                    key={timeData.time}
                    isBorder={false}
                    width="6rem"
                    backgroundColor="green-dark"
                  >
                    <LabelText>{timeData.time}</LabelText>
                  </Label>
                )
              )}
            </TimeTableWrapper>
          ) : (
            <InfoText>
              {getStringByDate(date as Date)}의<br />
              시간표를 불러올 수 없습니다.
            </InfoText>
          )}
          <WebsiteLink href={website} target="_blank">
            예약 사이트 바로가기
          </WebsiteLink>
        </>
      )}
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

const Text = styled.div([tw`font-pretendard text-l`]);

const TimeTableWrapper = styled.div([tw`grid grid-cols-4 gap-4`]);
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
  tw`w-full h-[12.8rem] text-white`,
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${rotate} 1s infinite linear;
  `,
]);

const InfoText = styled.div([
  tw`w-full h-[12.8rem] font-pretendard text-white text-m`,
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 2.5rem;
  `,
]);

const WebsiteLink = styled.a([
  tw`font-pretendard text-white text-l border border-white border-solid py-3 px-4 rounded-[1rem]`,
  css`
    text-decoration: none;
    cursor: pointer;
  `,
]);
