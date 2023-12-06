import deleteGroupByGroupId from '@apis/deleteGroupByGroupId';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import { GroupProps } from 'types/group';

const RoomFooter = ({ groupId }: Pick<GroupProps, 'groupId'>) => {
  const navigate = useNavigate();

  const handleLeaveRoom = async () => {
    if (!window.confirm('정말로 방을 나가시겠습니까?\n나간 이후 복구할 수 없습니다.')) {
      return;
    }
    await deleteGroupByGroupId(groupId);
  };

  return (
    <Container>
      <Button
        font="maplestory"
        size="l-bold"
        isIcon={false}
        onClick={() => navigate(`/chat-room/${groupId}`)}
      >
        <>입장하기</>
      </Button>
      <Button font="maplestory" size="l-bold" isIcon={false} onClick={handleLeaveRoom}>
        <>퇴장하기</>
      </Button>
    </Container>
  );
};

const Container = styled.div([
  tw`w-[10rem] h-[10.4rem] pt-4 gap-x-4 rounded-[2rem] font-pretendard flex-row h-auto w-full justify-end items-center`,
  tw`desktop:(flex-col items-end p-4)`,
  css`
    display: flex;
    align-items: flex-end;
    row-gap: 1.6rem;
  `,
]);

export default RoomFooter;
