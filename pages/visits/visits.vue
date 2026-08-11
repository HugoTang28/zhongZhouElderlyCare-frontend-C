<template>
  <view class="page">
    <view class="section-title">探视预约</view>
    <view class="card" v-for="(a, i) in appointments" :key="'a' + i">
      <view class="top">
        <text class="name">探视：{{ a.elderName }}</text>
        <text class="tag" :class="'s' + a.status">{{ apptStatus(a.status) }}</text>
      </view>
      <view class="info">访客：{{ a.visitorName }}（{{ a.phone || '—' }}）</view>
      <view class="info">预约时间：{{ format(a.visitTime) }}</view>
      <view class="info" v-if="a.purpose">事由：{{ a.purpose }}</view>
    </view>
    <view v-if="appointments.length === 0" class="empty">暂无探视预约</view>

    <view class="section-title">探视登记</view>
    <view class="card" v-for="(r, i) in registrations" :key="'r' + i">
      <view class="top">
        <text class="name">探视：{{ r.elderName }}</text>
      </view>
      <view class="info">访客：{{ r.visitorName }}　关系：{{ r.relation || '—' }}</view>
      <view class="info">到达：{{ format(r.arriveTime) }}</view>
      <view class="info">离开：{{ format(r.leaveTime) }}</view>
    </view>
    <view v-if="registrations.length === 0" class="empty">暂无探视登记</view>
  </view>
</template>

<script>
import { getVisits } from '@/api/family.js'

export default {
  data() {
    return { appointments: [], registrations: [] }
  },
  onShow() {
    this.load()
  },
  methods: {
    async load() {
      const token = uni.getStorageSync('family_token')
      if (!token) { uni.reLaunch({ url: '/pages/login/login' }); return }
      const res = await getVisits()
      this.appointments = res.appointments || []
      this.registrations = res.registrations || []
    },
    apptStatus(s) {
      return s === 0 ? '待接待' : s === 1 ? '已接待' : '已取消'
    },
    format(t) { return t ? t.replace('T', ' ') : '—' }
  }
}
</script>

<style scoped>
.top { display: flex; justify-content: space-between; align-items: center; }
.name { font-size: 30rpx; font-weight: 600; color: #1f2329; }
.tag { font-size: 22rpx; padding: 4rpx 14rpx; border-radius: 16rpx; }
.tag.s0 { background: #fff7e6; color: #d48806; }
.tag.s1 { background: #e8f5e9; color: #2e7d32; }
.tag.s2 { background: #f5f5f5; color: #9aa0a6; }
.info { font-size: 26rpx; color: #6b7075; margin-top: 8rpx; }
</style>
