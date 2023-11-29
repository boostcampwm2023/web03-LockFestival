import 'react-calendar/dist/Calendar.css';
import Label from '@components/Label/Label';
import tw, { styled } from 'twin.macro';

interface Props {
  contents: string;
  setContents: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CotentsContainer = ({ contents, setContents }: Props) => {
  return (
    <>
      <Label isBorder={false} font="maplestory" size="l" width="12rem">
        <Text>모집 내용</Text>
      </Label>
      <Input placeholder="내용을 작성해주세요." value={contents} onChange={setContents} />
    </>
  );
};

const Text = styled.div([tw`mx-auto`]);

const Input = styled.input([
  tw`font-pretendard w-[24rem] h-[3.6rem] bg-white rounded-[2rem] pl-[1rem] text-l`,
]);

export default CotentsContainer;
