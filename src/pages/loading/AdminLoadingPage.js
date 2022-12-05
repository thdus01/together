import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginLoadingPage.css';

import { changeCheckLogin, changeManagerInformation } from '../../modules/user';


function AdminLoadingPage(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const volSignUpApiCall = useCallback(async () => {

        console.log("서비스 관리자 로그인 통신호출");

        let token_data; // 사용자 데이터

        try {

            // 토큰 호출
            const token = window.location.href.split('=')[1].split('&')[0]; // 토큰
            const loginType = localStorage.getItem('loginType'); // 로그인 형식
            console.log(loginType);

            // 유저 회원가입 토큰 보내기
            await axios.post("/together/manager/start", {access_token:token})
                .then((response) => {
                    console.log(response.data);
                    token_data = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            if(token_data != null) { // 유저 데이터 = 성공

                // 리덕스에 유저데이터 저장
                if(token_data.role === "man") { // 봉사자 일때
                    dispatch(changeCheckLogin({check:"admin"}));
                    dispatch(changeManagerInformation({
                        manId:token_data.manId,            // 관리자 아이디
                        manName:token_data.manName,        // 관리자 이름
                        manMobile:token_data.manMobile,    // 관리자 전화번호
                        manEmail :token_data.manEmail,     // 관리자 이메일
                        manSns:token_data.manSns,          // 관리자 인증여부
                    }));

                    navigate('/'/*, 
                    {state: {
                        userType: ""
                    }}
                    */)

                } else { // 서비스 관리자가 아닐때
                    alert("[실패] ");

                    navigate('/SignUp'/*, 
                    {state: {
                        userType: ""
                    }}
                    */)

                }
    
            } else { // 유저 데이터 = 실패
                
                // 오류 출력
                alert("[실패] 로그인에 필요한 서비스 관리자 데이터를 받지 못하였습니다.");

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

export default AdminLoadingPage;