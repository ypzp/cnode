import React, {Component} from 'react'
import AsyncComponent from './route/asyncComponent'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {BackTop} from './common/layout'


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
            <Route path="/my/view" render={props => <MyView {...props} />} />
            <Route path="/my/report" render={props => <Report {...props} />} />
            <Route path="/my/message" render={props => <Message {...props} />} />
            <Route path="/my/login" render={props => <Login {...props} />} />
            <Redirect from="/" to="/topics" />
          </Switch>
          <BackTop />
        </div>
      </Router>
    )
  }
}

export default Home
