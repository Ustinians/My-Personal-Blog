import React, { useState } from 'react';
import "./index.css"

export default function LoginView(props) {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [ischecked, setIschecked] = useState(false);
    const [tip,setTip] = useState(false);
    const pushInput = (e, type) => {
        if (type === "nickname") {
            setNickname(e.target.value);
        }
        else if (type === "email") {
            setEmail(e.target.value);
        }
        else if (type === "website") {
            setWebsite(e.target.value);
        }
        else {
            setIschecked(!ischecked);
        }
    }
    
    const goLoginOrRegister = () => {
        if(nickname === "" || email === ""){
            setTip(true);
        }
        const user = {nickname,email,website,ischecked};
        props.goLoginOrRegister(user);
    }
    return (
        <div className='login'>
            <p>请先进行登录/注册:</p>
            <form>
                <div className='nickname'>用户名: <input value={nickname} onChange={(event) => pushInput(event, "nickname")} className='text' placeholder='请输入你的用户名' onFocus={() => setTip(false)}></input></div>
                <div className='email'>邮箱: <input value={email} onChange={(event) => pushInput(event, "email")} className='text' placeholder='请输入你的邮箱' onFocus={() => setTip(false)}></input></div>
                <div className='website'>个人网站: <input value={website} onChange={(event) => pushInput(event, "website")} className='text' placeholder='请输入你的个人网站' onFocus={() => setTip(false)}></input></div>
                <div className='ischecked'><input value={ischecked} onChange={(event) => pushInput(event, "ischecked")} type="checkbox" /> 7天内免登录</div>
            </form>
            {
                tip ? <span className='error-tip'>用户名或者邮箱不能为空!</span> : null
            }
            <button onClick={goLoginOrRegister}>登录/注册</button>
        </div>
    )
}
