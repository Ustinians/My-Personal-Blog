import React, { useState, useEffect } from 'react';
import "./index.css";
import { reqJudgeLogin, reqFindUser, reqRegister, reqCommentToArticle } from "../../api/index";
import {formateDate} from "../../utils/dateUtils";

export default function ArticleComment(props) {
  const [comment, setComment] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [curUser, setCurUser] = useState({});
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [ischecked, setIschecked] = useState(false);
  // const [messages, setMessages] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [warn, setWarn] = useState(false);
  useEffect(() => {
    isLoginOrRegister();
  },[])
  // input的双向绑定
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
  // 判断是否登录or注册
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
  // 登录or注册
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
  // 提交评论
  const submitComment = async () => {
    const {comments,article_id,updateComments} = props;
    // 获取当前评论数据
    comments.push({
      time: formateDate(Date.now()),
      content: comment,
      user: curUser._id
    });
    const result = await reqCommentToArticle(comments,article_id);
    // console.log(result);
    if(result.code === 0){
      // 添加评论成功
      updateComments();
      setComment("")
    }
    else{
      console.log("添加评论失败");
    }
  }
  return (
    <div className='article-comment'>
      <textarea
        className='text'
        placeholder='请输入你的评论...'
        value={comment}
        onChange={event => pushInput(event, "comment")}
      />
      {
        warn ? <p style={{ color: "red", fontSize: "14px", paddingTop: "5px" }}>留言不能为空!</p> : <p style={{ height: "24.2px" }}></p>
      }
      {
        isLogin === "" ?
          <div className='login'>
            <p>请先进行登录/注册:</p>
            <form>
              <div className='nickname'>用户名: <input value={nickname} onChange={(event) => pushInput(event, "nickname")} className='text' placeholder='请输入你的用户名'></input></div>
              <div className='email'>邮箱: <input value={email} onChange={(event) => pushInput(event, "email")} className='text' placeholder='请输入你的邮箱'></input></div>
              <div className='website'>个人网站: <input value={website} onChange={(event) => pushInput(event, "website")} className='text' placeholder='请输入你的个人网站'></input></div>
              <div className='ischecked'><input value={ischecked} onChange={(event) => pushInput(event, "ischecked")} type="checkbox" /> 7天内免登录</div>
            </form>
            <button onClick={goLoginOrRegister}>登录/注册</button>
          </div>
          :
          <button className='push' onClick={submitComment}>提交评论</button>
      }
    </div>
  )
}
