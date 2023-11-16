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
  tw`font-dnfbit mx-auto text-white`,
  tw`desktop:(max-w-[102.4rem] w-full h-[6rem] text-l)`,
  tw`mobile:(w-full text-m)`,
]);

const HeaderInnerContainer = styled.div([
  tw`desktop:(mx-4 h-[6rem])`,
  tw`mobile:(mx-2 h-[4rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
]);

export default Header;
