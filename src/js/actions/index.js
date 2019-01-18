// src/js/actions/index.js
import {ADD_ARTICLE} from "../constants/action-type";

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
  };