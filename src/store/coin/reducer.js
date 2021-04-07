// src/store/feed/reducer.js

const initialState = {
  loading: true,
  coins: []
};


export default function coinSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "coin/startLoading": {
      return {
        ...state,
        loading: action.payload
      };
    }
    case "coin/coinsFetched": {
      return {
        loading: false,
        coins:  action.payload
      };
    }
    default: {
      return state;
    }
  }
}