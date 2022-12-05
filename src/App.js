import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import VolunteerSearchPage from './pages/VolunteerSearchPage';
import VolunteerRequestPage from './pages/VolunteerRequestPage';
import LoginLoadingPage from './pages/loading/LoginLoadingPage';
import OrgLoadingPage from './pages/loading/OrgLoadingPage';
import AdminLoadingPage from './pages/loading/AdminLoadingPage';
import VolLoadingPage from './pages/loading/VolLoadingPage';
import AdminPage from './pages/AdminPages/AdminPage';
import CurrentRecruit from './pages/AdminPages/CurrentRecruit';
import CompletedRecruit from './pages/AdminPages/CompletedRecruit';
import AdminDrawer from './pages/AdminPages/AdminDrawer';
import OrgMyPage from './pages/AdminPages/OrgMyPage';
import VolDetail from './pages/AdminPages/VolDetail';
import TestPage from './pages/AdminPages/test/TestPage';
import TestVolInsertPage from './pages/AdminPages/test/TestVolInsertPage';
import NoticeMain from './post/page/NoticeMain';
import NoticeView from './post/page/NoticeView';
import NoticeCreate from './post/page/NoticeCreate';

function App(props) {
  
  // axios
  /*
  useEffect(() => {
    Axios.get('http://220.66.115.181/test')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  })
  */

  return (
      <div className='app-body'>
        <Routes>
          <Route exact={true} path='/' element={<MainPage/>}/>
          <Route path='/SignIn' element={<SignIn/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/LoginLoadingPage' element={<LoginLoadingPage/>}/>
          <Route path='/OrgLoadingPage' element={<OrgLoadingPage/>}/>
          <Route path='/AdminLoadingPage' element={<AdminLoadingPage/>}/>
          <Route path='/VolLoadingPage' element={<VolLoadingPage/>}/>
          <Route path='/MyPage' element={<MyPage/>}/>
          <Route path='/VolunteerSearchPage' element={<VolunteerSearchPage/>}/>
          <Route path='/VolunteerSearchPage/VolunteerRequestPage' element={<VolunteerRequestPage/>}/>
          <Route path='/AdminPage' element={<AdminPage/>}/>
          <Route path='/AdminPage/CurrentRecruit' element={<CurrentRecruit/>}/>
          <Route path='/AdminPage/CompletedRecruit' element={<CompletedRecruit/>}/>
          <Route path='/AdminPage/AdminDrawer' element={<AdminDrawer/>}/>
          <Route path='/OrgMyPage' element={<OrgMyPage />}/>
          <Route path='/VolDetail' element={<VolDetail />} />
          <Route path='/TestPage' element={<TestPage/>}/>
          <Route path='/TestVolInsertPage' element={<TestVolInsertPage/>}/>
          <Route path='/NoticeView/:id' element={<NoticeView/>} />
          <Route path='/NoticeMain' element={<NoticeMain/>} />
          <Route path="/NoticeCreate" element={<NoticeCreate/>}/>
        </Routes>
      </div>
  );
}

export default App;
