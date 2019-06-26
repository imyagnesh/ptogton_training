const initialState = 'en';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CHANGE_LOCALE':
      return payload;

    default:
      return state;
  }
};
