import { useMessages } from "../../context/message.context";

export async function useCatchAxios(
  axiosFn,
  { isLogging, successMessageKey, errorMessageKey }
) {
  const { actions } = useMessages();
  return async function fn() {
    try {
      let resp = await axiosFn();
      if (isLogging) {
        console.log("axios resp: ", resp);
        if (successMessageKey) {
          actions.setMessages(successMessageKey, resp.data.message);
        }
      }
      return resp.data;
    } catch (err) {
      if (isLogging) {
        console.log("axios error: ", err);
      }
      if (errorMessageKey) {
        actions.setMessages(successMessageKey, err.response.data.message);
      }
      throw new Error(err.response.data.message);
    }
  };
}
