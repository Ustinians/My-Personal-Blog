/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from 'react';
import {reqFindUser} from "../../api/index";
import "./index.css";

export default function MessageItem(props) {
  const message = props.message;
  const [user,setUser] = useState("");
  useEffect(() => {
    getUser();
  }, [])
  const getUser = async () => {
    const result = await reqFindUser({_id: message.user});
    if(result.code === 0){
      setUser(result.data);
    }
    else{
      console.log(result.msg);
    }
  }
  return (
    <div className='message-item'>
      <div className='content'>
        <p>{message.content}</p>
      </div>
      <div className='message-info'>
        <span className='nickname'>{user.nickname}</span>
        <span className='time'>{message.time}</span>
      </div>
    </div>
  )
}
