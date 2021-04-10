import React from 'react'
import styles from '../Styles/authForm.module.css'
const Login = () => {
    return (
        <div>
            <form method="POST" autocomplete="off">
                <div class={styles.form_row}>
                <input type="text" required autoComplete="off" aria-autoComplete="off" />
                <span>Username or Email</span>
                </div>
                <div class={styles.form_row}>
                <input type="password" required autoComplete="off" aria-autoComplete="off"/>
                <span>Password</span> 
                </div>
                <div class={styles.form_row}></div>
                <div class={styles.form_row}>
                <button type="submit">Login to your Account</button>
            </div>
      </form>
      
        </div>
    )
}

export default Login
