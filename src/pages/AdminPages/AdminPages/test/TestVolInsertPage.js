import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ko } from 'date-fns/esm/locale';
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import "../AdminDrawer.css";

import "react-datepicker/dist/react-datepicker.css";

import Post from '../../../components/Tools/Post';

import { changeVolunteerSelect } from '../../../modules/counter';
import { useNavigate } from 'react-router-dom';

function TestVolInsertPage(props) {

    const orgId = useSelector((state) => state.user.organization_Information.orgId);

    const [제목, set제목] = useState("");
    const [유형, set유형] = useState("");
    const [시작날짜, set시작날짜] = useState("");
    const [종료날짜, set종료날짜] = useState("");
    const [마감날짜, set마감날짜] = useState("");
    const [모집인원, set모집인원] = useState(0);
    const [본문, set본문] = useState("");

    const [testData, setTestData] = useState({});
    const [checkData, setCheckData] = useState({});

    // const [유형, set유형] = React.useState([  // 유형 select 목록
    //     "유형을 선택해주세요.",
    //     "생활편의지원", "주거환경", "상담", "교육", "보건의료", "농어촌 봉사", "문화행사", "환경보호",
    //     "안전.예방", "공익.인권", "재해.재난", "국제협력 및 해외봉사", "멘토링", "자원봉사교육", "국제행사", "기타"
    // ]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const change제목 = (e) => {
        set제목(e.target.value);
    }

    const change유형 = (e) => {
        set유형(e.target.value);
    }

    // 주소 검색 코드
    const [enroll_company, setEnroll_company] = useState({ address: '', });
    const [popup, setPopup] = useState(false);

    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        })
    }

    const handleComplete = (e) => {
        setPopup(!popup);
    }

    const change시작날짜 = (e) => {
        set시작날짜(e);
    }

    const change종료날짜 = (e) => {
        set종료날짜(e);
    }

    const change마감날짜 = (e) => {
        set마감날짜(e);
    }

    const change모집인원 = (e) => {
        set모집인원(e.target.value);
    }

    const change본문 = (e) => {
        set본문(e.target.value);
    }

    const testClick1 = useCallback(() => {

        if (testData.volTitle === "") {
            alert("봉사 제목을 입력해주세요!");
        } else if (testData.volType === "") {
            alert("봉사 유형을 입력해주세요!");
        } else if (testData.volLocation === "") {
            alert("활동 지역을 입력해주세요!");
        } else if (!Date.parse(시작날짜)) {
            alert("시작날짜를 다시 선택해주세요!");
        } else if (!Date.parse(종료날짜)) {
            alert("종료날짜를 다시 선택해주세요!");
        } else if (!Date.parse(마감날짜)) {
            alert("마감날짜를 다시 선택해주세요!");
        } else if (parseInt(testData.volRecPersonnel) <= 0) {
            alert("0보다 큰 모집 인원을 입력해주세요!");
        } else if (testData.volContent === "") {
            alert("본문을 입력해주세요!");
        } else {

            console.log(testData);  // testData 콘솔 출력
            let test_data; // 사용자 데이터

            console.log("기관 테스트 통신 호출");
            // 유저 or 기관 로그인 토큰 보내기
            axios.get("/together/create/volunteer", {
                params: {
                    volOrganization: testData.orgId,
                    volTitle: testData.volTitle, volType: testData.volType,
                    volLocation: testData.volLocation, volStTime: testData.volStTime,
                    volEndTime: testData.volEndTime, volRecPeriod: testData.volRecPeriod,
                    volRecPersonnel: testData.volRecPersonnel, volContent: testData.volContent
                }
            })
                .then((response) => {
                    alert("[봉사 등록 성공]");
                    const resData = response.data;
                    navigate('/AdminPage/CurrentRecruit');
                })
                .catch((error) => {
                    console.log(error);
                    alert("[봉사 등록 실패] 에러 코드 : " + error.data);
                });
        }

    }, [testData, 마감날짜, 시작날짜]);

    useEffect(() => {
        let startDate = null;
        let endDate = null;
        let volRecPeriod = null;

        startDate = dayjs(시작날짜).format('YYYY-MM-DD-HH-mm');
        endDate = dayjs(종료날짜).format('YYYY-MM-DD-HH-mm');
        volRecPeriod = dayjs(마감날짜).format('YYYY-MM-DD-HH-mm');

        setTestData({
            orgId: orgId, volTitle: 제목, volType: 유형, volLocation: enroll_company.address, volStTime: startDate, volEndTime: endDate,
            volRecPeriod: volRecPeriod, volRecPersonnel: parseInt(모집인원), volContent: 본문
        });

    }, [시작날짜, 종료날짜, 마감날짜, orgId, 제목, 유형, enroll_company.address, 본문, 모집인원])


    return (
        <div>
            <div className='AdminDrawer_title'>제목  <input type="text" onChange={change제목} value={제목} className="AdminDrawer_inputText" /></div>
            <div className='AdminDrawer_title'>유형  <input type="volType" id="volType" onChange={change유형} value={유형} className="AdminDrawer_inputText" />
                {/* {유형.map(item => (
                    <option key={item} value={item}>{item}</option>))}</select> */}</div>
                    
            <div><div style={{ display: "inline-block" }} className='AdminDrawer_title'>주소 <input placeholder="주소를 검색하세요" type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address} disabled={true} className='AdminDrawer_inputAddress' /></div>
                <a href='#!' onClick={handleComplete}><button className='AdminDrawer_SearchBtn'>검색</button></a>
                {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}</div>
               
            <div className='AdminDrawer_title1' style={{ width: "30vw" }}> 
               시작 시간
                <DatePicker
                    locale={ko}
                    selected={시작날짜}
                    onChange={date => change시작날짜(date)}
                    minDate={new Date()}
                    maxDate={종료날짜}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd h:mm aa"
                    timeIntervals={5}
                    placeholderText="날짜와 시간을 선택해주세요!"
                    className='AdminDrawer_volStEndTime'    
                />
           </div>
           <div className='AdminDrawer_title1' style={{ width: "30vw" }}>
                종료 시간
                <DatePicker
                    locale={ko}
                    selected={종료날짜}
                    onChange={date => change종료날짜(date)}
                    minDate={시작날짜}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd h:mm aa"
                    timeIntervals={5}
                    placeholderText="날짜와 시간을 선택해주세요!"
                    className='AdminDrawer_volStEndTime'
                />
            </div>
            
            <div className='AdminDrawer_title1' style={{ width: "30vw" }}>
                신청 마감
                <DatePicker
                    locale={ko}
                    selected={마감날짜}
                    onChange={date => change마감날짜(date)}
                    minDate={new Date()}
                    maxDate={시작날짜}
                    showTimeSelect
                    dateFormat="yyyy-MM-dd h:mm aa"
                    timeIntervals={5}
                    placeholderText="날짜와 시간을 선택해주세요!"
                    className='AdminDrawer_volStEndTime'
                />
            </div>
            <div className='AdminDrawer_title'>모집인원  <input type="number" onChange={change모집인원} value={모집인원} style={{ width: "10vw", marginLeft:"80px" }} className='AdminDrawer_volRecPersonnnel' />명</div>
            <div className='AdminDrawer_label'>내용 <textarea type="text" onChange={change본문} value={본문} className='AdminDrawer_volContent' placeholder='내용을 입력해주세요' /></div>
            <div>
                <button onClick={testClick1} className='AdminDrawer_btn'>등록하기</button>
            </div>
        </div>
    );
}

export default TestVolInsertPage;