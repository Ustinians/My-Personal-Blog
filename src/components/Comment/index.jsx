import React, {useState} from 'react';
import "./index.css";

export default function Comment() {
  const [comment,setComment] = useState("");
  const pushComment = (e) => {
    // console.log(e.target.value);
    setComment(e.target.value)
  }
  return (
    <div className='comment'>
      <textarea 
        className='text' 
        placeholder='请输入你的留言...' 
        value={comment}
        onChange={pushComment}  
      />
      <button className='push'>提交留言</button>
    </div>
  )
}
