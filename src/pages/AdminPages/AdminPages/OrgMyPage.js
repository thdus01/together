import * as React from "react";
import './OrgMyPage.css';
import { Link, Outlet, Route } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AdminNav from "./AdminNav";
import Adminappbar from "./Adminappbar";
import { useSelector } from "react-redux";

function OrgMyPage(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = 'primary-search-account-menu';

  // redux에서 기관 정보 불러온다.
  const informList = useSelector((state) => state.user.organization_Information);

  let informComponent = null;

  if (informList == null) {
    informComponent = (
      <div>기업 정보가 없습니다!</div>
    )
  } else if (informList !== null) {
    informComponent = (
      <>
        <tbody className="OrgMyPage_tableTbody">
          <tr className="OrgMyPage_tableTd">
            <th>기관명 </th>
            <td>{informList.orgName} </td></tr>
          <tr className="OrgMyPage_tableTd">
            <th>전화번호 </th>
            <td>{informList.orgMobile}</td></tr>
          <tr className="OrgMyPage_tableTd">
            <th>기관유형 </th>
            <td>{informList.orgType}</td></tr>
          <tr className="OrgMyPage_tableTd">
            <th>주소 </th>
            <td>{informList.orgAddress}</td></tr>
          <br />
          <tr className="OrgMyPage_tableTd">
            <th>담당자 이름 </th>
            <td>{informList.orgManName}</td></tr>
          <tr className="OrgMyPage_tableTd">
            <th>담당자 전화번호 </th>
            <td>{informList.orgManMobile}</td></tr>
          <tr className="OrgMyPage_tableTd">
            <th>담당자 이메일</th>
            <td>{informList.orgEmail}</td></tr>

        </tbody>
      </>
    )
  }

  return (
    <>
      <Outlet />
      <div className="OrgMyPage_body">
        <div className="OrgMyPage_main">
          {/* 네비게이션 */}
          <AdminNav />

          <Adminappbar />

          {/* main */}
          <div className="OrgMyPage_dashboard">
            <div className="OrgMyPage_mainTitle">
              <div>MyPage</div>
            </div>

            <div className="OrgMyPage_content">
              <div className="OrgMyPage_OrganInfo">Organization Info</div>

              <div className="OrgMyPage_detail">
                <div className='OrgMyPage-personalInformationBox'>
                  {/* <p className='OrgMyPage-volunteerRecordBox-p'>내 상세정보</p> */}
                  <table className='OrgMyPage-personalInformationBox-table'>
                    {informComponent}
                  </table>
                </div>

              </div>

            </div>


          </div>
        </div>
      </div>
    </>
  );
}

export default OrgMyPage;