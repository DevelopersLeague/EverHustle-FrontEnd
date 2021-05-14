import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  useCreateOneFocustimeMutation,
  useGetTotalFocustimeByDateQuery,
} from "../Hooks/react-query/focustime-hooks";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import renderTime from "../Components/TimersSub";
import "../Styles/goals.css";

let interval;
let timeout;

const hrminsecTosec = (hr, min, sec) => {
  return JSON.parse(hr) * 3600 + JSON.parse(min) * 60 + JSON.parse(sec);
};

function secondToString(timeInSecs) {
  var timeStr = "";
  const hours = Math.floor(timeInSecs / 3600);
  if (hours > 9) {
    timeStr = timeStr.concat(JSON.stringify(hours));
  } else {
    timeStr = timeStr.concat("0" + JSON.stringify(hours));
  }
  timeStr = timeStr + ":";
  const minutes = Math.floor((timeInSecs % 3600) / 60);
  if (minutes > 9) {
    timeStr = timeStr.concat(JSON.stringify(minutes));
  } else {
    timeStr = timeStr.concat("0" + JSON.stringify(minutes));
  }
  timeStr = timeStr + ":";
  const seconds = timeInSecs % 60;
  if (seconds > 9) {
    timeStr = timeStr.concat(JSON.stringify(seconds));
  } else {
    timeStr = timeStr.concat("0" + JSON.stringify(seconds));
  }
  console.log(timeStr);
  return timeStr;
}

export default function Timers() {
  const [hrInput, setHrInput] = useState("0");
  const [minInput, setMinInput] = useState("0");
  const [secInput, setSecInput] = useState("0");
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [dateStr, setDateStr] = useState(null);
  const mutation = useCreateOneFocustimeMutation();

  useEffect(() => {
    setDateStr(new Date().toISOString().split("T")[0]);
  }, []);

  return (
    <div className="container">
      <h1>CountdownCircleTimer</h1>
      {!isRunning ? (
        <div className="timer-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setTotalTime(hrminsecTosec(hrInput, minInput, secInput));
              console.log(hrInput, minInput, secInput);
              setCurrentTime(0);
              setIsRunning(true);
              setHrInput(0);
              setMinInput(0);
              setSecInput(0);
            }}
          >
            <input
              type="number"
              value={hrInput}
              onChange={(e) => {
                setHrInput(e.target.value);
              }}
              id="task"
            />
            <input
              type="number"
              value={minInput}
              onChange={(e) => {
                setMinInput(e.target.value);
              }}
              id="task"
            />
            <input
              type="number"
              value={secInput}
              onChange={(e) => {
                setSecInput(e.target.value);
              }}
              id="task"
            />
            <label
              className="task-label"
              for="task"
              style={{ position: "none" }}
            >
              New Timer
            </label>
            <button className="add-task-btn" type="submit">
              Start Timer
            </button>
          </form>
          {dateStr ? (
            !mutation.isLoading ? (
              <DateDisplay dateStr={dateStr} />
            ) : (
              "loading"
            )
          ) : (
            "loading"
          )}
        </div>
      ) : (
        <>
          <Display
            setCurrentTime={setCurrentTime}
            totalTime={totalTime}
            setIsRunning={setIsRunning}
            currentTime={currentTime}
            mutation={mutation}
            dateStr={dateStr}
          />
          <button
            className="add-task-button"
            onClick={() => {
              clearInterval(interval);
              clearTimeout(timeout);
              //   console.log(currentTime);
              setIsRunning(false);
              mutation.mutate({
                date: dateStr,
                time: secondToString(currentTime),
              });
            }}
          >
            {mutation.isLoading ? "loading" : "stop"}
          </button>
        </>
      )}
    </div>
  );
}

const DateDisplay = (props) => {
  const query = useGetTotalFocustimeByDateQuery(props.dateStr);
  return <>{query.isLoading ? "loading" : <p>{query.data.time}</p>}</>;
};

const Display = (props) => {
  useEffect(() => {
    console.log(props.currentTime);
    interval = setInterval(() => {
      props.setCurrentTime((prev) => {
        return prev + 1;
      });
    }, 1000);
    timeout = setTimeout(() => {
      clearInterval(interval);
      props.mutation.mutate(
        { date: props.dateStr, time: secondToString(props.totalTime) },
        {
          onSuccess: () => {
            props.setIsRunning(false);
          },
        }
      );
    }, props.totalTime * 1000);
    return () => {
      console.log("unmount");
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div>
      {props.totalTime - props.currentTime}
      <CountdownCircleTimer
        isPlaying
        duration={props.totalTime}
        colors={[["#004777", 0.55], ["#F7B801", 0.4], ["#A30000"]]}
        onComplete={() => [false, 1000]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};
