import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

type ModalLayoutProps = {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
  isShow: boolean;
};

function ModalLayout({ children, className, onClose, isShow }: ModalLayoutProps) {
  const handleEnterModal = () => {
    document.body.classList.add('scroll-lock', 'scroll-lock-ios');
    document.body.addEventListener('keydown', handleCloseModalOnKeyDown);
    document.body.addEventListener('click', handleCloseModalOnClickOutside);
  };

  const handleExitedModal = () => {
    document.body.classList.remove('scroll-lock', 'scroll-lock-ios');
    document.body.removeEventListener('keydown', handleCloseModalOnKeyDown);
    document.body.removeEventListener('click', handleCloseModalOnClickOutside);
  };

  const handleCloseModalOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleCloseModalOnClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const { closeModal } = target.dataset;

    if (closeModal) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <CSSTransition
      in={isShow}
      classNames="modal"
      mountOnEnter
      unmountOnExit
      timeout={250}
      onEntered={handleEnterModal}
      onExit={handleExitedModal}
    >
      <div
        className={`modal is-active ${className ? className : ''}`}
        data-testid="modal-layout"
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal data-testid="modal-overlay" />
          <div className="modal__content">
            {children}
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={onClose}
            >
              <span className="button-cross__icon" />
              <span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body,
  );
}

export default ModalLayout;
