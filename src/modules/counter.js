// 액션 타입 정의
const VOLUNTEER_SELECT = 'counter/VOLUNTEER_SELECT'; // 봉사 목록
const VOLUNTEERSUCCESS_SELECT = 'counter/VOLUNTEERSUCCESS_SELECT'; // 봉사 목록 - 활동후
const REQUESTVOLUNTEER_SELECT = 'counter/REQUESTVOLUNTEER_SELECT'; // 봉사 목록 - 활동전
const NOTICE_SELECT = 'counter/NOTICE_SELECT'; // 공지사항 목록


// 액션 생섬함수 정의
export const changeVolunteerSelect = (volunteer_Select) => ({ type: VOLUNTEER_SELECT, volunteer_Select }); // 봉사 목록
export const changeVolunteerSuccessSelect = () => ({ type: VOLUNTEERSUCCESS_SELECT }); // 봉사 목록 - 활동후
export const changeRequestVolunteerSelect = () => ({ type: REQUESTVOLUNTEER_SELECT }); // 봉사 목록 - 활동전
export const changeNoticeSelect = () => ({ type: NOTICE_SELECT }); // 공지사항 목록

// **** 초기상태 정의
const initialState = {
  // 봉사 목록2(완성본)
  volunteer_Select: [
    {
      volId:1,                                      // 봉사 번호
      volRecPersonnel:100,                          // 모집 총인원
      volCurNumber:100,                             // 현재필요인원
      volRecPeriod:"yy-mm-dd 00:00:00",             // 모집 기한
      volType:"유형",                               // 봉사 유형
      volOrganization:"기관이름",                   // 봉사 기관
      volLocation:"경기도 화성시 10용사로 286",      // 봉사 위치
      volStTime:"yy-mm-dd 00:00:00",                // 봉사 시작시간
      volEndTime:"yy-mm-dd 00:00:00",               // 봉사 종료시간
      volTitle:"제목",                              // 제목
      volContent:"본문"                             // 본문
    },
    {volId:2, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:3, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:4, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:5, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:6, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:7, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:8, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:9, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:10, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:11, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:12, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:13, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:14, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:15, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
  ],
  // 봉사 목록 - 활동후
  volunteerSuccess_Select: [
    {
      volId:1,                                      // 봉사 번호
      volRecPersonnel:100,                          // 모집 총인원
      volCurNumber:100,                             // 현재필요인원
      volRecPeriod:"yy-mm-dd 00:00:00",             // 모집 기한
      volType:"유형",                               // 봉사 유형
      volOrganization:"기관이름",                   // 봉사 기관
      volLocation:"경기도 화성시 10용사로 286",      // 봉사 위치
      volStTime:"yy-mm-dd 00:00:00",                // 봉사 시작시간
      volEndTime:"yy-mm-dd 00:00:00",               // 봉사 종료시간
      volTitle:"제목",                              // 제목
      volContent:"본문"                             // 본문
    },
    {volId:2, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:3, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:4, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:5, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
  ],
  // 봉사 목록 - 활동전
  requestVolunteer_Select: [
    {
      volId:1,                                      // 봉사 번호
      volRecPersonnel:100,                          // 모집 총인원
      volCurNumber:100,                             // 현재필요인원
      volRecPeriod:"yy-mm-dd 00:00:00",             // 모집 기한
      volType:"유형",                               // 봉사 유형
      volOrganization:"기관이름",                   // 봉사 기관
      volLocation:"경기도 화성시 10용사로 286",      // 봉사 위치
      volStTime:"yy-mm-dd 00:00:00",                // 봉사 시작시간
      volEndTime:"yy-mm-dd 00:00:00",               // 봉사 종료시간
      volTitle:"제목",                              // 제목
      volContent:"본문"                             // 본문
    },
    {volId:2, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:3, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:4, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
    {volId:5, volRecPersonnel:0, volRecPeriod:"모집기한", volType:"유형", volOrganization:"기관이름", volCurNumber:0, 
      volLocation:"위치", volStTime:"시작시간", volEndTime:"종료시간", volTitle:"제목", volContent:"본문"},
  ],
  // 공지사항 목록
  notice_Select: [
    {notId:1, notWriter:'작성자1', notWriTime:'작성시간1', notTitle:'제목1', notContent:'본문1'},
    {notId:2, notWriter:'작성자2', notWriTime:'작성시간2', notTitle:'제목2', notContent:'본문2'},
    {notId:3, notWriter:'작성자3', notWriTime:'작성시간3', notTitle:'제목3', notContent:'본문3'},
    {notId:4, notWriter:'작성자4', notWriTime:'작성시간4', notTitle:'제목4', notContent:'본문4'},
    {notId:5, notWriter:'작성자5', notWriTime:'작성시간5', notTitle:'제목5', notContent:'본문5'},
  ],
};

// **** 리듀서 작성
export default function counter(state = initialState, action) {
  switch (action.type) {
    case VOLUNTEER_SELECT: // 봉사 목록
      return {
        ...state,
        volunteer_Select: action.volunteer_Select,
      };
    case REQUESTVOLUNTEER_SELECT: // 봉사 목록 - 활동전
      return {
        ...state,
        requestVolunteer_Select: action.requestVolunteer_Select,
      };
    case VOLUNTEERSUCCESS_SELECT: // 봉사 목록 - 활동후
      return {
        ...state,
        volunteerSuccess_Select: action.volunteerSuccess_Select,
      };
    case NOTICE_SELECT: // 공지사항 목록
      return {
        ...state,
        notice_Select: action.notice_Select,
      };
    default:
      return state;
  }
}