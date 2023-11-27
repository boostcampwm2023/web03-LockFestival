import { GroupInfoCardProps } from 'types/recruitment';
import HeadCardContent from './HeadCardContent';
import HeadCardHeader from './HeadCardHeader';
import tw, { css, styled } from 'twin.macro';

export interface HeadCardProps extends GroupInfoCardProps {
  handleClickFlipButton: () => void;
}

const HeadCard = ({ writer, etc, theme, handleClickFlipButton }: HeadCardProps) => {
  return (
    <Container>
      <HeadCardHeader
        nickName={writer.nickName}
        profileUrl={writer.profileUrl}
        isLock={etc.isLock}
      />
      <HeadCardContent etc={etc} theme={theme} handleClickFlipButton={handleClickFlipButton} />
    </Container>
  );
};

const Container = styled.div([
  tw`h-full`,
  css`
    position: relative;
  `,
]);

export default HeadCard;
