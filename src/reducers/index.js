import * as types from '../actions/types';
import prices from './data';

const initialState = {
  prices,
  activePriceHeader: '300-400',
  mostPopularPlan: 'Qualified 40',
  online: true
}

const reducer = (state = initialState, action) => {
  switch(action.type){
      case types.SET_PRICE_HEADER: 
        return {
          ...state, 
          activePriceHeader: action.payload
        }
      case types.SET_NETWORK_STATUS:
        return {
          ...state,
          online: action.payload
        }
      default:  
        return state;
  }
}

export default reducer;