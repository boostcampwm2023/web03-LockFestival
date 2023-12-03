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

export interface Theme {
  themeId: number;
  posterImageUrl: string;
  branchName: string;
  themeName: string;
}
interface Props {
  onClose: ModalProps['onClose'];
}

const RoomSettingModal = ({ onClose }: Props) => {
  const {
    isClickCalendar,
    setIsClickCalendar,
    date,
    setDate,
    memberCount,
    handleMemberCount,
    theme,
    setTheme,
    newContents,
    setNewContents,
    isReservation,
    setIsReservation,
    checkValidate,
    isRecruitment,
    setIsRecruitment,
  } = useRoomInfoSettingForm();

  const handleCreateRoom = () => {
    if (!checkValidate) {
      return;
    }

    try {
      //emit roomInfo 방정보 변경 요청
      /*
      {
        themeId,
        contents : newContents,
        appointmentDate : date,
        recruitmentMembers : memberCount,
        recruitmentCompleted : isRecruitment,
        appointmentCompleted : isReservation
      }
      */
      onClose();
    } catch (error) {
      // console.log(error);
    }
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
            <ContentsContainer contents={newContents} setContents={setNewContents} />
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
        <Button onClick={handleCreateRoom} isIcon={false} size="l" disabled={!checkValidate()}>
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
