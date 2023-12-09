import tw, { styled, css } from 'twin.macro';
import Label from '@components/Label/Label';

interface Props {
  isReservation: boolean;
  setIsReservation: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReservationContainer = ({ isReservation, setIsReservation }: Props) => {
  return (
    <>
      <Label isBorder={false} font="maplestory" size="l" width="12rem">
        <Text>예약 여부</Text>
      </Label>
      <Button isSelected={!!isReservation} onClick={() => setIsReservation(true)}>
        예약완료
      </Button>
      <Button isSelected={!isReservation} onClick={() => setIsReservation(false)}>
        예약중
      </Button>
    </>
  );
};

const Text = styled.div([tw`mx-auto`]);

const Button = styled.button<{ isSelected: boolean }>(({ isSelected }) => [
  tw`w-[10rem] h-[2.8rem] text-gray-dark text-l font-pretendard rounded-[2rem]`,
  css`
    background-color: ${isSelected ? '#1AB93D' : '#1F371D'};
    cursor: pointer;
  `,
]);

export default ReservationContainer;
