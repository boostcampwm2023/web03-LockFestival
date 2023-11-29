import tw, { styled, css } from 'twin.macro';
import Label from '@components/Label/Label';
import { RoomInfo } from 'types/chat';

const RoomInfoContainer = ({ roomInfo }: { roomInfo: RoomInfo }) => {
  const appointmentText = roomInfo.recruitmentCompleted ? '예약 O' : '예약 X';
  const recruitmentText = roomInfo.recruitmentCompleted ? '모집 O' : '모집X';

  return (
    <Layout>
      <HeadContainer>
        <ThemePoster src={roomInfo.posterImageUrl} alt="테마_포스터" />
        <ThemeInfoWrapper>
          <ThemeInfo>{roomInfo.regionName}</ThemeInfo>
          <ThemeInfo>{roomInfo.brandName}</ThemeInfo>
          <ThemeInfo>{roomInfo.branchName}</ThemeInfo>
          <ThemeInfo>{roomInfo.themeName}</ThemeInfo>
        </ThemeInfoWrapper>
      </HeadContainer>
      <RoomInfoWrapper>
        <Label isBorder={true} width="10rem">
          <LabelText>모집내용</LabelText>
        </Label>
        <RoomInfoContent>{roomInfo.contents}</RoomInfoContent>
      </RoomInfoWrapper>
      <RoomInfoWrapper>
        <Label isBorder={true} width="10rem">
          <LabelText>날짜</LabelText>
        </Label>
        <RoomInfoContent>
          {new Date(roomInfo.appointmentDate)
            .toLocaleString('ko-KR', { timeZone: 'UTC' })
            .slice(0, 11)}
        </RoomInfoContent>
      </RoomInfoWrapper>
      <RoomInfoWrapper>
        <Label isBorder={true} width="10rem">
          <LabelText>인원</LabelText>
        </Label>
        <RoomInfoContent>
          {roomInfo.currentMembers}명/{roomInfo.recruitmentMembers}명
        </RoomInfoContent>
      </RoomInfoWrapper>
      <RoomInfoWrapper>
        <Label isBorder={true} width="10rem">
          <LabelText>상태</LabelText>
        </Label>
        <RoomInfoContent>
          <Label isBorder={true} backgroundColor={'green-dark'} width="10rem">
            <LabelText>{appointmentText}</LabelText>
          </Label>
          <Label isBorder={true} backgroundColor={'green-light'} width="10rem">
            <LabelText>{recruitmentText}</LabelText>
          </Label>
        </RoomInfoContent>
      </RoomInfoWrapper>
    </Layout>
  );
};

export default RoomInfoContainer;

const Layout = styled.div([
  css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 34rem;
    height: 100vh;
    padding: 2rem;
  `,
  tw`bg-gray-light rounded-[2rem] h-[calc(90vh - 6rem)]`,
]);

const HeadContainer = styled.div([
  tw`w-[27rem] h-[14.2rem] bg-gray rounded-[2rem]`,
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
  `,
]);

const ThemePoster = styled.img([tw`w-[10rem] h-[10.7rem] rounded-[2rem]`]);

const ThemeInfoWrapper = styled.div([
  css`
    display: flex;
    width: 12rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
  `,
]);

const ThemeInfo = styled.div([tw`font-pretendard text-m text-white`]);

const RoomInfoWrapper = styled.div([
  css`
    display: flex;
    gap: 0.6rem;
  `,
]);

const LabelText = styled.div([
  css`
    display: flex;
    justify-content: center;
    width: 100%;
  `,
]);

const RoomInfoContent = styled.div([
  tw`font-pretendard text-white text-m`,
  css`
    display: flex;
    align-items: center;
    width: 16.4rem;
  `,
]);
