/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import "./index.css";
import { reqJudgeLogin, reqRegister, reqFindUser, reqAddMessage } from "../../api/index";
import {formateDate} from "../../utils/dateUtils";

export default function Comment() {
  const [comment, setComment] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [nickname,setNickname] = useState("");
  const [email,setEmail] = useState("");
  const [website,setWebsite] = useState("");
  const [ischecked,setIschecked] = useState(false);
  const [curUser,setCurUser] = useState({});
  useEffect(() => {
    isLoginOrRegister();
  }, [])
  const pushInput = (e,type) => {
    if(type === "comment"){
      setComment(e.target.value);
    }
    else if(type === "nickname"){
      setNickname(e.target.value);
    }
    else if(type === "email"){
      setEmail(e.target.value);
    }
    else if(type === "website"){
      setWebsite(e.target.value);
    }
    else{
      setIschecked(!ischecked);
    }
  }
  const isLoginOrRegister = async () => {
    const result = await reqJudgeLogin();
    // console.log(result);
    if (result.code === 0) {
      setIsLogin(result.data.user_id)
      const userInfo = await reqFindUser(result.data.user_id);
      if(userInfo.code === 0){
        setCurUser(userInfo.data);
      }
      else{
        console.log(userInfo.msg);
      }
    }
    else {
      console.log(result.msg);
    }
  }
  // 登录/注册
  const goLoginOrRegister = async () => {
    const user = {nickname,email,website,ischecked};
    const result = await reqRegister(user);
    if(result.code === 0){
      // setCurUser(result.data);
      isLoginOrRegister()
    }
    else{
      console.log("登录/注册失败",result.msg);
    }
  }
  // 提交留言信息
  const submitComment = async () => {
    const message = {
      time: formateDate(Date.now()),
      content: comment,
      user: curUser._id
    };
    const result = await reqAddMessage(message);
    // console.log(result);
    if(result.code === 0){
      console.log("添加留言成功!");
    }
    else{
      console.log("添加留言失败...");
    }
  }
  return (
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
        onChange={(event) => pushInput(event,"comment")}
      />
      {
        isLogin === "" ?
          <div className='login'>
            <p>请先进行登录/注册:</p>
            <form>
              <div className='nickname'>用户名: <input onChange={(event) => pushInput(event,"nickname")} className='text' placeholder='请输入你的用户名'></input></div>
              <div className='email'>邮箱: <input onChange={(event) => pushInput(event,"email")} className='text' placeholder='请输入你的邮箱'></input></div>
              <div className='website'>个人网站: <input onChange={(event) => pushInput(event,"website")} className='text' placeholder='请输入你的个人网站'></input></div>
              <div className='ischecked'><input onChange={(event) => pushInput(event,"ischecked")} type="checkbox" /> 7天内免登录</div>
            </form>
            <button onClick={goLoginOrRegister}>登录/注册</button>
          </div>
          :
          <button className='push' onClick={submitComment}>提交留言</button>
      }
    </div>
  )
}
