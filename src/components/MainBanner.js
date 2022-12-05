import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

import './MainBanner.css';

function MainBanner(props) {

  const logined = useSelector((state) => state.user.check_Login.check);

  const [recVolData, setRecVolData] = useState({});
  const [recNoticeData, setRecNoticeData] = useState({});

  /** 최근 봉사목록 5개를 가져오는 메소드 */
  const volApiCall = useCallback(async () => {

    console.log("최근 봉사목록 조회 통신 호출");

    let recent_vol_data; // 사용자 데이터

    try {

      // 최근 봉사 목록을 가져오는 통신
      await axios.get("/together/find/all/volunteer")
        .then((response) => {
          console.log(response.data);
          recent_vol_data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      if (recent_vol_data != null) { // 데이터 성공

        let exList = [];
        if (recent_vol_data.length < 5) {
          for (let i = 0; i < recent_vol_data.length; i++) {
            exList.push(recent_vol_data[i]);
          }
        } else {
          for (let i = 0; i < 5; i++) {
            exList.push(recent_vol_data[i]);
          }
        }

        setRecVolData(exList);

      } else { // 데이터 실패

        // 오류 출력
        alert("[실패] 봉사 데이터를 받지 못하였습니다.");

      }

    } catch (err) {
      console.log("Error >>", err);
    }
  }, []);

  /** 최근 공지사항 5개를 가져오는 메소드 */
  const noticeApiCall = useCallback(async () => {

    console.log("최근 공지사항 조회 통신 호출");

    let recent_notice_data; // 사용자 데이터

    try {

      // 최근 공지사항 목록을 가져오는 통신
      await axios.get("/together/find/all/notice")
        .then((response) => {
          console.log(response.data);
          recent_notice_data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      if (recent_notice_data != null) { // 데이터 성공

        let exList = [];
        if (recent_notice_data.length < 5) {
          for (let i = 0; i < recent_notice_data.length; i++) {
            exList.push(recent_notice_data[i]);
          }
        } else {
          for (let i = 0; i < 5; i++) {
            exList.push(recent_notice_data[i]);
          }
        }

        setRecNoticeData(exList);

      } else { // 데이터 실패

        // 오류 출력
        alert("[실패] 공지사항 데이터를 받지 못하였습니다.");

      }

    } catch (err) {
      console.log("Error >>", err);
    }
  }, []);

  let logined_bool = null;
  if (logined === "unLogined") {
    logined_bool = false;
  } else if (logined === "Logined") {
    logined_bool = true;
  } else if (logined === "institution") {
    logined_bool = false;
  } else if (logined === "admin") {
    logined_bool = false;
  } else {
    logined_bool = false;
  }

  const alertLogin = useCallback(() => {
    alert("봉사자로 로그인을 해주세요!");
  }, [])

  useEffect(() => {
    volApiCall();
    noticeApiCall();

    console.log(recVolData);
    console.log(recNoticeData);
  }, [])

  let noticeComponent = null;
  if (recNoticeData.length === 0) {
    noticeComponent = (
      <div>공지사항이 없습니다!</div>
    )
  } else if (recNoticeData.length > 0) {
    noticeComponent = (
      <>
        <h2 style={{ textAlign: 'left', marginLeft: '25px', marginTop: '5px' }}>공지사항</h2>
        <div className='main-menuBox1-box1'>
          {recNoticeData.map(data => (
            <Link to={`/NoticeView/${data.notId}`}>
              <div className='main-menuBox1-box1-div' key={data.notId}>
                <p className='main-menuBox1-box1-div-p1'>{data.notTitle}</p>
                <hr style={{ border: "black solid 1px" }} />
                <p className='main-menuBox1-box1-div-p2'>{data.notContent}</p>
              </div>
            </Link>
          ))}
        </div>
        {/*<div className='main-menuBox1-box2'>
          <a href="#!" className='main-menuBox1-box2-a'>자주묻는 질문</a>
          |
          <a href="#!" className='main-menuBox1-box2-a'>Q/A</a>
        </div>*/}
      </>
    )
  }

  let recentVolunteerComponent = null;
  if (recVolData.length === 0) {
    recentVolunteerComponent = (
      <>
        <div>최근 추가된 봉사활동이 없습니다!</div>
      </>
    )
  } else if (recVolData.length > 0) {

    recentVolunteerComponent = (
      <>
        <h2 style={{ textAlign: 'left', marginLeft: '25px', marginTop: '5px' }}>최근에 추가한 봉사</h2>
        <div className='main-menuBox2-box'>
          {recVolData.map(data => (
            <span key={data.volId}>
              {data.volCurNumber < data.volRecPersonnel && new Date() < new Date(data.volRecPeriod) ? logined_bool ?
                <Link
                  to='/VolunteerSearchPage/VolunteerRequestPage'
                  state={{ data: data }}
                  style={{
                    textDecoration: 'none',
                    color: 'black'
                  }}
                >
                  <div className='main-menuBox2-box-div'>
                    <p className='main-menuBox2-box-div-name'>{data.volType}</p>
                    <p className='main-menuBox2-box-div-area'>{data.volLocation}</p>
                    <hr style={{ border: "black solid 1px" }} />
                    <ul className='main-menuBox2-box-div-ul'>
                      <li className='main-menuBox2-box-div-ul-title'>
                        {data.volTitle}
                      </li>
                      <li className='main-menuBox2-box-div-ul-date'>
                        {dayjs(data.volStTime).format('YYYY/MM/DD HH:mm a')}
                      </li>
                      <li className='main-menuBox2-box-div-ul-people'>
                        {data.volCurNumber}명 / 총{data.volRecPersonnel === null ? 0 : data.volRecPersonnel}명
                      </li>
                    </ul>
                    <p className='main-menuBox2-box-div-request' style={{ color: "blue" }}>모집중</p>
                  </div>
                </Link> :
                <Link
                  to='/SignIn'
                  style={{
                    textDecoration: 'none',
                    color: 'black'
                  }}
                  onClick={alertLogin}
                >
                  <div className='main-menuBox2-box-div'>
                    <p className='main-menuBox2-box-div-name'>{data.volType}</p>
                    <p className='main-menuBox2-box-div-area'>{data.volLocation}</p>
                    <hr style={{ border: "black solid 1px" }} />
                    <ul className='main-menuBox2-box-div-ul'>
                      <li className='main-menuBox2-box-div-ul-title'>
                        {data.volTitle}
                      </li>
                      <li className='main-menuBox2-box-div-ul-date'>
                        {dayjs(data.volStTime).format('YYYY/MM/DD HH:mm a')}
                      </li>
                      <li className='main-menuBox2-box-div-ul-people'>
                        {data.volCurNumber}명 / 총{data.volRecPersonnel === null ? 0 : data.volRecPersonnel}명
                      </li>
                    </ul>
                    <p className='main-menuBox2-box-div-request' style={{ color: "blue" }}>모집중</p>
                  </div>
                </Link> :
                <div className='main-menuBox2-box-div' style={{ cursor: "default" }}>
                  <p className='main-menuBox2-box-div-name'>{data.volType}</p>
                  <p className='main-menuBox2-box-div-area'>{data.volLocation}</p>
                  <hr style={{ border: "black solid 1px" }} />
                  <ul className='main-menuBox2-box-div-ul'>
                    <li className='main-menuBox2-box-div-ul-title'>
                      {data.volTitle}
                    </li>
                    <li className='main-menuBox2-box-div-ul-date'>
                      {dayjs(data.volStTime).format('YYYY/MM/DD HH:mm a')}
                    </li>
                    <li className='main-menuBox2-box-div-ul-people'>
                      {data.volCurNumber}명 / 총{data.volRecPersonnel === null ? 0 : data.volRecPersonnel}명
                    </li>
                  </ul>
                  <p className='main-menuBox2-box-div-request' style={{ color: "red" }}>모집마감</p>
                </div>
              }
            </span>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='main-menuMain'>

      <div className='main-menuGroup'>

        <div className='main-menuBox1'>
          {noticeComponent}
        </div>

        <div className='main-menuBox2'>
          {recentVolunteerComponent}
        </div>

      </div>

    </div>
  );
}

export default MainBanner;