import { useNavigate } from 'react-router-dom';

import ModalLayout from '../modal-layout/modal-layout';
import { AppRoute } from '../../../constants';

type AddCartSuccessProps = {
  onCloseSuccessModal: () => void;
  routeAfterSuccess?: boolean;
  routeTo?: string;
};

function AddCartSuccess({
  onCloseSuccessModal,
  routeAfterSuccess = false,
  routeTo,
}: AddCartSuccessProps) {
  const navigate = useNavigate();

  const handleRouteToCart = () => {
    onCloseSuccessModal();

    navigate(AppRoute.Cart);
  };

  const handleRoute = () => {
    onCloseSuccessModal();

    if (routeAfterSuccess && routeTo) {
      navigate(routeTo);
    }
  };

  return (
    <ModalLayout className="modal--success" onClose={onCloseSuccessModal}>
      <svg
        className="modal__icon"
        width="26"
        height="20"
        aria-hidden="true"
        data-testid="icon-success-modal"
      >
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
          type="button"
          onClick={routeAfterSuccess ? handleRoute : onCloseSuccessModal}
        >
          Продолжить покупки
        </button>
      </div>
    </ModalLayout>
  );
}

export default AddCartSuccess;
