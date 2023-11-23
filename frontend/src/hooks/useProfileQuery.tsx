import { useQuery } from '@tanstack/react-query';
import { Profile } from 'types/profile';
import userInstance from '@config/userInstance';
import { useEffect } from 'react';
import useModal from './useModal';
import Modal from '@components/Modal/Modal';
import JoinModal from '@components/JoinModal/JoinModal';

const fetchUserProfile = async () => {
  return (await userInstance({ method: 'get', url: '/users/profile' })).data;
};

const useProfileQuery = () => {
  const { openModal, closeModal } = useModal();
  const { data, isSuccess, isLoading, isError } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: fetchUserProfile,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    if (!data.isMoreInfo) {
      openModal(Modal, {
        children: JoinModal(() => closeModal(Modal)),
        onClose: () => closeModal(Modal),
        closeOnExternalClick: false,
      });
    }
  }, [data]);

  return { data, isSuccess, isLoading, isError };
};

export default useProfileQuery;
