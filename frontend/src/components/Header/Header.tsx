import tw, { css, styled } from 'twin.macro';
import { useState } from 'react';
import { NavMenu } from 'types/navMenu';

const Header = () => {
  const [selectedItem, setSelectedItem] = useState<NavMenu>('');

  const handleSelectedItem = (item: NavMenu) => {
    setSelectedItem(item);
  };

  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <HeaderLogo src="/src/assets/images/logo/Big-Dark.png" alt="logo" />
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
          <NavItem
            onClick={() => handleSelectedItem('diary')}
            isSelected={selectedItem === 'diary'}
          >
            탈출 일기
          </NavItem>
        </NavContainer>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header([
  tw`font-dnfbit my-0 mx-auto text-white`,
  tw`desktop:(w-[102.4rem] h-[6rem] text-[1.6rem])`,
  tw`mobile:(w-full text-[1.4rem])`,
]);

const HeaderInnerContainer = styled.div([
  tw`desktop:(mx-[1.6rem] h-[6rem])`,
  tw`mobile:(mx-[0.8rem] h-[4rem])`,
  css`
    display: flex;
    align-items: center;
  `,
]);

const HeaderLogo = styled.img([
  tw`desktop:(w-[18rem] h-[3.6rem])`,
  tw`mobile:(w-[12rem] h-[2.4rem])`,
  css`
    cursor: pointer;
  `,
]);

const NavContainer = styled.ul([
  tw`font-dnfbit border border-white border-solid`,
  tw`desktop:(w-[50rem] h-[3.3rem] mx-[1.6rem] text-[1.6rem]) rounded-[4rem]`,
  tw`mobile:(hidden)`,
  css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    background-color: #282828;
  `,
]);

const NavItem = styled.li<{ isSelected: boolean }>(({ isSelected }) => [
  isSelected ? tw`bg-gray border border-white border-solid` : tw`bg-gray-light`,
  tw`
    h-full px-[2rem]
  `,
  tw`desktop:(rounded-[4rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
]);
export default Header;
