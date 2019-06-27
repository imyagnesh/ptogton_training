import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigation';

import store from './configureStore';

const index = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default index;
