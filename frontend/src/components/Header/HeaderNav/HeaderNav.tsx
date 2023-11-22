import tw, { css, styled } from 'twin.macro';
import { useState } from 'react';
import { NavMenu } from 'types/navMenu';
import { useNavigate } from 'react-router-dom';
const HeaderNav = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<NavMenu>('');

  const handleSelectedItem = (item: NavMenu) => {
    setSelectedItem(item);
    navigate(`/${item}`);
  };

  return (
    <Nav>
      <HeaderLogo
        src="/src/assets/images/logo/Big-Dark.png"
        alt="logo"
        onClick={() => handleSelectedItem('')}
      />
      <NavContainer>
        <NavItem
          onClick={() => handleSelectedItem('recruitment')}
          isSelected={selectedItem === 'recruitment'}
        >
          탈출러 모집
        </NavItem>
        <NavItem
          onClick={() => handleSelectedItem('group-chat')}
          isSelected={selectedItem === 'group-chat'}
        >
          그룹 채팅방
        </NavItem>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav([
  css`
    display: flex;
    align-items: center;
  `,
]);

const HeaderLogo = styled.img([
  tw`desktop:(w-[18rem] h-[3.6rem])`,
  tw`mobile:(w-[18rem] h-[3.2rem])`,
  css`
    cursor: pointer;
  `,
]);

const NavContainer = styled.ul([
  tw`border border-white border-solid`,
  tw`desktop:(w-[40rem] h-[3.6rem] mx-4 rounded-[4rem])`,
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
  tw`desktop:(rounded-[4rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
]);

export default HeaderNav;
