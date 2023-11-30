import userInstance from '@config/userInstance';

const fetchUserProfile = async () => {
  return (await userInstance({ method: 'get', url: '/users/profile' })).data;
};

export default fetchUserProfile;
