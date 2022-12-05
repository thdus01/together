import React, { useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Button from '../Tools/Button';
import { changeCheckLogin, changeMyInformation, changeManagerInformation, changeOrganizationInformation } from '../../modules/user';

import './Header.css';
import logo_1365 from '../../assets/1365-logo-black.png';
import logo_vms from '../../assets/VMS-logo-black.png';
import logo_together from '../../assets/together_logo.png';

function Header(props) {

  const navigate = useNavigate();

  // 로그인 타입 저장
  const loginInfo = useSelector((state) => state.user.check_Login.check);

  // 계정에 맞는 이름 저장
  const serName = useSelector((state) => state.user.myInformation.serName); // 봉사자
  const orgName = useSelector((state) => state.user.organization_Information.orgManName); // 기관
  const adminName = useSelector((state) => state.user.manager_Information.manName); // 서비스 관리자
  //const [checkLogin, setCheckLogin] = useState("unLogined");

  const dispatch = useDispatch(); // 리덕스를 바꾸기 위해 필요한 함수
  const logout = useCallback(() => {
    dispatch(changeCheckLogin({ check: "unLogined" }));
    dispatch(changeMyInformation({
      serBirth: "",                // 생일
      serEmail: "",                // 이메일
      serGender: "",               // 성별
      serId: "",                   // ID
      serMobile: "",               // 전화번호
      serName: "",                 // 이름
      serSns: "",                  // 로그인 타입
      serCumCoefficient: 0,        // 봉사 횟수
      serCumTime: 0                // 봉사 누적 시간
    }));
    dispatch(changeOrganizationInformation({
      orgId: "",                   // 기관 아이디
      orgName: "",                 // 기관 이름
      orgMobile: "",               // 기관 성별
      orgCertified: "",           // 기관 인증여부
      orgEmail: "",                // 기관 이메일
      orgType: "",                 // 기관 유형
      orgAddress: "",              // 기관 주소
      orgManagerName: "",          // 관리자 이름
      orgManagerBirth: "",         // 관리자 생년월일
      orgManagerGender: "",        // 관리자 성별
      orgManagerSns: "",           // SNS
      orgManagerMobile: "",        // 관리자 전화번호
    }));
    dispatch(changeManagerInformation({
      manId: "",       // 관리자 아이디
      manName: "",     // 관리자 이름
      manMobile: "",   // 관리자 전화번호
      manEmail: "",   // 관리자 이메일
      manSns: "",      // 관리자 인증여부
    }));
  }, [dispatch])

  /*
  const login = useCallback( // 로그인 버튼 누르면 작동
    () => {
      setCheckLogin("Logined"); // 로그인 상태로 변환
    }, [setCheckLogin]
  )
  */

  /*
  const logout = () => useCallback( // 로그아웃 버튼 누르면 작동
  () => {
      setCheckLogin("unLogined"); //
    }, []
  )
  */

  let loginComponent = null;
  if (loginInfo === "unLogined") { // 로그인이 안되어있을때
    loginComponent = (
      <>
        <Button btnStyle={{ float: "right", margin: "5px" }} spanStyle={{ margin: "5px" }} btnName='로그인' customClickEvent={() => navigate("/SignIn")} />
      </>
    )
  } else if (loginInfo === "Logined") { // 봉사자일때

    loginComponent = (
      <>
        <Button btnStyle={{ float: "right", margin: "5px" }} spanStyle={{ margin: "5px" }} btnName='로그아웃' customClickEvent={() => logout()} />
        <Button btnStyle={{ float: "right", margin: "5px" }} spanStyle={{ margin: "5px" }} btnName='내정보' customClickEvent={() => navigate("/MyPage")} />
        <div className='header-box2-name'><strong>{serName}</strong>님 환영합니다!&nbsp;&nbsp;</div>
      </>
    )
  } else if (loginInfo === "institution") { // 기관일때
    loginComponent = (
      <>
        <Button btnStyle={{ float: "right", margin: "5px" }} spanStyle={{ margin: "5px" }} btnName='로그아웃' customClickEvent={() => logout()} />
        <Button btnStyle={{ float: "right", margin: "5px" }} spanStyle={{ margin: "5px" }} btnName='봉사관리' customClickEvent={() => navigate("/AdminPage")} />
        <div className='header-box2-name'><strong>{orgName}</strong>님 안녕하세요!&nbsp;&nbsp;</div>
      </>
    )
  } /*else if (loginInfo === "admin") { // 서비스 관리자일때
    loginComponent = (
      <>
        <Button btnStyle={{ float: "right", margin: "5px" }} spanStyle={{ margin: "5px" }} btnName='로그아웃' customClickEvent={() => logout()} />
        <div className='header-box2-name'><strong>{adminName}</strong>님 어서오세요!&nbsp;&nbsp;</div>
      </>
    )
  }*/ else { // 변수 이름이 지정되어있는게 아닐때
    loginComponent = (
      <>
        <Button btnStyle={{ float: "right", margin: "5px" }} spanStyle={{ margin: "5px" }} btnName='로그인' customClickEvent={() => navigate("/SignIn")} />
      </>
    )
  }

  return (
    <div>
      <header className='header-header1'>
        <div className='header-box1'>
          <Link to="/">
            <div className='header-box1-items'>
              <img src={logo_together} className='navbar_navItems_icon' alt="together" />
            </div>
          </Link>
          <a href='https://www.1365.go.kr/vols/main.do' rel="noreferrer" target='_blank'>
            <div className='header-box1-items'>
              <img src={logo_1365} className='header-box1-items-icon' alt="1365" />
            </div>
          </a>
          <a href='https://www.vms.or.kr/' rel="noreferrer" target='_blank' >
            <div className='header-box1-items'>
              <img src={logo_vms} className='header-box1-items-icon' alt="vms" />
            </div>
          </a>
        </div>
        <div className='header-box2'>
          {loginComponent}
        </div>
      </header>
    </div>
  );
}

export default Header;
