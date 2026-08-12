<template>
  <view class="page">

    <view class="content">
      <view v-if="loading" class="state-box">
        <view class="spinner"></view>
        <text class="state-text">正在加载消息...</text>
      </view>

      <view v-else>
        <!-- 消息推送 -->
        <view class="section">
          <view class="section-title">
            <text class="dot blue"></text>
            <text>最新通知</text>
          </view>
          <view v-if="!messages.length" class="empty-mini">暂无消息</view>
          <view v-else class="msg-list">
            <view class="msg-item" v-for="(item, index) in messages" :key="'m'+index">
              <view class="msg-icon" :class="item.cls">{{ item.icon }}</view>
              <view class="msg-body">
                <view class="msg-title">{{ item.title }}</view>
                <view class="msg-content">{{ item.content }}</view>
                <view class="msg-time">{{ item.timeText }}</view>
              </view>
            </view>
          </view>
        </view>

        <!-- 预警规则 -->
        <view class="section">
          <view class="section-title">
            <text class="dot red"></text>
            <text>预警规则</text>
          </view>
          <view v-if="!alarmRules.length" class="empty-mini">暂无预警规则</view>
          <view v-else class="card" v-for="(item, index) in alarmRules" :key="'r'+index">
            <view class="card-top">
              <view class="card-title">{{ item.ruleName }}</view>
              <view class="tag red">预警中</view>
            </view>
            <view class="card-body">
              <view class="row"><text class="label">设备类型</text><text class="value">{{ item.deviceType }}</text></view>
              <view class="row"><text class="label">触发条件</text><text class="value">{{ item.alarmCondition }}</text></view>
            </view>
          </view>
        </view>

        <!-- 设备状态 -->
        <view class="section">
          <view class="section-title">
            <text class="dot green"></text>
            <text>设备状态</text>
          </view>
          <view v-if="!devices.length" class="empty-mini">暂无设备</view>
          <view v-else class="device-grid">
            <view class="device-item" v-for="(item, index) in devices" :key="'d'+index">
              <view class="device-name">{{ item.deviceName }}</view>
              <view class="device-type">{{ item.deviceType }}</view>
              <view class="device-status" :class="item.statusCls">{{ item.statusText }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { getMessages, getAlarms } from '@/api/family.js'
import { fmtTime } from '@/utils/format.js'

const messages = ref([])
const alarmRules = ref([])
const devices = ref([])
const loading = ref(false)

const msgIconMap = { '探视': '👋', '护理': '💊', '财务': '💰', '账单': '📄', '系统': '📢' }
const msgClsMap = { '探视': 'visit', '护理': 'care', '财务': 'finance', '账单': 'bill', '系统': 'system' }
const deviceTextMap = { 0: '离线', 1: '在线', 2: '故障' }
const deviceClsMap = { 1: 'online', 2: 'fault' }
const alarmTextMap = { 0: '停用', 1: '启用' }

function load() {
  loading.value = true
  const p1 = getMessages().then(data => {
    messages.value = (data || []).map(it => ({
      ...it,
      icon: msgIconMap[it.msgType] || '📢',
      cls: msgClsMap[it.msgType] || 'system',
      timeText: fmtTime(it.createTime)
    }))
  }).catch(err => console.error('加载消息失败', err))

  const p2 = getAlarms().then(data => {
    alarmRules.value = ((data && data.rules) || []).map(it => ({
      ...it,
      statusText: alarmTextMap[it.status] || '未知'
    }))
    devices.value = ((data && data.devices) || []).map(it => ({
      ...it,
      statusText: deviceTextMap[it.status] || '未知',
      statusCls: deviceClsMap[it.status] || 'offline'
    }))
  }).catch(err => console.error('加载预警失败', err))

  return Promise.all([p1, p2]).finally(() => { loading.value = false })
}

onShow(() => { load() })
onPullDownRefresh(() => { load().finally(() => uni.stopPullDownRefresh()) })
</script>

<style scoped>
.page { min-height: 100vh; background: #f5f7fa; }
.content { padding: 0 24rpx 40rpx; margin-top: 30rpx; }

.section { margin-bottom: 30rpx; }
.section-title { display: flex; align-items: center; font-size: 30rpx; font-weight: bold; color: #333; margin-bottom: 20rpx; }
.dot { width: 16rpx; height: 16rpx; border-radius: 50%; margin-right: 12rpx; }
.dot.blue { background: #3b7cff; }
.dot.red { background: #ff6b6b; }
.dot.green { background: #07c160; }

.msg-list { background: #fff; border-radius: 24rpx; padding: 12rpx 24rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06); }
.msg-item { display: flex; padding: 24rpx 0; border-bottom: 1rpx solid #f5f5f5; }
.msg-item:last-child { border-bottom: none; }
.msg-icon { width: 72rpx; height: 72rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 34rpx; margin-right: 20rpx; flex-shrink: 0; }
.msg-icon.visit { background: #e6f0ff; }
.msg-icon.care { background: #e6f7ed; }
.msg-icon.finance { background: #fff5e6; }
.msg-icon.bill { background: #f2f2f2; }
.msg-icon.system { background: #f0f0f0; }
.msg-body { flex: 1; }
.msg-title { font-size: 30rpx; font-weight: bold; color: #1a1a1a; }
.msg-content { font-size: 26rpx; color: #666; margin-top: 8rpx; line-height: 1.5; }
.msg-time { font-size: 22rpx; color: #999; margin-top: 10rpx; }

.card { background: #fff; border-radius: 24rpx; padding: 28rpx; margin-bottom: 20rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06); }
.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20rpx; }
.card-title { font-size: 30rpx; font-weight: bold; color: #1a1a1a; }
.tag { font-size: 22rpx; padding: 6rpx 16rpx; border-radius: 20rpx; }
.tag.red { background: #ffebeb; color: #ff4d4f; }

.card-body { border-top: 1rpx solid #f5f5f5; padding-top: 16rpx; }
.row { display: flex; justify-content: space-between; padding: 12rpx 0; }
.label { color: #999; font-size: 26rpx; }
.value { color: #333; font-size: 26rpx; font-weight: 500; }

.device-grid { display: flex; flex-wrap: wrap; }
.device-item { width: calc(50% - 10rpx); background: #fff; border-radius: 24rpx; padding: 28rpx; margin-bottom: 20rpx; margin-right: 20rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06); box-sizing: border-box; }
.device-item:nth-child(2n) { margin-right: 0; }
.device-name { font-size: 30rpx; font-weight: bold; color: #1a1a1a; }
.device-type { font-size: 24rpx; color: #999; margin-top: 8rpx; }
.device-status { display: inline-block; font-size: 22rpx; padding: 4rpx 14rpx; border-radius: 20rpx; margin-top: 16rpx; }
.device-status.online { background: #e6f7ed; color: #07c160; }
.device-status.offline { background: #f2f2f2; color: #999; }
.device-status.fault { background: #ffebeb; color: #ff4d4f; }

.empty-mini { text-align: center; color: #999; padding: 60rpx 0; font-size: 28rpx; background: #fff; border-radius: 24rpx; }
.state-box { text-align: center; padding: 120rpx 40rpx; }
.spinner { width: 60rpx; height: 60rpx; border: 4rpx solid #e6e6e6; border-top-color: #3b7cff; border-radius: 50%; margin: 0 auto 20rpx; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.state-text { font-size: 30rpx; color: #666; }
</style>
