// 后端基地址。生产环境需改为 HTTPS 备案域名；真机调试改为电脑局域网 IP（如 http://192.168.x.x:9996）
let BASE_URL = 'http://192.168.11.7:9996'
// #ifdef H5
BASE_URL = '/api'
// #endif

function getToken() {
  return uni.getStorageSync('family_token') || ''
}

/**
 * 统一请求封装：自动带 token，按后端 R{code,msg,data} 结构解析。
 * 成功返回 data；401 清除登录态并跳转登录页；其它错误 toast 提示。
 */
export function request(url, method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    const fullUrl = BASE_URL + url
    console.log('[request]', method, fullUrl, data)
    uni.request({
      url: fullUrl,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      success: (res) => {
        console.log('[response]', url, res.statusCode, res.data)
        const body = res.data
        if (res.statusCode === 200 && body && body.code === 200) {
          resolve(body.data)
        } else if (body && body.code === 401) {
          uni.removeStorageSync('family_token')
          uni.reLaunch({ url: '/pages/login/login' })
          reject(body)
        } else {
          const msg = (body && body.msg) || '请求失败'
          uni.showToast({ title: msg, icon: 'none' })
          reject(body)
        }
      },
      fail: (err) => {
        console.error('[request fail]', url, err)
        uni.showToast({ title: '网络异常，请稍后重试', icon: 'none' })
        reject(err)
      }
    })
  })
}

export function get(url, data) {
  return request(url, 'GET', data)
}

export function post(url, data) {
  return request(url, 'POST', data)
}
