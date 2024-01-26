import tw, { styled, css } from 'twin.macro';

import Label from '@components/Label/Label';
import { getStringByDate } from '@utils/dateUtil';

import { HeadCardProps } from './HeadCard';
import { FaRegUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import fetchEnterRoom from '@apis/fetchEnterRoom';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const HeadCardContent = ({
  themeDetail,
  groupDetail,
  handleClickFlipButton,
}: Omit<HeadCardProps, 'leader'>) => {
  const navigate = useNavigate();

  const handleNavigate = async (isEnter: boolean, groudId: number) => {
    if (isEnter) {
      navigate(`/chat-room/${groudId}`);
      return;
    }

    try {
      await fetchEnterRoom(groudId);
      navigate(`/chat-room/${groudId}`);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const checkRoomState = () => {
    if (groupDetail.isEnter) {
      return true;
    }
    if (groupDetail.currentMembers < groupDetail.recruitmentMembers) {
      return true;
    }
    return false;
  };

  return (
    <Content>
      <ThemeCard>
        <ThemeImg src={themeDetail.posterImageUrl} />
      </ThemeCard>
      <ThemeContent>
        <ThemeInfo>
          <List>
            <Label isBorder={true} size="l" font="pretendard">
              <LabelText>지점</LabelText>
            </Label>
            <Text>{themeDetail.branchName}</Text>
          </List>
          <List>
            <Label isBorder={true} size="l" font="pretendard">
              <LabelText>날짜</LabelText>
            </Label>
            <Text>
              {groupDetail.appointmentDate
                ? getStringByDate(new Date(groupDetail.appointmentDate))
                : '미정'}
            </Text>
          </List>
          <List>
            <Label isBorder={true} size="l" font="pretendard">
              <LabelText>인원</LabelText>
            </Label>
            <Text>
              {Array.from({ length: groupDetail.currentMembers }, (_, index) => (
                <Circle isCur={true} key={index}>
                  <FaRegUser size={10} color="#40B753" />
                </Circle>
              ))}
              {Array.from(
                { length: groupDetail.recruitmentMembers - groupDetail.currentMembers },
                (_, index) => (
                  <Circle isCur={false} key={index}>
                    <FaRegUser size={10} color="#525252" />
                  </Circle>
                )
              )}
            </Text>
          </List>
          <List>
            <Label isBorder={true} size="l" font="pretendard">
              <LabelText>상태</LabelText>
            </Label>
            <Text>
              <LabelContainer>
                <Label
                  isBorder={false}
                  size="s"
                  backgroundColor={groupDetail.appointmentCompleted ? 'green-dark' : 'green-light'}
                >
                  <>{groupDetail.appointmentCompleted ? '예약완료' : '예약중'}</>
                </Label>
                <Label
                  isBorder={false}
                  size="s"
                  backgroundColor={groupDetail.recruitmentCompleted ? 'green-dark' : 'green-light'}
                >
                  <>{groupDetail.recruitmentCompleted ? '모집완료' : '모집중'}</>
                </Label>
              </LabelContainer>
            </Text>
          </List>
          <TitleText>{groupDetail.recruitmentContent}</TitleText>
        </ThemeInfo>
        <ButtonContainer>
          <DetailButton onClick={handleClickFlipButton}>상세보기</DetailButton>
          <Button
            canEnter={checkRoomState()}
            onClick={() => handleNavigate(groupDetail.isEnter, groupDetail.groupId)}
            disabled={!checkRoomState()}
          >
            입장하기
          </Button>
        </ButtonContainer>
      </ThemeContent>
    </Content>
  );
};

const Content = styled.div([
  tw`text-m mt-2 gap-x-2`,
  css`
    display: flex;
  `,
]);

const ThemeCard = styled.div([
  tw`p-1 w-1/5 aspect-[1/1.6] bg-gray rounded-[2rem]`,
  css`
    display: flex;
    align-self: flex-start;
    justify-content: center;
  `,
]);

const ThemeImg = styled.img([tw`p-2 w-full aspect-[1/1.6]`]);

const ThemeContent = styled.div([tw`w-4/5`]);

const ThemeInfo = styled.div([]);

const List = styled.div([
  tw`my-1`,
  css`
    display: flex;
    align-items: center;
    column-gap: 2.4rem;
  `,
]);

const ButtonContainer = styled.div([
  css`
    position: absolute;
    bottom: 0.4rem;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 1.6rem;
  `,
]);

const Button = styled.button<{ canEnter: boolean }>(({ canEnter }) => [
  tw`text-white bg-transparent font-pretendard`,
  css`
    cursor: ${canEnter ? 'pointer' : 'not-allowed'};
    color: ${!canEnter && '#525252'};
    &:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  `,
]);

const DetailButton = styled.button([
  tw`text-white bg-transparent font-pretendard`,
  css`
    &:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  `,
]);

const LabelText = styled.div([
  tw`w-[4.8rem] text-l`,
  tw`mobile:(w-[3.2rem] text-m)`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const Circle = styled.span<{ isCur: boolean }>(({ isCur }) => [
  tw`(w-[2rem] h-[2rem] mr-1) rounded-full border-[0.1rem] border-white border-solid`,
  css`
    border: 1px solid ${isCur ? '#40B753' : '#525252'};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const Text = styled.div([
  tw`font-pretendard`,
  tw`mobile:(text-m)`,
  css`
    display: flex;
    align-items: center;
  `,
]);

const TitleText = styled.div([
  tw`border-[0.1rem] border-white border-solid rounded-[1.5rem] px-2 py-1 h-[8rem] w-[25.6rem]`,
  tw`tablet:(max-w-[35.2rem] w-full)`,
  tw`mobile:(w-full)`,
  css`
    display: flex;
    align-items: center;
    justify-self: center;
  `,
]);

const LabelContainer = styled.div([
  css`
    display: flex;
    align-items: center;
    column-gap: 1rem;
  `,
]);

export default HeadCardContent;
