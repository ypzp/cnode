import {combineReducers} from 'redux'
import {USER_ON, ACCESS_TOKEN, USER_OFF} from '../actions/action'

const init_UserID = {
  type: USER_ON,
  UserID: {}
}
const init_UserOff = {
  type: USER_OFF,
  OFF: true
}
const init_AccessToken = {
  type: ACCESS_TOKEN,
  AccessToken: ''
}
if (sessionStorage.USER_ON !== undefined) {
  init_UserID.UserID = JSON.parse(sessionStorage.USER_ON)
}
if (sessionStorage.Status !== undefined) {
  init_UserOff.OFF = sessionStorage.Status === 'false' ? false : true
}
if (sessionStorage.AccessToken !== undefined) {
  init_AccessToken.AccessToken = sessionStorage.AccessToken
}

function SetUserID(state = init_UserID, action) {
  switch (action.type) {
    case USER_ON:
      return {
        ...state,
        type: USER_ON,
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

function SetUserStatus(state = init_UserOff, action) {
  switch (action.type) {
    case USER_OFF:
      return {
        ...state,
        type: USER_OFF,
        OFF: action.OFF
      }
    default:
      return state
  }
}
const Reducer = combineReducers({SetUserID, SetAccessToken, SetUserStatus})

export default Reducer
