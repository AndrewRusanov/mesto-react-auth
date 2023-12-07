const Form = ({ buttonText }) => {

  return (
    <form className="form">
      <input type="email" className="form__input" placeholder="Email" />
      <input type="password" className="form__input" placeholder="Пароль" />
      <button type="button" className="form__button" >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
