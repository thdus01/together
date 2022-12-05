/* eslint-disable */
import * as React from "react";
import './AdminPage.css';
import { Outlet } from "react-router-dom";
import OrgMyPage from "./OrgMyPage";

function AdminPage(props) {

  return (
    <>
      <Outlet />
      <OrgMyPage />
    </>
  );
}

export default AdminPage;