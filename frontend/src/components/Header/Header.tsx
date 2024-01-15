import tw, { css, styled } from 'twin.macro';

import HeaderNav from './HeaderNav/HeaderNav';
import HeaderRest from './HeaderRest/HeaderRest';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <HeaderNav />
        <HeaderRest />
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header([
  tw`w-full font-maplestory mx-auto text-white py-2`,
  tw`desktop:(max-w-[102.4rem] h-[6rem] text-l-bold)`,
  tw`tablet:(h-[5rem] text-l-bold)`,
  tw`mobile:(h-[4rem] text-m-bold)`,
  css`
    display: flex;
    align-items: center;
  `,
]);

const HeaderInnerContainer = styled.div([
  tw`w-[95vw] mx-auto`,
  css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  `,
]);

export default Header;
