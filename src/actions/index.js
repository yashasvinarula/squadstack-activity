import * as types from './types';

export const setPriceHeader = category => dispatch => {
  dispatch({
    type: types.SET_PRICE_HEADER,
    payload: category
  });
}

export const setNetworkStatus = online => dispatch => {
  dispatch({
    type: types.SET_NETWORK_STATUS,
    payload: online
  });
}