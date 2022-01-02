import React from 'react';
import ReactDOM from 'react-dom';

type AlertProps = {
  isOpen: boolean;
  onClose: () => void;
  children: string;
};

function Alert({ isOpen, onClose, children }: AlertProps) {
  React.useEffect(() => {
    const closeTimer = setTimeout(onClose, 4000);

    return () => {
      clearTimeout(closeTimer);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="alert">
      <button className="alert__close-btn" type="button" onClick={onClose}>
        <span className="visually-hidden">Закрыть уведомление</span>
      </button>
      <p className="alert__message">{children}</p>
    </div>,
    document.body,
  );
}

export default Alert;
