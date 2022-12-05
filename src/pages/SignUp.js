import React, { useState } from "react";
import { Link } from "react-router-dom";
import './SignIn.css';

import NaverOrgSignUp from '../components/Tools/NaverOrgSignUp';
import NaverVolSignUp from '../components/Tools/NaverVolSignUp';
import logo from '../assets/together_logo.png';

function SignIn(props) {

    const [check, setCheck] = useState("봉사자");
    // 값: 1 -> 봉사자
    // 값: 2 -> 기관

    let signUpComponent = null
    if(check === "봉사자") {
      signUpComponent = (
        <>
          <NaverVolSignUp name="봉사자 회원가입"/>
        </>
      )
    } else if(check === "기관") {
      signUpComponent = (
        <>
          <NaverOrgSignUp name="기관 회원가입"/>
        </>
      )
    }

    return (
        <>
          <div className="body_SignIn">
            <div className='logoBox'>
              <Link to="/">
                <img src={logo} className='logo' alt="together"/>
              </Link>
            </div>
            <div className="login_wrapper">
              <h2 className="text_login">회원가입</h2>
              <br/>
              <label style={{margin:'10px'}}>
                <input
                  type="radio"
                  value="봉사자"
                  name="회원가입"
                  onChange={() => {setCheck("봉사자")}}
                  defaultChecked
                />
                봉사자
              </label>
              <label style={{margin:'10px'}}>
                <input
                  type="radio"
                  value="기관"
                  name="회원가입"
                  onChange={() => {setCheck("기관")}}
                />
                기관
              </label>
              <br/>
              {signUpComponent}

              <div className="goSignUp">
                <p>이미 가입을 하셨나요?</p>
                <Link to='/SignIn'><h5 className="goSignUp_h5">로그인으로 돌아가기</h5></Link>
              </div>
              
            </div>
          </div>
        </>
    );
}

export default SignIn;