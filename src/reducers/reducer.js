import {combineReducers} from 'redux'
import {USER_SGIN_IN, ACCESS_TOKEN, USER_SGIN_OUT} from '../actions/action'

const init_UserID = {
  type: USER_SGIN_IN,
  UserID: {}
}
const init_USER = {
  type: USER_SGIN_OUT,
  OFF: true
}
const init_AccessToken = {
  type: ACCESS_TOKEN,
  AccessToken: ''
}
if (sessionStorage.USER_SGIN_IN !== undefined) {
  init_UserID.UserID = JSON.parse(sessionStorage.USER_SGIN_IN)
}
if (sessionStorage.Status !== undefined) {
  init_USER.OFF = sessionStorage.Status === 'false' ? false : true
}
if (sessionStorage.AccessToken !== undefined) {
  init_AccessToken.AccessToken = sessionStorage.AccessToken
}

function SetUserID(state = init_UserID, action) {
  switch (action.type) {
    case USER_SGIN_IN:
      return {
        ...state,
        type: USER_SGIN_IN,
        UserID: action.UserID
      }
    default:
      return state
  }
}

function SetAccessToken(state = init_AccessToken, action) {
  switch (action.type) {
    case ACCESS_TOKEN:
      return {
        ...state,
        type: ACCESS_TOKEN,
        AccessToken: action.AccessToken
      }
    default:
      return state
  }
}

function SetUserStatus(state = init_USER, action) {
  switch (action.type) {
    case USER_SGIN_OUT:
      return {
        ...state,
        type: USER_SGIN_OUT,
        OFF: action.OFF
      }
    default:
      return state
  }
}
const Reducer = combineReducers({SetUserID, SetAccessToken, SetUserStatus})

export default Reducer
