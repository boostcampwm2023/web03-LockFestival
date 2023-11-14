export interface ModalProps {
  children: JSX.Element;
  onClose: () => void;
  closeOnExternalClick: boolean;
  isOpen: boolean;
}
