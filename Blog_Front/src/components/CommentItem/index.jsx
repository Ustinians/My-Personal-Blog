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
              <span className='nickname'>{user.nickname} 回复了 {replyUser.nickname}</span>
          }
          <span className='time'>{comment.time}</span>
          <span className='reply' onClick={replyComment} >回复</span>
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
