import React,{useState,useEffect} from 'react';
import "./index.css";
import {reqCommentToArticle,reqJudgeLogin} from "../../api/index";
import { formateDate } from '../../utils/dateUtils';

export default function Reply(props) {
  const [comment,setComment] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [warn,setWarn] = useState(false)
  useEffect(() => {
    isLoginOrRegister();
  },[])
  const pushComment = (e) => {
    setWarn(false);
    setComment(e.target.value)
  }
  const updateComments = () => {
    props.updateComments();
  }
  const isLoginOrRegister = async () => {
    const result = await reqJudgeLogin();
    // console.log(result);
    if (result.code === 0) {
      setIsLogin(result.data.user_id);
    }
    else {
      console.log(result.msg);
    }
  }
  const submitComment = async () => {
    if(comment !== ""){
      const { user, comments, article_id } = props;
      comments.push({
        time: formateDate(Date.now()),
        content: comment,
        user: user._id,
        replyUser: isLogin
      });
      const result = await reqCommentToArticle(comments, article_id);
      // console.log(result);
      if(result.code !== 0){
        console.log("回复信息失败");
      }
      props.submitComment();
    }
    else{
      setWarn(true);
    }
  }
  return (
    <div className='reply-content'>
        <textarea className='content' placeholder='请输入回复内容...' value={comment} onChange={pushComment}></textarea>
        {
          warn ? <p style={{ color: "red", fontSize: "14px", paddingTop: "5px" }}>回复不能为空!</p> : <p style={{ height: "24.2px" }}></p>
        }
        <button className='reply-btn' onClick={submitComment}>回复</button>
    </div>
  )
}
