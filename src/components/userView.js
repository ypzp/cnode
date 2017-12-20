import React, {Component} from 'react'
import {Guide} from './common/layout'
import {UserInfo, Recent} from './common/user'
import request from '../util/request'
import {Spin} from './common/spin'

class UserView extends Component {
  state = {
    data: {
      recent_topics: [],
      recent_replies: []
    }
  }

  async componentDidMount() {
    let {id} = this.props.match.params,
      res = await request('/user/' + id)
    this.setState({data: res.data})
  }

  async componentWillReceiveProps(nextProps) {
    const {id} = nextProps.match.params

    if (id !== this.props.match.params.id) {
      //在用户详情页下点击该用户不再加载该用户
      let res = await request('/user/' + id)
      this.setState({data: res.data})
    }
  }

  render() {
    const {data} = this.state
    return (
      <div>
        <Guide history={this.props.history} title={data.loginname ? `${data.loginname}的个人中心` : ''} />
        {!data.loginname ? (
          <Spin loading={true} />
        ) : (
          <div className="user-view">
            <UserInfo {...data} />
            <Recent {...data} />
          </div>
        )}
      </div>
    )
  }
}

export default UserView
