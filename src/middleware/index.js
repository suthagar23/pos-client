// import { ADD_ARTICLE, FOUND_BAD_WORD } from '../constants/action-type';

// const forbiddenWords = ['spam', 'money'];

export function forbiddenWordsMiddleware({ dispatch }) {
  return (next) => {
    // console.log('Im Middle Ware 1');
    return (action) => {
      // console.log('Im Middle Ware 2');
      
      // // do your stuff
      // if (action.type === ADD_ARTICLE) {
      //   const foundWord = forbiddenWords.filter(word => action.payload.title.includes(word));
      //   if (foundWord.length) {
      //     return dispatch({ type: FOUND_BAD_WORD });
      //   }
      // }
      return next(action);
    };
  };
}
