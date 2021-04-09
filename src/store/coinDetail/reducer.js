
const initialState = {
  loading: true,
  coin: []
};

export default function coinPageSliceReducer(state = initialState, action) {
     switch (action.type) {
    case "coinDetail/startLoadingCoin": {
      return {
        loading: true,
        coin: null
      };
    }
    case "coinDetail/coinFullyFetched": {
      return {
        loading: false,
        coin: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
