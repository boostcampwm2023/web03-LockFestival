import userInstance from '@config/userInstance';

const fetchCheckNickName = async (nickname: string) => {
  const response = await userInstance({
    method: 'get',
    url: `/users/check-nickname/${nickname}`,
  });

  return response.data;
};

export default fetchCheckNickName;
