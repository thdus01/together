import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet, Route, useLocation } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AdminNav from "./AdminNav";
import Adminappbar from "./Adminappbar";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ko } from 'date-fns/esm/locale';
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import './UpdateVol.css';

import "react-datepicker/dist/react-datepicker.css";

import Post from '../../components/Tools/Post';

import { useNavigate } from 'react-router-dom';

function UpdateVol(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const menuId = 'primary-search-account-menu';

    const location = useLocation();

    // 본문 입력 state
    // const [volTitle, setVolTitle] = useState("");                     // 제목
    // const [voltype, setVolType] = useState("");                       // 봉사 유형
    // const [startDate, setStartDate] = useState("");                   // 시작 날짜
    // const [endDate, setEndDate] = useState("");                       // 종료 날짜
    // const [volRecPeriod, setVolRecPeriod] = useState("");             // 마감 날짜
    // const [volRecPersonnel, setVolRecPersonnel] = useState(0);        // 모집 인원
    // const [volContent, setVolContent] = useState("");                 // 본문

    const volTitle = location.state.val1;    
    const volType = location.state.val2;    
    const volLocation = location.state.val3;    
    const volStTime = location.state.val4;    
    const volEndTime = location.state.val5;    
    const volRecPeriod = location.state.val6;    
    const volRecPersonnel = location.state.val7;
    const volContent = location.state.val8;    



    // const changeVolTitle = (e) => {  // 제목
    //     setVolTitle(e.target.value);
    // }

    // const changeVolType = (e) => {  // 봉사 유형
    //     setVolType(e.target.value);
    // }

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

    const testClick2 = useCallback(() => {

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
        } else if (parseInt(testData.recruitmentPeople) <= 0) {
            alert("0보다 큰 모집 인원을 입력해주세요!");
        } else if (testData.volContent === "") {
            alert("본문을 입력해주세요!");
        } else {

            console.log(testData);  // testData 콘솔 출력
            let test_data; // 사용자 데이터

            console.log("기관 테스트 통신 호출");
            // 유저 or 기관 로그인 토큰 보내기
            axios.get("", {
                params: {
                    // volOrganization: testData.orgId,
                    // volTitle: testData.volTitle, volType: testData.volType,
                    // volLocation: testData.volLocation, volStTime: testData.volStTime,
                    // volEndTime: testData.volEndTime, volRecPeriod: testData.volRecPeriod,
                    // recruitmentPeople: testData.recruitmentPeople, volContent: testData.volContent
                }
            })
                .then((response) => {
                    alert("[봉사 수정 성공]");
                    const resData = response.data;
                    navigate('/AdminPage/CurrentRecruit');
                })
                .catch((error) => {
                    console.log(error);
                    alert("[봉사 수정 실패] 에러 코드 : " + error.data);
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
            volRecPeriod: volRecPeriod, recruitmentPeople: parseInt(모집인원), volContent: 본문
        });

    }, [시작날짜, 종료날짜, 마감날짜, orgId, 제목, 유형, enroll_company.address, 본문, 모집인원])

    return (
        <>
            <Outlet />
            <div className="UpdateVol_body">
                <div className="UpdateVol_main">
                    {/* 관리자 페이지 네비게이션 */}
                    <AdminNav />

                    {/* appbar 부분 */}
                    <Adminappbar />

                    {/* main */}
                    <div className="UpdateVol_dashboard">
                        <div className="UpdateVol_mainTitle">
                            <div>봉사 수정</div>
                        </div>

                        <div className="UpdateVol_mainContent">
                            <div className="UpdateVol_volSelect">

                                <div>제목 : <input type="text" onChange={change제목} value={volTitle} /></div>
                                <div>유형 : <input type="text" onChange={change유형} value={volType} /></div>
                                <div><div style={{ display: "inline-block" }}><input placeholder="주소" type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address} disabled={true} /></div>
                                    <a href='#!' onClick={handleComplete}><button>검색</button></a>
                                    {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}</div>
                                <div>
                                    시작날짜
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
                                    />
                                </div>
                                <div>
                                    종료날짜
                                    <DatePicker
                                        locale={ko}
                                        selected={종료날짜}
                                        onChange={date => change종료날짜(date)}
                                        minDate={시작날짜}
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd h:mm aa"
                                        timeIntervals={5}
                                        placeholderText="날짜와 시간을 선택해주세요!"
                                    />
                                </div>
                                <div>
                                    신청 마감 날짜
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
                                    />
                                </div>
                                <div>모집인원 : <input type="number" onChange={change모집인원} value={volRecPersonnel} style={{ width: "50px" }} />명</div>
                                <div>본문 : <textarea type="textarea" onChange={change본문} value={volContent} className="UpdateVol_textarea" /></div>
                                <div><button style={{ margin: "10px", fontSize: "20px" }}></button>
                                    <button style={{ margin: "10px", fontSize: "20px" }} onClick={testClick2}>수정하기</button>
                                    <button style={{ margin: "10px", fontSize: "20px" }} onClick={() => { console.log(checkData) }}>콘솔 출력</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default UpdateVol;