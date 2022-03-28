import React from 'react';
import avatar from "../../assets/images/avatar.png";
import "./index.css";
import { NavLink } from "react-router-dom";
import tagUtils from "../../utils/tagUtils";

export default function HeaderNav() {
  return (
    <div className='header-nav'>
      <NavLink to="/">
        <div className='my'>
          <img className='avatar' alt='avatar' src={avatar}></img>
          <p className='my-nick'>想躺在云上</p>
          <p className='motto'>In doing we learn.</p>
        </div>
      </NavLink>

      <ul className='nav-list'>
      {
        tagUtils.map((item,index) => {
          return <li key={index}><NavLink to={`/articles/${item}`}>{item}</NavLink></li>
        })
      }
        <li><NavLink to="/message">留言板</NavLink></li>
        <li><NavLink to="/person">关于我</NavLink></li>
        <li className='mysite'><a href='javascrip:'>个人站点</a></li>
      </ul>
      <ul className='my-site'>
        <li><a href='https://github.com/Ustinians'><i className='iconfont icon-github-fill'></i>Github</a></li>
        <li><a href='https://www.cnblogs.com/ustinians/'><i className='iconfont icon-bokeyuan'></i>博客园</a></li>
        <li><a href='https://juejin.cn/user/1064768878955053'><i className='iconfont icon-juejin'></i>掘金</a></li>
      </ul>
    </div>
  )
}
