import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Popconfirm, message} from 'antd'
import {Footer, Guide} from './common/layout'
import {UserInfo, Recent} from './common/user'
import request from '../util/request'
import {UserLogin, GetAccessToekn, SetUserStatus} from '../actions/action'

class Mine extends Component {
  state = {position: ''}
  componentWillMount() {
    this.getPosition()
    const {UserLogin, OFF} = this.props
    if (!OFF) {
      request(`/accesstoken`, {accesstoken: sessionStorage.AccessToken}).then(res => {
        if (res)
          request(`/user/${res.loginname}`)
            .then(res => {
              UserLogin(res.data)
              sessionStorage.setItem('USER_ON', JSON.stringify(res.data))
            })
            .catch(error => {
              message.error('网络错误')
            })
      })
    }
  }
  getPosition = () => {
    fetch('http://freegeoip.net/json/')
      .then(res => {
        return res.json()
      })
      .then(res => {
        fetch(`http://restapi.amap.com/v3/ip?key=c5c368adb8bb95aac7cab8099f2b716c&ip=${res.ip}`)
          .then(res => {
            return res.json()
          })
          .then(res => {
            this.setState({position: res.city})
          })
      })
  }
  logout = () => {
    const {UserLogin, GetAccessToken, SetUserStatus} = this.props
    UserLogin({})
    GetAccessToken('')
    SetUserStatus(true)
    sessionStorage.removeItem('USER_ON')
    sessionStorage.removeItem('Status')
    sessionStorage.removeItem('AccessToken')
    this.props.history.push('/')
  }
  render() {
    const {position} = this.state
    const {UserID, location} = this.props
    return (
      <div className="userView" style={{marginTop: '45px'}}>
        <Guide title={'个人中心'}>
          <i id="position" className="iconfont icon-dingwei">
            {position}
          </i>
          <Popconfirm title="确认退出?" okText="退出" cancelText="取消" onConfirm={this.logout}>
            <a
              href="javascript:void(0)"
              style={{position: 'absolute', right: '15px', color: '#fff'}}
              className="iconfont icon-tuichu"
            />
          </Popconfirm>
        </Guide>
        <UserInfo {...UserID} />
        <Recent {...UserID} />
        <Footer location={location} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {UserID: state.SetUserID.UserID, OFF: state.SetUserStatus.OFF}
}

const mapDispatchToProps = dispatch => {
  return {
    UserLogin: message => dispatch(UserLogin(message)),
    GetAccessToken: token => dispatch(GetAccessToekn(token)),
    SetUserStatus: off => dispatch(SetUserStatus(off))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mine)
