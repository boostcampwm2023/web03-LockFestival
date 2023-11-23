import tw, { css, styled } from 'twin.macro';

function NaverLogin() {
  const { VITE_NAVER_CLIENT_ID, VITE_NAVER_REDIRECT_URI } = import.meta.env;

  return (
    <a
      href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${VITE_NAVER_CLIENT_ID}&redirect_uri=${VITE_NAVER_REDIRECT_URI}`}
    >
      <Button />
    </a>
  );
}

const Button = styled.button([
  tw`h-[5rem] w-[20rem] rounded-[0.4rem]`,
  css`
    background-image: url('assets/images/oauth/naver/naver.png');
    background-size: 20rem 5rem;

    cursor: pointer;
  `,
]);

export default NaverLogin;
