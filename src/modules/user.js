// 액션 타입 정의
const CHECK_LOGIN = 'counter/CHECK_LOGIN' // 로그인 유형
const MY_INFORMATION = 'counter/MY_INFORMATION'; // 내정보
const ORGANIZATION_INFORMATION = 'counter/ORGANIZATION_INFORMATION'; // 기관 정보
const MANAGER_INFORMATION = 'counter/MANAGER_INFORMATION'; // 관리자 정보

// 액션 생섬함수 정의
export const changeCheckLogin = (check_Login) => ({ type: CHECK_LOGIN, check_Login }); // 로그인 유형
export const changeMyInformation = (myInformation) => ({ type: MY_INFORMATION, myInformation }); // 내정보
export const changeOrganizationInformation = (organization_Information) => ({ type: ORGANIZATION_INFORMATION, organization_Information }); // 기관 정보
export const changeManagerInformation = (manager_Information) => ({ type: MANAGER_INFORMATION, manager_Information }); // 관리자 정보

// **** 초기상태 정의
const initialState = {
  // 로그인 유형
  check_Login: {check:"unLogined"},
  // 봉사자 정보
  myInformation: {
    serSns:"",              // SNS
    serName:"",             // 봉사자 이름
    serGender:"",           // 봉사자 성별
    serBirth:"",            // 봉사자 생일
    serMobile:"",           // 봉사자 전화번호
    serEmail:"",            // 봉사자 이메일
    serId:"",               // 봉사자 ID
    serCumCoefficient:0,    // 봉사 횟수
    serCumTime:0            // 봉사 누적 시간
  },
  // 기관 정보
  organization_Information: {
    orgId:"",             // 기관 아이디
    orgName:"",           // 기관 이름
    orgMobile:"",         // 기관 성별
    orgCertified :"",     // 기관 인증여부
    orgEmail:"",          // 기관 이메일
    orgType:"",           // 기관 유형
    orgAddress:"",        // 기관 주소
    orgSns:"",            // 로그인 유형
    orgManName:"",    // 관리자 이름
    orgManBirth:"",   // 관리자 생년월일
    orgManGender:"",  // 관리자 성별
    orgManagerSns:"",     // SNS
    orgManMobile:"",  // 관리자 전화번호
  },
  // 사이트 관리자 정보
  manager_Information: {
    manId:"",         // 관리자 아이디
    manName:"",       // 관리자 이름
    manMobile:"",     // 관리자 전화번호
    manEmail :"",     // 관리자 이메일
    manSns:"",        // 관리자 인증여부
  }
};

// **** 리듀서 작성
export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHECK_LOGIN: // 로그인 유형
      return {
        ...state,
        check_Login: action.check_Login,
      };
    case MY_INFORMATION: // 봉사자 정보
      return {
        ...state,
        myInformation: action.myInformation,
      };
    case ORGANIZATION_INFORMATION: // 기관 정보
      return {
        ...state,
        organization_Information: action.organization_Information,
      };
    case MANAGER_INFORMATION: // 사이트 관리자 정보
      return {
        ...state,
        manager_Information: action.manager_Information,
      };
    default:
      return state;
  }
}