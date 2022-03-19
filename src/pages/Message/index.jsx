import React, { useState, useEffect } from 'react';
import "./index.css";
// 引入留言功能
import HeaderNav from "../../components/HeaderNav"
import Comment from "../../components/Comment";
import MessageItem from "../../components/MessageItem";

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
      <div className='container'>
        <Comment />
        <h1>留言板</h1>
        <div className='message-list'>
          {
            messages.length > 0 ? <div>
              {
                messages.map((item, index) => {
                  return <MessageItem message={item} key={index} />
                })
              }
            </div>
              :
              <div>数据正在加载中</div>
          }
        </div>
      </div>
    </div>
  )
}
