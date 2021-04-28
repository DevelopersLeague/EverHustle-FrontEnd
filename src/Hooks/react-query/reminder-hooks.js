import { useMutation, useQuery } from "react-query";
import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const useGetAllRemindersQuery = () => {
  return useQuery(["reminders", "getAll"], async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/reminders`, {
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

/**
 * dateStr:string must be in iso string format in utc
 */
export const useGetAllRemindersByDateQuery = (dateStr) => {
  return useQuery(["reminders", "getAll", "byDate"], async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/reminders`, {
        headers: { Authorization: localStorage.getItem("authToken") },
        params: { date: dateStr },
      });
      console.log("axios resp: ", res);
      return res.data;
    } catch (err) {
      console.log("axios err: ", err);
      throw new Error(err.response.data.message);
    }
  });
};

/**
 * timestamp: string, must be in iso date format utc
 */
export const useCreateOneReminderMutation = () => {
  return useMutation(async ({ title, content, category, timestamp }) => {
    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/reminders`,
        { title, content, category, timestamp },
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

export const useDeleteOneReminderMutation = () => {
  return useMutation(async ({ id }) => {
    try {
      const res = await axios.delete(`${SERVER_BASE_URL}/reminders/${id}`, {
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

/**
 * timestamp: string, must be in iso date format utc
 */
export const useUpdateOneReminderMutation = () => {
  return useMutation(async ({ id, title, content, category, timestamp }) => {
    const data = {};
    data.title = title ? title : undefined;
    data.content = content ? content : undefined;
    data.category = category ? category : undefined;
    data.timestamp = timestamp ? timestamp : undefined;
    try {
      const res = await axios.put(
        `${SERVER_BASE_URL}/reminders/${id}`,
        { ...data },
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
