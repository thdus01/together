import './VolunteerSearchPage.css';
import React from 'react';
import Header from '../components/basic/Header';
import NavBar from '../components/basic/NavBar';
import Footer from '../components/basic/Footer';
import VolunteerSearch from '../components/VolunteerSearch';

function VolunteerSearchPage(props) {

    return (
        <div className='volunteerRequestPage_body'>
            <Header/>
            <NavBar/>
            <VolunteerSearch/>
            <Footer/>
        </div>
    )
}

export default VolunteerSearchPage;