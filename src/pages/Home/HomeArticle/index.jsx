import React, { Component } from 'react'
import "./index.css";
// 引入需要的请求函数
import {reqArticles} from "../../../api/index";
import MyArticle from "../../../components/MyArticle";

export default class HomeArticle extends Component {
  state = {
    articles: []
  }
  getArticles = async () => {
    const result = await reqArticles();
    // console.log(result);
    if(result.code === 0){
      // setArticles(result.data);
      this.setState({
        articles: result.data
      })
    }
    else{
      console.log(result.msg);
    }
  }
  UNSAFE_componentWillMount(){
    this.getArticles();
  }
  render() {
    const {articles} = this.state;
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
}

