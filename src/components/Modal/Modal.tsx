import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps{
  children: React.ReactNode
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const handleKaydown = (event:KeyboardEvent) => {
    if (event.code === "Escape") {
      onClose()
    }
  }
  const handleClickBackdropp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKaydown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKaydown)
      document.body.style.overflow = ""
    }
  }, [])
  



  return createPortal(<div onClick={handleClickBackdropp} className={css.backdrop} role="dialog" aria-modal="true">
    <div className={css.modal}>{children}</div>
  </div>, document.body)
}


