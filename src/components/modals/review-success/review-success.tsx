import ModalLayout from '../modal-layout/modal-layout';

type ReviewSuccessProps = {
  onCloseModal: () => void;
};

function ReviewSuccess({ onCloseModal }: ReviewSuccessProps) {
  return (
    <ModalLayout className="modal--success" onClose={onCloseModal}>
      <svg
        className="modal__icon"
        width="26"
        height="20"
        aria-hidden="true"
        data-testid="modal-success-icon"
      >
        <use xlinkHref="#icon-success" />
      </svg>
      <p className="modal__message">Спасибо за ваш отзыв!</p>
      <div className="modal__button-container modal__button-container--review">
        <button
          className="button button--small modal__button modal__button--review"
          type="button"
          onClick={onCloseModal}
        >
          К покупкам!
        </button>
      </div>
    </ModalLayout>
  );
}

export default ReviewSuccess;
