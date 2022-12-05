import React from 'react';
import { Link } from "react-router-dom";

import './Footer.css';

function Footer(props) {
  return (
    <div className='footer_body'>
      <hr className='footer_hr' />
      <footer className='footer1'>
        함께해요! <Link to='/' className='footer-link'>@투게더!</Link>
      </footer>
    </div>
  );
}

export default Footer;