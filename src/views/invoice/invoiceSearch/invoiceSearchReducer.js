
import * as constants from './invoiceSearchConstants';


const INITAL_STATE =   {
  suggestions : [],
  activeIndex: constants.DEFAULT_ACTIVE_INDEX
};

const calculateNextIndex = (state, change) => {
  let nextIndex = state.activeIndex + change;
  nextIndex = nextIndex < constants.DEFAULT_ACTIVE_INDEX ? constants.DEFAULT_ACTIVE_INDEX : nextIndex;
  nextIndex = nextIndex > state.suggestions.length -1 ? state.suggestions.length -1 : nextIndex;
  return nextIndex;
};

export default (state = INITAL_STATE, action) => {
  const {sampleItemId, ...remainState} = state;
  if (action.type === constants.ADD_UPDATED_ITEM_SUGGESTIONS) {
    console.log('ADD_UPDATED_ITEM_SUGGESTIONS', action.payload); 
    // return action.payload;
    return { activeIndex: constants.DEFAULT_ACTIVE_INDEX, suggestions: action.payload };
  }
  if (action.type === constants.REMOVE_ALL_ITEM_SUGGESTIONS) {
    console.log('REMOVE_ALL_ITEM_SUGGESTIONS', action.payload); 
    // return action.payload;
    return { activeIndex: constants.DEFAULT_ACTIVE_INDEX, suggestions: action.payload };
  }

  if (action.type === constants.SUGGESTION_POSITION_UP) {
    console.log('SUGGESTION_POSITION_UP', action.payload); 
    // return action.payload;
    return Object.assign({}, state, {
      ...state,
      activeIndex: calculateNextIndex(state, action.payload)
    });
  }

  if (action.type === constants.SUGGESTION_POSITION_DOWN) {
    console.log('SUGGESTION_POSITION_DOWN', action.payload); 
    // return action.payload;
    return Object.assign({}, state, {
      ...state,
      activeIndex: calculateNextIndex(state, action.payload)
    });
  }

  if (action.type === constants.RESET_SUGGESTION_ITEMS) {
    return INITAL_STATE;
  }

  return state;
};
  