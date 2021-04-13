import React, { useState } from "react";
import styles from "../Styles/authForm.module.css";
import mysvg from "../images/undraw_moving_forward.svg";
import { useMessages } from "../context/message.context";
import { useFormik } from "formik";
import { useSignupMutation } from "../Hooks/react-query/auth-hooks";

const Signup = () => {
  const { actions } = useMessages();
  const { mutate } = useSignupMutation();
  const successMessage = actions.getMessages("successMessage");
  console.log(successMessage);
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: { email: "", password: "", firstName: "", lastName: "" },
    onSubmit: (values, { resetForm }) => {
      mutate(
        { ...values },
        {
          onSuccess: (data) => {
            resetForm({});
          },
        }
      );
    },
  });

  const customHandleChange = (e) => {
    actions.removeMessages("successMessage");
    actions.removeMessages("errorMessages");
    handleChange(e);
  };

  return (
    <div className={styles.mega_wrapper}>
      <div className={styles.contact_wrapper}>
        <div className={styles.left_side}>
          <img src={mysvg} width="92%" height="120%" />
        </div>
        <div className={styles.right_side}>
          <h2>Create Account</h2>
          {/* <div> */}
          <form method="POST" autocomplete="off" onSubmit={handleSubmit}>
            {successMessage ? <p>{successMessage}</p> : null}
            <div class={styles.form_row}>
              <input
                type="text"
                required
                autoComplete="off"
                name="firstName"
                id="firstName"
                onChange={customHandleChange}
                value={values.firstName}
                aria-autoComplete="off"
              />
              <span>Fname</span>
            </div>

            <div class={styles.form_row}>
              <input
                type="text"
                required
                autoComplete="off"
                aria-autoComplete="off"
                name="lastName"
                id="lastName"
                onChange={customHandleChange}
                value={values.lastName}
              />
              <span>Lname</span>
            </div>

            <div class={styles.form_row}>
              <input
                type="email"
                required
                autoComplete="off"
                aria-autoComplete="off"
                name="email"
                id="email"
                onChange={customHandleChange}
                value={values.email}
              />
              <span>Email</span>
            </div>

            <div class={styles.form_row}>
              <input
                type="password"
                required
                autoComplete="off"
                aria-autoComplete="off"
                name="password"
                id="password"
                onChange={customHandleChange}
                value={values.password}
              />
              <span>Password</span>
            </div>
            <div class={styles.form_row}></div>
            <div class={styles.form_row}>
              <button type="submit">sign up</button>
            </div>
          </form>
          <div class="socials-wrapper">
            <h3>
              Have an account? login <a href="/login">here</a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
