import { ModalProps } from 'types/modal';
import JoinModalComponent from './JoinModalComponent/JoinModalComponent';

function JoinModal(onClose: ModalProps['onClose']) {
  return (
    <>
      <JoinModalComponent onClose={onClose} />
    </>
  );
}

export default JoinModal;
