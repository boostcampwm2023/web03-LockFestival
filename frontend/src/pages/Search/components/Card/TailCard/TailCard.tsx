import { styled, css } from 'twin.macro';
import { ThemeExtraData } from 'types/theme';
import UnderLineButton from '../UnderLineButton/UnderLineButton';
import CardInfoLabel from '../CardInfoLabel/CardInfoLabel';
import { useNavigate } from 'react-router-dom';

interface Props extends ThemeExtraData {
  handleClickFlipButton: () => void;
}

const TailCard = ({
  brandBranchName,
  realGenre,
  difficulty,
  minMember,
  maxMember,
  playTime,
  website,
  phone,
  address,
  handleClickFlipButton,
}: Props) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <CardInfoLabel labelName="전화번호" labelContent={<>{phone}</>} />
      <CardInfoLabel labelName="주소" labelContent={<>{address}</>} />
      <CardInfoLabel
        labelName="홈페이지"
        labelContent={
          <UnderLineButton
            children={<>{brandBranchName} 바로가기</>}
            onClick={() => navigate(website)}
          />
        }
      />
      <CardInfoContainer>
        <CardInfoWrapper>
          <CardInfoLabel
            labelName="인원"
            labelContent={
              <>
                {minMember} - {maxMember} 명
              </>
            }
          />
          <CardInfoLabel labelName="플레이타임" labelContent={<>{playTime}분</>} />
        </CardInfoWrapper>
        <CardInfoWrapper>
          <CardInfoLabel labelName="장르" labelContent={<>{realGenre}</>} />
          <CardInfoLabel labelName="난이도" labelContent={<>{difficulty}</>} />
        </CardInfoWrapper>
      </CardInfoContainer>
      <ButtonWrapper>
        <UnderLineButton children={<>상세보기</>} onClick={handleClickFlipButton} />
      </ButtonWrapper>
    </Layout>
  );
};

export default TailCard;

const Layout = styled.div([
  css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    width: 100%;
  `,
]);

const CardInfoContainer = styled.div([
  css`
    display: flex;
    gap: 1.6rem;
  `,
]);

const CardInfoWrapper = styled.div([
  css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
]);

const ButtonWrapper = styled.div([
  css`
    position: absolute;
    right: 1.2rem;
    bottom: 1.2rem;
  `,
]);
