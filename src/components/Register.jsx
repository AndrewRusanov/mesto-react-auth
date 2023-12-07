import { NavLink, useNavigate } from "react-router-dom";
import Form from "./Form";
import * as auth from "../utils/Auth";
import { useState } from "react";

const Register = ({}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.register(password, email).then(() => {
      setIsRegistered(true);
      // TODO. Открыть попап с успешной регистрацией
      navigate("/sign-in", { replace: true });
    });
  };

  return (
    <div className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <Form
        buttonText="Зарегистрироваться"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={(event) => handleSubmit(event)}
      />
      <p className="sign__subtitle">
        Вы уже зарегистрированы?{" "}
        <NavLink className="sign__link-in" to="/sign-in">
          Войти
        </NavLink>
      </p>
    </div>
  );
};

export default Register;
