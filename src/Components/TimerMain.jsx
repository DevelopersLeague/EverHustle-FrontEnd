import React from 'react'
import renderTime from "../Components/TimersSub";
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import {useCreateOneFocustimeMutation} from "../Hooks/react-query/focustime-hooks"
import {useQueryClient} from "react-query"
import '../Styles/goals.css';

function secondToString(timeInSecs){
    var timeStr = "";
    const hours = Math.floor(timeInSecs / 3600)
    if(hours>9){
        timeStr = timeStr.concat(JSON.stringify(hours))
    } else{
        timeStr = timeStr.concat("0"+JSON.stringify(hours))
    }
    timeStr = timeStr + ":";
    const minutes = Math.floor((timeInSecs % 3600) / 60)
    if(minutes>9){
        timeStr = timeStr.concat(JSON.stringify(minutes))
    } else{
        timeStr = timeStr.concat("0"+JSON.stringify(minutes))
    }
    timeStr = timeStr + ":";
    const seconds = timeInSecs % 60
    if(seconds>9){
        timeStr = timeStr.concat(JSON.stringify(seconds))
    } else{
        timeStr = timeStr.concat("0"+JSON.stringify(seconds))
    }
    console.log(timeStr);
    return timeStr;
}

function TimerMain(props) {
    var dura = 0;
    dura = props.durat;
    const mutation = useCreateOneFocustimeMutation();
    const client = useQueryClient();
    
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
                            var timeString = secondToString(dura);                             
                            mutation.mutate({time: timeString, date: ((new Date()).toISOString().split("T")[0])}, {onSuccess: ()=>{client.invalidateQueries("focustime")}})
                            props.set(0);
                        }, ((dura)*1000))
            }
        </div>
        
    )
}

export default TimerMain
