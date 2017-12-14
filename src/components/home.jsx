import React, {Component} from 'react'
import AsyncComponent from './asyncComponent/asyncComponent'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {BackTop} from './common/layout'
/*import Title from './title'
import Detail from './detail'
import UserView from './userView'
import MyView from './mine'
import Message from './message'
import Login from './common/login'
import Report from './report'*/

const item = ['/topics', '/topics?tab=good', '/topics?tab=share', '/topics?tab=ask', '/topics?tab=job']
const Title = AsyncComponent(() => import('./title'))
const Detail = AsyncComponent(() => import('./detail'))
const UserView = AsyncComponent(() => import('./userView'))
const MyView = AsyncComponent(() => import('./mine'))
const Message = AsyncComponent(() => import('./message'))
const Login = AsyncComponent(() => import('./common/login'))
const Report = AsyncComponent(() => import('./report'))

class Home extends Component {
  componentWillUnmount() {
    for (let index in item) {
      localStorage.removeItem(item[index]) //用户退出后清除缓存
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/:type" render={props => <Title {...props} />} />
            <Route path="/user/:id" render={props => <UserView {...props} />} />
            <Route path="/detail/:id" render={props => <Detail {...props} />} />
            <LoginComponent path="/my/view" render={props => <MyView {...props} />} />
            <LoginComponent path="/my/report" render={props => <Report {...props} />} />
            <LoginComponent path="/my/message" render={props => <Message {...props} />} />
            <Route path="/my/login" render={props => <Login {...props} />} />
            <Redirect from="/" to="/topics" />
          </Switch>
          <BackTop />
        </div>
      </Router>
    )
  }
}

const LoginComponent = ({render: Render, ...data}) => {
  return (
    <Route
      {...data}
      render={props =>
        !sessionStorage.AccessToken ? (        //没有登陆就跳转登陆
          <Redirect
            to={{
              pathname: '/my/login',
              state: {from: props.location}    //获取当前的路径，方便登陆完跳转回来
            }}
          />
        ) : (
          <Route render={Render} />
        )
      }
    />
  )
}

export default Home
