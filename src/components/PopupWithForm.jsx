import closeButton from '../images/close-icon.svg';

const PopupWithForm = ({ title, name, buttonText, isOpen, onClose, onSubmit, isLoading,  children }) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen && `popup_opened`}`} id="edit-popup">
      <div className="popup__container">
        <button
          type="reset"
          className="popup__close-button"
          id="close-edit"
          onClick={onClose}
        >
          <img className="popup__close-icon" src={closeButton} alt="Кнопка закрытия окна" />
        </button>
        <form name={name} className="popup__form" id={`${name}-form`} onSubmit={(event)=>onSubmit(event)} >
          <h2 className="popup__label">{title}</h2>
          {children}
          <button type="submit" className="popup__button">
            {isLoading ? "Сохранение..." : buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
