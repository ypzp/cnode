import React from 'react'
import {Input, Button, message} from 'antd'
import {connect} from 'react-redux'
import {Guide} from './layout'
import {setCookie, getCookie} from './tool'
import request from '../../util/request'
import {UserLogin, GetAccessToekn, SetUserStatus} from '../../actions/action'

const Login = props => {
  const {UserLogin, GetAccessToken, SetUserStatus, location, history} = props,

    login = () => {
      let access_token = document.getElementById('submit-token').value
      if (getCookie('access_token')) access_token = getCookie('access_token')
      request(`/accesstoken`, {accesstoken: access_token}).then(res => {
        if (res) {
          request(`/user/${res.loginname}`)
            .then(res => {
              UserLogin(res.data)
              GetAccessToken(access_token)
              SetUserStatus(false)
              sessionStorage.setItem('USER_ON', JSON.stringify(res.data))
              sessionStorage.setItem('Status', false)
              sessionStorage.setItem('AccessToken', access_token)
              message.info('登陆成功，正在跳转')
              setTimeout(() => {
                history.push(location.state.from.pathname)
              }, 400)
              setCookie('access_token', access_token)
            })
            .catch(error => {
              message.error('网络或者accesstoen错误')
            })
        }
      })
    }

  return (
    <div id="submit">
      <Guide history={props.history} title={'登陆'} />
      <Input
        type="password"
        id="submit-token"
        placeholder="请输入access_token"
        defaultValue="0356a904-b9cf-4ab0-9a03-2cac15a9e1b"
      />
      <br />
      <Button id="submit-btn" onClick={login}>
        登陆
      </Button>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    ...state.UserID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    UserLogin: message => dispatch(UserLogin(message)),
    GetAccessToken: token => dispatch(GetAccessToekn(token)),
    SetUserStatus: off => dispatch(SetUserStatus(off))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
