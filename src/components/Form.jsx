const Form = ({
  buttonText,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}) => {
  return (
    <form className="form">
      <input
        type="email"
        className="form__input"
        placeholder="Email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        className="form__input"
        placeholder="Пароль"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button
        type="submit"
        className="form__button"
        onClick={(event) => {
          handleSubmit(event);
        }}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
