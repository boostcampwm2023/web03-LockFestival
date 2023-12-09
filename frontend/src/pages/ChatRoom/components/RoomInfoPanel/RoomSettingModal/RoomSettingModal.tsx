import tw, { css, styled } from 'twin.macro';
import { ModalProps } from 'types/modal';

import Button from '@components/Button/Button';
import ModalCloseButton from '@components/Button/ModalCloseButton';
import {
  CalendarContainer,
  ContentsContainer,
  MemberCountContainer,
  ReservationContainer,
  SelectThemeForm,
  ThemeSearchContainer,
} from '@components/Modal/MakeGroupModal/FormElement';
import useRoomInfoSettingForm from '@hooks/useRoomInfoSettingForm';
import RecruitmentContainer from './FormElement/RecruitmentContainer';
import { ChangeRoomData } from 'types/chat';

export interface Theme {
  themeId: number;
  posterImageUrl: string;
  branchName: string;
  themeName: string;
}
interface Props {
  onClose: ModalProps['onClose'];
  changeRoom: (afterRoomInfo: Record<string, ChangeRoomData>) => void;
}

const RoomSettingModal = ({ onClose, changeRoom }: Props) => {
  const {
    isClickCalendar,
    setIsClickCalendar,
    date,
    setDate,
    memberCount,
    handleMemberCount,
    theme,
    setTheme,
    contents,
    setContents,
    isReservation,
    setIsReservation,
    checkValidate,
    isRecruitment,
    setIsRecruitment,
  } = useRoomInfoSettingForm();

  const handleChangeRoom = () => {
    if (!checkValidate) {
      return;
    }

    const afterRoomInfo: Record<string, ChangeRoomData> = {
      roomInfo: {
        themeId: theme?.themeId.toString() as string,
        recruitmentContent: contents,
        appointmentDate: new Date(date as Date),
        recruitmentMembers: Number(memberCount),
        recruitmentCompleted: isRecruitment,
        appointmentCompleted: isReservation,
      },
    };

    changeRoom(afterRoomInfo);

    onClose();
  };

  if (!setTheme) {
    return;
  }

  return (
    <Layout>
      <ModalCloseButton onClose={onClose} />
      <Contents>
        <Wrapper>
          <FormElement>
            <ThemeSearchContainer theme={theme} setTheme={setTheme} />
          </FormElement>
          <FormElement>
            <ContentsContainer contents={contents} setContents={setContents} />
          </FormElement>
          <FormElement>
            <CalendarContainer
              isClickCalendar={isClickCalendar}
              setIsClickCalendar={setIsClickCalendar}
              date={date}
              setDate={setDate}
            />
          </FormElement>
          <FormElement>
            <ReservationContainer
              isReservation={isReservation}
              setIsReservation={setIsReservation}
            />
          </FormElement>
          <FormElement>
            <RecruitmentContainer
              isRecruitment={isRecruitment}
              setIsRecruitment={setIsRecruitment}
            />
          </FormElement>
          <FormElement>
            <MemberCountContainer memberCount={memberCount} handleMemberCount={handleMemberCount} />
          </FormElement>
        </Wrapper>
        <SelectThemeForm theme={theme} />
      </Contents>
      <ButtonWrapper>
        <Button onClick={handleChangeRoom} isIcon={false} size="l" disabled={!checkValidate()}>
          <>변경하기</>
        </Button>
      </ButtonWrapper>
    </Layout>
  );
};

export default RoomSettingModal;

const Layout = styled.div([
  css`
    display: flex;
    flex-direction: column;
  `,
  tw`p-6 w-[69.4rem] `,
]);

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

const Contents = styled.div([
  tw`w-full mx-auto text-l`,
  tw`desktop:(w-auto min-w-[60rem])`,
  css`
    display: flex;
  `,
]);

const Wrapper = styled.div([]);

const ButtonWrapper = styled.div([tw`mx-auto`]);
