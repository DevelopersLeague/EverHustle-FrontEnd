import { useMutation, useQuery } from "react-query";
import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

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
 * date must be in iso stirng format
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
