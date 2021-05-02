import { useMutation, useQuery } from "react-query";
import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const useGetAllGoalsQuery = () => {
  return useQuery(["goals", "getAll"], async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/goals`, {
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

export const useCreateOneGoalMutation = () => {
  return useMutation(async ({ title, content, category }) => {
    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/goals`,
        { title, content, category },
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

export const useDeleteOneGoalMutation = () => {
  return useMutation(async ({ id }) => {
    try {
      const res = await axios.delete(`${SERVER_BASE_URL}/goals/${id}`, {
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

export const useUpdateOneGoalMutation = () => {
  return useMutation(async ({ id, title, content, category, isCompleted }) => {
    const data = {};
    data.title = title ? title : undefined;
    data.content = content ? content : undefined;
    data.category = category ? category : undefined;
    data.isCompleted = isCompleted !== undefined ? isCompleted : undefined;
    console.log(data);
    try {
      const res = await axios.put(
        `${SERVER_BASE_URL}/goals/${id}`,
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
