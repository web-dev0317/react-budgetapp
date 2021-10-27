import { configureStore } from '@reduxjs/toolkit';

import wxmReducer from './slices/wxm-slice';

const store = configureStore({
  reducer: wxmReducer,
});

export default store;
