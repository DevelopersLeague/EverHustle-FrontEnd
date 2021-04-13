import { useQueries, useMutation } from "react-query";
import axios from "axios";
import { useMessages } from "../../context/message.context";
const SERVER_BASE_URL = "http://localhost:8000/api/v1";
// const SERVER_BASE_URL = "https://everhustle-server.herokuapp.com/api/v1";

export const useLoginMutation = () => {
  const { actions } = useMessages();
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
      console.log("axios error: ", JSON.stringify(err.response.data));
      actions.setMessages("errorMessage", err.response.data.message);
      throw new Error(err.response.data.message);
    }
  });
  return mutation;
};

export const useSignupMutation = () => {
  const { actions } = useMessages();
  const mutation = useMutation(
    async ({ email, password, firstName, lastName }) => {
      try {
        const resp = await axios.post(`${SERVER_BASE_URL}/auth/signup`, {
          email,
          password,
          firstName,
          lastName,
        });
        console.log("axios resp: ", resp);
        // console.log("type: ", typeof resp.data.message);
        actions.setMessages("successMessage", resp.data.message);
        return resp.data;
      } catch (err) {
        console.log("axios error: ", JSON.stringify(err.response.data));
        actions.setMessages("errorMessage", err.response.data.message);
        throw new Error(err.response.data.message);
      }
    }
  );
  return mutation;
};
