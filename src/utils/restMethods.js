
import { getAuthToken } from './authUtils';

const baseUrl = 'http://localhost:3000/api/v1';
export const fetchPost = (url, payload) => {
  const authToken = getAuthToken();
  return fetch(baseUrl.concat(url), {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ authToken, 
    },
    body: JSON.stringify(payload),
  }).then(res => res.json())
    .then(res => res)
    .catch(error => error);
};


export const fetchGet = (url, searchValue) => {
  const authToken = getAuthToken();
  return fetch(baseUrl.concat(url).concat('/').concat(searchValue), {
    method: 'get',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ authToken, 
    },
  }).then(res => res.json())
    .then(res => res)
    .catch(error => error);
};