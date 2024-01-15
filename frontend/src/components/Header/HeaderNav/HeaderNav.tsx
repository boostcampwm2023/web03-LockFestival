import tw, { css, styled } from 'twin.macro';
import { NavMenu } from 'types/navMenu';
import { useLocation, useNavigate } from 'react-router-dom';
const HeaderNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectedItem = (item: NavMenu) => {
    navigate(`${item}`);
  };

  return (
    <Nav>
      <HeaderLogo
        src="/assets/images/logo/logo_leaf.png"
        alt="logo"
        onClick={() => handleSelectedItem('/')}
      />
      <NavContainer>
        <NavItem
          onClick={() => handleSelectedItem('/recruitment')}
          isSelected={location.pathname === '/recruitment'}
        >
          모집 리스트
        </NavItem>
        <NavItem
          onClick={() => handleSelectedItem('/room-list')}
          isSelected={location.pathname === '/room-list'}
        >
          나의 채팅방
        </NavItem>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav([
  tw`text-l`,
  css`
    display: flex;
    align-items: center;
  `,
]);

const HeaderLogo = styled.img([
  tw`desktop:(w-[20rem])`,
  tw`tablet:(w-[16rem])`,
  tw`mobile:(w-[14rem])`,
  css`
    cursor: pointer;
    aspect-ratio: 17/4;
  `,
]);

const NavContainer = styled.ul([
  tw`border border-white border-solid rounded-[4rem]`,
  tw`desktop:(w-[40rem] h-[3.6rem] mx-4)`,
  tw`tablet:(w-[24rem] h-[3.2rem] mx-2)`,
  tw`mobile:(hidden)`,
  css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    background-color: #282828;
  `,
]);

const NavItem = styled.li<{ isSelected: boolean }>(({ isSelected }) => [
  isSelected ? tw`bg-gray border border-white border-solid` : tw`bg-gray-light`,
  tw`
    h-full px-5
  `,
  tw`rounded-[4rem]`,

  css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
]);

export default HeaderNav;
