import tw, { styled, css } from 'twin.macro';
import Label from '@components/Label/Label';
import SimpleThemeCardList from '@components/List/SimpleThemeCardList/SimpleThemeCardList';
import useThemesByGeolocationQuery from '@hooks/useThemesByGeolocationQuery';
import { FaCircleExclamation } from 'react-icons/fa6';
import { useState } from 'react';
const GeoLocationThemeListContainer = () => {
  const { data } = useThemesByGeolocationQuery();

  const [clickBang, setClickBang] = useState<boolean>(false);

  if (!data) {
    return <div>error</div>;
  }
  return (
    <>
      <SimpleCardContainer>
        <Text>
          <Label isBorder={true} font="maplestory" size="l">
            <>근처 테마</>
          </Label>
          <ExplainText>
            <div
              onClick={() => setClickBang(true)}
              onMouseOver={() => setClickBang(true)}
              onMouseOut={() => setClickBang(false)}
            >
              <FaCircleExclamation size={23} />
              {clickBang && (
                <HoverText>
                  10km 이내의 테마를 추천하며, 위치 권한을 거부하면 홍대 입구를 기준으로 추천합니다.
                </HoverText>
              )}
            </div>
          </ExplainText>
        </Text>
        <SimpleThemeCardList themes={data.data} />
      </SimpleCardContainer>
    </>
  );
};

const SimpleCardContainer = styled.div([tw`mt-2`]);

const Text = styled.div([
  tw`text-white text-m`,
  css`
    display: flex;
    align-items: center;
    justify-self: center;
    align-self: flex-start;
    margin-bottom: 0.8rem;
  `,
]);

const ExplainText = styled.div([
  tw`ml-2`,
  css`
    position: relative;
  `,
]);

const HoverText = styled.div([
  tw`bg-white font-pretendard text-gray w-[32rem] py-2 px-1 rounded-[0.8rem]`,
  css`
    position: absolute;
    left: 2.4rem;
    top: -2.4rem;
  `,
]);

export default GeoLocationThemeListContainer;
