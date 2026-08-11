<template>
  <view class="page">
    <view class="balance-card">
      <view class="label">账户余额（元）</view>
      <view class="amount">{{ balance }}</view>
    </view>

    <view class="section-title">账单</view>
    <view class="card" v-for="(b, i) in bills" :key="'b' + i">
      <view class="top">
        <text class="name">{{ b.billType || '账单' }}</text>
        <text class="tag" :class="'s' + b.status">{{ billStatus(b.status) }}</text>
      </view>
      <view class="info">账单月份：{{ b.billMonth || '—' }}　单号：{{ b.billNo || '—' }}</view>
      <view class="info amount-line">金额：¥ {{ b.amount }}</view>
    </view>
    <view v-if="bills.length === 0" class="empty">暂无账单</view>

    <view class="section-title">预存流水</view>
    <view class="card" v-for="(p, i) in prestores" :key="'p' + i">
      <view class="top">
        <text class="name">{{ p.transType === 0 ? '充值' : '消费' }}</text>
        <text class="amount-sm" :class="p.transType === 0 ? 'plus' : 'minus'">
          {{ p.transType === 0 ? '+' : '-' }}{{ p.amount }}
        </text>
      </view>
      <view class="info">余额：¥ {{ p.balance }}　时间：{{ format(p.createTime) }}</view>
    </view>
    <view v-if="prestores.length === 0" class="empty">暂无预存流水</view>
  </view>
</template>

<script>
import { getBills } from '@/api/family.js'

export default {
  data() {
    return { balance: '0.00', bills: [], prestores: [] }
  },
  onShow() {
    this.load()
  },
  methods: {
    async load() {
      const token = uni.getStorageSync('family_token')
      if (!token) { uni.reLaunch({ url: '/pages/login/login' }); return }
      const res = await getBills()
      this.balance = (res.balance || 0).toFixed(2)
      this.bills = res.bills || []
      this.prestores = res.prestores || []
    },
    billStatus(s) {
      return s === 0 ? '未缴' : s === 1 ? '已缴' : '已退费'
    },
    format(t) { return t ? t.replace('T', ' ') : '—' }
  }
}
</script>

<style scoped>
.balance-card {
  background: linear-gradient(135deg, #3b7cff, #5a9bff);
  color: #fff; border-radius: 20rpx; padding: 40rpx; margin: 20rpx;
}
.balance-card .label { font-size: 26rpx; opacity: 0.9; }
.balance-card .amount { font-size: 64rpx; font-weight: 700; margin-top: 8rpx; }
.top { display: flex; justify-content: space-between; align-items: center; }
.name { font-size: 30rpx; font-weight: 600; color: #1f2329; }
.tag { font-size: 22rpx; padding: 4rpx 14rpx; border-radius: 16rpx; }
.tag.s0 { background: #fff7e6; color: #d48806; }
.tag.s1 { background: #e8f5e9; color: #2e7d32; }
.tag.s2 { background: #f5f5f5; color: #9aa0a6; }
.info { font-size: 26rpx; color: #6b7075; margin-top: 8rpx; }
.amount-line { color: #e63946; }
.amount-sm { font-size: 30rpx; font-weight: 600; }
.amount-sm.plus { color: #2e7d32; }
.amount-sm.minus { color: #e63946; }
</style>
