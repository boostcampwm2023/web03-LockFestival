import 'react-calendar/dist/Calendar.css';
import tw, { styled, css } from 'twin.macro';
import { useNavigate } from 'react-router-dom';

import CalendarContainer from './FormElement/CalendarContainer';
import ContentsContainer from './FormElement/ContentsContainer';
import ThemeSearchContainer from './FormElement/ThemeSearchContainer';
import ReservationContainer from './FormElement/ReservationContainer';
import MemberCountContainer from './FormElement/MemberCountContainer';
import SelectThemeForm from './FormElement/SelectThemeForm';

import useCreateRecruitmentForm from '@hooks/useCreateRecruitmentForm';

import createRecruitment from '@apis/createRecruitment';

import Button from '@components/Button/Button';
import { FaXmark } from 'react-icons/fa6';

const MakeGroupModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

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
  } = useCreateRecruitmentForm();

  const handleCreateRoom = async () => {
    if (!checkValidate) {
      return;
    }

    try {
      await createRecruitment(
        theme?.themeId as number,
        contents,
        date as Date,
        isReservation,
        Number(memberCount)
      );
      onClose();
      navigate('/group-chat');
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Container>
      <CancelButton isIcon={true} onClick={onClose}>
        <>
          <FaXmark />
        </>
      </CancelButton>
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
            <MemberCountContainer memberCount={memberCount} handleMemberCount={handleMemberCount} />
          </FormElement>
        </Wrapper>
        <SelectThemeForm theme={theme} />
      </Contents>
      <Button onClick={handleCreateRoom} isIcon={false}>
        <>생성하기</>
      </Button>
    </Container>
  );
};

const Container = styled.div([
  tw`h-[40rem]`,
  css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
]);

const Contents = styled.div([
  tw`w-full p-4 mx-auto text-l`,
  tw`desktop:(w-auto min-w-[60rem])`,
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

const CancelButton = styled(Button)([
  css`
    position: absolute;
    top: 1rem;
    right: 1rem;
  `,
]);

export default MakeGroupModal;
