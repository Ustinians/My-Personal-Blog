import React from 'react';
import "./index.css";

export default function UserInfo(props) {
    const {curUser} = props;
    return (
        <div className='user-info'>
            <span className='user-name'><i className='iconfont icon-user'></i>{curUser.nickname}</span>
            <span className='user-email'><i className='iconfont icon-emailfilling'></i>{curUser.email}</span>
            <span className='user-website'><i className='iconfont icon-website'></i>{curUser.website}</span>
        </div>
    )
}
