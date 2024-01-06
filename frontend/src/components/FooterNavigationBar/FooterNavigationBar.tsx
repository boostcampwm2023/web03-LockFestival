import tw, { styled, css } from 'twin.macro';
import { FaChildren } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaComment } from 'react-icons/fa6';
import { FaHouse } from 'react-icons/fa6';
import { NavMenu } from 'types/navMenu';

const FooterNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectedItem = (item: NavMenu) => {
    navigate(`${item}`);
  };

  return (
    <FooterBar>
      <Container>
        <Content>
          <IconWrapper
            isSelected={location.pathname === '/recruitment'}
            onClick={() => handleSelectedItem('/recruitment')}
          >
            <FaChildren
              size={28}
              color={location.pathname === '/recruitment' ? '#F2F2F2' : '#1A1A1A'}
            />
          </IconWrapper>
        </Content>
        <Content>
          <IconWrapper
            isSelected={location.pathname === '/'}
            onClick={() => handleSelectedItem('/')}
          >
            <FaHouse size={28} color={location.pathname === '/' ? '#F2F2F2' : '#1A1A1A'} />
          </IconWrapper>
        </Content>
        <Content>
          <IconWrapper
            isSelected={location.pathname === '/room-list'}
            onClick={() => handleSelectedItem('/room-list')}
          >
            <FaComment
              size={28}
              color={location.pathname === '/room-list' ? '#F2F2F2' : '#1A1A1A'}
            />
          </IconWrapper>
        </Content>
      </Container>
    </FooterBar>
  );
};

const FooterBar = styled.div(
  [tw`hidden w-full bg-white mx-auto`, tw`mobile:(block)`],
  css`
    position: sticky;
    bottom: 0;
  `
);

const Container = styled.div([
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const Content = styled.div([
  tw`w-[8rem] h-[4.8rem]`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
]);

const IconWrapper = styled.div<{ isSelected: boolean }>(({ isSelected }) => [
  tw`h-[4rem] w-[4rem]`,
  css`
    border: 1px solid #1a1a1a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${isSelected ? '#1A1A1A' : '#F2F2F2'};
  `,
]);

export default FooterNavigationBar;
