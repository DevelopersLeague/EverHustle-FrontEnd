import React from 'react'
import renderTime from "../Components/TimersSub";
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import '../Styles/goals.css';

function TimerMain(props) {
    var dura = 0;
    dura = props.durat;
    return (
        <div>
            <CountdownCircleTimer
                    isPlaying
                    duration= {dura}
                    colors={[["#004777", 0.55], ["#F7B801", 0.40], ["#A30000"]]}
                    onComplete={() => [false, 1000]}
                >
                    {renderTime}
                    
                    
            </CountdownCircleTimer>  
            <button class="add-task-btn"  onClick={()=>{props.set(0)}}>Stop</button>
            {
                        setTimeout(function(){
                            console.log("hello");
                            props.set(0);
                        }, ((dura)*1000))
            }
        </div>
        
    )
}

export default TimerMain
