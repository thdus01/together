import './MyInformation.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import axios from 'axios';

import Button from './Tools/Button';
import { useNavigate } from 'react-router-dom';

function MyInformation(props) {

  const navigate = useNavigate();

  const login_check = useSelector((state) => state.user.check_Login.check);
  const informationList = useSelector((state) => state.user.myInformation);

  const [volComplete, setVolComplete] = useState([]);
  const [volWait, setVolWait] = useState([]);

  const [volTime, setVolTime] = useState(0);

  useEffect(() => {

    if (login_check === "unLogined") {
      alert("로그아웃하면 내 정보를 볼 수 없습니다!");
      navigate("/");
    } else if (login_check === "institution") {
      alert("기관 관리자는 내정보를 볼 수 없습니다!");
      navigate("/");
    } else if (login_check === "admin") {
      alert("서비스 관리자는 내 정보를 볼 수 없습니다!");
      navigate("/");
    }

    volRequestCall();
  }, [login_check])

  /** 신청한 봉사를 가져오는 메소드 */
  const volRequestCall = useCallback(async () => {

    console.log("신청한 봉사 조회 통신 호출");

    let vol_data; // 사용자 데이터

    try {

      await axios.get("/together/find/my/volunteers", { params: { serId: informationList.serId } })
        .then((response) => {
          console.log(response.data);
          vol_data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      if (vol_data != null) { // 데이터 성공
        let wait = [];
        let complete = [];
        let intTime = 0;
        vol_data.map((data) => {
          if (new Date() < new Date(data.volStTime)) {
            wait.push(data);
          } else {
            complete.push(data);

            let sumTime = new Date(data.volEndTime).getTime() - new Date(data.volStTime).getTime();
            intTime += sumTime / 1000 / 60 / 60;
          }
        });
        setVolTime(Math.floor(intTime));
        setVolComplete(complete);
        setVolWait(wait);

      } else { // 데이터 실패

        // 오류 출력
        alert("[실패] 봉사 데이터를 받지 못하였습니다.");

      }

    } catch (err) {
      console.log("Error >>", err);
    }
  }, [setVolComplete, setVolWait]);

  /** 신청한 봉사를 취소하는 메소드 */
  const cancelVolApiCall = useCallback(async (volId) => {

    if (window.confirm("정말 신청을 취소하시겠습니까?")) {

      console.log("신청한 봉사 취소 통신 호출");

      try {

        await axios.get("/together/delete/application", { params: { serId: informationList.serId, volId: volId } })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });

        window.location.reload();

      } catch (err) {
        console.log("Error >>", err);
      }
    } else {
      alert("거부하였습니다.");
    }
  }, []);

  const checkGrade = (volCount, serCumTime) => {
    let str = "";
    if (volCount > 30 && serCumTime > 60 && volCount <= 20 && serCumTime <= 40) {
      str = "platinum";
    } else if (volCount > 20 && serCumTime > 40 && volCount <= 10 && serCumTime <= 20) {
      str = "gold";
    } else if (volCount > 10 && serCumTime > 20 && volCount <= 0 && serCumTime <= 0) {
      str = "silver";
    } else {
      str = "bronze";
    }

    return str;
  }

  // 내 상세정보
  let informationComponent = null;
  if (informationList === null) {
    informationComponent = (
      <div>사용자의 정보가 없습니다!</div>
    )
  } else if (informationList !== null) {
    informationComponent = (
      <>
        <tbody>
          <tr>
            <th className='myInformation-personalInformationBox-table-tbody-th'>등급</th>
            <td className='myInformation-personalInformationBox-table-tbody-td' style={{ width: "150px" }}>{checkGrade(volComplete.length, volTime)}</td>
            <th className='myInformation-personalInformationBox-table-tbody-th'>생년월일</th>
            <td className='myInformation-personalInformationBox-table-tbody-td' style={{ width: "150px" }}>{dayjs(informationList.serBirth).format('YYYY/MM/DD')}</td>
            <th className='myInformation-personalInformationBox-table-tbody-th'>전화번호</th>
            <td className='myInformation-personalInformationBox-table-tbody-td' style={{ width: "250px" }}>{informationList.serMobile}</td>
          </tr>
          <tr>
            <th className='myInformation-personalInformationBox-table-tbody-th'>이름</th>
            <td className='myInformation-personalInformationBox-table-tbody-td' style={{ width: "150px" }}>{informationList.serName}</td>
            <th className='myInformation-personalInformationBox-table-tbody-th'>성별</th>
            <td className='myInformation-personalInformationBox-table-tbody-td' style={{ width: "150px" }}>{informationList.serGender === 0 ? "남자" : "여자"}</td>
            <th className='myInformation-personalInformationBox-table-tbody-th'>이메일</th>
            <td className='myInformation-personalInformationBox-table-tbody-td' style={{ width: "250px" }}>{informationList.serEmail}</td>
          </tr>
        </tbody>
      </>
    )
  }

  // 대기중인 봉사
  let requestVolunteerComponent = null;
  if (volWait.length === 0) {
    requestVolunteerComponent = (
      <div style={{ color: "red", fontWeight: "bold", margin: "10px", fontSize: "18px" }}>대기중인 봉사활동이 없습니다!</div>
    )
  } else if (volWait.length > 0) {
    requestVolunteerComponent = (
      <>
        <thead style={{ display: 'inline-block' }}>
          <tr className='myInformation-volunteerRecordBox-tableWaiting-thead-tr'>
            <th className='myInformation-volunteerRecordBox-tableWaiting-orgName'>모집기관</th>
            <th className='myInformation-volunteerRecordBox-tableWaiting-title'>제목</th>
            <th className='myInformation-volunteerRecordBox-tableWaiting-type'>유형</th>
            <th className='myInformation-volunteerRecordBox-tableWaiting-date'>시작시간</th>
            <th className='myInformation-volunteerRecordBox-tableWaiting-location'>위치</th>
            <th className='myInformation-volunteerRecordBox-tableWaiting-cancelBtn'>취소여부</th>
          </tr>
        </thead>
        <tbody style={{ display: 'inline-block' }}>
          {volWait.map(data => (
            <>
              <tr className='myInformation-volunteerRecordBox-tableWaiting-tbody-tr' key={data.volId}>
                <td className='myInformation-volunteerRecordBox-tableWaiting-orgName'>{data.orgName}</td>
                <td className='myInformation-volunteerRecordBox-tableWaiting-title'>{data.volTitle}</td>
                <td className='myInformation-volunteerRecordBox-tableWaiting-type'>{data.volType}</td>
                <td className='myInformation-volunteerRecordBox-tableWaiting-date'>{dayjs(data.volStTime).format('YYYY/MM/DD HH:mm')}</td>
                <td className='myInformation-volunteerRecordBox-tableWaiting-location'>{data.volLocation}</td>
                <td className='myInformation-volunteerRecordBox-tableWaiting-cancelBtn'><Button customClickEvent={() => { cancelVolApiCall(data.volId); }} btnStyle={{ margin: "0px" }} spanStyle={{ margin: "5px" }} btnName='취소' /></td>
              </tr>
            </>
          ))}
          <hr style={{ border: "black solid 1px", width: "925px", margin: "0px", marginBottom: "5px" }} />
        </tbody>
      </>
    )
  }

  // 최근에한 봉사
  let volunteerComponent = null;
  if (volComplete.length === 0) {
    volunteerComponent = (
      <div style={{ color: "red", fontWeight: "bold", margin: "10px", fontSize: "18px" }}>봉사활동 기록이 없습니다!</div>
    )
  } else if (volComplete.length > 0) {
    volunteerComponent = (
      <>
        <thead style={{ display: 'inline-block', borderTop: "black solid 1px" }}>
          <tr className='myInformation-volunteerRecordBox-tableComplete-thead-tr'>
            <th className='myInformation-volunteerRecordBox-tableComplete-orgName'>봉사기관</th>
            <th className='myInformation-volunteerRecordBox-tableComplete-title'>제목</th>
            <th className='myInformation-volunteerRecordBox-tableComplete-type'>유형</th>
            <th className='myInformation-volunteerRecordBox-tableComplete-date'>시작시간</th>
            <th className='myInformation-volunteerRecordBox-tableComplete-location'>위치</th>
          </tr>
        </thead>
        <tbody style={{ display: 'inline-block' }}>
          {volComplete.map(data => (
            <>
              <tr className='myInformation-volunteerRecordBox-tableComplete-tbody-tr' key={data.volId}>
                <td className='myInformation-volunteerRecordBox-tableComplete-orgName'>{data.orgName}</td>
                <td className='myInformation-volunteerRecordBox-tableComplete-title'>{data.volTitle}</td>
                <td className='myInformation-volunteerRecordBox-tableComplete-type'>{data.volType}</td>
                <td className='myInformation-volunteerRecordBox-tableComplete-date'>{dayjs(data.volStTime).format('YYYY/MM/DD HH:mm')}</td>
                <td className='myInformation-volunteerRecordBox-tableComplete-location'>{data.volLocation}</td>
              </tr>
            </>
          ))}
          <hr style={{ border: "black solid 1px", width: "920px", margin: "0px", marginBottom: "5px" }} />
        </tbody>
      </>
    )
  }

  return (
    <div className='myInformation-body'>
      <div className='myInformation-main'>

        <div className='myInformation-title'>
          <span className='myInformation-title-span'>내정보</span>
        </div>

        <div>
          <div className='myInformation-starBox'>
            <div className='myInformation-starBox-items1'>
              <div className='myInformation-starBox-items-div'>
                나의 등급<br />
                {checkGrade(volComplete.length, volTime)}
              </div>
            </div>
            <div className='myInformation-starBox-items2'>
              <div className='myInformation-starBox-items-div'>
                봉사 완료 횟수<br />
                {volComplete.length}
              </div>
            </div>
            <div className='myInformation-starBox-items3'>
              <div className='myInformation-starBox-items-div'>
                봉사 누적 시간<br />
                {volTime}
              </div>
            </div>
          </div>
        </div>

        <div className='myInformation-personalInformationBox'>
          <p className='myInformation-volunteerRecordBox-p'>내 상세정보</p>
          <table className='myInformation-personalInformationBox-table'>
            {informationComponent}
          </table>
        </div>

        <div className='myInformation-volunteerRecordBox'>
          <p className='myInformation-volunteerRecordBox-p'>대기중인 봉사</p>
          <table className='myInformation-volunteerRecordBox-tableWaiting'>
            {requestVolunteerComponent}
          </table>
        </div>

        <div className='myInformation-volunteerRecordBox' style={{ marginBottom: "20px" }}>
          <p className='myInformation-volunteerRecordBox-p'>최근에한 봉사</p>
          <table className='myInformation-volunteerRecordBox-tableComplete'>
            {volunteerComponent}
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyInformation;