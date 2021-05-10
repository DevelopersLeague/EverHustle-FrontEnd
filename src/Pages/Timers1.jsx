
import styles from '../Styles/timer.module.css';
import React, { useState } from 'react'

function Timers() {
    let countdown;
    let time;
    const [timeSeconds, setTime] = useState(Number);
    const [timeCountdown,setTimeCount] = useState(Number);

    function startCountdown(e){
        e.preventDefault();
        console.log('starts');           
        setTimeCount(timeSeconds);
        countdown = setInterval(function(){                                
            console.log("STOP")
        }, 1000);             
    }

    function stopCountdown(e) {
        console.log(countdown); 
        clearInterval(countdown); 
        
    }
    function TimeCount(e){
        e.preventDefault();
        setTime(e.target.value);
    }
     
    return (
        <div>
            <div id="notes-body">
                <div className="container">
                    <div className={styles.center}>
                    <h2>TIMERS</h2>  
                    <br></br>
                    <input type="number" onChange={TimeCount}/>  
                    <button onClick={startCountdown}>AAA</button>
                    <button onClick={stopCountdown}>STOP</button>
                    <span>{timeCountdown}</span>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Timers

