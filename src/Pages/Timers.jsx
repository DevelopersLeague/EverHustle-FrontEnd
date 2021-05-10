import React from "react";
import renderTime from "../Components/TimersSub";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from 'react';

export default function Timers() {
    const [timeInterval, setTimeInterval] = useState(10);
    function setTime(e){
        setTimeInterval(e.target.value);
        console.log(timeInterval);
    }
    function onFormSubmit(e){
        e.preventDefault();
        setTime();
    }
    return (
        <div className="container">
            <h1>CountdownCircleTimer</h1>
            
            <div className="timer-wrapper">
                <form onSubmit={onFormSubmit}>
                    <input type="number" onChange={setTime}/>  
                    <input type="submit" value="Submit"/>
                </form>
                
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    colors={[["#004777", 0.55], ["#F7B801", 0.40], ["#A30000"]]}
                    onComplete={() => [false, 1000]}
                >
                {renderTime}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}