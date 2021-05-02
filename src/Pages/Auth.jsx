import React from 'react'
import Login from '../Components/Login'
import { Link } from 'react-router-dom';
import styles from '../Styles/authForm.module.css'
import mysvg from '../images/undraw_moving_forward.svg'
const Auth = () => {
    return (
        <div className={styles.mega_wrapper}>
            <div className={styles.contact_wrapper}>
                <div className={styles.left_side}>
                    <img src={mysvg} width="92%" alt="svg"/>
                </div>
                <div className={styles.right_side}>
                <h2>Account Login</h2>
                <Login/>
        {/* <!-- login form here --> */}
                <div class="socials-wrapper">
                        <h3>Don't have an account? Sign-up <Link to="/sign-up">here</Link></h3>
                </div>
            </div>
            </div>
        </div>
    )
    
}

export default Auth
