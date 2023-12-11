import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const GetLoginSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '네이버 로그인',
      description: '입력된 token으로 네이버 로그인을 수행하고, 자체 accessToken을 발급합니다.',
    }),
    ApiOkResponse({
      status: 200,
      description:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFueWNhcjg1MTVAbmF2ZXIuY29tIiwibmlja25hbWUiOiLroIjslrTri4kiLCJpYXQiOjE3MDA2NzQxNjUsImV4cCI6MTcwMDY3NDE2NX0.ikBQbx6zqnX7D9wvvwg0j_H9BFNWKki1vWdPHdXUUxI',
    })
  );
};
