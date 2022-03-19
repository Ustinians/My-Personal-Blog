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
          <p className='my-nick'>躺在云朵上</p>
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
        <li><NavLink to="/person">个人站点</NavLink></li>
      </ul>
    </div>
  )
}
