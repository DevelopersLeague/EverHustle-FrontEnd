import { useCatchAxios } from "./catch-axios";
import { useQuery } from "react-query";
import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const getAllNotes = () => {
  return axios.get(`${SERVER_BASE_URL}/notes`);
};

export const useGetAllNotesQuery = () => {
  const modGetAllNotes = useCatchAxios(getAllNotes);
  return useQuery(["notes", "getAll"], modGetAllNotes);
};
