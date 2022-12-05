import React from 'react';
import { Link } from 'react-router-dom';
import './css/NoticeForm.css';
// import PostMain from './PostMain';
//봉사 신청 및 검색 구현 폼
const NoticeForm = () => {// eslint-disable-line no-unused-vars
    const date = new Date();
    console.log(date);
    return (

        <>
            <div className='NoticeForm_NF'>
                <div className="body_NF">
                    <h1 className='h1_NF '>게시판</h1>
                    {/* <hr></hr> */}
                    {/* <div className="search_div">
                    <input type="search" className='SearchBar' onKeyUp='filter()'/>
                    <button className='SearchBtn' type='submit'>검색</button>
                </div> */}
                    <hr className='invisible_NF' />
                </div>
            </div>
        </>
    )
}



export default NoticeForm;