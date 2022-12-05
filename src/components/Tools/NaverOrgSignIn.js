import { useEffect, useRef } from 'react'

import './NaverVolSignIn.css';
import naver_logo from './img/btnG_아이콘사각.png';

const NaverOrgSignIn = (props, { setGetToken, setUserInfo }) => {

	const naverRef = useRef();
	useEffect(() => {
		const naverScript = document.createElement("script");
		naverScript.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
		naverScript.type = "text/javascript";
		document.head.appendChild(naverScript);

		naverScript.onload = () => {
			const naverLogin = new window.naver.LoginWithNaverId({
				clientId: 'j1ENGLwu3zQ82gDNyVpX',
				callbackUrl: "http://localhost:3000/LoginLoadingPage",
				callbackHandle: true,
				isPopup: false,
				loginButton: {
					color: "green",
					type: 3,
					height: 55,
				}
			});
			naverLogin.init();
			naverLogin.logout(); //네이버 로그인이 계속 유지되는 경우가 있음, 초기화시 로그아웃

			localStorage.setItem('loginType', 'org');
		}
	}, [])
	const handleClick = () => {
		naverRef.current.children[0].click();
	}
	return (
		<div className='naverLogin-body'>
			<div ref={naverRef} id="naverIdLogin"></div>
			<button onClick={handleClick} className="naverBtn" >
				<img src={naver_logo} alt="naver" />
				{props.name}
			</button>
		</div>
	)

	/*
	const { naver } = window
	// 발급 받은 Client ID 입력 
	const NAVER_CLIENT_ID = 'j1ENGLwu3zQ82gDNyVpX';
	// 작성했던 Callback URL 입력
	const NAVER_CALLBACK_URL = 'http://localhost:3000/LoginLoadingPage';

	const token = null;

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: NAVER_CALLBACK_URL,
		  // 팝업창으로 로그인을 진행할 것인지?           
			isPopup: false,
		  // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
			loginButton: { color: 'green', type: 3, height: 58 },
			callbackHandle: true,
		})
		naverLogin.init()

		   // 선언된 naverLogin 을 이용하여 유저 (사용자) 정보를 불러오는데  
		   // 함수 내부에서 naverLogin을 선언하였기에 지역변수처리가 되어  
		   // userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행주어야한다.
		
		   // 아래와 같이 로그인한 유저 ( 사용자 ) 정보를 직접 접근하여 추출가능하다.
		   // 이때, 데이터는 첫 연동시 정보 동의한 데이터만 추출 가능하다.
    
		   // 백엔드 개발자가 정보를 전달해준다면 아래 요기! 라고 작성된 부분까지는 
		   // 코드 생략이 가능하다.  
	  
			naverLogin.getLoginStatus((status) => {
			if (status) {
					// 아래처럼 선택하여 추출이 가능하고, 
				/*
				const id = naverLogin.user.getId();
				const name = naverLogin.user.getName();
				const email = naverLogin.user.getEmail();
				const gender = naverLogin.user.getGender();
				const birthday = naverLogin.user.getBirthday();
				const birthyear = naverLogin.user.getBirthyear();
				const mobile = naverLogin.user.getMobile();
			
				// const user = naverLogin.user;
				const user = {power:"User", grade:"bronze", birthday:birthday, birthyear:birthyear, email:email, gender:gender, 
					id:id, mobile:mobile, name:name, volValue:20, volTime:40}
				console.log(user);
				
				// user
					// 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
				// setUserInfo(naverLogin.user)
			}
		})
			// 요기!
	}
    
	// 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 토큰이 붙어서 전달된다.
	// 우선 아래와 같이 토큰을 추출 할 수 있으며,
	// 3부에 작성 될 Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.

	const userAccessToken = () => {

		window.location.href.includes('access_token') && getToken()
		
	}
	
	const getToken = () => {
		const token = window.location.href.split('=')[1].split('&')[0];
		console.log(token);
		// console.log, alert 창을 통해 토큰이 잘 추출 되는지 확인하자! 
				
		// 이후 로컬 스토리지 또는 state에 저장하여 사용하자!   
		// localStorage.setItem('access_token', token);
		// setGetToken(token)
	}

	
	// 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
	useEffect(() => {
		initializeNaverLogin()
		userAccessToken()
	}, [])

	return (
		<>
			{/*구현할 위치에 아래와 같이 코드를 입력해주어야 한다. 
				태그에 id="naverIdLogin" 를 해주지 않으면 오류가 발생한다! }
			<div id="naverIdLogin" />
			<button onClick={handleClick} className="naver-button" >
				<img src="/images/naver.jpg" alt="naver" />
				Login with Naver
			</button>
		</>
	)*/
}

export default NaverOrgSignIn;