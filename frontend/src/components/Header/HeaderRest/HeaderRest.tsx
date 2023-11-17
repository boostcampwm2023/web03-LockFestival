import tw, { css, styled } from 'twin.macro';
import Button from '@components/Button/Button';
import { FaUser } from 'react-icons/fa6';
import { FaSistrix } from 'react-icons/fa6';
import { keyframes } from '@emotion/react';
import { useState } from 'react';
import useProfileQuery from '@hooks/useProfileQuery';
import useInput from '@hooks/useInput';

const HeaderRest = () => {
  const { data, isSuccess, isError } = useProfileQuery();

  const [isClickSearchButton, setIsClickSearchButton] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useInput('');

  return (
    <HeaderRestContainer>
      <SearchContainer>
        {isClickSearchButton ? (
          <SearchInputForm>
            <Button isIcon={true} width="3.6rem">
              <FaSistrix />
            </Button>
            <SearchInput value={searchInput} onChange={setSearchInput} type="text" />
          </SearchInputForm>
        ) : (
          <Button isIcon={true} onClick={() => setIsClickSearchButton(true)}>
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
          <Button size="l" font="dnfbit" isIcon={false}>
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
  tw`mobile:(w-[14rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
]);

const SearchInputForm = styled.div([
  tw`font-gsans bg-gray-light`,
  tw`desktop:(max-w-[16rem] w-[16rem] h-[3.6rem] rounded-[4rem])`,
  tw`mobile:(w-[14rem] h-[2.4rem] rounded-[3rem])`,
  css`
    animation: 1s ${widthAnimation} forwards;
    display: flex;
    align-items: center;
  `,
]);

const SearchInput = styled.input([
  tw`(h-full bg-gray-light text-white rounded-[4rem])`,
  tw`desktop:(max-w-[12rem] text-m)`,
  tw`mobile:(max-w-[8rem] text-s)`,
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
