import React, { useEffect, useState } from 'react';
import NoticeTable from '../table/NoticeTable';
import NoticeTableColumn from '../table/NoticeTableColumn';
import NoticeTableRow from '../table/NoticeTableRow';
import './css/NoticeBoard.css';
import axios from 'axios';
import dayjs from "dayjs";

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NoticeBoard = (props) => {// eslint-disable-line no-unused-vars
  const [dataList, setDataList] = useState([]);
  // const [date, setDate] = useState();

  // const sortDate = item.notWriTime.sort((a, b) => b[notWriTime] - a[notWriTime]);

  const loginType = useSelector((state) => state.user.check_Login.check);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/together/find/all/notice')
      .then(res => {
        console.log(res.data);
        setDataList(res.data);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <>
      <div className='NoticeBoard_NB'>
        <NoticeTable headersName={['번호\n  (No)', '제목', '등록일', '작성자']}>
          {
            dataList ? dataList.map((item, index) => {
              return (
                <NoticeTableRow key={index}>
                  <NoticeTableColumn>{index + 1}</NoticeTableColumn>
                  <NoticeTableColumn>
                    <a href={`/NoticeView/${item.notId}`} className="a_PL" >{item.notTitle}</a>
                  </NoticeTableColumn>
                  <NoticeTableColumn>{dayjs(new Date(item.notWriTime)).format('YYYY/MM/DD HH:mm:ss')}</NoticeTableColumn>
                  <NoticeTableColumn>관리자</NoticeTableColumn>
                </NoticeTableRow>
              )
            }) : <></>
          }
        </NoticeTable>
        {/*loginType === "admin" ?
          <div>
            <Button btnName="글쓰기" btnStyle={{ position: 'relative', margin: '5px', float: 'right', marginRight: '50px', marginBottom: "20px" }} customClickEvent={() => { navigate("/NoticeCreate") }} > </Button>
        </div> : <></>*/}
        <hr className='invisiblehr_PL' />

      </div>




      <hr className='invisiblehr_PL' />

    </>
  )
}

export default NoticeBoard;
