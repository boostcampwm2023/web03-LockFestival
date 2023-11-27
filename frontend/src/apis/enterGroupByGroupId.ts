import { SERVER_URL } from '@config/server';
import axios from 'axios';

const enterGroupByGroupId = async (groupId: number) => {
  //TODO: 방 입장 api 및 axios 인스턴스 생성 후 리팩토링
  return (await axios({ method: 'post', url: SERVER_URL + '/' })).data;
};

export default enterGroupByGroupId;
