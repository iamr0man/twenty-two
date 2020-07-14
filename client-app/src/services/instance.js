import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3003/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

// apiClient.interceptors.response.use(response => {
//   debugger
//    return response;
// }, error => {
//   if (error.response.status === 401) {
//     router.push('/login')
//   }
//   return error;
// });

export default apiClient;
