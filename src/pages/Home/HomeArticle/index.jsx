import React,{useState,useEffect} from 'react';
import "./index.css";
// 引入需要的请求函数
import {reqArticle} from "../../../api/index";
import MyArticle from '../MyArticle';

export default function HomeArticle() {
  const [articles,setArticles] = useState([]);
  useEffect(() => {
      getArticles();
  })
  const getArticles = async () => {
    const result = await reqArticle();
    // console.log(result);
    if(result.code === 0){
      setArticles(result.data);
    }
    else{
      console.log("获取文章列表失败");
    }
  }
  return (
    <div className='home-article'>
      {
        articles.length > 0 ? <div>
        {
          articles.map((item,index) => {
            return <MyArticle article={item} key={index} />
          })
        }
        </div> 
        : 
        <div>数据正在加载中</div>
      }
    </div>
  )
}
