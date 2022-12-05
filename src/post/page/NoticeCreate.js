import React, { useState } from 'react';
import './css/NoticeCreate.css'
import axios from 'axios';
import moment from 'moment';
//선언하지 않아도, 디바이스 혹은 locale의 시간을 불러온다. 
import 'moment/locale/ko';	//대한민국
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/basic/Footer';
import NavBar from '../../components/basic/NavBar';
import Header from '../../components/basic/Header';


const NoticeCreate = () => {
    const [form, setForm] = useState({
        notTitle: '',
        notContent: '',
    });

    const navigate = useNavigate();

    //데이터 넣는거
    const handleChange = (prop) => (e) => {
        setForm({ ...form, [prop]: e.target.value });
    };

    //현재 시간 
    const nowTime = moment().format('yyyy-MM-DD-HH-mm');

    //글쓰기 버튼
    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm("정말 등록합니까?")) {
            axios.get('together/manager/create/notice', {
                params: {
                    notTitle: form.notTitle,
                    notContent: form.notContent,
                    notWriTime: nowTime,
                    notWriter: "sRLzo1nPwTKhYsW7e_dcK7OxeTd8vUXGQBIPVfXUnqA"
                }
            }).then((response) => {
                console.log(response);
                alert("등록되었습니다.");
                navigate("/NoticeMain");

            }).catch((error) => {
                console.log(error.response);
            })
        } else {
            alert("작성을 취소합니다.");
        }
    }


    return (
        <>
            <Header />
            <NavBar />
            <div className='NoticeCreate_NC'>
                <div className='divAlign_NC'>
                <div className='div1_NC'>공지사항 작성</div>
                <form className="form_NC" onSubmit={handleSubmit}>
                    <div style={{ display: "inline-block" }}>
                        <div className="div2_NC">
                            <label htmlFor="noticeTitle" className="label_NC">공지사항 제목
                                <input className="inputTitle_NC" required placeholder='공지사항 제목을 적어주세요' type='text' name='notTitle'
                                    value={form.notTitle} onChange={handleChange("notTitle")} />
                            </label>
                        </div>
                    </div>

                    <div style={{ display: "inline-block" }}>
                        <div className="div2_NC">
                            <label htmlFor="notContent" className="label_NC">공지사항 내용
                                <textarea className="textareaContent_NC" required placeholder='공지사항 글을 적어주세요' type='text' name='notContent'
                                    value={form.notContent} onChange={handleChange("notContent")} />
                            </label>
                        </div>
                    </div>

                    <div className='div3_NC'>
                        <button className='btn_NC' type='submit' onClick={handleSubmit}>글쓰기</button>
                        
                    </div>
                    
                </form>
            </div>
            </div>
            
            <Footer />
        </>
    );
};

export default NoticeCreate;