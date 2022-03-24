/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import "./index.css";
import { reqJudgeLogin, reqRegister, reqFindUser, reqAddMessage, reqMessages } from "../../../api/index";
import { formateDate } from "../../../utils/dateUtils";
import MessageItem from '../../../components/MessageItem';
import UserInfo from "../../../components/UserInfo";
import LoginView from '../../../components/LoginView';

// import userUtils from '../../../utils/userUtils';

export default function Comment() {
  const [comment, setComment] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [curUser, setCurUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warn, setWarn] = useState(false);
  useEffect(() => {
    isLoginOrRegister();
    getMessages()
  }, [])
  const pushComment = (e) => {
    setComment(e.target.value);
    if (comment !== "") {
      setWarn(false);
    }
  }
  const isLoginOrRegister = async () => {
    const result = await reqJudgeLogin();
    console.log(result);
    if (result.code === 0) {
      setIsLogin(result.data.user_id)
      const userInfo = await reqFindUser({_id:result.data.user_id});
      console.log(userInfo);
      if (userInfo.code === 0) {
        setCurUser(userInfo.data);
      }
      else {
        console.log(userInfo.msg);
      }
    }
    else {
      console.log(result.msg);
    }
   /*
    if(userUtils._id !== ""){
      setIsLogin(userUtils._id);
      setCurUser(userUtils.user);
    }
    */
  }
  // 登录/注册
  const goLoginOrRegister = async (user) => {
    // const user = { nickname, email, website, ischecked };
    const result = await reqRegister(user);
    if (result.code === 0) {
      // setCurUser(result.data);
      isLoginOrRegister()
    }
    else {
      console.log("登录/注册失败", result.msg);
    }
  }
  // 提交留言信息
  const submitComment = async () => {
    if (comment !== "") {
      const message = {
        time: formateDate(Date.now()),
        content: comment,
        user: curUser._id
      };
      const result = await reqAddMessage(message);
      // console.log(result);
      if (result.code === 0) {
        console.log("添加留言成功!");
        getMessages();
        setComment("");
      }
      else {
        console.log("添加留言失败...");
      }
    }
    else {
      setWarn(true);
    }
  }
  // 获取留言列表
  const getMessages = async () => {
    setLoading(true);
    const result = await reqMessages();
    setLoading(false);
    // console.log(result);
    if (result.code === 0) {
      setMessages(result.data);
    }
    else {
      console.log(result.msg);
    }
  }
  return (
    <div className='container'>
      <div className='comment'>
        {
          isLogin === "" ? 
          null 
          : 
          <UserInfo curUser={curUser} />
        }
        <textarea
          className='text'
          placeholder='请输入你的留言...'
          value={comment}
          onChange={pushComment}
        />
        {
          warn ? <p style={{ color: "red", fontSize: "14px", paddingTop: "5px" }}>留言不能为空!</p> : <p style={{ height: "24.2px" }}></p>
        }
        {
          isLogin === "" ?
            <LoginView goLoginOrRegister={goLoginOrRegister} />
            :
            <button className='push' onClick={submitComment}>提交留言</button>
        }
      </div>
      <h1>留言板</h1>
      <div className='message-list'>
        {
          loading ?
            <div className='loading'>
              <p className='loading-text'>留言数据正在加载中...</p>
            </div>
            :
            <div>
              {
                messages.length > 0 ?
                  <div>
                    {
                      messages.map((item, index) => {
                        return <MessageItem message={item} key={index} />
                      })
                    }
                  </div>
                  :
                  <div className='loading'>
                    <p className='loading-text'>留言数据为空...</p>
                  </div>
              }
            </div>

        }
      </div>
    </div>

  )
}
