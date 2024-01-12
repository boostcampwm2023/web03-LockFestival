import tw, { styled, css } from 'twin.macro';
import Button from '@components/Button/Button';
import Label from '@components/Label/Label';
import { ChangeRoomData, RoomInfo } from 'types/chat';
import StateLabel from './StateLabel/StateLabel';
import { FaGear } from 'react-icons/fa6';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';
import RoomSettingModal from './RoomSettingModal/RoomSettingModal';
import { DefaultValue, useRecoilValue } from 'recoil';
import { roomInfoAtom } from '@store/chatRoom';
import { getStringByDate } from '@utils/dateUtil';
import TimeTable from './TimeTable/TimeTable';
import { memo, useRef } from 'react';
import useTouchSlidePanel from '@hooks/useTouchSlidePanel';
import { keyframes } from '@emotion/react';

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
    website,
  } = roomInfo as RoomInfo;
  const ref = useRef<HTMLDivElement>(null);
  const { menuState, handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlidePanel(
    ref,
    'roomInfoMenuSelected'
  );

  const handleSettingButton = () => {
    openModal(Modal, {
      children: <RoomSettingModal changeRoom={changeRoom} onClose={() => closeModal(Modal)} />,
      onClose: () => closeModal(Modal),
      closeOnExternalClick: true,
    });
  };

  return (
    <Layout
      ref={ref}
      menuState={menuState}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
          <Label isBorder={true} size="s" width="6.4rem">
            <LabelText>모집내용</LabelText>
          </Label>
          <RoomInfoContent>{recruitmentContent}</RoomInfoContent>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          <Label isBorder={true} size="s" width="6.4rem">
            <LabelText>날짜</LabelText>
          </Label>
          <RoomInfoContent>{getStringByDate(new Date(appointmentDate))}</RoomInfoContent>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          <Label isBorder={true} size="s" width="6.4rem">
            <LabelText>인원</LabelText>
          </Label>
          <RoomInfoContent>
            {currentMembers}명/{recruitmentMembers}명
          </RoomInfoContent>
        </RoomInfoWrapper>
        <RoomInfoWrapper>
          <Label isBorder={true} size="s" width="6.4rem">
            <LabelText>상태</LabelText>
          </Label>
          <RoomInfoContent>
            <StateLabel text="예약" state={appointmentCompleted} />
            <StateLabel text="모집" state={recruitmentCompleted} />
          </RoomInfoContent>
        </RoomInfoWrapper>
      </RoomInfoTopContainer>
      <TimeTable themeId={themeId} website={website} />
    </Layout>
  );
});

const slideInAnimation = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Layout = styled.div(({ menuState }: { menuState: boolean | DefaultValue }) => [
  css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 34rem;
    gap: 1.6rem;
    overflow-x: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #f2f2f2;
      border-radius: 0.5rem;
    }
    ::-webkit-scrollbar-track {
      background-color: #222222;
      border-radius: 0.5rem;
      box-shadow: inset 0px 0px 5px white;
    }
  `,
  tw`bg-gray-light rounded-[2rem] h-[calc(90vh - 6rem)] p-4`,
  tw`tablet:(absolute w-[26rem] left-[0] rounded-l-[0] border border-solid border-white-60 z-[-1] p-3)`,
  tw`mobile:(absolute w-[26rem] left-[0] rounded-l-[0] border border-solid border-white-60 z-[-1] p-3)`,
  menuState &&
    css`
      animation: ${slideInAnimation} 0.3s ease-in forwards;
    `,
]);

const RoomInfoTopContainer = styled.div([
  css`
    display: flex;
    flex-direction: column;
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
  tw`w-[full] h-full bg-gray rounded-[2rem] gap-3 p-3 my-4`,
  tw`tablet:(gap-2 p-2 my-2)`,
  tw`mobile:(gap-2 p-2 my-2)`,
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
]);

const ThemePoster = styled.img([tw`w-[8.4rem] aspect-[1/1.2] rounded-[1.8rem]`]);

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
  tw`font-pretendard text-s text-white mobile:(text-xs)`,
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
  tw`font-pretendard text-white text-s mobile:(text-xs)`,
  css`
    display: flex;
    align-items: center;
  `,
]);

export default RoomInfoPanel;
