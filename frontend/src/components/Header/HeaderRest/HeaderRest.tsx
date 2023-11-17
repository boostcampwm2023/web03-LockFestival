import tw, { css, styled } from 'twin.macro';
import Button from '@components/Button/Button';
import { FaUser } from 'react-icons/fa6';
import { FaSistrix } from 'react-icons/fa6';
import { keyframes } from '@emotion/react';
import { useState } from 'react';
import useProfileQuery from '@hooks/useProfileQuery';
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';
import LoginModal from '@components/LoginModal/LoginModal';

const HeaderRest = () => {
  const { openModal, closeModal } = useModal();
  const { data, isSuccess, isError } = useProfileQuery();

  const [isClickSearchButton, setIsClickSearchButton] = useState<boolean>(false);
  const [searchInput, setSearchInput, resetSearchInput] = useInput('');

  const handleBlur = () => {
    setIsClickSearchButton(false);
    resetSearchInput();
  };
  const modalCloseCallback = () => closeModal(Modal);

  return (
    <HeaderRestContainer>
      <SearchContainer>
        {isClickSearchButton ? (
          <SearchInputForm>
            <Button isIcon={true} size="l">
              <FaSistrix />
            </Button>
            <SearchInput
              value={searchInput}
              onChange={setSearchInput}
              onBlur={handleBlur}
              autoFocus
              type="text"
            />
          </SearchInputForm>
        ) : (
          <Button isIcon={true} size="l" onClick={() => setIsClickSearchButton(true)}>
            <FaSistrix />
          </Button>
        )}
      </SearchContainer>
      <ProfileContainer>
        {isSuccess && (
          <>
            <FaUser size={20} />
            {data?.nickname}님
          </>
        )}
        {isError && (
          <Button
            size="l"
            font="maplestory"
            isIcon={false}
            onClick={() =>
              openModal(Modal, {
                children: LoginModal(modalCloseCallback),
                onClose: modalCloseCallback,
                closeOnExternalClick: true,
              })
            }
          >
            <>로그인</>
          </Button>
        )}
      </ProfileContainer>
    </HeaderRestContainer>
  );
};

const HeaderRestContainer = styled.div([
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const widthAnimation = keyframes`
  0% {
    width: 30%;
  }
  100% {
    width: 100%;
  }
`;

const SearchContainer = styled.div([
  tw`desktop:(w-[20rem])`,
  tw`mobile:(w-[12.4rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
]);

const SearchInputForm = styled.div([
  tw`bg-gray-light`,
  tw`desktop:(max-w-[16.4rem] w-[16.4rem] h-[3.6rem] rounded-[4rem])`,
  tw`mobile:(w-[12.4rem] h-[3.2rem] rounded-[3rem])`,
  css`
    animation: 1s ${widthAnimation} forwards;
    display: flex;
    align-items: center;
  `,
]);

const SearchInput = styled.input([
  tw`(font-pretendard h-full pl-2 pr-3 bg-gray-light text-white rounded-[4rem])`,
  tw`desktop:(max-w-[12.8rem] text-m)`,
  tw`mobile:(max-w-[9.2rem] text-s)`,
  css`
    animation: 1s ${widthAnimation} forwards;
    border: none;
    outline: none;
  `,
]);

const ProfileContainer = styled.div([
  tw`desktop:(w-[10rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
]);

export default HeaderRest;
