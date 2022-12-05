import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginLoadingPage.css';

import { changeCheckLogin, changeMyInformation } from '../../modules/user';


function VolLoadingPage(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const volSignUpApiCall = useCallback(async () => {

        console.log("봉사자 회원가입 통신호출");

        let token_data; // 사용자 데이터

        try {

            // 토큰 호출
            const token = window.location.href.split('=')[1].split('&')[0]; // 토큰
            const loginType = localStorage.getItem('loginType'); // 로그인 형식
            console.log(loginType);

            // 유저 회원가입 토큰 보내기
            await axios.post("/together/signup", {access_token:token, loginType:loginType})
                .then((response) => {
                    console.log(response.data);
                    token_data = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            if(token_data != null) { // 유저 데이터 = 성공

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

                    navigate('/'/*, 
                    {state: {
                        userType: ""
                    }}
                    */)

                } else { // 봉사자가 아닐때
                    alert("[실패] 회원가입 대상이 아닙니다.");

                    navigate('/SignUp'/*, 
                    {state: {
                        userType: ""
                    }}
                    */)

                }
    
            } else { // 유저 데이터 = 실패
                
                // 오류 출력
                alert("[실패] 회원가입에 필요한 유저 데이터를 받지 못하였습니다.");

                // 페이지 이동
                navigate('/SignUp'/*, 
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
        volSignUpApiCall();
        
    }, [volSignUpApiCall])

    return (
        <div className='LoginLoadingPage_body'>
            <div className='apiCall_text'>서버와 통신중.....</div>
        </div>
    )
}

export default VolLoadingPage;