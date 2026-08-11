<template>
  <view class="page">
    <view class="section-title">护理计划</view>
    <view class="card" v-for="(p, i) in plans" :key="'p' + i">
      <view class="top">
        <text class="name">{{ p.planName }}</text>
        <text class="tag" :class="p.status === 0 ? 'on' : 'off'">
          {{ p.status === 0 ? '启用' : '停用' }}
        </text>
      </view>
      <view class="info">对象：{{ p.elderName }}</view>
      <view class="info">周期：{{ format(p.startDate) }} ~ {{ format(p.endDate) }}</view>
      <view class="info" v-if="p.content">内容：{{ p.content }}</view>
    </view>
    <view v-if="plans.length === 0" class="empty">暂无护理计划</view>

    <view class="section-title">护理任务</view>
    <view class="card" v-for="(t, i) in tasks" :key="'t' + i">
      <view class="top">
        <text class="name">{{ t.taskName }}</text>
        <text class="tag" :class="'s' + t.status">{{ taskStatus(t.status) }}</text>
      </view>
      <view class="info">对象：{{ t.elderName }}　执行人：{{ t.executor || '—' }}</view>
      <view class="info">计划时间：{{ format(t.planTime) }}</view>
    </view>
    <view v-if="tasks.length === 0" class="empty">暂无护理任务</view>
  </view>
</template>

<script>
import { getCare } from '@/api/family.js'

export default {
  data() {
    return { plans: [], tasks: [] }
  },
  onShow() {
    this.load()
  },
  methods: {
    async load() {
      const token = uni.getStorageSync('family_token')
      if (!token) { uni.reLaunch({ url: '/pages/login/login' }); return }
      const res = await getCare()
      this.plans = res.plans || []
      this.tasks = res.tasks || []
    },
    taskStatus(s) {
      return s === 0 ? '待执行' : s === 1 ? '执行中' : '已完成'
    },
    format(t) { return t ? t.replace('T', ' ') : '—' }
  }
}
</script>

<style scoped>
.top { display: flex; justify-content: space-between; align-items: center; }
.name { font-size: 30rpx; font-weight: 600; color: #1f2329; }
.tag { font-size: 22rpx; padding: 4rpx 14rpx; border-radius: 16rpx; }
.tag.on { background: #e8f5e9; color: #2e7d32; }
.tag.off { background: #f5f5f5; color: #9aa0a6; }
.tag.s0 { background: #fff7e6; color: #d48806; }
.tag.s1 { background: #e3f2fd; color: #1976d2; }
.tag.s2 { background: #e8f5e9; color: #2e7d32; }
.info { font-size: 26rpx; color: #6b7075; margin-top: 8rpx; }
</style>
