/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { reqFindUser } from "../../api/index";

import "./index.css";
import Reply from "../Reply";


export default function CommentItem(props) {
  const { comment, comments, article_id, isLogin } = props;
  const [user, setUser] = useState("");
  const [replyUser, setReplyUser] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [tip, setTip] = useState(false);
  useEffect(() => {
    getUser();
    if (isLogin) setTip(false);
  }, [])
  const getUser = async () => {
    // console.log(comment);
    const result1 = await reqFindUser({ _id: comment.user });
    if (result1.code === 0) {
      setUser(result1.data);
    }
    else {
      console.log(result1.msg);
    }
    if (comment.replyUser) {
      const result2 = await reqFindUser({ _id: comment.replyUser });
      if (result2.code === 0) {
        setReplyUser(result2.data);
      }
      else {
        console.log(result2.msg);
      }
    }

  }
  // 回复评论
  const replyComment = () => {
    if (!isLogin) {
      // 当当前用户未登录时,无法进行回复,提示用户
      setTip(true);
      // 提示文字3s后消失
      setTimeout(() => setTip(false), 3000);
    }
    else {
      setIsShow(true);
    }
  }
  // 提交回复
  const submitComment = () => {
    setIsShow(false);
  }
  return (
    <div>
      <div className='comment-item'>
        <div className='content'>
          <p>{comment.content}</p>
        </div>
        <div className='comment-info'>
          {
            replyUser === "" ?
              <span className='nickname'>{user.nickname}</span>
              :
              <span className='nickname'>{user.nickname} 回复了 {replyUser.nickname}</span>
          }
          <span className='time'>{comment.time}</span>
          <span className='reply' onClick={replyComment} >回复</span>
          {tip ? <span className='error-tip'>当前用户未登录,请登录后再进行回复!</span> : null}
        </div>
        {
          isShow ? <Reply
            submitComment={submitComment}
            updateComments={props.updateComments}
            user={user}
            comments={comments}
            article_id={article_id}
          ></Reply> : null
        }
      </div>
    </div>
  )

}
