<template>
  <view class="page">
    <view class="header">
      <view class="header-title">账单与预存</view>
      <view class="header-sub">费用明细与账户余额实时查看</view>
    </view>

    <view class="content">
      <!-- 余额卡片 -->
      <view class="balance-card">
        <view class="balance-label">当前账户余额</view>
        <view class="balance-value">¥{{ balance }}</view>
        <view class="balance-tip">预存金可用于抵扣月度账单</view>
      </view>

      <view v-if="loading" class="state-box">
        <view class="spinner"></view>
        <text class="state-text">正在加载账单...</text>
      </view>

      <view v-else>
        <!-- 账单明细 -->
        <view class="section">
          <view class="section-title">
            <text class="dot red"></text>
            <text>待缴 / 已缴账单</text>
          </view>
          <view v-if="bills.length === 0" class="empty-mini">暂无账单</view>
          <view v-else class="card" v-for="(item, index) in bills" :key="'b'+index">
            <view class="card-top">
              <view class="card-title">{{ item.billType }}</view>
              <view class="amount" :class="billAmountClass(item.status)">¥{{ item.amount }}</view>
            </view>
            <view class="card-body">
              <view class="row"><text class="label">老人</text><text class="value">{{ item.elderName }}</text></view>
              <view class="row"><text class="label">状态</text><text class="value" :class="billStatusClass(item.status)">{{ billStatusText(item.status) }}</text></view>
              <view class="row"><text class="label">账单时间</text><text class="value">{{ item.billMonth || item.createTime }}</text></view>
            </view>
          </view>
        </view>

        <!-- 预存流水 -->
        <view class="section">
          <view class="section-title">
            <text class="dot blue"></text>
            <text>预存流水</text>
          </view>
          <view v-if="prestore.length === 0" class="empty-mini">暂无预存记录</view>
          <view v-else class="flow-item" v-for="(item, index) in prestore" :key="'p'+index">
            <view class="flow-left">
              <view class="flow-title">{{ prestoreTypeText(item.transType) }}</view>
              <view class="flow-time">{{ item.transactionTime || item.createTime }}</view>
            </view>
            <view class="flow-right">
              <view class="flow-amount" :class="item.amount >= 0 ? 'in' : 'out'">{{ item.amount >= 0 ? '+' : '' }}{{ item.amount }}</view>
              <view class="flow-balance">余额 ¥{{ item.balance }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getBills } from '@/api/family.js'

export default {
  data() {
    return {
      bills: [],
      prestore: [],
      balance: 0,
      loading: false
    }
  },
  onLoad() { this.loadBills() },
  onShow() { this.loadBills() },
  onPullDownRefresh() {
    this.loadBills().finally(() => uni.stopPullDownRefresh())
  },
  methods: {
    loadBills() {
      this.loading = true
      return getBills().then(data => {
        console.log('账单数据', data)
        this.bills = (data && data.bills) || []
        this.prestore = (data && data.prestore) || []
        this.balance = (data && data.balance) || 0
      }).catch(err => {
        console.error('加载账单失败', err)
      }).finally(() => {
        this.loading = false
      })
    },
    billStatusText(status) {
      const map = { 0: '未缴', 1: '已缴', 2: '退费' }
      return map[status] || status
    },
    billStatusClass(status) {
      return status === 0 ? 'unpaid' : status === 1 ? 'paid' : 'refund'
    },
    billAmountClass(status) {
      return status === 0 ? 'unpaid' : status === 1 ? 'paid' : 'refund'
    },
    prestoreTypeText(type) {
      const map = { 0: '预存充值', 1: '费用扣款', 2: '退款' }
      return map[type] || '其它'
    }
  }
}
</script>

<style scoped>
.page { min-height: 100vh; background: #f5f7fa; }
.header { background: linear-gradient(135deg, #3b7cff, #5e9bff); padding: 40rpx 30rpx 60rpx; color: #fff; }
.header-title { font-size: 40rpx; font-weight: bold; }
.header-sub { font-size: 26rpx; opacity: 0.85; margin-top: 10rpx; }
.content { padding: 0 24rpx 40rpx; margin-top: -30rpx; }

.balance-card { background: linear-gradient(135deg, #3b7cff, #5e9bff); border-radius: 24rpx; padding: 40rpx; color: #fff; margin-bottom: 30rpx; box-shadow: 0 8rpx 24rpx rgba(59,124,255,0.25); }
.balance-label { font-size: 26rpx; opacity: 0.9; }
.balance-value { font-size: 64rpx; font-weight: bold; margin-top: 12rpx; }
.balance-tip { font-size: 24rpx; opacity: 0.75; margin-top: 10rpx; }

.section { margin-bottom: 30rpx; }
.section-title { display: flex; align-items: center; font-size: 30rpx; font-weight: bold; color: #333; margin-bottom: 20rpx; }
.dot { width: 16rpx; height: 16rpx; border-radius: 50%; margin-right: 12rpx; }
.dot.red { background: #ff6b6b; }
.dot.blue { background: #3b7cff; }

.card { background: #fff; border-radius: 24rpx; padding: 28rpx; margin-bottom: 20rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06); }
.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20rpx; }
.card-title { font-size: 30rpx; font-weight: bold; color: #1a1a1a; }
.amount { font-size: 34rpx; font-weight: bold; }
.amount.unpaid { color: #ff6b6b; }
.amount.paid { color: #07c160; }
.amount.refund { color: #ff9900; }

.card-body { border-top: 1rpx solid #f5f5f5; padding-top: 16rpx; }
.row { display: flex; justify-content: space-between; padding: 12rpx 0; }
.label { color: #999; font-size: 26rpx; }
.value { color: #333; font-size: 26rpx; font-weight: 500; }
.value.unpaid { color: #ff6b6b; }
.value.paid { color: #07c160; }
.value.refund { color: #ff9900; }

.flow-item { background: #fff; border-radius: 24rpx; padding: 28rpx; margin-bottom: 20rpx; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06); }
.flow-title { font-size: 30rpx; color: #1a1a1a; font-weight: bold; }
.flow-time { font-size: 24rpx; color: #999; margin-top: 8rpx; }
.flow-amount { font-size: 34rpx; font-weight: bold; text-align: right; }
.flow-amount.in { color: #07c160; }
.flow-amount.out { color: #ff6b6b; }
.flow-balance { font-size: 24rpx; color: #999; margin-top: 6rpx; text-align: right; }

.empty-mini { text-align: center; color: #999; padding: 60rpx 0; font-size: 28rpx; background: #fff; border-radius: 24rpx; }
.state-box { text-align: center; padding: 120rpx 40rpx; }
.spinner { width: 60rpx; height: 60rpx; border: 4rpx solid #e6e6e6; border-top-color: #3b7cff; border-radius: 50%; margin: 0 auto 20rpx; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.state-text { font-size: 30rpx; color: #666; }
</style>
