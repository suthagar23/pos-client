

const tokenSample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNpbmdhbTEwMTExIiwidXNlclNjb3BlcyI6WyJHRVRfVVNFUlMiLCJHRVRfVVNFUiIsIlBPU1RfVVNFUiIsIkdFVF9JVEVNUyIsIkdFVF9JVEVNIiwiUE9TVF9JVEVNIiwiR0VUX09SREVSUyIsIkdFVF9PUkRFUiIsIlBPU1RfT1JERVIiLCJTRUFSQ0hfSVRFTSJdLCJpYXQiOjE1NDg3Mzk1OTJ9.2PId3THG70b9_KcwijFm44KlwmRcSMOH3BTLlJ3ZX3A';

const baseUrl = 'http://localhost:3000/api/v1';
export const fetchPost = (url, payload) => fetch(baseUrl.concat(url), {
  method: 'post',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ tokenSample, 
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
    'Authorization': 'Bearer '+ tokenSample, 
  },
}).then(res => res.json())
  .then(res => res)
  .catch(error => error);
