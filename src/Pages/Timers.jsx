import React from 'react'
import styles from '../Styles/timer.module.css'

function Timers() {
    let countdown;
    let timeremaining = 60;
    function startCountdown(e){
        console.log('starts');
        countdown = setInterval(function(){
            timeremaining -= 1;
                
            if(timeremaining <= 0) {
                clearInterval(countdown); 
                console.log("stop");                                               
                
                // as timer is over we are not playing 
                
            }
            }, 1000); 
    }
     
    return (
        <div>
            <div id="notes-body">
                <div className="container">
                    <div className={styles.center}>
                    <h2>TIMERS</h2>    
                    <button onClick={startCountdown}>AAA</button>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Timers
