// src/js/reducers/index.js
import {INITAL_STATE, ADD_ARTICLE, FOUND_BAD_WORD} from "../constants/action-type"

export default function articleReducer(state = INITAL_STATE, action) {
      if (action.type === ADD_ARTICLE) {
          return Object.assign({}, state, {
              articles : state.articles.concat(action.payload)
          });
        //   state.articles.push(action.payload)
      }
      if (action.type === FOUND_BAD_WORD) {
          console.log("FOUND_BAD_WORD");
      }
    return state;
  };