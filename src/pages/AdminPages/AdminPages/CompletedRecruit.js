import * as React from "react";
import { Link, Outlet, Route } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AdminNav from "./AdminNav";
import Adminappbar from "./Adminappbar";
import './CompletedRecruit.css';
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import axios from "axios";

function CompletedRecruit(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = 'primary-search-account-menu';

  const [currentPage1, setCurrentPage1] = React.useState(1); // 현재 페이지
  const [totalPage1, setTotalPage1] = React.useState(1); // 최대 페이지

  const [data, setData] = React.useState([]);

  const [testData1, setTestData1] = React.useState([]);

  const [lastIdx, setLastIdx] = React.useState(0);
  const [idx, setIdx] = React.useState(0);

  // redux에서 기관 아이디를 불러온다.
  const orgId = useSelector((state) => state.user.organization_Information.orgId);

  React.useEffect(() => {
    axios.get("/together/find/org/volunteers", { params: { orgId: orgId } })
      .then((response) => {
        console.log(response.data);
        //dispatch(changeVolunteerSelect(response.data));
        const resData1 = response.data;  // 응답 데이터를 resData1에 저장
        const data1 = resData1.map((rowData) => (

          // rowData의 갯수만큼 글 리스트의 개수가 1개씩 증가하여 setLastIdx에 저장. 
          setLastIdx(lastIdx + 1),
          {
            // 봉사 정보
            volId: rowData.volId,                // 글 번호
            volTitle: rowData.volTitle,          // 제목
            volType: rowData.volType,            // 유형
            volRecPeriod: rowData.volRecPeriod,  // 모집 기간
            volCurNumber: rowData.volCurNumber  // 모집 인원
          }
        ))
        console.log(data1);
        setData(data.concat(data1));  // data1의 데이터들을 data에 concat하여 setData시킨다. (data에 저장함.)
      })
      .catch((error) => {
        console.log(error);

      })

  }, []);

  return (
    <>
      <Outlet />
      <div className="CompletedRecruit_body">
        <div className="CompletedRecruit_main">
          {/* 네비게이션 */}
          <AdminNav />

          <Adminappbar />
          {/* main */}
          <div className="CompletedRecruit_dashboard">
            <div className="CompletedRecruit_mainTitle">
              <div>완료된 봉사</div>
            </div>
            <div className="CompletedRecruit_mainContent">
              <div className="CompletedRecruit_volSelect">

                <table className="CompletedRecruit_tableList">
                <tbody className="CompletedRecruit_tbody" style={{ display: 'inline-block' }} >
                  {/* <thead className="CompletedRecruit_thead" style={{ display: 'inline-block' }}> */}
                    <tr className="CompletedRecruit_tr1">
                      <th className="CompletedRecruit_tableListIdx">번호</th>
                      <th className="CompletedRecruit_tableListTitle">제목</th>
                      <th className="CompletedRecruit_tableListType">유형</th>
                      <th className="CompletedRecruit_tableListRecPeriod">모집기간</th>
                      {/* <th className="CompletedRecruit_tableListLocation">위치</th> */}
                    </tr>
                  {/* </thead> */}
             
                  
                    {lastIdx !== 0 ?
                      data.map((rowData, idx) => (
                        // 최초 선언한 기본값은 나타내지 않음
                        //rowData.id !== '' &&
                        <>
                          {rowData.volCurNumber !== rowData.volRecPersonnel && new Date() > new Date(rowData.volRecPeriod) ?
                            <tr key={idx} className="CompletedRecruit_tr">
                              <td className="CompletedRecruit_tableListIdx">{idx + 1}</td>
                              <td className="CompletedRecruit_tableListTitle">{rowData.volTitle}</td>
                              <td className="CompletedRecruit_tableListType">{rowData.volType}</td>
                              <td className="CompletedRecruit_tableListRecPeriod">~{dayjs(rowData.volRecPeriod).format('YYYY-MM-DD hh:mm')}</td>
                              {/* <td>{rowData.volLocation}</td> */}

                            </tr> :
                            <></>}
                        </>)) :
                      <tr>
                        <td>모집 완료된 봉사가 존재하지 않습니다.</td>
                      </tr>
                    }
                  </tbody>

                </table>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}

export default CompletedRecruit;