
// import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/v1';
const fetchPost = (url, payload) => fetch(baseUrl.concat(url), {
  method: 'post',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
}).then(res => res.json())
  .then(res => res)
  .catch(error => error);

export default fetchPost;

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/v1',
//     // headers: { 'Content-Type': 'application/json' }
//   });

// axios
// .post("http://localhost:3000/api/v1/auth",payload)
// .then(response => {
//     console.log(response)
//   // create an array of contacts only with relevant data
//   dispatch({ type: "AUTHENTICATEION_SUCCESS", payload: response.data });
// })
// .catch(error => console.log(error));

// let respone = axiosInstance.post('/auth', payload)
// .then(function (response) {
//     console.log("LoginAction : Success", response.data);
//     dispatch({ type: "AUTHENTICATEION_SUCCESS", payload: response.data });
// })
// .catch(function (error) {
//     console.log("LoginAction : Error");
//     dispatch({ type: "AUTHENTICATEION_ERROR", payload: error.respone.data });
//     // return({ type: "AUTHENTICATEION_ERROR", payload: error });
// });
// return respone;
