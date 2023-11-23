let SERVER_URL = '/api/v1';

if (process.env.DEV === 'false') {
  //TODO: 추후에 실제 서버 주소로 변경
  SERVER_URL = 'http://localhost:8080';
}

export { SERVER_URL };
