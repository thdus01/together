import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
// localStorage : import storage from 'redux-persist/lib/storage'
// sessionStorage : import storageSession from 'redux-persist/lib/storage/session'
import counter from './counter';
import user from './user';

const persistConfig = {
  key: "root",
  // sessionStorage에 저장합니다.
  storage: storageSession,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["user"]
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  counter,
  user,

  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});

export default persistReducer(persistConfig, rootReducer);
