import React from 'react'
import styles from '../Styles/authForm.module.css'
import mysvg from '../images/undraw_moving_forward.svg'
const Signup = () => {
    return (


        <div className={styles.mega_wrapper}>
            <div className={styles.contact_wrapper}>
                <div className={styles.left_side}>
                    <img src={mysvg} width="92%" height="120%"/>
                </div>
                <div className={styles.right_side}>
                <h2>Create Account</h2>
        {/* <div> */}
            <form method="POST" autocomplete="off">
                <div class={styles.form_row}>
                <input type="text" required autoComplete="off" aria-autoComplete="off" />
                <span>Fname</span>
                </div>

                <div class={styles.form_row}>
                <input type="text" required autoComplete="off" aria-autoComplete="off" />
                <span>Lname</span>
                </div>

                <div class={styles.form_row}>
                <input type="email" required autoComplete="off" aria-autoComplete="off" />
                <span>Email</span>
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
            <div class="socials-wrapper">
                    <h3>Have an account? login <a href="/login">here</a></h3>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Signup;
