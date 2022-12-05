// redux/store/index.js
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'
import logger from 'redux-logger';

import orgSlice from '../slice/orgSlice';
import userSlice from '../slice/userSlice';
import loginTypeSlice from '../slice/loginTypeSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storageSession,
};

const reducers = combineReducers({
    orgSlice: orgSlice,
    userSlice: userSlice,
    loginTypeSlice: loginTypeSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // }).concat(logger),
    }),
});
export const persistor = persistStore(store);
export default store;