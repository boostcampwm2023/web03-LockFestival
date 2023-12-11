import tw, { styled, css } from 'twin.macro';
import Button from '@components/Button/Button';
import Label from '@components/Label/Label';
import { ChangeRoomData, RoomInfo } from 'types/chat';
import StateLabel from './StateLabel/StateLabel';
import { FaGear } from 'react-icons/fa6';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';
import RoomSettingModal from './RoomSettingModal/RoomSettingModal';
import { useRecoilValue } from 'recoil';
import { roomInfoAtom } from '@store/chatRoom';
import { getStringByDate } from '@utils/dateUtil';
import TimeTable from './TimeTable/TimeTable';
import { memo } from 'react';

interface Props {
  settingMode: boolean;
  changeRoom: (afterRoomInfo: Record<string, ChangeRoomData>) => void;
}

const RoomInfoPanel = memo(function RoomInfoPanel({ settingMode, changeRoom }: Props) {
  const { openModal, closeModal } = useModal();
  const roomInfo = useRecoilValue(roomInfoAtom);
  const {
    brandName,
    branchName,
    regionName,
    themeName,
    posterImageUrl,
    recruitmentContent,
    appointmentDate,
    recruitmentMembers,
    currentMembers,
    recruitmentCompleted,
    appointmentCompleted,
    themeId,
  } = roomInfo as RoomInfo;

  const handleSettingButton = () => {
    openModal(Modal, {
      children: <RoomSettingModal changeRoom={changeRoom} onClose={() => closeModal(Modal)} />,
      onClose: () => closeModal(Modal),
      closeOnExternalClick: true,
    });
  };

  return (
    <Layout>
      <RoomInfoTopContainer>
        {settingMode && (
          <SettingButton>
            <Button isIcon={true} onClick={handleSettingButton}>
              <FaGear />
            </Button>
          </SettingButton>
        )}
        <HeadContainer>
          <ThemePoster src={posterImageUrl} alt="테마_포스터" />
          <ThemeInfoWrapper>
            <ThemeInfo>{regionName}</ThemeInfo>
            <ThemeInfo>{brandName}</ThemeInfo>
            <ThemeInfo>{branchName}</ThemeInfo>
            <ThemeInfo>{themeName}</ThemeInfo>
          </ThemeInfoWrapper>
        </HeadContainer>
        <RoomInfoWrapper>
          <Label isBorder={true} width="10rem">
            <LabelText>모집내용</LabelText>
          </Label>
          <RoomInfoContent>{recruitmentContent}</RoomInfoContent>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          <Label isBorder={true} width="10rem">
            <LabelText>날짜</LabelText>
          </Label>
          <RoomInfoContent>{getStringByDate(new Date(appointmentDate))}</RoomInfoContent>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          <Label isBorder={true} width="10rem">
            <LabelText>인원</LabelText>
          </Label>
          <RoomInfoContent>
            {currentMembers}명/{recruitmentMembers}명
          </RoomInfoContent>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          <Label isBorder={true} width="10rem">
            <LabelText>상태</LabelText>
          </Label>
          <RoomInfoContent>
            <StateLabel text="예약" state={appointmentCompleted} />
            <StateLabel text="모집" state={recruitmentCompleted} />
          </RoomInfoContent>
        </RoomInfoWrapper>
      </RoomInfoTopContainer>
      <TimeTable themeId={themeId} />
    </Layout>
  );
});

const Layout = styled.div([
  css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 34rem;
    height: 100vh;
    padding: 2rem;
    gap: 1.6rem;
    overflow: hidden;
  `,
  tw`bg-gray-light rounded-[2rem] h-[calc(90vh - 6rem)]`,
]);

const RoomInfoTopContainer = styled.div([
  css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
]);

const SettingButton = styled.div([
  css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `,
]);

const HeadContainer = styled.div([
  tw`w-[full] h-[14.2rem] bg-gray rounded-[2rem]`,
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    gap: 1.2rem;
  `,
]);

const ThemePoster = styled.img([tw`w-[10rem] h-[10.7rem] rounded-[2rem]`]);

const ThemeInfoWrapper = styled.div([
  css`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
  `,
]);

const ThemeInfo = styled.div([
  tw`font-pretendard text-m text-white`,
  css`
    text-align: center;
  `,
]);

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

export default RoomInfoPanel;
