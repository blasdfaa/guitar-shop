import { useNavigate } from 'react-router-dom';

import ModalLayout from '../modal-layout/modal-layout';
import { AppRoute } from '../../../constants';

type AddCartSuccessProps = {
  onCloseSuccessModal: () => void;
  isAddCartSuccessOpen: boolean;
};

function AddCartSuccess({ onCloseSuccessModal, isAddCartSuccessOpen }: AddCartSuccessProps) {
  const navigate = useNavigate();

  const handleRouteToCart = async () => {
    // Нужно дождаться конца анимации, иначе обработчики и класс с удалением скролла не удалятся
    await onCloseSuccessModal();

    navigate(AppRoute.Cart);
  };

  return (
    <ModalLayout
      onClose={onCloseSuccessModal}
      className="modal--success"
      isShow={isAddCartSuccessOpen}
    >
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <p className="modal__message">Товар успешно добавлен в корзину</p>
      <div className="modal__button-container modal__button-container--add">
        <button
          className="button button--small modal__button"
          type="button"
          onClick={handleRouteToCart}
        >
          Перейти в корзину
        </button>
        <button
          className="button button--black-border button--small modal__button modal__button--right"
          onClick={onCloseSuccessModal}
        >
          Продолжить покупки
        </button>
      </div>
      <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
        <span className="button-cross__icon" />
        <span className="modal__close-btn-interactive-area" />
      </button>
    </ModalLayout>
  );
}

export default AddCartSuccess;
