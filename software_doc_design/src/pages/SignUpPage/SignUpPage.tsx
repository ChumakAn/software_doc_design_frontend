import classes from "./SignUpPage.module.css";
import { useState } from "react";
import axios from "axios";
import { User } from "../../domain/user/User";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [login, setLogin] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (
      name !== null &&
      surname !== null &&
      phoneNumber !== null &&
      password !== null &&
      login !== null
    ) {
      try {
        const user: User = {
          name: name,
          surname: surname,
          phoneNumber: phoneNumber,
          login: login,
          password: password,
        };
        const response = await axios.post<User>(
          "http://localhost:8080/users",
          user
        );
        if (response.data !== null) {
          alert(`Welcome ${response.data.name} ${response.data.surname}`);
          navigate("/login");
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <div className={classes.signUpContainer}>
      <div className={classes.form}>
        <form>
          <div className={classes.header}>
            <p>Sign up form</p>
            <span>Please fill in fields</span>
          </div>
          <label className={classes.inputContainer}>
            <p>Name</p>
            <input
              className={classes.nameInput}
              type="text"
              onChange={(e) => setName(e.target.value)}
              required={true}
              placeholder={"Name"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Surname</p>
            <input
              className={classes.surnameInput}
              type="text"
              onChange={(e) => setSurname(e.target.value)}
              required={true}
              placeholder={"Surname"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Phone number</p>
            <input
              className={classes.phoneNumberInput}
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required={true}
              placeholder={"Phone number"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Nickname</p>
            <input
              className={classes.loginInput}
              onChange={(e) => setLogin(e.target.value)}
              type="text"
              required={true}
              placeholder={"Nickname"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Password</p>
            <input
              className={classes.passwordInput}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required={true}
              placeholder={"Password"}
            />
          </label>
          <button
            className={classes.signUpButton}
            type="submit"
            onClick={handleSignUp}
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};
