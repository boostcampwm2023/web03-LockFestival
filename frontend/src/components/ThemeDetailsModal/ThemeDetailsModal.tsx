import { ModalProps } from 'types/modal';
import tw, { css, styled } from 'twin.macro';
import Button from '@components/Button/Button';
import { FaXmark } from 'react-icons/fa6';
import { ThemeInfoItem } from './components/ThemeInfoItem';
import { useNavigate } from 'react-router-dom';
import useThemeDetailsQuery from './useThemeDetailsQuery';
import ThemeCard from './components/ThemeCard';

interface ThemeDetailsModalProps {
  themeId: number;
  onClose: ModalProps['onClose'];
}

function ThemeDetailsModal({ themeId, onClose }: ThemeDetailsModalProps) {
  const { data, isError, isLoading } = useThemeDetailsQuery(themeId);
  const navigate = useNavigate();

  if (isError) {
    return <DetailModalContainer>해당 테마의 상세정보가 없습니다.</DetailModalContainer>;
  }

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        data && (
          <DetailModalContainer>
            <HeadWrapper>
              <div>{data.name}</div>
              <Button isIcon={true} onClick={onClose}>
                <>
                  <FaXmark />
                </>
              </Button>
            </HeadWrapper>
            <MainWrapper>
              <MainThemePosterBox>
                <ThemePoster src={data.posterImageUrl} alt="포스터_이미지"></ThemePoster>
              </MainThemePosterBox>
              <InfoWrapper>
                {ThemeInfoItem('지점', data.brandBranchName)}
                {ThemeInfoItem('장르', data.realGenre)}
                {ThemeInfoItem('난이도', data.difficulty)}
                {ThemeInfoItem('인원', `${data.minMember}-${data.maxMember}`)}
                {ThemeInfoItem('플레이타임', `${data.playTime}분`)}
                {ThemeInfoItem('전화번호', data.phone)}
                {ThemeInfoItem('주소', data.address)}
              </InfoWrapper>
              <ButtonWrapper>
                <Button
                  isIcon={false}
                  size="m"
                  onClick={() => {
                    window.open(data.website);
                  }}
                >
                  <>예약바로가기</>
                </Button>
                <Button
                  isIcon={false}
                  size="m"
                  onClick={() => {
                    onClose();
                    navigate('/recruitment');
                  }}
                >
                  <>모집바로가기</>
                </Button>
              </ButtonWrapper>
            </MainWrapper>
            <BottomWrapper>
              <HeadWrapper>{data.brandBranchName}의 다른 테마</HeadWrapper>
              <OtherThemeList>
                {data.otherThemes.map((theme) => {
                  const { themeId, posterImageUrl, name } = theme;
                  return (
                    <ThemeCard
                      themeId={themeId}
                      posterImageUrl={posterImageUrl}
                      name={name}
                      onClose={onClose}
                    />
                  );
                })}
              </OtherThemeList>
            </BottomWrapper>
          </DetailModalContainer>
        )
      )}
    </>
  );
}

export default ThemeDetailsModal;

const DetailModalContainer = styled.div([
  css`
    display: flex;
    flex-direction: column;
  `,
  tw`p-4 bg-gray-light rounded-default`,
]);

const HeadWrapper = styled.div([
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.8rem;
  `,
  tw`font-maplestory text-xl-bold mb-2 ml-2`,
]);

const MainWrapper = styled.div([
  css`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1.6rem;
  `,
]);

const MainThemePosterBox = styled.div([
  tw`bg-gray-dark rounded-[2rem]`,
  css`
    width: 18.5rem;
    height: 27.2rem;
    padding: 1.6rem;
  `,
]);

const ThemePoster = styled.img([
  css`
    width: 100%;
    height: 100%;
  `,
  tw`rounded-[2rem]`,
]);

const InfoWrapper = styled.div([
  css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
  tw`ml-4`,
]);

const ButtonWrapper = styled.div([
  css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.8rem;
  `,
  tw`ml-4`,
]);

const BottomWrapper = styled.div([
  css`
    display: flex;
    flex-direction: column;
  `,
]);

const OtherThemeList = styled.div([
  css`
    display: flex;
    justify-content: space-between;
  `,
]);
