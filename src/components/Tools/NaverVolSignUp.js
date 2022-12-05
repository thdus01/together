import { useEffect, useRef } from 'react'

import './NaverVolSignIn.css';
import naver_logo from './img/btnG_아이콘사각.png';

const NaverVolSignUp = (props, { setGetToken, setUserInfo }) => {

	const naverRef = useRef();
    useEffect(() => {
        const naverScript = document.createElement("script");
        naverScript.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        naverScript.type = "text/javascript";
        document.head.appendChild(naverScript);

        naverScript.onload = () => {
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: 'j1ENGLwu3zQ82gDNyVpX',
                callbackUrl: "http://localhost:3000/VolLoadingPage",
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

            localStorage.setItem('loginType', 'ser');
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
}

export default NaverVolSignUp;