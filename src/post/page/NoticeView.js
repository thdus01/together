import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './css/NoticeView.css';
import axios from 'axios';
import dayjs from "dayjs";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '../../components/basic/Footer';
import NavBar from '../../components/basic/NavBar';
import Header from '../../components/basic/Header';
import { useSelector } from 'react-redux';

// eslint-disable-line no-unused-vars
const NoticeView = () => {// eslint-disable-line no-unused-vars
  NoticeView.propTypes = {
    history: PropTypes.elementType.isRequired,
    location: PropTypes.elementType.isRequired,
    match: PropTypes.elementType.isRequired,
    data: PropTypes.elementType.isRequired,
    setData: PropTypes.elementType.isRequired,
  };

  //
  const [data, setData] = useState({});


  const loginType = useSelector((state) => state.user.check_Login.check);


  //뒤로가기 구현
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  }


  //not_id를 찾아 글 조회
  const notId = useParams();

  //eslint-disable-line no-unused-vars
  useEffect(() => {
    axios.get('/together/find/notice',
      {
        params: {
          notId: notId.id
        }
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const onRemove = () => {
    if (window.confirm("정말 삭제합니까?")) {
      axios.get("/together/manager/delete/notice", {
        params: {
          notId: data.notId
        }
      }).then((response) => {
        console.log(response);
        alert("삭제되었습니다.");
        navigate("/NoticeMain");

      }).catch((error) => {
        console.log(error.response);
      })
    } else {
      alert("취소합니다.");
    }
  }




  return (
    <>
      <Header />
      <NavBar />
      <div className='NoticeView_NV'>
        <h2 className='h2_NV'>게시글 상세정보</h2>

        <div className="postWrapper_NV">
          {
            data ? (
              <>
                <div className='NoticeDiv_NV'>
                  <div className="postRow_NV">
                    <label>제목</label>
                    <label>{data.notTitle}</label>
                  </div>
                  <div className="postRow_NV">
                    <label>작성일</label>
                    <label>{dayjs(new Date(data.notWriTime)).format('YYYY/MM/DD HH:mm')}</label>
                  </div>
                  <div className="postRow_NV">
                    <label>내용</label>
                    <div className='div_NV'>
                      {data.notContent}
                    </div>
                  </div>
                </div>
              </>

            ) : '해당 게시글을 찾을 수 없습니다.'

          }


          <div>
            {/*loginType === "admin" ? <button className="btn_NV" onClick={onRemove}>게시글 삭제</button> : <></>*/}
            <button className="btn_NV" onClick={handleGoBack}>목록으로 돌아가기</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default NoticeView;