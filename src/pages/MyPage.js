import './MyPage.css';
import React from 'react';
import Header from '../components/basic/Header';
import NavBar from '../components/basic/NavBar';
import Footer from '../components/basic/Footer';
import MyInformation from '../components/MyInformation';

function MyPage() {

    return (
        <div className='myPage_body'>
        <Header/>
        <NavBar/>
        <MyInformation/>
        <Footer/>
        </div>
    );
}

export default MyPage;