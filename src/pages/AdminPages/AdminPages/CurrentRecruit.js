import * as React from "react";
import './CurrnetRecruit.css';
import { Link, Outlet, Route, useNavigate } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AdminNav from "./AdminNav";
import Adminappbar from "./Adminappbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeNoticeSelect, changeVolunteerSelect } from "../../modules/counter";
import dayjs from "dayjs";
import MyInformation from "../../components/MyInformation";
import { type } from "@testing-library/user-event/dist/type";

function slice(x) {
  x = String(x);
  if (x.length > 10) {
    return x.substr(0, 15);
  } else if (x == "null") return "봉사 제목 없음.";
  else return x;
}

function CurrentRecruit(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = 'primary-search-account-menu';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [testData, setTestData] = React.useState({});

  // useSelector로 reducer에 있는 data 값을 가져온다.
  // const { data } = useSelector((state) => state.counter.volunteer_Select);
  const [data, setData] = React.useState([]);   // 봉사 정보를 담는 state

  const orgId = useSelector((state) => state.user.organization_Information.orgId);

  const [tableSort1, setTableSort1] = React.useState([]);

  // 글 리스트 갯수
  const [lastIdx, setLastIdx] = React.useState(0);

  const [requestPeople, setRequestPeople] = React.useState([]);

  const responseData1 = React.useCallback(async () => {

    let resData = null;

    try {

      await axios.get("/together/find/org/volunteers", { params: { orgId: orgId } })
        .then((response) => {
          resData = response.data;  // 응답 데이터를 resData에 저장
          console.log(response.data);
          //console.log(resData[2].appList[0].servant.serBirth);

          const data1 = resData.map((rowData) => (
            // rowData의 갯수만큼 글 리스트의 개수가 1개씩 증가하여 setLastIdx에 저장. 

            setLastIdx(lastIdx + 1),
            {
              // 봉사 정보
              appList: rowData.appList,
              volId: rowData.volId,                // 글 번호
              volTitle: rowData.volTitle,          // 제목
              volType: rowData.volType,            // 유형
              volRecPeriod: rowData.volRecPeriod,  // 모집 기간
              volCurNumber: rowData.volCurNumber  // 모집 인원
            }
          ))

          console.log(data1);  // 서버로부터 전송된 데이터 출력
          setData(data.concat(data1));  // data1의 데이터들을 data에 concat하여 setData에 저장



        })
        .catch((error) => {
          console.log(error);

        });

      const tableSerData = [];

      for (var i = 0; i < resData.length; i++) {
        console.log(resData[i].appList);  // 배열 (각 봉사별 모든 appList 출력)
        tableSerData.push(resData[i].appList);
      }

      console.log(tableSerData);
      setTableSort1(tableSerData);  // tableSort1 state에 저장

    } catch (e) {
      console.log(e);
    }

  }, []);


  console.log(tableSort1);  // tableSort1에 배열이 담김.


  // 신청자 조회시 필요한 것
  // appList 배열 값들을 map을 사용하여 모아서 신청자 리스트를 화면에 뿌린다.
  // 신청자(volCurNumber)가 0일 경우엔 신청자가 존재하지 않는다는 메세지 출력
  // 또는 appList가 빈 배열일 때 메세지 출력 가능
  // 신청자가 1이상일 경우 리스트 출력

  // 세부 목록 조회 버튼 클릭 시 적용
  const onbtnHandler = (e) => {
    console.log(e.currentTarget.id);
    console.log(e.target.id);

    // let responseData = null;

    let idx1 = e.target.id;

    // const findsVolIndex = data[idx1];
    // console.log(findsVolIndex);
    const findsVolIndex = data[idx1].volId;
    console.log(findsVolIndex);


    //버튼 클릭시 세부 목록 요청
    axios.get('/together/find/volunteer', { params: { volId: findsVolIndex } }
    )
      .then((response) => {
        console.log(response.data);
        let responseData = response.data;

        navigate('/VolDetail',
          {
            state: {  // VolDetail 페이지로 넘어갈 때 다음의 값들을 파라미터로 넘긴다.
              value: responseData.volTitle,
              value1: responseData.volContent,
              value2: responseData.volType,
              value3: responseData.volRecPeriod,
              value4: responseData.volCurNumber,
              value5: responseData.volEndTime,
              value6: responseData.volStTime,
              value7: responseData.volRecPersonnel,
              value8: responseData.volOrganization,
              value9: responseData.volLocation,
              valueVolId: responseData.volId
            }
          }
        );

      })
      .catch((error) => {
        console.log(error);
      })

  }

  React.useEffect(() => {
    responseData1();
  }, []);

  // 봉사 목록 가운데 현재 날짜를 기준으로 종료 날짜가 과거일 경우 완료된 봉사로 분류하여

  console.log(requestPeople);

  let SerInformComponent = null;  // 신청자 정보 (초기값 null로 생성)
  if (requestPeople == null) {
    SerInformComponent = (
      <>
        <div>신청자가 존재하지 않습니다!</div>
      </>
    )
  } else {
    let serList = [];
    serList = requestPeople.appList;
    SerInformComponent = (
      <>
        <div className="CurrentRecruit_serInform">
          {serList && serList.map(data => {
            return <>
              <div key={data.serId} className="CurrentRecruit_serInformSpan">
                <div>
                  <tr>이름: {data.servant.serName}</tr>
                  <tr>생년월일: {data.servant.serBirth}</tr>
                  <tr>전화번호: {data.servant.serMobile}</tr>
                </div>
              </div>
            </>
          })}
        </div>
      </>
    )
  }

  React.useEffect(() => {

  }, [requestPeople])


  return (
    <>
      <Outlet />
      <div className="CurrentRecruit_body">
        <div className="CurrentRecruit_main">
          {/* 네비게이션 */}
          <AdminNav />

          <Adminappbar />
          {/* main */}
          <div className="CurrentRecruit_dashboard">
            <div className="CurrentRecruit_detail">
              <div className="CurrentRecruit_detailList1">
                <div className="CurrentRecruit_select"></div>
                <div className="CurrentRecruit_volList">
                <div className="CurrentRecruit_serList4">모집 중인 봉사</div>
                  <div className="CurrentRecruit_tableBox_div" style={{ display: 'inline-block' }}> {/* 모집 중인 봉사 테이블 자리 */}
                    <table className="CurrentRecruit_tableList" style={{ display: 'inline-block' }}>
                      {/* <thead className="CurrentRecruit_thead" style={{ display: 'inline-block' }}> */}
                      <tbody className="CurrentRecruit_tbody" style={{ display: 'inline-block' }}>
                        <tr className="CurrentRecruit_tr">
                          <td className="CurrentRecruit_tableListIdx">제목</td>
                          <td className="CurrentRecruit_tableListIdx">유형</td>
                          <td className="CurrentRecruit_tableListIdx">모집기간</td>
                          <td className="CurrentRecruit_tableListIdx">조회</td>
                          {/* <th className="CurrentRecruit_tableListIdx">신청자 조회</th> */}
                          {/* <th className="CurrentRecruit_tableListLocation">위치</th> */}
                        </tr>

                      {/* </thead> */}

                     
                        {lastIdx !== 0 ?
                          data.map((rowData, idx) => (
                            // 최초 선언한 기본값은 나타내지 않음
                            //rowData.id !== '' &&

                            // <span key={idx}>
                            <>
                              {new Date() < new Date(rowData.volRecPeriod) ?
                                <tr key={idx} onClick={(event) => setRequestPeople(rowData)} className="CurrentRecruit_tr">
                                  {/* <td>{idx + 1}</td> */}
                                  <td>{slice(rowData.volTitle)}</td>
                                  <td>{rowData.volType}</td>
                                  <td>~{dayjs(rowData.volRecPeriod).format('YYYY-MM-DD')}</td>
                                  {/* <td>{rowData.volLocation}</td> */}
                                  <td>
                                    <input
                                      id={idx}
                                      type="button"
                                      className="result_btn"
                                      onClick={onbtnHandler}
                                      value="조회"
                                    />
                                  </td>
                                  {/* <td>
                                    <input
                                      id={idx}
                                      type="button"
                                      className="result_btn"
                                      
                                      value="신청자 목록"
                                    />
                                  </td> */}
                                </tr> :
                                <></>}
                            </>)) :
                          <tr>
                            <td>모집 중인 봉사가 존재하지 않습니다.</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 봉사자 목록 */}
              <div className="CurrentRecruit_detailList1">
                <div className="CurrentRecruit_select"></div>
                <div className="CurrentRecruit_serList"> <div className="CurrentRecruit_serList4">신청자</div>
                  <div className="CurrentRecruit_serList1">
                    {SerInformComponent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentRecruit;