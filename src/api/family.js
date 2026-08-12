import { get, post } from '@/utils/request.js'

// 认证
export function sendCode(phone) {
  return post('/family/auth/send-code', { phone })
}
export function familyLogin(phone, code) {
  return post('/family/auth/login', { phone, code })
}
export function familyLogout() {
  return post('/family/auth/logout', {})
}

// 业务只读接口
export function getElders() {
  return get('/family/elders')
}
export function getVisits() {
  return get('/family/visits')
}
export function getBills() {
  return get('/family/bills')
}
export function getCare() {
  return get('/family/care')
}
export function getMessages() {
  return get('/family/messages')
}
export function getAlarms() {
  return get('/family/alarms')
}
