
// import axios from 'axios';
const tokenSample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNpbmdhbTEwMTExIiwidXNlclNjb3BlcyI6WyJHRVRfVVNFUlMiLCJHRVRfVVNFUiIsIlBPU1RfVVNFUiIsIkdFVF9JVEVNUyIsIkdFVF9JVEVNIiwiUE9TVF9JVEVNIiwiR0VUX09SREVSUyIsIkdFVF9PUkRFUiIsIlBPU1RfT1JERVIiLCJTRUFSQ0hfSVRFTSJdLCJpYXQiOjE1NDg3Mzk1OTJ9.2PId3THG70b9_KcwijFm44KlwmRcSMOH3BTLlJ3ZX3A';

const baseUrl = 'http://localhost:3000/api/v1';
export const fetchPost = (url, payload) => fetch(baseUrl.concat(url), {
  method: 'post',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
}).then(res => res.json())
  .then(res => res)
  .catch(error => error);



export const fetchGet = (url, searchValue) => fetch(baseUrl.concat(url).concat('/').concat(searchValue), {
  method: 'get',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+tokenSample, 
  },
}).then(res => res.json())
  .then(res => res)
  .catch(error => error);

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
