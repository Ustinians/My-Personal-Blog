/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import "./index.css";
import { reqJudgeLogin, reqRegister, reqFindUser, reqAddMessage, reqMessages } from "../../../api/index";
import { formateDate } from "../../../utils/dateUtils";
import MessageItem from '../../../components/MessageItem';

export default function Comment() {
  const [comment, setComment] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [ischecked, setIschecked] = useState(false);
  const [curUser, setCurUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warn, setWarn] = useState(false);
  useEffect(() => {
    isLoginOrRegister();
    getMessages()
  }, [])
  const pushInput = (e, type) => {
    if (type === "comment") {
      setComment(e.target.value);
      if (comment !== "") {
        setWarn(false);
      }
    }
    else if (type === "nickname") {
      setNickname(e.target.value);
    }
    else if (type === "email") {
      setEmail(e.target.value);
    }
    else if (type === "website") {
      setWebsite(e.target.value);
    }
    else {
      setIschecked(!ischecked);
    }
  }
  const isLoginOrRegister = async () => {
    const result = await reqJudgeLogin();
    // console.log(result);
    if (result.code === 0) {
      setIsLogin(result.data.user_id)
      const userInfo = await reqFindUser(result.data.user_id);
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
  }
  // 登录/注册
  const goLoginOrRegister = async () => {
    const user = { nickname, email, website, ischecked };
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
        <div className='user-info'>
          <span className='user-name'><i className='iconfont icon-user'></i>{curUser.nickname}</span>
          <span className='user-email'><i className='iconfont icon-emailfilling'></i>{curUser.email}</span>
          <span className='user-website'><i className='iconfont icon-website'></i>{curUser.website}</span>
        </div>
        <textarea
          className='text'
          placeholder='请输入你的留言...'
          value={comment}
          onChange={(event) => pushInput(event, "comment")}
        />
        {
          warn ? <p style={{ color: "red", fontSize: "14px", paddingTop: "5px" }}>留言不能为空!</p> : <p style={{ height: "24.2px" }}></p>
        }
        {
          isLogin === "" ?
            <div className='login'>
              <p>请先进行登录/注册:</p>
              <form>
                <div className='nickname'>用户名: <input onChange={(event) => pushInput(event, "nickname")} value={nickname} className='text' placeholder='请输入你的用户名'></input></div>
                <div className='email'>邮箱: <input onChange={(event) => pushInput(event, "email")} value={email} className='text' placeholder='请输入你的邮箱'></input></div>
                <div className='website'>个人网站: <input onChange={(event) => pushInput(event, "website")} value={website} className='text' placeholder='请输入你的个人网站'></input></div>
                <div className='ischecked'><input onChange={(event) => pushInput(event, "ischecked")} value={ischecked} type="checkbox" /> 7天内免登录</div>
              </form>
              <button onClick={goLoginOrRegister}>登录/注册</button>
            </div>
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
