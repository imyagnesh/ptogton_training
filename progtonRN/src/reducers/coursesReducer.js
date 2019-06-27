import * as types from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case `${types.FETCH}_${types.COURSES}_${types.SUCCESS}`:
      return payload;

    case `${types.SAVE}_${types.COURSES}_${types.SUCCESS}`:
      return [...state, payload];

    case `${types.UPDATE}_${types.COURSES}_${types.SUCCESS}`: {
      const index = state.findIndex(x => x.id === payload.id);
      return [...state.slice(0, index), payload, ...state.slice(index + 1)];
    }

    default:
      return state;
  }
};
