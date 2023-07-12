import axios from "axios";
import { apiConstatnt } from "../constants";

axios.defaults.baseURL = apiConstatnt?.API_BASE_URL;

export default axios;
