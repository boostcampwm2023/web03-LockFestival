import tw, { styled, css } from 'twin.macro';
import Button from '@components/Button/Button';
import Label from '@components/Label/Label';
import { RoomInfo } from 'types/chat';
import StateLabel from './StateLabel/StateLabel';
import { FaGear } from 'react-icons/fa6';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';
import MakeGroupModal from '@components/Modal/MakeGroupModal/MakeGroupModal';
interface RoomInfoProps {
  isLeader: boolean;
  roomInfo: RoomInfo;
}

const RoomInfoContainer = ({ isLeader, roomInfo }: RoomInfoProps) => {
  const { openModal, closeModal } = useModal();
  return (
    <Layout>
      {isLeader ? (
        <SettingButton>
          <Button
            isIcon={true}
            onClick={() =>
              openModal(Modal, {
                children: <MakeGroupModal onClose={() => closeModal(Modal)} />,
                onClose: () => closeModal(Modal),
                closeOnExternalClick: false,
              })
            }
          >
            <FaGear />
          </Button>
        </SettingButton>
      ) : (
        ''
      )}
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
          <StateLabel text="예약" state={roomInfo.appointmentCompleted} />
          <StateLabel text="모집" state={roomInfo.recruitmentCompleted} />
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

const SettingButton = styled.div([
  css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `,
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
