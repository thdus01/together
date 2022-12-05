import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, } from 'react-redux';
import { createStore } from 'redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import reportWebVitals from './reportWebVitals';
import './index.css';
import Root from './pages/Root';
import rootReducer from './modules/rootReducer';

import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 윤년 판단 플러그인
import 'dayjs/locale/ko'; // 한국어 가져오기

// 리덕스 개발자 도구 적용
// const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSTIOM__();
// 리덕스 호출
const store = createStore(rootReducer);
const persistor = persistStore(store);

dayjs.extend(isLeapYear); // 플러그인 등록
dayjs.locale('ko'); // 언어 등록

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Root />
        </PersistGate>
      </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
