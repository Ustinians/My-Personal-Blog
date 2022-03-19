/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from 'react';
import {reqFindUser} from "../../api/index";
import "./index.css";

export default function CommentItem(props) {
  const comment = props.comment;
  const [user,setUser] = useState("");
  useEffect(() => {
    getUser();
  }, [])
  const getUser = async () => {
    console.log(comment);
    const result = await reqFindUser({_id: comment.user});
    if(result.code === 0){
      setUser(result.data);
    }
    else{
      console.log(result.msg);
    }
  }
  return (
    <div className='comment-item'>
      <div className='content'>
        <p>{comment.content}</p>
      </div>
      <div className='comment-info'>
        <span className='nickname'>{user.nickname}</span>
        <span className='time'>{comment.time}</span>
      </div>
    </div>
  )
}
