import css from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}
