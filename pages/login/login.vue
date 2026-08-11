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

<script>
import { sendCode, familyLogin } from '@/api/family.js'

export default {
  data() {
    return {
      phone: '',
      code: '',
      devCode: '',
      counting: false,
      codeText: '获取验证码',
      timer: null
    }
  },
  onUnload() {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    async getCode() {
      if (!/^1\d{10}$/.test(this.phone)) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
        return
      }
      const res = await sendCode(this.phone)
      this.devCode = res.devCode
      this.startCount()
      uni.showToast({ title: '验证码已发送', icon: 'none' })
    },
    startCount() {
      let n = 60
      this.counting = true
      this.codeText = n + 's'
      this.timer = setInterval(() => {
        n--
        if (n <= 0) {
          clearInterval(this.timer)
          this.counting = false
          this.codeText = '获取验证码'
        } else {
          this.codeText = n + 's'
        }
      }, 1000)
    },
    async doLogin() {
      if (!this.phone || !this.code) {
        uni.showToast({ title: '请输入手机号和验证码', icon: 'none' })
        return
      }
      const res = await familyLogin(this.phone, this.code)
      uni.setStorageSync('family_token', res.token)
      uni.setStorageSync('family_phone', res.phone)
      uni.showToast({ title: '登录成功', icon: 'success' })
      setTimeout(() => {
        uni.switchTab({ url: '/pages/elders/elders' })
      }, 600)
    }
  }
}
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
