import { useNavigate } from "react-router-dom";
import Form from "./Form";
import * as auth from "../utils/Auth.js";
import { useState } from "react";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .authorize(password, email)
      .then((result) => {
        if (result.token) {
          localStorage.setItem("jwt", result.token);
          setEmail("");
          setPassword("");
          setLoggedIn();
          navigate("/", { replace: true });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="sign">
      <h1 className="sign__title">Войти</h1>
      <Form
        buttonText="Войти"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={(event) => handleSubmit(event)}
      />
    </div>
  );
};

export default Login;
