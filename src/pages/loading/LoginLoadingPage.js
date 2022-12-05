import React, { useEffect, useCallback} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LoginLoadingPage.css';

import { changeCheckLogin, changeMyInformation, changeOrganizationInformation } from '../../modules/user';

function LoginLoadingPage(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginApiCall = useCallback(async () => {

        console.log("로그인 통신호출");

        let token_data; // 사용자 데이터

        try {

            // 토큰 호출
            const token = window.location.href.split('=')[1].split('&')[0]; // 토큰
            const loginType = localStorage.getItem('loginType'); // 로그인 형식
            console.log(loginType);
            console.log(token);

            // 유저 or 기관 로그인 토큰 보내기
            await axios.post("/together/login", {access_token:token, loginType:loginType})
                .then((response) => {
                    console.log(response.data);
                    token_data = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            if(token_data != null) { // 데이터 성공

                // 리덕스에 유저데이터 저장
                if(token_data.role === "ser") { // 봉사자 일때
                    dispatch(changeCheckLogin({check:"Logined"}));
                    dispatch(changeMyInformation({
                        serBirth:token_data.serBirth,                      // 생일
                        serEmail:token_data.serEmail,                      // 이메일
                        serGender:token_data.serGender,                    // 성별
                        serId:token_data.serId,                            // ID
                        serMobile:token_data.serMobile,                    // 전화번호
                        serName:token_data.serName,                        // 이름
                        serSns:token_data.serSns,                          // 로그인 타입
                        serCumCoefficient:token_data.serCumCoefficient,    // 봉사 횟수
                        serCumTime:token_data.serCumTime                   // 봉사 누적 시간
                    }));
                } else if(token_data.role === "org") { // 기관 일때

                    dispatch(changeCheckLogin({check:"institution"}));
                    dispatch(changeOrganizationInformation({
                        orgId:token_data.orgId,                         // 기관 아이디
                        orgName:token_data.orgName,                     // 기관 이름
                        orgMobile:token_data.orgMobile,                 // 기관 성별
                        orgCertified :token_data.orgCertified,          // 기관 인증여부
                        orgEmail:token_data.orgEmail,                   // 기관 이메일
                        orgType:token_data.orgType,                     // 기관 유형
                        orgSns:token_data.orgSns,                       // SNS
                        orgAddress:token_data.orgAddress,               // 기관 주소
                        orgManName:token_data.orgManName,               // 관리자 이름
                        orgManBirth:token_data.orgManBirth,             // 관리자 생년월일
                        orgManGender:token_data.orgManGender,           // 관리자 성별
                        orgManMobile:token_data.orgManMobile,           // 관리자 전화번호
                    }));

                    // 페이지 이동
                    navigate('/'/*, 
                        {state: {token_data}}
                    */)
                } else {
                    alert("로그인 유형이 다릅니다!")

                    // 페이지 이동
                    navigate('/SignIn'/*, 
                        {state: {token_data}}
                    */)
                }

                // 페이지 이동
                navigate('/'/*, 
                    {state: {userType: ""}}
                */)
    
            } else { // 데이터 실패
                
                // 오류 출력
                alert("[실패] 유저 데이터를 받지 못하였습니다.");

                // 페이지 이동
                navigate('/SignIn'/*, 
                {state: {
                    userType: ""
                }}
                */)

            }
        } catch(err) {
            console.log("Error >>", err);
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        loginApiCall();
        
    }, [loginApiCall])
    
    return (
        <div className='LoginLoadingPage_body'>
            <div className='apiCall_text'>서버와 통신중.....</div>
        </div>
    )
}

export default LoginLoadingPage;