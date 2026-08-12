<template>
  <view class="login">
    <view class="logo">中州养老</view>
    <view class="subtitle">家属端 · 随时了解老人在院动态</view>

    <input class="input" v-model="phone" type="number" maxlength="11" placeholder="请输入手机号" />
    <view class="code-row">
      <input class="input code-input" v-model="code" placeholder="请输入验证码" />
      <button class="code-btn" @click="getCode" :disabled="counting">{{ codeText }}</button>
    </view>

    <button class="login-btn" @click="doLogin">登 录</button>

    <view v-if="devCode" class="tip">开发期验证码（接入短信后请忽略）：{{ devCode }}</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onUnload } from '@dcloudio/uni-app'
import { sendCode, familyLogin } from '@/api/family.js'

const phone = ref('')
const code = ref('')
const devCode = ref('')
const counting = ref(false)
const codeText = ref('获取验证码')
let timer = null

function getCode() {
  if (!/^1\d{10}$/.test(phone.value)) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  sendCode(phone.value).then(res => {
    devCode.value = res.devCode
    startCount()
    uni.showToast({ title: '验证码已发送', icon: 'none' })
  }).catch(() => {})
}

function startCount() {
  let n = 60
  counting.value = true
  codeText.value = n + 's'
  timer = setInterval(() => {
    n--
    if (n <= 0) {
      clearInterval(timer)
      counting.value = false
      codeText.value = '获取验证码'
    } else {
      codeText.value = n + 's'
    }
  }, 1000)
}

function doLogin() {
  if (!phone.value || !code.value) {
    uni.showToast({ title: '请输入手机号和验证码', icon: 'none' })
    return
  }
  familyLogin(phone.value, code.value).then(res => {
    uni.setStorageSync('family_token', res.token)
    uni.setStorageSync('family_phone', res.phone)
    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => uni.switchTab({ url: '/pages/elders/elders' }), 600)
  }).catch(() => {})
}

onUnload(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.login { padding: 120rpx 60rpx; }
.logo { font-size: 56rpx; font-weight: 700; color: #3b7cff; text-align: center; }
.subtitle { font-size: 26rpx; color: #9aa0a6; text-align: center; margin: 16rpx 0 60rpx; }
.input {
  background: #fff; border-radius: 12rpx; padding: 24rpx;
  margin-bottom: 24rpx; font-size: 30rpx;
}
.code-row { display: flex; align-items: center; }
.code-input { flex: 1; margin-right: 20rpx; }
.code-btn {
  background: #3b7cff; color: #fff; font-size: 26rpx;
  border-radius: 12rpx; padding: 0 24rpx; margin: 0; line-height: 84rpx; height: 84rpx;
}
.login-btn {
  background: #3b7cff; color: #fff; font-size: 32rpx; border-radius: 12rpx;
  margin-top: 40rpx; height: 92rpx; line-height: 92rpx;
}
.tip { margin-top: 40rpx; font-size: 24rpx; color: #e6a23c; text-align: center; }
</style>
