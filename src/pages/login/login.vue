<template>
  <view class="login">
    <!-- 背景装饰光斑 -->
    <view class="deco deco-1"></view>
    <view class="deco deco-2"></view>

    <!-- 品牌区 -->
    <view class="brand">
      <view class="brand-logo">养</view>
      <view class="brand-name">中州养老</view>
      <view class="brand-sub">随时了解老人在院动态</view>
    </view>

    <!-- 登录卡片 -->
    <view class="form-card">
      <view class="field" :class="{ focus: phoneFocus }">
        <text class="field-icon">📱</text>
        <input class="field-input" v-model="phone" type="number" maxlength="11" placeholder="请输入手机号"
               @focus="phoneFocus = true" @blur="phoneFocus = false" />
      </view>

      <view class="field code" :class="{ focus: codeFocus }">
        <text class="field-icon">🔒</text>
        <input class="field-input" v-model="code" placeholder="请输入验证码"
               @focus="codeFocus = true" @blur="codeFocus = false" />
        <button class="code-btn" @click="getCode" :disabled="counting">{{ codeText }}</button>
      </view>

      <button class="login-btn" hover-class="login-btn--hover" @click="doLogin">登 录</button>

      <view v-if="devCode" class="dev-tip">
        <view class="dev-tip-row">
          <text class="dev-tip-label">开发验证码</text>
          <text class="dev-tip-code">{{ devCode }}</text>
        </view>
        <text class="dev-tip-note">接入短信网关后该提示自动消失</text>
      </view>
    </view>

    <view class="footer">中州养老 · 智慧康养服务平台</view>
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
const phoneFocus = ref(false)
const codeFocus = ref(false)
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

<style scoped lang="scss">
.login {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(160deg, #eaf1ff 0%, #f5f7fa 46%, #f5f7fa 100%);
  padding: 0 60rpx;
  display: flex;
  flex-direction: column;
}

/* 装饰光斑 */
.deco {
  position: absolute;
  border-radius: 50%;
  filter: blur(6rpx);
  opacity: 0.5;
  z-index: 0;

  &-1 {
    width: 360rpx;
    height: 360rpx;
    top: -120rpx;
    right: -100rpx;
    background: radial-gradient(circle, #5e9bff 0%, rgba(94, 155, 255, 0) 70%);
  }

  &-2 {
    width: 300rpx;
    height: 300rpx;
    top: 220rpx;
    left: -140rpx;
    background: radial-gradient(circle, #9ec1ff 0%, rgba(158, 193, 255, 0) 70%);
  }
}

/* 品牌区 */
.brand {
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 170rpx;
  margin-bottom: 70rpx;

  &-logo {
    width: 140rpx;
    height: 140rpx;
    border-radius: 38rpx;
    margin: 0 auto 32rpx;
    background: linear-gradient(135deg, #3b7cff, #5e9bff);
    color: #fff;
    font-size: 76rpx;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 16rpx 36rpx rgba(59, 124, 255, 0.35);
  }

  &-name {
    font-size: 52rpx;
    font-weight: 800;
    color: #1a1a1a;
    letter-spacing: 4rpx;
  }

  &-sub {
    font-size: 26rpx;
    color: #8a9099;
    margin-top: 16rpx;
  }
}

/* 登录卡片 */
.form-card {
  position: relative;
  z-index: 1;
  background: #fff;
  border-radius: 32rpx;
  padding: 48rpx 40rpx 44rpx;
  box-shadow: 0 20rpx 60rpx rgba(31, 52, 110, 0.12);
}

.field {
  display: flex;
  align-items: center;
  background: #f4f6fb;
  border: 2rpx solid transparent;
  border-radius: 18rpx;
  padding: 0 24rpx;
  height: 96rpx;
  margin-bottom: 28rpx;
  transition: border-color , background-color 0.2s;

  &.focus {
    background: #fff;
    border-color: #3b7cff;
    box-shadow: 0 0 0 6rpx rgba(59, 124, 255, 0.1);
  }

  &-icon {
    font-size: 34rpx;
    margin-right: 16rpx;
  }

  &-input {
    flex: 1;
    height: 96rpx;
    font-size: 30rpx;
    color: #1a1a1a;
  }

  &.code {
    padding-right: 12rpx;
  }
}

.code-btn {
  margin: 0;
  padding: 0 24rpx;
  height: 72rpx;
  line-height: 72rpx;
  background: #eaf1ff;
  color: #3b7cff;
  font-size: 26rpx;
  font-weight: 600;
  border-radius: 14rpx;

  &[disabled] {
    color: #aab6cc;
    background: #f0f3f8;
  }
}

.login-btn {
  margin-top: 16rpx;
  height: 96rpx;
  line-height: 96rpx;
  background: linear-gradient(135deg, #3b7cff, #5e9bff);
  color: #fff;
  font-size: 34rpx;
  font-weight: 700;
  letter-spacing: 4rpx;
  border-radius: 18rpx;
  box-shadow: 0 14rpx 30rpx rgba(59, 124, 255, 0.32);

  &--hover {
    transform: translateY(2rpx);
    opacity: 0.94;
    box-shadow: 0 8rpx 18rpx rgba(59, 124, 255, 0.28);
  }
}

/* 开发验证码提示 */
.dev-tip {
  margin-top: 32rpx;
  padding: 24rpx;
  background: #fff8ec;
  border: 2rpx dashed #ffd591;
  border-radius: 16rpx;

  &-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-label {
    font-size: 24rpx;
    color: #b2761a;
    margin-right: 16rpx;
  }

  &-code {
    font-size: 40rpx;
    font-weight: 800;
    color: #ff9900;
    letter-spacing: 6rpx;
  }

  &-note {
    display: block;
    text-align: center;
    font-size: 22rpx;
    color: #c08a3e;
    margin-top: 10rpx;
  }
}

.footer {
  position: relative;
  z-index: 1;
  text-align: center;
  font-size: 22rpx;
  color: #b6bcc4;
  margin-top: auto;
  padding-bottom: 50rpx;
}
</style>
