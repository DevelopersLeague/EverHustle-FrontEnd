import { useMutation, useQuery } from "react-query";
import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

/**
 * date:string must be in iso date format in utc
 * time:string must be in hh:mm:ss format
 */
export const useCreateOneFocustimeMutation = () => {
  return useMutation(async ({ time, date }) => {
    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/focustime`,
        { time: time, date: date },
        {
          headers: { Authorization: localStorage.getItem("authToken") },
        }
      );
      console.log("axios resp: ", res);
      return res.data;
    } catch (err) {
      console.log("axios err: ", err);
      throw new Error(err.response.data.message);
    }
  });
};

/**
 * dateStr must be in iso string format
 */
export const useGetTotalFocustimeByDateQuery = (dateStr) => {
  return useQuery(["focustime", "getAll", "byDate"], async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/focustime/${dateStr}`, {
        headers: { Authorization: localStorage.getItem("authToken") },
      });
      console.log("axios resp: ", res);
      return res.data;
    } catch (err) {
      console.log("axios err: ", err);
      throw new Error(err.response.data.message);
    }
  });
};
