import { useRecoilState, atom } from 'recoil';
import { ModalProps } from 'types/modal';
import { FunctionComponent } from 'react';

interface Modal {
  Component: FunctionComponent<ModalProps>;
  props: ModalProps;
}

const modalAtom = atom<Array<Modal>>({ key: 'modalList', default: [] });

const useModal = () => {
  const [modals, setModals] = useRecoilState(modalAtom);

  const openModal = (
    Component: FunctionComponent<ModalProps>,
    props: Omit<ModalProps, 'isOpen'>
  ) => {
    setModals([...modals, { Component, props: { ...props, isOpen: true } }]);
  };

  const closeModal = (Component: FunctionComponent<ModalProps>) => {
    setModals(modals.filter((modal) => modal.Component !== Component));
  };

  return { modals, openModal, closeModal };
};

export default useModal;
