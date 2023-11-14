export interface ModalProps {
  /** children prop */
  children: JSX.Element;
  /** 모달 닫는 함수 */
  onClose: () => void;
  /** 모달 외부 클릭 시 모달 닫기 활성화여부 */
  closeOnExternalClick: boolean;
  /** 모달 활성화 여부 */
  isOpen: boolean;
}
