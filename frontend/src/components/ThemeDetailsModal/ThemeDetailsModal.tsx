import { ModalProps } from 'types/modal';
import tw, { css, styled } from 'twin.macro';
import Button from '@components/Button/Button';
import { ThemeInfoItem } from './components/ThemeInfoItem';
import { useNavigate } from 'react-router-dom';
import useThemeDetailsQuery from './useThemeDetailsQuery';
import ThemeCard from './components/ThemeCard';
import ModalCloseButton from '@components/Button/ModalCloseButton';

interface ThemeDetailsModalProps {
  themeId: number;
  onClose: ModalProps['onClose'];
}

function ThemeDetailsModal({ themeId, onClose }: ThemeDetailsModalProps) {
  const { data, isError, isLoading } = useThemeDetailsQuery(themeId);
  const navigate = useNavigate();

  if (isError) {
    return (
      <ErrorContainer>
        해당 테마의 상세정보가 없습니다.
        <ModalCloseButton onClose={onClose} />
      </ErrorContainer>
    );
  }

  return (
    <>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        data && (
          <DetailModalContainer>
            <HeadWrapper>
              <div>{data.themeName}</div>
              <ModalCloseButton onClose={onClose} />
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
                  size="s"
                  onClick={() => {
                    window.open(data.website);
                  }}
                >
                  <Text>예약바로가기</Text>
                </Button>
                <Button
                  isIcon={false}
                  size="s"
                  onClick={() => {
                    onClose();
                    navigate(
                      `/recruitment?smallRegion=${data.smallRegion}&bigRegion=${data.bigRegion}&themeName=${data.themeName}`
                    );
                  }}
                >
                  <Text>모집바로가기</Text>
                </Button>
              </ButtonWrapper>
            </MainWrapper>
            <BottomWrapper>
              <HeadWrapper>{data.brandBranchName}의 다른 테마</HeadWrapper>
              <OtherThemeList>
                {data.otherThemes?.map((theme) => {
                  const { themeId, posterImageUrl, themeName } = theme;
                  return (
                    <ThemeCard
                      key={themeId}
                      themeId={themeId}
                      posterImageUrl={posterImageUrl}
                      name={themeName}
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

const ErrorContainer = styled.div([
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 38rem;
    align-items: center;
    gap: 3.6rem;
  `,
  tw`font-pretendard text-l`,
]);

const DetailModalContainer = styled.div([
  css`
    display: flex;
    flex-direction: column;
  `,
  tw`p-6 bg-gray-light rounded-default w-[75rem] tablet:(w-[60rem] p-4) mobile:(w-[32.4rem] p-2)`,
]);

const HeadWrapper = styled.div([
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.2rem;
  `,
  tw`h-[3.2rem] font-maplestory text-xl-bold mb-4 ml-2 mobile:(h-[1.8rem] text-m-bold my-2)`,
]);

const MainWrapper = styled.div([
  css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.6rem;
  `,
  tw`mobile:(relative)`,
]);

const MainThemePosterBox = styled.div([
  tw`
    w-[18.5rem] h-[27.2rem] p-4 bg-gray-dark rounded-[2.8rem] font-pretendard
  `,
  tw`mobile:(w-[11.2rem] h-[18.2rem] p-2 rounded-[1.2rem])`,
]);

const ThemePoster = styled.img([
  css`
    width: 100%;
    height: 100%;
  `,
  tw`rounded-[2rem] mobile:(rounded-[0.6rem])`,
]);

const InfoWrapper = styled.div([
  css`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.8rem;
  `,
  tw`ml-4 mobile:(ml-2)`,
]);

const ButtonWrapper = styled.div([
  css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.8rem;
  `,
  tw`ml-4`,
  tw`mobile:(absolute bottom-0 left-2)`,
]);

const BottomWrapper = styled.div([
  css`
    display: flex;
    flex-direction: column;
  `,
]);

const OtherThemeList = styled.div([
  tw`gap-3 mobile:(gap-1)`,
  css`
    display: flex;
    justify-content: flex-start;
  `,
]);

const Text = styled.div([tw`mx-auto`]);
