const initialState = 'light';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CHANGE_THEME':
      return payload;

    default:
      return state;
  }
};
