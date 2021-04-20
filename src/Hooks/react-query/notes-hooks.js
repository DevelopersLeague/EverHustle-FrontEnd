import { useMutation, useQuery } from "react-query";
import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const useGetAllNotesQuery = () => {
  return useQuery(["notes", "getAll"], async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/notes`, {
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

export const useCreateOneNoteMutation = () => {
  return useMutation(async ({ title, content, category }) => {
    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/notes`,
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

export const useDeleteOneNoteMutation = () => {
  return useMutation(async ({ id }) => {
    try {
      const res = await axios.delete(`${SERVER_BASE_URL}/notes/${id}`, {
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

export const useUpdateOneNoteMutation = () => {
  return useMutation(async ({ id, title, content, category }) => {
    const data = {};
    data.title = title ? title : undefined;
    data.content = content ? content : undefined;
    data.category = category ? category : undefined;
    // console.log(data);
    try {
      const res = await axios.put(
        `${SERVER_BASE_URL}/notes/${id}`,
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
