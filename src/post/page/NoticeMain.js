import React from 'react';
import NoticeBoard from './NoticeBoard';
import './css/NoticeBoard.css';
import Footer from '../../components/basic/Footer';
import NavBar from '../../components/basic/NavBar';
import Header from '../../components/basic/Header';
import './css/NoticeMain.css';

const NoticeMain = () => {// eslint-disable-line no-unused-vars

  return (
    <>
      <Header />
      <NavBar />
      <div className='NoticeMain_body'>
        </div>
        <div>
        <NoticeBoard />
      </div>
      <Footer />
    </>
  )
}

export default NoticeMain;