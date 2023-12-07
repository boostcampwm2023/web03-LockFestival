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
  tw`font-maplestory mx-auto text-white`,
  tw`desktop:(max-w-[102.4rem] w-full h-[6rem] text-l-bold)`,
  tw`mobile:(w-full text-m-bold)`,
]);

const HeaderInnerContainer = styled.div([
  tw`desktop:(h-[6rem])`,
  tw`tablet:(h-[6rem])`,
  tw`mobile:(h-[5rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  `,
]);

export default Header;
