// src/js/actions/index.js
import {ADD_ARTICLE} from "../constants/action-type";

    // Redux need onlu simple objects
  export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
  };

   // redux-thunk can only return functions, promises
  export function getData() {
    return function(dispatch) {
      return fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "DATA_LOADED", payload: json });
        });
    };
  }