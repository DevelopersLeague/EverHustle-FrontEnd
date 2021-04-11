import React, { useState } from "react";
import styles from "../Styles/authForm.module.css";
// import { useLoginMutation,  } from "../Hooks/react-query/auth-hooks";
import { axiosLogin } from "../Hooks/axios/auth";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Login = () => {
  //   const { mutate, isError, error, data } = useLoginMutation();
  const history = useHistory();
  const { actions } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    axiosLogin({ email, password })
      .then((data) => {
        actions.login(data.token);
        console.log(JSON.stringify(data));
        history.push("/notes");
      })
      .catch((err) => {
        setErrors((prev) => {
          return { ...prev, email: err.message };
        });
      });
    setEmail("");
    setPassword("");
    setIsSubmitting(false);
  }
  return (
    <div>
      <form method="POST" autocomplete="off" onSubmit={onFormSubmit}>
        {errors.email ? <p>{errors.email}</p> : null}
        <div class={styles.form_row}>
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="off"
            aria-autoComplete="off"
            value={email}
            onClick={(e) => {
              setErrors({});
            }}
          />
          <span>Username or Email</span>
        </div>
        <div class={styles.form_row}>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            autoComplete="off"
            aria-autoComplete="off"
            value={password}
          />
          <span>Password</span>
        </div>
        <div class={styles.form_row}></div>
        <div class={styles.form_row}>
          <button type="submit">
            {isSubmitting ? "loading..." : "Login to your Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
