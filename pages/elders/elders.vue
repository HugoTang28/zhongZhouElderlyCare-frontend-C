<template>
  <view class="page">
    <!-- 顶部 header -->
    <view class="header">
      <view class="header-title">我的家人</view>
      <view class="header-sub">随时关注长者在院情况</view>
    </view>

    <view class="content">
      <!-- 加载中 -->
      <view v-if="loading" class="state-box">
        <view class="spinner"></view>
        <text class="state-text">正在加载家人信息...</text>
      </view>

      <!-- 空状态 -->
      <view v-else-if="!list.length" class="state-box">
        <view class="empty-icon">👨‍⚕️</view>
        <text class="state-text">暂无关联老人</text>
        <text class="state-tip">请联系养老院工作人员绑定家属手机号</text>
      </view>

      <!-- 老人卡片列表 -->
      <view v-else>
        <view class="elder-card" v-for="(item, index) in list" :key="index">
          <view class="card-head">
            <view class="avatar">{{ item.elderName ? item.elderName.charAt(0) : '长' }}</view>
            <view class="head-info">
              <view class="name-line">
                <text class="name">{{ item.elderName }}</text>
                <text class="badge" :class="statusClass(item.status)">{{ statusText(item.status) }}</text>
              </view>
              <view class="meta">{{ sexText(item.sex) }} · {{ item.age }}岁</view>
            </view>
          </view>

          <view class="info-grid">
            <view class="info-item">
              <text class="info-label">身份证号</text>
              <text class="info-value">{{ maskIdCard(item.idCard) }}</text>
            </view>
            <view class="info-item">
              <text class="info-label">床位号</text>
              <text class="info-value">{{ item.bedNo || '暂未分配' }}</text>
            </view>
            <view class="info-item">
              <text class="info-label">合同编号</text>
              <text class="info-value">{{ item.contractNo || '-' }}</text>
            </view>
            <view class="info-item">
              <text class="info-label">家属联系人</text>
              <text class="info-value">{{ item.familyName || '-' }}</text>
            </view>
            <view class="info-item">
              <text class="info-label">联系电话</text>
              <text class="info-value">{{ item.familyPhone || '-' }}</text>
            </view>
            <view class="info-item">
              <text class="info-label">入住时间</text>
              <text class="info-value">{{ item.checkInTime }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getElders } from '@/api/family.js'

export default {
  data() {
    return {
      list: [],
      loading: false
    }
  },
  onLoad() {
    console.log('家人页面 onLoad')
    this.loadElders()
  },
  onShow() {
    console.log('家人页面 onShow')
    this.loadElders()
  },
  onPullDownRefresh() {
    console.log('家人页面下拉刷新')
    this.loadElders().finally(() => {
      uni.stopPullDownRefresh()
    })
  },
  methods: {
    loadElders() {
      this.loading = true
      return getElders().then(data => {
        console.log('家人数据', data)
        this.list = data || []
      }).catch(err => {
        console.error('加载家人失败', err)
      }).finally(() => {
        this.loading = false
      })
    },
    sexText(sex) {
      return sex === 1 ? '男' : sex === 2 ? '女' : '未知'
    },
    statusText(status) {
      const map = { 0: '在住', 1: '已退住', 2: '待入住' }
      return map[status] || '未知'
    },
    statusClass(status) {
      return status === 0 ? 'status-in' : status === 1 ? 'status-out' : 'status-wait'
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

.elder-card { background: #fff; border-radius: 24rpx; padding: 32rpx; margin-bottom: 24rpx; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.06); }
.card-head { display: flex; align-items: center; margin-bottom: 28rpx; padding-bottom: 24rpx; border-bottom: 1rpx solid #f0f2f5; }
.avatar { width: 100rpx; height: 100rpx; border-radius: 50%; background: linear-gradient(135deg, #3b7cff, #5e9bff); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 40rpx; margin-right: 24rpx; }
.head-info { flex: 1; }
.name-line { display: flex; align-items: center; }
.name { font-size: 36rpx; font-weight: bold; color: #1a1a1a; margin-right: 16rpx; }
.badge { font-size: 22rpx; padding: 4rpx 14rpx; border-radius: 20rpx; }
.status-in { background: #e6f7ed; color: #07c160; }
.status-out { background: #f2f2f2; color: #999; }
.status-wait { background: #fff5e6; color: #ff9900; }
.meta { font-size: 26rpx; color: #666; margin-top: 8rpx; }

.info-grid { display: flex; flex-wrap: wrap; }
.info-item { width: 50%; padding: 16rpx 0; box-sizing: border-box; }
.info-item:nth-child(odd) { padding-right: 16rpx; }
.info-label { display: block; font-size: 24rpx; color: #999; margin-bottom: 6rpx; }
.info-value { display: block; font-size: 28rpx; color: #333; font-weight: 500; word-break: break-all; }

.state-box { text-align: center; padding: 120rpx 40rpx; }
.spinner { width: 60rpx; height: 60rpx; border: 4rpx solid #e6e6e6; border-top-color: #3b7cff; border-radius: 50%; margin: 0 auto 20rpx; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.empty-icon { font-size: 80rpx; margin-bottom: 20rpx; }
.state-text { display: block; font-size: 30rpx; color: #666; }
.state-tip { display: block; font-size: 24rpx; color: #999; margin-top: 12rpx; }
</style>
