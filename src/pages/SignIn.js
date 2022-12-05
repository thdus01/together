import React, { useState } from "react";
import './SignIn.css';
import { Link } from "react-router-dom";

import NaverVolSignIn from '../components/Tools/NaverVolSignIn';
import NaverOrgSignIn from '../components/Tools/NaverOrgSignIn';
import NaverAdminLogin from '../components/Tools/NaverAdminLogin';
import logo from '../assets/together_logo.png';

function SignIn(props) {

  const [check, setCheck] = useState("봉사자");
  // 값: 1 -> 봉사자
  // 값: 2 -> 기관

  let signInComponent = null
  if (check === "봉사자") {
    signInComponent = (
      <>
        <NaverVolSignIn name="봉사자 로그인" />
      </>
    )
  } else if (check === "기관") {
    signInComponent = (
      <>
        <NaverOrgSignIn name="기관 로그인" />
      </>
    )
  } /*else if(check === "관리자") {
      signInComponent = (
        <>
          <NaverAdminLogin name="관리자 로그인"/>
        </>
      )
    }*/

  return (
    <>
      <div className="body_SignIn">
        <div className='logoBox'>
          <Link to="/">
            <img src={logo} className='logo' alt="together" />
          </Link>
        </div>
        <div className="login_wrapper">
          <h2 className="text_login">로그인</h2>
          <br />
          <label style={{ margin: '10px' }}>
            <input
              type="radio"
              value="봉사자"
              name="회원가입"
              onChange={() => { setCheck("봉사자") }}
              defaultChecked
            />
            봉사자
          </label>
          <label style={{ margin: '10px' }}>
            <input
              type="radio"
              value="기관"
              name="회원가입"
              onChange={() => { setCheck("기관") }}
            />
            기관
          </label>
          {/*<label style={{margin:'10px'}}>
              <input
                type="radio"
                value="관리자"
                name="회원가입"
                onChange={() => {setCheck("관리자")}}
              />
              관리자
          </label>*/}
          <br />
          {signInComponent}

          <div className="goSignUp">
            <p>아직 회원이 아닌가요?</p>
            <Link to='/SignUp'><h5 className="goSignUp_h5">회원가입하기</h5></Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default SignIn;