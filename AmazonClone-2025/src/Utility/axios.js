import  axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080/",
  baseURL: "https://amazon-clone-backend-ij0g.onrender.com/",
});

export default instance;
