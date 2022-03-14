import React from "react";
import { Switch, Route, Redirect } from "react-router-dom"; // 引入路由相关
import "./App.css";
// 引入需要的路由组件
import Home from "./pages/Home";
import Article from "./pages/Article";
import Person from "./pages/Person";
import About from "./pages/About";

export default function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/article" component={Article}></Route>
        <Route path="/person" component={Person}></Route>
        <Route path="/about" component={About}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </div>
  );
}
