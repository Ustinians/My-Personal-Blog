/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { reqFindUser } from "../../api/index";
import "./index.css";
import Reply from "../Reply";


export default function CommentItem(props) {
  const {comment,comments,article_id} = props;
  const [user, setUser] = useState("");
  const [replyUser, setReplyUser] = useState("");
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    getUser();
  }, [])
  const getUser = async () => {
    // console.log(comment);
    if (comment.replyUser) {
      const result1 = await reqFindUser({ _id: comment.replyUser });
      if (result1.code === 0) {
        setReplyUser(result1.data);
      }
      else {
        console.log(result1.msg);
      }
    }
    const result2 = await reqFindUser({ _id: comment.user });
    if (result2.code === 0) {
      setUser(result2.data);
    }
    else {
      console.log(result2.msg);
    }
  }
  // 回复评论
  const replyComment = () => {
    setIsShow(true);
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
              <span className='nickname'>{replyUser.nickname} 回复了 {user.nickname}</span>
          }
          <span className='time'>{comment.time}</span>
          <span className='reply' onClick={replyComment} >回复</span>
        </div>
        {
          isShow ? <Reply 
            submitComment={submitComment}
            updateComments={props.updateComments}
            user={replyUser === "" ? user : replyUser}  
            comments={comments}
            article_id={article_id}
          ></Reply> : null
        }
      </div>
    </div>
  )

}
