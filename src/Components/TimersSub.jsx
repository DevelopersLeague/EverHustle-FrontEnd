import React from "react";

// const TimersSub = ({ remainingTime }) => {
//     if (remainingTime === 0) {
//       return <div className="timer">Time Completed</div>;
//     }
//     const hours = Math.floor(remainingTime / 3600)
//     const minutes = Math.floor((remainingTime % 3600) / 60)
//     const seconds = remainingTime % 60
  
    
//     return (
//       <div className="timer">
//         <div className="text">Remaining</div>
//         <div className="value">{`${hours}:${minutes}:${seconds}`}</div>
//         <div className="text">seconds</div>
//       </div>
//     );
// };
// import React from 'react'

function TimersSub({ remainingTime }) {
  if (remainingTime == 0) {
    return <div className="timer">Time Completed</div>;
  }
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60
  return (
    <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{`${hours}:${minutes}:${seconds}`}</div>
        <div className="text">seconds</div>
    </div>
  )
}

export default TimersSub

// export default TimersSub;