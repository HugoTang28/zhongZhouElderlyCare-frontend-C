<template>
  <view class="page">
    <view class="section-title">推送消息</view>
    <view class="card" v-for="(m, i) in messages" :key="'m' + i">
      <view class="top">
        <text class="name">{{ m.title }}</text>
        <text class="time">{{ format(m.createTime) }}</text>
      </view>
      <view class="info">{{ m.content }}</view>
      <view class="tag" v-if="m.msgType">类型：{{ m.msgType }}</view>
    </view>
    <view v-if="messages.length === 0" class="empty">暂无推送消息</view>

    <view class="section-title">预警与设备概览</view>
    <view class="card" v-for="(r, i) in rules" :key="'r' + i">
      <view class="top">
        <text class="name">{{ r.ruleName }}</text>
        <text class="tag" :class="r.status === 1 ? 'on' : 'off'">
          {{ r.status === 1 ? '启用' : '停用' }}
        </text>
      </view>
      <view class="info">设备类型：{{ r.deviceType }}　等级：{{ r.alarmLevel }}</view>
      <view class="info" v-if="r.alarmCondition">条件：{{ r.alarmCondition }} {{ r.threshold || '' }}</view>
    </view>

    <view class="card" v-for="(d, i) in devices" :key="'d' + i">
      <view class="top">
        <text class="name">{{ d.deviceName }}</text>
        <text class="tag" :class="d.status === 1 ? 'on' : 'off'">
          {{ d.status === 1 ? '在线' : '离线' }}
        </text>
      </view>
      <view class="info">类型：{{ d.deviceType }}　位置：{{ d.location || '—' }}</view>
    </view>
    <view v-if="rules.length === 0 && devices.length === 0" class="empty">暂无预警与设备信息</view>
  </view>
</template>

<script>
import { getMessages, getAlarms } from '@/api/family.js'

export default {
  data() {
    return { messages: [], rules: [], devices: [] }
  },
  onShow() {
    this.load()
  },
  methods: {
    async load() {
      const token = uni.getStorageSync('family_token')
      if (!token) { uni.reLaunch({ url: '/pages/login/login' }); return }
      this.messages = await getMessages()
      const alarms = await getAlarms()
      this.rules = alarms.rules || []
      this.devices = alarms.devices || []
    },
    format(t) { return t ? t.replace('T', ' ') : '—' }
  }
}
</script>

<style scoped>
.top { display: flex; justify-content: space-between; align-items: center; }
.name { font-size: 30rpx; font-weight: 600; color: #1f2329; }
.time { font-size: 22rpx; color: #9aa0a6; }
.info { font-size: 26rpx; color: #6b7075; margin-top: 8rpx; }
.tag { font-size: 22rpx; padding: 4rpx 14rpx; border-radius: 16rpx; margin-top: 8rpx; display: inline-block; }
.tag.on { background: #e8f5e9; color: #2e7d32; }
.tag.off { background: #f5f5f5; color: #9aa0a6; }
</style>
