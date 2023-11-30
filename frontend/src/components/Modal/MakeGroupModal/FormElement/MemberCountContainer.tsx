import Label from '@components/Label/Label';
import tw, { styled, css } from 'twin.macro';

interface Props {
  memberCount: string;
  handleMemberCount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MemberCountContainer = ({ memberCount, handleMemberCount }: Props) => {
  return (
    <>
      <Label isBorder={false} font="maplestory" size="l" width="12rem">
        <Text>모집 인원</Text>
      </Label>
      <RangeInput
        type="range"
        min="1"
        max="8"
        step="1"
        list="member"
        value={memberCount}
        onChange={handleMemberCount}
      />
      <Text>{memberCount}명</Text>
    </>
  );
};

const Text = styled.div([tw`mx-auto`]);

const RangeInput = styled.input([
  css`
    width: 18rem;
  `,
]);

export default MemberCountContainer;
