import React, { useCallback, useState } from 'react';
import axios from 'axios';

function TestPage(props) {

    const [testData, setTestData] = useState({});

    const testClick1 = useCallback(async () => {

        let test_data; // 사용자 데이터

        try {

            console.log("기관 테스트 통신 호출");
            // 유저 or 기관 로그인 토큰 보내기
            await axios.post("/together/login")
                .then((response) => {
                    console.log(response.data);
                    test_data = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            if(test_data != null) { // 데이터 성공

                setTestData(test_data);
    
            } else { // 데이터 실패
                
                // 오류 출력
                alert("[실패] 데이터를 받지 못하였습니다.");

            }
        } catch(err) {
            console.log("Error >>", err);
        }
    }, []);

    const testClick2 = useCallback(async () => {

        let test_data; // 사용자 데이터

        try {

            console.log("관리자 테스트 통신 호출");
            // 유저 or 기관 로그인 토큰 보내기
            await axios.post("/together/login")
                .then((response) => {
                    console.log(response.data);
                    test_data = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            if(test_data != null) { // 데이터 성공

                setTestData(test_data);
    
            } else { // 데이터 실패
                
                // 오류 출력
                alert("[실패] 데이터를 받지 못하였습니다.");

            }
        } catch(err) {
            console.log("Error >>", err);
        }
        
    }, []);

    return (
        <>
            <button style={{margin:"20px", fontSize:"30px"}} onClick={testClick1}>기관 통신</button>
            <button style={{margin:"20px", fontSize:"30px"}} onClick={testClick2}>관리자 통신</button>
            <button style={{margin:"20px", fontSize:"30px"}} onClick={() => {console.log(testData)}}>콘솔 출력</button>
        </>
    )
}

export default TestPage;