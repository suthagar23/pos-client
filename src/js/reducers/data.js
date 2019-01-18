// src/js/reducers/index.js
import {INITAL_STATE, DATA_LOADED} from "../constants/action-type"

export default function dataReducer(state = INITAL_STATE, action) {
      if (action.type === DATA_LOADED) {
        return Object.assign({}, state, {
          remoteArticles: state.remoteArticles.concat(action.payload)
        });
      }
    return state;
  };