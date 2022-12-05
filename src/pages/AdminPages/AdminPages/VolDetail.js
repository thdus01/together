import * as React from "react";
import { Link, Outlet, Route, useLocation, useNavigate } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AdminNav from "./AdminNav";
import Adminappbar from "./Adminappbar";
import './VolDetail.css';
import { useSelector } from "react-redux";
import axios from "axios";
import Button from '../../components/Tools/Button';
import dayjs from "dayjs";

function VolDetail(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const menuId = 'primary-search-account-menu';

    const location = useLocation();
    const navigate = useNavigate();

    //const volId = useSelector((state) => state.counter.volunteer_Select.volId);

    const testData2 = useSelector((state) => state.user.organization_Information);  // 기관 정보

    const [orgName, setOrgName] = React.useState(testData2.orgName);                           // 기관 담당자 이름
    const volContent = location.state.value1;        // 봉사 본문 내용
    const volCurNumber = location.state.value4;      // 현재 신청 인원
    const volEndTime = location.state.value5;        // 마감 시간
    // const [volId, setVolId] = React.useState(testData1.volId);                                 // 글 번호
    const volLocation = location.state.value9;       // 위치
    const volOrganization = location.state.value8;   // 모집기관
    const volRecPeriod = location.state.value3;      // 모집 기간
    const volRecPersonnel = location.state.value7;   // 모집 인원
    const volStTime = location.state.value6;         // 시작 시간
    const volTitle = location.state.value;           // 제목
    const volType = location.state.value2;           // 봉사 유형

    const volId = location.state.valueVolId;  // 글 번호

    const handleOrgName = (e) => {
        setOrgName(e.target.value);
    }

    console.log(orgName);
    console.log(volTitle);
    console.log(volId);

    const onDelete = React.useCallback(() => {  // 모집 글 삭제

        if(window.confirm("해당 봉사를 삭제하시겠습니까?")) {

            try {
                axios.get('/together/delete/volunteer', { params: { volId: volId } })
                    .then((response) => {
                        console.log(response.data);
                        alert("[삭제되었습니다!]");
                        navigate('/AdminPage/CurrentRecruit')
                    })
                    .catch((error) => {
                        console(error);
                    })
            } catch (error) {
                console.log(error);
            }

        } else {
            alert("삭제 취소!");
        }

       
    });

    return (
        <>
            <Outlet />
            <div className="VolDetail_body">
                <div className="VolDetail_main">
                    {/* 네비게이션 */}
                    <AdminNav />

                    <Adminappbar />
                    {/* main */}
                    <div className="VolDetail_dashboard">
                        <div>
                            <div className="VolDetail_title">
                                <div>{volTitle}</div>
                                </div>
                                <table className="VolDetail_table">
                                    <tbody className="VolDetail_table_tbody">
                                        <tr className="VolDetail_table_tr">
                                            <th className="VolDetail_table_tr_th">기관명</th>
                                            <td className="VolDetail_table_tr_td">{orgName}</td>
                                        </tr>
                                        <tr>
                                            <th className="VolDetail_table_tr_th">봉사 유형</th>
                                            <td className="VolDetail_table_tr_td">{volType}</td>
                                        </tr>
                                        <tr>
                                            <th className="VolDetail_table_tr_th">모집 기간</th>
                                            <td className="VolDetail_table_tr_td">{dayjs(volRecPeriod).format("YYYY-MM-DD HH:mm") + " 까지"}</td>
                                        </tr>
                                        <tr>
                                            <th className="VolDetail_table_tr_th">모집 현황</th>
                                            <td className="VolDetail_table_tr_td">{volCurNumber}/{volRecPersonnel + " (단위 : 명)"}</td>
                                        </tr>
                                        <tr>
                                            <th className="VolDetail_table_tr_th">봉사 날짜</th>
                                            <td className="VolDetail_table_tr_td">{dayjs(volStTime).format("YYYY-MM-DD HH:mm") + " ~ " + dayjs(volEndTime).format("YYYY-MM-DD HH:mm")}</td>
                                        </tr>
                                        <tr>
                                            <th className="VolDetail_table_tr_th">봉사 위치</th>
                                            <td className="VolDetail_table_tr_td">{volLocation}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='VolDetail_contentBox'>
                                    <p className='VolDetail_contentBox_p'>봉사 내용 및 규칙</p>
                                    <hr className='VolDetail_contentBox_hr' />
                                    <div className='VolDetail_contentBox_div'>
                                        {volContent}
                                    </div>
                                </div>
                            
                        </div>
                        <div>
                            <button type="button" onClick={onDelete} className="onBtnDelete">삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VolDetail;