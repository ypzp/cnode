import React, {Component} from "react";
import Title from "./title";
import Detail from "./detail";
import UserView from "./userView";
import MyView from "./mine";
import Message from "./message";
import Login from "./common/login";
import Report from "./report";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import {BackTop} from "./common/layout";
import "../css/home.css";

const item = ["/topics", "/topics?tab=good", "/topics?tab=share", "/topics?tab=ask", "/topics?tab=job"];;
class Home extends Component {

  componentWillUnmount() {
    for (let index in item) {
      localStorage.removeItem(item[index]); //用户退出后清除缓存
    }
  }

  render() {

/**const Title = () => import("./title");
const  Detail =()=> import("./detail");
const userView = () => import("./userView");
const Mine = () => import("./mine");
const Message = () => import("./message");
const Login = () => import("./common/login");
const Report = () => import("./report");*/
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/:type" render={props=><Title {...props}/>}/>
            <Route path="/user/:id" render={props=><UserView {...props}/>}/>
            <Route path="/detail/:id" render={props=><Detail {...props}/>}/>
            <Route path="/my/view" render={props=><MyView {...props}/>}/>
            <Route path="/my/report" render={props=><Report {...props}/>}/>
            <Route path="/my/message" render={props=><Message {...props}/>}/>
            <Route path="/my/login" render={props=><Login {...props}/>}/>
            <Redirect from="/" to="/topics"/>
          </Switch>
          <BackTop/>
        </div>
      </Router>
    );
  }
}

export default Home;
