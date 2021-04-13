import React, { useState } from "react";
import styles from "../Styles/authForm.module.css";
import { useLoginMutation } from "../Hooks/react-query/auth-hooks";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useFormik } from "formik";
import { useMessages } from "../context/message.context";

const Login = () => {
  const { actions } = useMessages();
  const errorMessage = actions.getMessages("errorMessage");
  const { mutate } = useLoginMutation();
  const history = useHistory();
  const auth = useAuth();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values, { resetForm }) => {
      mutate(
        { ...values },
        {
          onSuccess: (data) => {
            auth.actions.login(data.token);
            history.push("/notes");
            resetForm({});
          },
        }
      );
    },
  });

  return (
    <div>
      <form method="POST" autocomplete="off" onSubmit={handleSubmit}>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <div class={styles.form_row}>
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={(e) => {
              actions.removeMessages("errorMessage");
              handleChange(e);
            }}
            autoComplete="off"
            aria-autoComplete="off"
            value={values.email}
          />
          <span>Username or Email</span>
        </div>
        <div class={styles.form_row}>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              actions.removeMessages("errorMessage");
              handleChange(e);
            }}
            required
            autoComplete="off"
            aria-autoComplete="off"
            value={values.password}
          />
          <span>Password</span>
        </div>
        <div class={styles.form_row}></div>
        <div class={styles.form_row}>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
