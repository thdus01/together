import './VolunteerRequestPage.css';
import React from 'react';
import Header from '../components/basic/Header';
import NavBar from '../components/basic/NavBar';
import Footer from '../components/basic/Footer';
import VolunteerRequest from '../components/VolunteerRequest';

function VolunteerRequestPage() {

  return (
    <div className='volunteerRequestPage_body'>
        <Header/>
        <NavBar/>
        <VolunteerRequest/>
        <Footer/>
    </div>
  );
}

export default VolunteerRequestPage;