import React, { useState } from "react";
import { Link, Outlet, Route } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AdminNav from "./AdminNav";
import Adminappbar from "./Adminappbar";
import './AdminDrawer.css';
import TestVolInsertPage from "./test/TestVolInsertPage";

function AdminDrawer(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = 'primary-search-account-menu';

  // 본문 입력 state
  const [volTitle, setVolTitle] = useState("");                     // 제목
  const [voltype, setVolType] = useState("");                       // 봉사 유형
  const [startDate, setStartDate] = useState("");                   // 시작 날짜
  const [endDate, setEndDate] = useState("");                       // 종료 날짜
  const [volRecPeriod, setVolRecPeriod] = useState("");             // 마감 날짜
  const [volRecPersonnel, setVolRecPersonnel] = useState(0);        // 모집 인원
  const [volContent, setVolContent] = useState("");                 // 본문


  const changeVolTitle = (e) => {  // 제목
    setVolTitle(e.target.value);
  }

  const changeVolType = (e) => {  // 봉사 유형
    setVolType(e.target.value);
  }

  return (
    <>
      <Outlet />
      <div className="AdminDrawer_body">
        <div className="AdminDrawer_main">
          {/* 관리자 페이지 네비게이션 */}
          <AdminNav />

          {/* appbar 부분 */}
          <Adminappbar />

          {/* main */}
          <div className="AdminDrawer_dashboard">
            <div className="AdminDrawer_mainTitle">
              <div>봉사 등록</div>
            </div>

            <div className="AdminDrawer_mainContent">
              <div className="AdminDrawer_volSelect">
                <TestVolInsertPage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDrawer;