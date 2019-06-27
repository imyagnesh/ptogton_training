const initialState = {};

export default (state = initialState, { type }) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  if (requestState === 'REQUEST') {
    return {
      ...state,
      [requestName]: true,
    };
  }

  const { [requestName]: data, ...rest } = state;
  return rest;
};
