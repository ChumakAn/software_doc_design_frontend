import classes from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../../domain/user/User";
import axios from "axios";
export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const validateUser = async (e: any) => {
    e.preventDefault();
    if (password !== null && login !== null) {
      try {
        const response = await axios.get<User>("http://localhost:8080/users", {
          params: {
            login: login,
            password: password,
          },
        });
        if (response.data !== null) {
          alert(`Welcome ${response.data.name} ${response.data.surname}`);
          navigate(`/devices?userId=${response.data.id}`);
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.form}>
        <form>
          <div className={classes.header}>
            <p>Welcome Back</p>
            <span>Please log in to continue</span>
          </div>
          <label className={classes.inputContainer}>
            <p>Login</p>
            <input
              className={classes.loginInput}
              type="text"
              onChange={(e) => setLogin(e.target.value)}
              required={true}
              placeholder={"Login"}
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
            className={classes.loginButton}
            type="submit"
            onClick={validateUser}
          >
            Login
          </button>
          <div
            className={classes.signUpTextWrapper}
            onClick={() => navigate("/sign-up")}
          >
            <p>
              Do not have an account? <b>Click to Sign Up</b>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
