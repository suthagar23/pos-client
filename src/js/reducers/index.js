// src/js/reducers/index.js
import {ADD_ARTICLE, FOUND_BAD_WORD} from "../constants/action-type"

const initialState = {
    articles: []
  };
  function rootReducer(state = initialState, action) {
      if (action.type === ADD_ARTICLE) {
          return Object.assign({}, state, {
              articles : state.articles.concat(action.payload)
          });
        //   state.articles.push(action.payload)
      }
      else if (action.type === FOUND_BAD_WORD) {
          console.log("sutja");
      }
    return state;
  };
  export default rootReducer;