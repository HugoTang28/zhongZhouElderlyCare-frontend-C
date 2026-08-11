<template>
  <view class="page">
    <view class="card elder" v-for="e in elders" :key="e.id">
      <view class="top">
        <text class="name">{{ e.elderName }}</text>
        <text class="status" :class="e.status === 0 ? 'on' : 'off'">
          {{ e.status === 0 ? '在住' : '已退住' }}
        </text>
      </view>
      <view class="info">性别：{{ e.sex === 0 ? '男' : '女' }}　年龄：{{ e.age }}岁</view>
      <view class="info">床位：{{ e.bedId || '—' }}　合同号：{{ e.contractNo || '—' }}</view>
      <view class="info">入住时间：{{ format(e.checkInTime) }}</view>
    </view>
    <view v-if="elders.length === 0" class="empty">暂无关联老人</view>
  </view>
</template>

<script>
import { getElders } from '@/api/family.js'

export default {
  data() {
    return { elders: [] }
  },
  onShow() {
    this.load()
  },
  methods: {
    async load() {
      const token = uni.getStorageSync('family_token')
      if (!token) {
        uni.reLaunch({ url: '/pages/login/login' })
        return
      }
      this.elders = await getElders()
    },
    format(t) {
      return t ? t.replace('T', ' ') : '—'
    }
  }
}
</script>

<style scoped>
.elder .top { display: flex; justify-content: space-between; align-items: center; }
.name { font-size: 34rpx; font-weight: 600; color: #1f2329; }
.status { font-size: 24rpx; padding: 4rpx 16rpx; border-radius: 20rpx; }
.status.on { background: #e8f5e9; color: #2e7d32; }
.status.off { background: #f5f5f5; color: #9aa0a6; }
.info { font-size: 26rpx; color: #6b7075; margin-top: 8rpx; }
</style>
