// src/js/reducers/index.js

import { combineReducers } from 'redux'
import articleReducer from './article'
import dataReducer from './data'

// export default articleReducer;

// const rootReducer =  combineReducers({
//     article : articleReducer,
//     data : dataReducer
// })

import {ADD_ARTICLE, FOUND_BAD_WORD, DATA_LOADED} from "../constants/action-type"
const initialState = {
    articles: [],
    remoteArticles : []
  };
  function rootReducer(state = initialState, action) {
      if (action.type === ADD_ARTICLE) {
          return Object.assign({}, state, {
              articles : state.articles.concat(action.payload)
          });
        //   state.articles.push(action.payload)
      }
      if (action.type === FOUND_BAD_WORD) {
          console.log("FOUND_BAD_WORD");
      }
      if (action.type === DATA_LOADED) {
        return Object.assign({}, state, {
          remoteArticles: state.remoteArticles.concat(action.payload)
        });
      }
    return state;
  };
  export default rootReducer;