import React from 'react';

type ModalLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

function ModalLayout({ children, className }: ModalLayoutProps) {
  React.useEffect(() => {
    document.body.classList.add('scroll-lock', 'scroll-lock-ios');

    return () => {
      document.body.classList.add('scroll-lock', 'scroll-lock-ios');
    };
  }, []);

  return (
    <div className={`modal is-active ${className ? className : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal />
        <div className="modal__content">
          {children}
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
            <span className="button-cross__icon" />
            <span className="modal__close-btn-interactive-area" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalLayout;
