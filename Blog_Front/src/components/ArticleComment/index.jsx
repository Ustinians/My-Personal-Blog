import React, { useState, useEffect } from 'react';
import "./index.css";
import { reqJudgeLogin, reqFindUser, reqRegister, reqCommentToArticle } from "../../api/index";
import { formateDate } from "../../utils/dateUtils";

import UserInfo from "../../components/UserInfo";
import LoginView from '../LoginView';
import CommentItem from '../CommentItem';

export default function ArticleComment(props) {
  const [comment, setComment] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [curUser, setCurUser] = useState({});
  const [warn, setWarn] = useState(false);
  const { comments, article_id } = props;
  useEffect(() => {
    isLoginOrRegister();
  }, [])
  // input的双向绑定
  const pushComment = (e) => {
    setComment(e.target.value);
    if (comment !== "") {
      setWarn(false);
    }
  }
  // 判断是否登录or注册
  const isLoginOrRegister = async () => {
    const result = await reqJudgeLogin();
    // console.log(result);
    if (result.code === 0) {
      setIsLogin(result.data.user_id)
      const userInfo = await reqFindUser({ _id: result.data.user_id });
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
  const goLoginOrRegister = async (user) => {
    // const user = { nickname, email, website, ischecked };
    console.log(user);
    const result = await reqRegister(user);
    if (result.code === 0) {
      setCurUser(result.data);
      // console.log(curUser);
      isLoginOrRegister()
    }
    else {
      console.log("登录/注册失败", result.msg);
    }
  }
  // 提交评论
  const submitComment = async () => {
    if (comment !== "") {
      const { updateComments } = props;
      // 获取当前评论数据
      comments.push({
        time: formateDate(Date.now()),
        content: comment,
        user: curUser._id
      });
      const result = await reqCommentToArticle(comments, article_id);
      // console.log(result);
      if (result.code === 0) {
        // 添加评论成功
        updateComments();
        setComment("");
      }
      else {
        console.log("添加评论失败");
      }
    }
    else {
      setWarn(true);
    }
  }
  return (
    <div>
      {/* 回复框 */}
      <div className='article-comment'>
        {
          isLogin === "" ?
            null
            :
            <UserInfo curUser={curUser} />
        }
        <textarea
          className='text'
          placeholder='请输入你的评论...'
          value={comment}
          onChange={pushComment}
        />
        {
          warn ? <p style={{ color: "red", fontSize: "14px", paddingTop: "5px" }}>评论不能为空!</p> : <p style={{ height: "24.2px" }}></p>
        }
        {
          isLogin === "" ?
            <LoginView goLoginOrRegister={goLoginOrRegister} />
            :
            <button className='push' onClick={submitComment}>提交评论</button>
        }
      </div>
      {/* 回复列表 */}
      <div className='article-comments'>
        {
          (comments && comments.length > 0) ?
            <div className='comments-list'>
              {
                comments.map((item, index) => {
                  return <CommentItem 
                    isLogin={isLogin === "" ? false : true}
                    comment={item} 
                    comments={comments} 
                    article_id={article_id} 
                    key={index}
                    updateComments={props.updateComments}
                   />
                })
              }
            </div>
            :
            <div className='no-comment'>
              <p>暂时没有评论...</p>
            </div>
        }
      </div>
    </div>

  )
}
