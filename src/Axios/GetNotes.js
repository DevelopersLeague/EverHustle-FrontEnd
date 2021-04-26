import axios from "axios";
const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

// base URL to make req to notes db

const instance = axios.create({
  baseURL: `${SERVER_BASE_URL}/notes`,
});

// instance.get("/notes");

export default instance;
