import React, {useState} from 'react';
import "./index.css";

export default function ArticleComment() {
  const [comment,setComment] = useState("");
  const pushComment = (e) => {
    // console.log(e.target.value);
    setComment(e.target.value)
  }
  return (
    <div className='article-comment'>
      <textarea 
        className='text' 
        placeholder='请输入你的评论...' 
        value={comment}
        onChange={pushComment}  
      />
      <button className='push'>提交评论</button>
    </div>
  )
}
