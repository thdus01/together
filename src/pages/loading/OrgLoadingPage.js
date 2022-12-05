import React, {useEffect, useCallback, useState} from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import Post from '../../components/Tools/Post';

import './OrgLoadingPage.css';
import { changeCheckLogin, changeOrganizationInformation } from '../../modules/user';
import Button from "../../components/Tools/Button";
import logo from '../../assets/together_logo.png';

function AdminLoadingPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [tokenData, setTokenData] = useState({});

    const AdminLoginApiCall = useCallback(async () => {

        let tokenData = null;

        console.log("기관 회원가입 통신호출");

        try {
            // 토큰 호출
            const token = window.location.href.split('=')[1].split('&')[0];
            const loginType = localStorage.getItem('loginType'); // 로그인 형식
            console.log(loginType);

            // 기관 회원가입 토큰 보내기
            await axios.post("/together/signup", {access_token:token, loginType:loginType})
                .then((response) => {
                    console.log(response);
                    tokenData = response.data;
                    console.log(typeof(tokenData))
                })
                .catch((error) => {
                    console.log(error);
                });

            if(tokenData.data === null) { // 유저 데이터 = 성공
                // 오류 출력
                alert("[실패] 데이터를 받지 못했습니다!");

                navigate('/SignUp'/*, 
                {state: {
                    userType: ""
                }}
                */)

            } else {
                setTokenData(tokenData);
                
            }
        } catch(err) {
            console.log("Error >>", err);
            // 오류 출력
            alert("[실패] 데이터를 받지 못했습니다!");

            navigate('/SignUp'/*, 
            {state: {
                userType: ""
            }}
            */)
        }

    }, [navigate]);

    const [orgType, setOrgType] = useState(""); // 기관 유형
    const [orgMobile, setOrgMobile] = useState(""); // 기관 전화번호
    const [orgName, setOrgName] = useState(""); // 기관 이름

    const [orgData, setOrgData] = useState({}); // 모든 데이터 합치기

    // 다음 주소 검색 코드
    const [enroll_company, setEnroll_company] = useState({address:'',});
    const [popup, setPopup] = useState(false);
    
    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]:e.target.value,
        })
    }
    
    const handleComplete = (e) => {
        setPopup(!popup);
    }

    // input에 입력할때 정보 저장하는 메소드 선언
    const changeName = (e) => {
        setOrgName(e.target.value);
    }

    const changeType = (e) => {
        setOrgType(e.target.value);
    }

    const changeMobile = (e) => {
        setOrgMobile(e.target.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`));
    }

    /** 회원가입 버튼 클릭 메소드 */
    const SignUpClick = useCallback(async (e) => {

        if(orgName === "") {
            alert("기관 이름을 입력해주세요!");
        } else if(orgType === "") {
            alert("기관 유형을 입력해주세요!");
        } else if(enroll_company.address === "") {
            alert("기관 주소를 입력해주세요!");
        } else if(orgMobile === "") {
            alert("기관 전화번호를 입력해주세요!");
        } else {
            tokenData.orgAddress = orgData.orgAddress;
            tokenData.orgMobile = orgData.orgMobile;
            tokenData.orgName = orgData.orgName;
            tokenData.orgType = orgData.orgType;
            console.log(tokenData);

            let resultData = null;

            console.log("기관 회원가입2 호출");
            await axios.post("/together/signup/org", {
                orgAddress:tokenData.orgAddress,
                orgEmail:tokenData.orgEmail,
                orgId:tokenData.orgId,
                orgManBirth:tokenData.orgManBirth,
                orgManGender:tokenData.orgManGender,
                orgManMobile:tokenData.orgManMobile,
                orgManName:tokenData.orgManName,
                orgMobile:tokenData.orgMobile,
                orgName:tokenData.orgName,
                orgSns:tokenData.orgSns,
                orgType:tokenData.orgType,
                role:tokenData.role
            })
                    .then((response) => {
                        console.log(response.data);
                        resultData = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            if(resultData != null) {

                dispatch(changeCheckLogin({check:"institution"}));
                dispatch(changeOrganizationInformation({
                    orgId:resultData.orgId,                         // 기관 아이디
                    orgName:resultData.orgName,                     // 기관 이름
                    orgMobile:resultData.orgMobile,                 // 기관 성별
                    orgCertified :resultData.orgCertified,          // 기관 인증여부
                    orgEmail:resultData.orgEmail,                   // 기관 이메일
                    orgType:resultData.orgType,                     // 기관 유형
                    orgAddress:resultData.orgAddress,               // 기관 주소
                    orgManName:resultData.orgManName,               // 관리자 이름
                    orgManBirth:resultData.orgManBirth,             // 관리자 생년월일
                    orgManGender:resultData.orgManGender,           // 관리자 성별
                    orgSns:resultData.orgSns,                       // SNS
                    orgManMobile:resultData.orgManMobile,           // 관리자 전화번호
                }));

                // 페이지 이동
                navigate('/'/*, 
                    {state: {
                        userType: ""
                    }}
                */)
            } else {
                alert("[실패] 회원가입 신청이 실패했습니다.")

                // 페이지 이동
                navigate('/SignUp'/*, 
                    {state: {
                        userType: ""
                    }}
                */)
            }

        }

    }, [dispatch, navigate, tokenData, orgData, enroll_company.address, orgMobile, orgName, orgType])

    useEffect(() => {
        AdminLoginApiCall();

    }, [AdminLoginApiCall])

    useEffect(() => {
        if (orgMobile.length === 10) {
            setOrgMobile(orgMobile.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (orgMobile.length === 13) {
            setOrgMobile(orgMobile.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }

        setOrgData({orgName:orgName, orgType:orgType, orgAddress:enroll_company.address, orgMobile:orgMobile});
    }, [orgMobile, orgName, orgType, enroll_company])
    
    return (
        <div className='OrgLoadingPage_body'>
            <div className='logoBox'>
                <Link to="/">
                    <img src={logo} className='logo' alt="together"/>
                </Link>
            </div>
            <div className='OrgLoadingPage_Box'>
                <h2 className="OrgLoadingPage_title">기관 정보 추가 입력</h2>
                <table className='OrgLoadingPage_table'>
                    <tbody className="OrgLoadingPage_table_tbody">
                        <tr className="OrgLoadingPage_table_tbody_tr">
                            <th className="OrgLoadingPage_table_tbody_tr_th"><p>기관 이름</p></th>
                            <td className="OrgLoadingPage_table_tbody_tr_td"><div className="OrgLoadingPage_table_tbody_tr_td_out"><input type="text" className="OrgLoadingPage_table_tbody_tr_td_in" onChange={changeName} value={orgName}></input></div></td>
                        </tr>
                    </tbody>
                    <tbody className="OrgLoadingPage_table_tbody">
                        <tr className="OrgLoadingPage_table_tbody_tr">
                            <th className="OrgLoadingPage_table_tbody_tr_th"><p>기관 유형</p></th>
                            <td className="OrgLoadingPage_table_tbody_tr_td"><div className="OrgLoadingPage_table_tbody_tr_td_out"><input type="text" className="OrgLoadingPage_table_tbody_tr_td_in" onChange={changeType} value={orgType}></input></div></td>
                        </tr>
                    </tbody>
                    <tbody className="OrgLoadingPage_table_tbody">
                        <tr className="OrgLoadingPage_table_tbody_tr">
                            <th className="OrgLoadingPage_table_tbody_tr_th"><p>기관 주소</p></th>
                            <td className="OrgLoadingPage_table_tbody_tr_td">
                                <div className="OrgLoadingPage_table_tbody_tr_td_out" >
                                    <div style={{display:"inline-block"}}><input className="OrgLoadingPage_table_tbody_tr_td_in" style={{width:"180px"}} placeholder="주소"  type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address} disabled={true}/></div>
                                    <a href='#!' onClick={handleComplete}><Button btnStyle={{marginLeft:"8px", marginRight:"0px", marginTop:"2px", marginBottom:"0px"}} spanStyle={{margin:"5px", fontSize:"16px"}} btnName='검색'/></a>
                                    {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody className="OrgLoadingPage_table_tbody">
                        <tr className="OrgLoadingPage_table_tbody_tr">
                            <th className="OrgLoadingPage_table_tbody_tr_th"><p>기관 전화번호</p></th>
                            <td className="OrgLoadingPage_table_tbody_tr_td"><div className="OrgLoadingPage_table_tbody_tr_td_out"><input type="text" className="OrgLoadingPage_table_tbody_tr_td_in" onChange={changeMobile} value={orgMobile}></input></div></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <a href='#!' onClick={SignUpClick}><Button btnFloat='' btnMargin='5px' spanMargin='2px' btnName='회원가입'/></a>
                </div>
            </div>
        </div>
    )
}

export default AdminLoadingPage;