import React from 'react';

import './MainPage.css';
import Header from '../components/basic/Header';
import NavBar from '../components/basic/NavBar';
import Footer from '../components/basic/Footer';
import MainBanner from '../components/MainBanner';
import main_img from '../assets/main_logo.jpg';

function MainPage() {

  return (
    <div className='mainPage_body'>
      <Header />
      <NavBar />
      <div className='main_imgBox' style={{marginLeft:"0%", marginRight:"0%"}}>
        <img className='main_imgBox_img' src={main_img} alt='mainImg'/>
      </div>
      <MainBanner/>
      <Footer/>
    </div>
  );
}

export default MainPage;