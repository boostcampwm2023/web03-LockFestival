import tw, { styled, css } from 'twin.macro';
import Button from '@components/Button/Button';
import Label from '@components/Label/Label';
import { RoomInfo } from 'types/chat';
import StateLabel from './StateLabel/StateLabel';
import { FaGear } from 'react-icons/fa6';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';
import RoomSettingModal from './RoomSettingModal/RoomSettingModal';
import { useRecoilValue } from 'recoil';
import { roomInfoAtom } from '@store/chatRoom';
import { getStringByDate } from '@utils/dateUtil';

const RoomInfoPanel = ({ settingMode }: { settingMode: boolean }) => {
  const { openModal, closeModal } = useModal();

  const roomInfo = useRecoilValue(roomInfoAtom);
  const {
    brandName,
    branchName,
    regionName,
    themeName,
    posterImageUrl,
    recruitmentContent,
    // appointmentDate,
    recruitmentMembers,
    currentMembers,
    recruitmentCompleted,
    appointmentCompleted,
  } = roomInfo as RoomInfo;

  return (
    <Layout>
      {settingMode ? (
        <SettingButton>
          <Button
            isIcon={true}
            onClick={() =>
              openModal(Modal, {
                children: <RoomSettingModal onClose={() => closeModal(Modal)} />,
                onClose: () => closeModal(Modal),
                closeOnExternalClick: true,
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
        <RoomInfoContent>
          {
            //TODO: 현재 방정보가 Mock데이터 여서 이후에 appointmentDate로 변경
            getStringByDate(new Date())
          }
        </RoomInfoContent>
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
    </Layout>
  );
};

export default RoomInfoPanel;

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