import React, { useState, useEffect } from 'react';
import "./index.css";
// 引入留言功能
import HeaderNav from "../../components/HeaderNav"
import MessageView from "./MessageView"

import { reqMessages } from "../../api/index";

export default function Message() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getMessages();
  }, [])
  const getMessages = async () => {
    const result = await reqMessages();
    // console.log(result);
    if (result.code === 0) {
      setMessages(result.data);
    }
    else {
      console.log(result.msg);
    }
  }
  return (
    <div className='message'>
      <HeaderNav />
      <MessageView messages={messages} />
    </div>
  )
}
