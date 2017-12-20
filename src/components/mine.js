import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Popconfirm, message} from 'antd'
import {Footer, Guide} from './common/layout'
import {UserInfo, Recent} from './common/user'
import request from '../util/request'
import {delCookie} from './common/tool'
import {UserLogin, GetAccessToekn, SetUserStatus} from '../actions/action'

class Mine extends Component {
  state = {position: '北京市'}
  async componentWillMount() {
    this.getPosition()
    const {UserLogin, OFF} = this.props
    if (!OFF) {
      try {
        let res = await request(`/accesstoken`, {accesstoken: sessionStorage.AccessToken})
        if (res) {
          let state = await request(`/user/${res.loginname}`)
          UserLogin(state.data)
          sessionStorage.setItem('USER_ON', JSON.stringify(state.data))
        }
      } catch (error) {
        message.error('网络错误')
      }
    }
  }
  getPosition = async () => {
    try {
      let res = await fetch('http://freegeoip.net/json/')
      res = await res.json()
      let state = await fetch(`http://restapi.amap.com/v3/ip?key=c5c368adb8bb95aac7cab8099f2b716c&ip=${res.ip}`)
      state = await state.json()
      this.setState({position: state.city})
    } catch (error) {
      console.log(error)
    }
  }
  logout = () => {
    const {UserLogin, GetAccessToken, SetUserStatus} = this.props
    UserLogin({})
    GetAccessToken('')
    SetUserStatus(true)
    sessionStorage.removeItem('USER_ON')
    sessionStorage.removeItem('Status')
    sessionStorage.removeItem('AccessToken')
    delCookie('access_token')
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
            <a style={{position: 'absolute', right: '15px', color: '#fff'}} className="iconfont icon-tuichu" />
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
  return {...state.SetUserID, ...state.SetUserStatus}
}

const mapDispatchToProps = dispatch => {
  return {
    UserLogin: message => dispatch(UserLogin(message)),
    GetAccessToken: token => dispatch(GetAccessToekn(token)),
    SetUserStatus: off => dispatch(SetUserStatus(off))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mine)
