import { useQueries, useMutation } from "react-query";
import axios from "axios";
// const SERVER_BASE_URL = "http://localhost:8000/api/v1";
const SERVER_BASE_URL = "https://everhustle-server.herokuapp.com/api/v1";

export const useLoginMutation = () => {
  const mutation = useMutation(async ({ email, password }) => {
    //   console.debug({ email, password });
    try {
      const resp = await axios.post(`${SERVER_BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log("axios resp: ", resp);
      return resp.data;
    } catch (err) {
      console.log("axios error: ", JSON.stringify(err.response.data.message));
      throw new Error(err.response.data.message);
    }
  });
  return mutation;
};
