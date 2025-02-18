import ReactDOM from "react-dom";
type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};
function Modal({ children, isOpen, onClose, name }: Props) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(<div>{children}</div>, document.body);
}

export default Modal;
