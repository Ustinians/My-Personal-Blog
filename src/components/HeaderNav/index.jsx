import React from 'react';
import avatar from "../../assets/images/avatar.png";
import "./index.css";
import { NavLink } from "react-router-dom";

export default function HeaderNav() {
  return (
    <div className='header-nav'>
      <div className='my'>
        <img className='avatar' alt='avatar' src={avatar}></img>
        <p className='my-nick'>躺在云朵上</p>
        <p className='motto'>In doing we learn.</p>
      </div>
      <ul className='nav-list'>
        <li><NavLink to="/person">前端学习</NavLink></li>
        <li><NavLink to="/person">技术笔记</NavLink></li>
        <li><NavLink to="/person">生活剪影</NavLink></li>
        <li><NavLink to="/person">留言板</NavLink></li>
        <li><NavLink to="/person">关于我</NavLink></li>
        <li><NavLink to="/person">个人站点</NavLink></li>
      </ul>
    </div>
  )
}
