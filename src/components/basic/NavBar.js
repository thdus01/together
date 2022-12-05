import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

import logo_together from '../../assets/together_logo.png';

function NavBar(props) {

  const navItems = [
    { id: 1, title: '봉사찾기', titleLink: '/VolunteerSearchPage', item1: '봉사찾기', item1Link: '/VolunteerSearchPage', item2: '메뉴2', item2Link: '', item3: '메뉴3', item3Link: '' },
    { id: 2, title: '봉사정보', titleLink: '', item1: '메뉴1', item1Link: '', item2: '메뉴2', item2Link: '', item3: '메뉴3', item3Link: '' },
    { id: 3, title: '공지사항', titleLink: '/NoticeMain', item1: '공지사항', item1Link: '', item2: '자주묻는질문', item2Link: '', item3: '질문/답변', item3Link: '' },
  ]

  return (
    <div className='navbar_body'>
      <div className='navbar_div1'>
        <ul className='navbar_ul'>
          {/*<li className='navbar_liItems'>
            <Link to="/">
              <div className='navbar_navItems'>
                <img src={logo_together} className='navbar_navItems_icon' alt="together"/>
              </div>
            </Link>
          </li>*/}
          {navItems.map((data) => (
            <li className='navbar_liItems' key={navItems.id}>
              <Link to={data.titleLink} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='navbar_navItems'>{data.title}</div>
              </Link>
            </li>
          ))}
          {/*<div className='navbar_liItems_minBox'>
              
              <li className='navbar_liItems_min'><Link to={data.item1Link} style={{ textDecoration: 'none', color: 'black' }}><div className='navbar_buttonItems_min'>{data.item1}</div></Link></li>
              <hr className='navbar_liItems_min_hr'/>
              <li className='navbar_liItems_min'><Link to={data.item2Link} style={{ textDecoration: 'none', color: 'black' }}><div className='navbar_buttonItems_min'>{data.item2}</div></Link></li>
              <hr className='navbar_liItems_min_hr'/>
              <li className='navbar_liItems_min'><Link to={data.item3Link} style={{ textDecoration: 'none', color: 'black' }}><div className='navbar_buttonItems_min'>{data.item3}</div></Link></li>
              
            </div>*/}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;