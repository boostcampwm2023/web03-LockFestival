import { GroupInfoCardProps } from 'types/recruitment';
import HeadCardContent from './HeadCardContent';
import HeadCardHeader from './HeadCardHeader';
import tw, { css, styled } from 'twin.macro';

export interface HeadCardProps extends GroupInfoCardProps {
  handleClickFlipButton: () => void;
}

const HeadCard = ({ leader, themeDetail, groupDetail, handleClickFlipButton }: HeadCardProps) => {
  return (
    <Container>
      <HeadCardHeader
        nickname={leader.nickname}
        profileImageUrl={leader.profileImageUrl}
        hasPassword={groupDetail.hasPassword}
        isEnter={groupDetail.isEnter}
      />
      <HeadCardContent
        themeDetail={themeDetail}
        groupDetail={groupDetail}
        handleClickFlipButton={handleClickFlipButton}
      />
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
