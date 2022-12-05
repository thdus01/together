import './VolunteerRequest.css';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

import MapContainer from './Tools/MapContainer';
import Button from './Tools/Button';

import org_img from '../assets/연암공대.jpg';
import action_img from '../assets/활동.jpg';

function VolunteerRequest(props) {

  const location = useLocation();
  const navigate = useNavigate();

  const volunteerInformation = location.state.data;
  const myInformation = useSelector((state) => state.user.myInformation);
  const login_check = useSelector((state) => state.user.check_Login.check);

  console.log(volunteerInformation);

  // 로그인 유형 체크
  useEffect(() => {
    if (login_check === "unLogined") {
      alert("로그인이 되지 않은 상태에서는 봉사를 신청할 수 없습니다!");
      navigate("/");
    } else if (login_check === "institution") {
      alert("기관 관리자는 봉사를 신청할 수 없습니다!");
      navigate("/");
    } else if (login_check === "admin") {
      alert("서비스 관리자는 봉사를 신청할 수 없습니다!");
      navigate("/");
    }
  }, [login_check])

  const volRequestApiCall = useCallback(async () => {

    try {
      // 봉사를 신청하는 통신
      await axios.get('/together/create/application', { params: { serId: myInformation.serId, volId: volunteerInformation.volId } })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          alert("[실패] " + error.response.data);
        })
    } catch (e) {
      console.log(e);
      console.log("[봉사 신청 실패]")
    }

  }, [])

  const isFind = (element) => {
    if (element.serId === myInformation.serId) {
      return true;
    } else {
      return false;
    }
  }

  let requestBtn = null;
  if (volunteerInformation.appList.some(isFind)) {
    requestBtn = (
      <Button spanStyle={{ margin: "5px" }} btnName='신청' customClickEvent={() => { alert("이미 신청 되어있습니다!"); navigate("/VolunteerSearchPage"); }} />
    )
  } else {
    requestBtn = (
      <Button spanStyle={{ margin: "5px" }} btnName='신청' customClickEvent={() => { volRequestApiCall(); navigate("/MyPage"); }} />
    )
  }

  return (
    <div className='volunteerRequest-body'>
      <div> {/* block 구현 태그 */}
        <div className='volunteerRequest-body-titleNameBox'> {/* 제목 블럭 */}
          <span className='volunteerRequest-body-titleNameBox-span'>봉사 신청</span>
        </div>
      </div>

      <hr className='volunteerRequest-body-hr' />

      <div> {/* block 구현 태그 */}
        <div className='volunteerRequest-body-institutionInformationBox'> {/* 기관 사진, 정보 박스 */}
          <div className='volunteerRequest-body-institutionInformationBox-pictureBox'>
            <img className='volunteerRequest_body_org_img' src={org_img} alt='org_img' />
          </div>
          <div className='volunteerRequest-body-institutionInformationBox-div'>
            <table className='volunteerRequest-body-institutionInformationBox-div-table'>
              <tbody>
                <tr>
                  <th>봉사 제목</th>
                  <td>{volunteerInformation.volTitle}</td>
                  <th>봉사 날짜</th>
                  <td>{dayjs(volunteerInformation.volStTime).format('YYYY/MM/DD HH:mm a')} ~ {dayjs(volunteerInformation.volEndTime).format('YYYY/MM/DD HH:mm a')}</td>
                </tr>
                <tr>
                  <th>봉사 기관</th>
                  <td>{volunteerInformation.orgName}</td>
                  <th>봉사 유형</th>
                  <td>{volunteerInformation.volType}</td>
                </tr>
                <tr>
                  <th>모집 기한</th>
                  <td>{dayjs(volunteerInformation.volRecPeriod).format('YYYY/MM/DD HH:mm a')}</td>
                  <th>남은 인원</th>
                  <td>{volunteerInformation.volCurNumber}명/총{volunteerInformation.volRecPersonnel}명</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div> {/* block 구현 태그 */}
        <div className='volunteerRequest-body-institutionRuleBox'> {/* 활동 예시, 기관 규칙 박스 */}
          <div className='volunteerRequest-body-institutionRuleBox-pictureBox'>
            <img className='volunteerRequest_body_action_img' src={action_img} alt='action_img' />
          </div>
          <div className='volunteerRequest-body-institutionRuleBox-ruleBox'>
            <p className='volunteerRequest-body-institutionRuleBox-ruleBox-title'>봉사 내용 및 규칙</p>
            <hr className='volunteerRequest-body-institutionRuleBox-ruleBox-hr' />
            <div className='volunteerRequest-body-institutionRuleBox-ruleBox-body'>
              <ol className='volunteerRequest-body-institutionRuleBox-ruleBox-body-ol'>
                {volunteerInformation.volContent}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div> {/* block 구현 태그 */}
        <div className='volunteerRequest-body-institutionMapBox'> {/* 기관 위치 지도 박스 */}
          <div className='volunteerRequest-body-institutionMapBox-mapBox'>
            <MapContainer myAddress={volunteerInformation.volLocation} />
          </div>
        </div>
      </div>

      <div>
        <div className='volunteerRequest-body-buttonBox'>
          {requestBtn}
          <Button spanStyle={{ margin: "5px" }} btnName='취소' customClickEvent={() => navigate("/VolunteerSearchPage")} />
        </div>
      </div>
    </div>
  );
}

export default VolunteerRequest;