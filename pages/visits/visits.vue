<template>
  <view class="page">
    <view class="header">
      <view class="header-title">探视记录</view>
      <view class="header-sub">预约与来访登记一目了然</view>
    </view>

    <view class="content">
      <view v-if="loading" class="state-box">
        <view class="spinner"></view>
        <text class="state-text">正在加载探视记录...</text>
      </view>

      <view v-else>
        <!-- 来访预约 -->
        <view class="section">
          <view class="section-title">
            <text class="dot blue"></text>
            <text>探视预约</text>
          </view>
          <view v-if="appointments.length === 0" class="empty-mini">暂无预约记录</view>
          <view v-else class="card" v-for="(item, index) in appointments" :key="'a'+index">
            <view class="card-top">
              <view class="card-title">{{ item.visitorName }}</view>
              <view class="tag" :class="apptClass(item.status)">{{ apptText(item.status) }}</view>
            </view>
            <view class="card-body">
              <view class="row"><text class="label">探望老人</text><text class="value">{{ item.elderName }}</text></view>
              <view class="row"><text class="label">预约时间</text><text class="value time">{{ item.visitTime }}</text></view>
              <view class="row"><text class="label">探视事由</text><text class="value">{{ item.purpose || '-' }}</text></view>
              <view class="row"><text class="label">联系电话</text><text class="value">{{ item.phone || '-' }}</text></view>
            </view>
          </view>
        </view>

        <!-- 来访登记 -->
        <view class="section">
          <view class="section-title">
            <text class="dot green"></text>
            <text>来访登记</text>
          </view>
          <view v-if="registrations.length === 0" class="empty-mini">暂无登记记录</view>
          <view v-else class="card" v-for="(item, index) in registrations" :key="'r'+index">
            <view class="card-top">
              <view class="card-title">{{ item.visitorName }}</view>
              <view class="tag grey">{{ item.relation || '家属' }}</view>
            </view>
            <view class="card-body">
              <view class="row"><text class="label">探望老人</text><text class="value">{{ item.elderName }}</text></view>
              <view class="row"><text class="label">到达时间</text><text class="value time">{{ item.arriveTime }}</text></view>
              <view class="row"><text class="label">离开时间</text><text class="value time">{{ item.leaveTime || '未离开' }}</text></view>
              <view class="row"><text class="label">身份证号</text><text class="value">{{ maskIdCard(item.idCard) }}</text></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getVisits } from '@/api/family.js'

export default {
  data() {
    return {
      appointments: [],
      registrations: [],
      loading: false
    }
  },
  onLoad() { this.loadVisits() },
  onShow() { this.loadVisits() },
  onPullDownRefresh() {
    this.loadVisits().finally(() => uni.stopPullDownRefresh())
  },
  methods: {
    loadVisits() {
      this.loading = true
      return getVisits().then(data => {
        console.log('探视数据', data)
        this.appointments = (data && data.appointments) || []
        this.registrations = (data && data.registrations) || []
      }).catch(err => {
        console.error('加载探视记录失败', err)
      }).finally(() => {
        this.loading = false
      })
    },
    apptText(status) {
      const map = { 0: '待审核', 1: '已通过', 2: '已拒绝', 3: '已取消' }
      return map[status] || status
    },
    apptClass(status) {
      return { 0: 'wait', 1: 'pass', 2: 'reject', 3: 'cancel' }[status] || 'grey'
    },
    maskIdCard(idCard) {
      if (!idCard || idCard.length < 10) return idCard || '-'
      return idCard.substring(0, 6) + '********' + idCard.substring(idCard.length - 4)
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

.section { margin-bottom: 30rpx; }
.section-title { display: flex; align-items: center; font-size: 30rpx; font-weight: bold; color: #333; margin-bottom: 20rpx; }
.dot { width: 16rpx; height: 16rpx; border-radius: 50%; margin-right: 12rpx; }
.dot.blue { background: #3b7cff; }
.dot.green { background: #07c160; }

.card { background: #fff; border-radius: 24rpx; padding: 28rpx; margin-bottom: 20rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06); }
.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20rpx; }
.card-title { font-size: 32rpx; font-weight: bold; color: #1a1a1a; }
.tag { font-size: 22rpx; padding: 6rpx 16rpx; border-radius: 20rpx; }
.wait { background: #fff5e6; color: #ff9900; }
.pass { background: #e6f7ed; color: #07c160; }
.reject { background: #ffebeb; color: #ff4d4f; }
.cancel { background: #f2f2f2; color: #999; }
.grey { background: #f2f2f2; color: #666; }

.card-body { border-top: 1rpx solid #f5f5f5; padding-top: 16rpx; }
.row { display: flex; justify-content: space-between; padding: 12rpx 0; }
.label { color: #999; font-size: 26rpx; }
.value { color: #333; font-size: 26rpx; font-weight: 500; }
.value.time { color: #3b7cff; }

.empty-mini { text-align: center; color: #999; padding: 60rpx 0; font-size: 28rpx; background: #fff; border-radius: 24rpx; }
.state-box { text-align: center; padding: 120rpx 40rpx; }
.spinner { width: 60rpx; height: 60rpx; border: 4rpx solid #e6e6e6; border-top-color: #3b7cff; border-radius: 50%; margin: 0 auto 20rpx; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.state-text { font-size: 30rpx; color: #666; }
</style>
