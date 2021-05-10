import React from "react";
import TimerMain from "../Components/TimerMain"
import { useState } from 'react'
import DisplayTime from "../Components/DisplayTime"
import '../Styles/goals.css';

export default function Timers() {
    
    var [timeInterval, setTimeInterval] = useState(0);
    var dura = 0;
    function setTime(e){
        dura = e.target.value;
        //console.log(dura);
    }
    function onFormSubmit(e){
        e.preventDefault();
        setTimeInterval(dura);
        //console.log(timeInterval);
    }
    if(timeInterval > 0){
        return(
            <div className="container">
            <h1>CountdownCircleTimer</h1>
            
            <div className="timer-wrapper">
                <TimerMain durat={timeInterval} set={setTimeInterval}></TimerMain>                
            </div>
        </div>
        );
    }
    if(timeInterval <= 0){
    return (
        <div className="container">
            <h1>CountdownCircleTimer</h1>
            
            <div className="timer-wrapper">
                <form onSubmit={onFormSubmit}>                
                    <input type="number"  id="task" onChange={setTime}/>  
                    <label className="task-label" for="task" style={{position: 'none'}}>New Timer</label>
                    <button className="add-task-btn" type="submit">Start Timer</button>
                </form>  
            </div>
            <DisplayTime dateStr={(new Date()).toISOString().split("T")[0]}/>
        </div>
    )
}
}