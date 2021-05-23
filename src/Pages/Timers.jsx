import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  useCreateOneFocustimeMutation,
  useGetTotalFocustimeByDateQuery,
} from "../Hooks/react-query/focustime-hooks";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import renderTime from "../Components/TimersSub";
import styles from "../Styles/timer.module.css";

let interval;
let timeout;
let words;

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
    <div className={styles.bodyBack}>
      <div className={styles.container}>
        <div className={styles.backImage}></div>
        <h1 className={styles.heading}>Countdown Timer</h1>
        {!isRunning ? (
          <div className={styles.timerWrapper}>
            <span className={styles.description}>
              Set your Productive time and <br></br>keep track of all the time
              set
            </span>
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
                id="hours"
                className={styles.inputN}
                onChange={(e) => {
                  setHrInput(e.target.value);
                }}
              />

              <input
                type="number"
                value={minInput}
                id="minutes"
                className={styles.inputN}
                onChange={(e) => {
                  setMinInput(e.target.value);
                }}
              />

              <input
                type="number"
                value={secInput}
                id="seconds"
                className={styles.inputN}
                onChange={(e) => {
                  setSecInput(e.target.value);
                }}
              ></input>
              <br></br>
              {/* <label
                  className={styles.taskLabel}
                  for="task"
                  style={{ position: "none" }}
                >
                  New Timer
                </label> */}
              <label htmlFor="hours" id={styles.labelN}>
                Hours
              </label>
              <label htmlFor="minutes" id={styles.labelN}>
                Minutes
              </label>
              <label for="seconds" id={styles.labelN}>
                Seconds
              </label>
              <br></br>
              <button
                className={styles.addTaskBtn}
                id={styles.descriptions}
                type="submit"
              >
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
            <span className={styles.description}>
              The clock is ticking. Increase your productivity
            </span>
            <Display
              setCurrentTime={setCurrentTime}
              totalTime={totalTime}
              setIsRunning={setIsRunning}
              currentTime={currentTime}
              mutation={mutation}
              dateStr={dateStr}
            />
            <button
              className={styles.stopTaskBtn}
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
    </div>
    // </div>
  );
}

const DateDisplay = (props) => {
  const query = useGetTotalFocustimeByDateQuery(props.dateStr);
  return (
    <>
      <div>
        <h4 className={styles.head2}>Today's Total Time Tracked</h4>
        {query.isLoading
          ? "loading"
          : (((words = query.data.time.split(":")), console.log(words)),
            (
              <div>
                <p className={styles.description} id={styles.timeSpent}>
                  {words[0]}
                  <span className={styles.timeFormat}>Hr</span> :{words[1]}
                  <span className={styles.timeFormat}>Min</span> :{words[2]}
                  <span className={styles.timeFormat}>Sec</span>
                </p>
              </div>
            ))}
      </div>
    </>
  );
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
      <br></br>
      {/* {props.totalTime - props.currentTime} */}
      <div className={styles.timerRound}>
        <CountdownCircleTimer
          isPlaying
          duration={props.totalTime}
          colors={[["#004777", 0.55], ["#F7B801", 0.4], ["#A30000"]]}
          onComplete={() => [false, 1000]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};
