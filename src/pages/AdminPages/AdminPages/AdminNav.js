import React, { useCallback } from "react";
import './AdminNav.css';

import { styled, alpha, useTheme } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/together_logo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeCheckLogin, changeManagerInformation } from '../../modules/user';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AccountCircle } from "@mui/icons-material";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'grid',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


function AdminNav(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const isMenuOpen = Boolean(anchorEl);

    const menuId = 'primary-search-account-menu';

    const [expended, setExpended] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {  // 네비게이션 메뉴 오픈
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // // 로그아웃
    // const logout = useCallback(() => {
    //     dispatch(changeCheckLogin({ check: "unLogined" }));
    //     dispatch(changeManagerInformation({  // 관리자 정보 초기화
    //         manId: "",      // 관리자 아이디
    //         manName: "",    // 관리자 이름
    //         manMobile: "",  // 관리자 전화번호
    //         manEmail: "",   // 관리자 이메일
    //         manSns: "",     // 관리자 인증여부
    //     }));
    //     if (window.confirm("로그아웃 하시겠습니까?")) {
    //         alert("로그아웃 되었습니다.");
    //         navigate("/");
    //     }
    // }, [dispatch]);

    return (
        <>
            <div className="AdminPage_navigation">
                <ul>
                    {/* <Link to="/">
                        <img src={logo} className="main_title" alt="together" />
                    </Link> */}
                    <li>
                        <Link to="/AdminPage">
                            <span className="icon">
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit">
                                    <DashboardIcon />
                                </IconButton>
                            </span>
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/AdminPage/AdminDrawer">
                            <span className="icon">
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit">
                                    <VerifiedUserIcon />
                                </IconButton>
                            </span>
                            <span className="title">봉사 등록</span></Link>
                    </li>
                    <li>
                        <Link to="/AdminPage/CurrentRecruit"> 
                            <span className="icon">
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </span>
                            <span className="title">봉사 관리</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/AdminPage/CompletedRecruit">
                            <span className="icon">
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit">
                                    <SupervisorAccountIcon />
                                </IconButton>
                            </span>
                            <span className="title">완료된 봉사</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/OrgMyPage">
                            <span className="icon">
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit">
                                    <AccountCircle />
                                </IconButton>
                            </span>
                            <span className="title">MY PAGE</span>
                        </Link>
                    </li>
                                       
                </ul>
            </div>
        </>
    );
}

export default AdminNav;