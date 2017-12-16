export const USER_ON = 'USER_ON'
export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const USER_OFF = 'USER_OFF'

export function UserLogin(text) {
  return {type: USER_ON, UserID: text}
}

export function GetAccessToekn(accesstoken) {
  return {type: ACCESS_TOKEN, AccessToken: accesstoken}
}
export function SetUserStatus(flag) {
  return {type: USER_OFF, OFF: flag}
}
