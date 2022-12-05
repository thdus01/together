import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

import './VolunteerSearch.css';

import Button from './Tools/Button';

function VolunteerSearch(props) {

    const logined = useSelector((state) => state.user.check_Login.check);

    const [nameItem, setNameItem] = useState(""); // 이름
    const [typeItem, setTypeItem] = useState(""); // 분야
    const [titleItem, setTitleItem] = useState(""); // 제목
    const [volSearchPostData, setVolSearchPostData] = useState(); // 서버로 보낼 데이터 합친것

    // 페이지 네이션 구현부
    // 테이블 데이터 저장
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPage, setTotalPage] = useState(1); // 최대 페이지

    const [tableSort, setTableSort] = useState([]); // 정렬한 봉사목록


    /** 처음 로딩될때 실행되는 통신 */
    const volApiCall = useCallback(async () => {

        let getData1 = null;

        try {

            console.log("모든 봉사 호출 통신")
            await axios.get("/together/find/all/volunteer")
                .then((response) => {
                    getData1 = response.data;
                    console.log(response.data);

                    setTotalPage(Math.ceil(getData1.length / 10));
                })
                .catch((error) => {
                    console.log(error);
                })

            const tableOut = [];

            for (let i = 0; i < getData1.length; i += 10) {
                tableOut.push(getData1.slice(i, i + 10));
            }

            console.log(tableOut);
            setTableSort(tableOut);

        } catch (e) {
            console.log(e);
        }
    }, [setTotalPage, currentPage, totalPage])

    /** 검색버튼을 누르면 실행되는 메소드 */
    const searchApiCall = useCallback(async () => {

        let getData2 = null;

        try {

            console.log("봉사 검색 목록 호출 통신")
            // 봉사를 검색하는 통신
            await axios.get('/together/find/all/volunteer', { params: { orgName: nameItem, volTitle: titleItem, volType: typeItem } })
                .then((response) => {
                    getData2 = response.data;
                    console.log(response.data);

                    setTotalPage(Math.ceil(getData2.length / 10));
                })
                .catch((error) => {
                    console.log(error);
                });

            const tableOut = [];
            const size = 10;
            for (var z = 0; z < totalPage; z++) {

                for (let i = 0; i < getData2.length; i += size) {
                    tableOut.push(getData2.slice(i, i + size));
                }
            }
            console.log(tableOut);
            setTableSort(tableOut);

        } catch (e) {
            console.log("Error > " + e);
        }

    }, [setTotalPage, volSearchPostData, currentPage, totalPage])

    /** 페이지네이션 숫자 버튼 구현부 */
    const currentChangeBtn = useCallback((e) => {
        setCurrentPage(e.target.key);
    }, [setCurrentPage])

    const orgNameChange = (e) => {
        setNameItem(e.target.value);
    }

    const volTitleChange = (e) => {
        setTitleItem(e.target.value);
    }

    const volTypeChange = (e) => {
        setTypeItem(e.target.value);
    }

    // 로그인 유형 검사
    let logined_bool = null;
    if (logined === "unLogined") {
        logined_bool = false;
    } else if (logined === "Logined") {
        logined_bool = true;
    } else if (logined === "institution") {
        logined_bool = false;
    } else if (logined === "admin") {
        logined_bool = true;
    }

    /** 로그인 유형이 다르면 alert 출력 */
    const alertLogin = useCallback(() => {

        if (logined === "unLogined") {
            alert("로그인 되어 있지 않습니다! 봉사자로 로그인 해주세요!");
        } else if (logined === "institution") {
            alert("기관 관리자 계정으로는 봉사를 신청할 수 없습니다! 봉사자로 로그인 해주세요!");
        }

    }, [logined])

    /** 다음 페이지 이동 */
    const changeNextPage = useCallback(() => {
        if (currentPage === totalPage) {
            return;
        } else {
            var page = currentPage + 1;
            setCurrentPage(page);
        }
    }, [setCurrentPage, currentPage, totalPage])

    /** 이전 페이지 이동 */
    const changeBeforePage = useCallback(() => {
        if (currentPage === 1) {
            return;
        } else {
            var page = currentPage - 1;
            setCurrentPage(page);
        }
    }, [setCurrentPage, currentPage])

    useEffect(() => {
        volApiCall();
    }, [])

    useEffect(() => {
        setVolSearchPostData([
            { orgName: nameItem, volTitle: titleItem, volType: typeItem }
        ])
    }, [nameItem, typeItem, titleItem])

    return (
        <div className='volunteerSearch-body'>
            <div className='volunteerSearch-block'> {/* 블럭 구현 태그 */}
                <div className='volunteerSearch-titleBox'> {/* 제목 */}
                    <span className='volunteerSearch-titleBox-span'>봉사 찾기</span>
                </div>
            </div>

            <div className='volunteerSearch-block'> {/* 블럭 구현 태그 */}
                <div className='volunteerSearch-searchBox'> {/* 세부 검색 */}

                    <table className='volunteerSearch-searchTable'>
                        <tr className='volunteerSearch-searchBox-tr'>
                            <td><span className='volunteerSearch-searchBox-Text'>모집 기관</span></td>
                            <td><input onChange={orgNameChange} value={nameItem || ""} className='volunteerSearch-searchBox-area-inputText' /></td>
                        </tr>

                        <tr className='volunteerSearch-searchBox-tr'>
                            <td><span className='volunteerSearch-searchBox-Text'>봉사 제목</span></td>
                            <td><input onChange={volTitleChange} value={titleItem || ""} className='volunteerSearch-searchBox-area-inputText' /></td>
                        </tr>

                        <tr className='volunteerSearch-searchBox-tr'>
                            <td><span className='volunteerSearch-searchBox-Text'>봉사 유형</span></td>
                            <td><input onChange={volTypeChange} value={typeItem || ""} className='volunteerSearch-searchBox-area-inputText' /></td>
                        </tr>
                    </table>

                    <div className='volunteerSearch-searchBox-button'>
                        <Button spanStyle={{ margin: "5px" }} btnName='검색' customClickEvent={() => searchApiCall()} />
                        <Button spanStyle={{ margin: "5px" }} btnName='초기화' customClickEvent={() => volApiCall()} />
                    </div>
                </div>
            </div>

            <hr style={{
                border: 'black solid 1.5px',
                backgroundColor: 'black',
            }} />

            <div className='volunteerSearch-block'>
                <div className='volunteerSearch-tableBox-div'>
                    {typeof (tableSort) === undefined ? (
                        <div className='volunteerSearch-tableBox-table-empty'>봉사가 존재하지 않습니다!</div>
                    ) : (
                        <>
                            <table className='volunteerSearch-tableBox-div-table'>
                                <hr style={{ border: "black solid 1.5px", backgroundColor: "black" }} />
                                <thead style={{ display: 'inline-block', width: "940px" }}>
                                    <tr className='volunteerSearch-tableBox-div-table-thead-tr'>
                                        <th className='volunteerSearch-tableBox-div-table-tr-org'>모집기관</th>
                                        <th className='volunteerSearch-tableBox-div-table-tr-title'>제목</th>
                                        <th className='volunteerSearch-tableBox-div-table-tr-type'>유형</th>
                                        <th className='volunteerSearch-tableBox-div-table-tr-date'>시작날짜</th>
                                        <th className='volunteerSearch-tableBox-div-table-tr-period'>신청마감</th>
                                        <th className='volunteerSearch-tableBox-div-table-tr-location'>위치</th>
                                        <th className='volunteerSearch-tableBox-div-table-tr-people'>모집현황</th>
                                    </tr>
                                </thead>
                                <hr style={{ border: "black solid 1px", backgroundColor: "black" }} />
                                <tbody style={{ display: 'inline-block', height: "370px" }}>
                                    {tableSort.length === 0 ?
                                        <>
                                            <div>데이터가 없습니다!</div>
                                        </> :
                                        <>
                                            {tableSort[currentPage - 1]?.map(data => (
                                                <span key={data.volId}>
                                                    {data.volCurNumber < data.volRecPersonnel && new Date() < new Date(data.volRecPeriod) ? logined_bool ?
                                                        <>
                                                            <Link to='/VolunteerSearchPage/VolunteerRequestPage'
                                                                state={{ data: data }}
                                                                style={{
                                                                    textDecoration: 'none',
                                                                    color: 'black'
                                                                }}
                                                            >
                                                                <tr key={data.volId} className='volunteerSearch-tableBox-div-table-tbody-tr-true'>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-org'>{data.orgName}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-title'>{data.volTitle}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-type'>{data.volType}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-date'>{dayjs(data.volStTime).format('YYYY-MM-DD')}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-period'>{dayjs(data.volRecPeriod).format('YYYY-MM-DD')}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-location'>{data.volLocation}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-people-true'>모집중</td>
                                                                </tr>
                                                            </Link>
                                                        </> :
                                                        <>
                                                            <Link to="/SignIn"
                                                                style={{
                                                                    textDecoration: 'none',
                                                                    color: 'black'
                                                                }}
                                                                onClick={alertLogin}
                                                            >
                                                                <tr key={data.volId} className='volunteerSearch-tableBox-div-table-tbody-tr-true'>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-org'>{data.orgName}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-title'>{data.volTitle}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-type'>{data.volType}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-date'>{dayjs(data.volStTime).format('YYYY-MM-DD')}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-period'>{dayjs(data.volRecPeriod).format('YYYY-MM-DD')}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-location'>{data.volLocation}</td>
                                                                    <td className='volunteerSearch-tableBox-div-table-tr-people-true'>모집중</td>
                                                                </tr>
                                                            </Link>
                                                        </> :
                                                        <>
                                                            <tr key={data.volId} className='volunteerSearch-tableBox-div-table-tbody-tr-false'>
                                                                <td className='volunteerSearch-tableBox-div-table-tr-org'>{data.orgName}</td>
                                                                <td className='volunteerSearch-tableBox-div-table-tr-title'>{data.volTitle}</td>
                                                                <td className='volunteerSearch-tableBox-div-table-tr-type'>{data.volType}</td>
                                                                <td className='volunteerSearch-tableBox-div-table-tr-date'>{dayjs(data.volStTime).format('YYYY-MM-DD')}</td>
                                                                <td className='volunteerSearch-tableBox-div-table-tr-period'>{dayjs(data.volRecPeriod).format('YYYY-MM-DD')}</td>
                                                                <td className='volunteerSearch-tableBox-div-table-tr-location'>{data.volLocation}</td>
                                                                <td className='volunteerSearch-tableBox-div-table-tr-people-false'>신청마감</td>
                                                            </tr>
                                                        </>
                                                    }
                                                </span>
                                            ))}
                                            <hr style={{ border: "black solid 1.5px", backgroundColor: "black" }} />
                                        </>}
                                </tbody>
                            </table>
                            <div className='volunteerSearch-tableBox-btnNextBack'>
                                <a href="#!" onClick={changeBeforePage}><Button spanStyle={{ margin: "5px" }} btnName='이전' /></a>
                                <a href="#!" onClick={changeNextPage}><Button spanStyle={{ margin: "5px" }} btnName='다음' /></a>
                                <span className='volunteerSearch-tableBox-span'>{currentPage}/{totalPage}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VolunteerSearch;