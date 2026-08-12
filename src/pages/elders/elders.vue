<template>
  <view class="page">
    <!-- 顶部 header -->
    <!-- <view class="header">
      <view class="header-title">我的家人</view>
      <view class="header-sub">随时关注长者在院情况</view>
    </view> -->

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
        <!-- <view class="summary">共 {{ list.length }} 位在院亲人</view> -->
        <view class="elder-card" v-for="(item, index) in list" :key="index">
          <view class="card-head">
            <view class="avatar">{{ item.elderName ? item.elderName.charAt(0) : '长' }}</view>
            <view class="head-info">
              <view class="name-line">
                <text class="name">{{ item.elderName }}</text>
                <text class="badge" :class="item.statusCls">{{ item.statusText }}</text>
              </view>
              <view class="meta">{{ item.sexText }} · {{ item.age }}岁</view>
            </view>
            <text class="card-arrow">›</text>
          </view>

          <view class="info-grid">
            <view class="info-item">
              <text class="info-label">身份证号</text>
              <text class="info-value">{{ item.idCardMasked }}</text>
            </view>
            <view class="info-item">
              <text class="info-label">床位号</text>
              <text class="info-value">{{ item.bedText }}</text>
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
              <text class="info-value">{{ item.checkInTimeText }}</text>
            </view>
          </view>

          <view class="card-foot">
            <text>查看照护与账单详情</text>
            <text class="card-arrow">›</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { getElders } from '@/api/family.js'
import { fmtTime, maskIdCard } from '@/utils/format.js'

const list = ref([])
const loading = ref(false)

const statusTextMap = { 0: '在住', 1: '已退住', 2: '待入住' }
const statusClsMap = { 0: 'status-in', 1: 'status-out', 2: 'status-wait' }
const sexTextMap = { 1: '男', 2: '女' }

function load() {
  loading.value = true
  return getElders().then(data => {
    list.value = (data || []).map(it => ({
      ...it,
      statusText: statusTextMap[it.status] || '未知',
      statusCls: statusClsMap[it.status] || 'status-wait',
      sexText: sexTextMap[it.sex] || '未知',
      idCardMasked: maskIdCard(it.idCard),
      bedText: it.bedId ? ('#' + it.bedId) : '暂未分配',
      checkInTimeText: fmtTime(it.checkInTime),
      age: it.age || '-'
    }))
  }).catch(err => {
    console.error('加载家人失败', err)
  }).finally(() => {
    loading.value = false
  })
}

onShow(() => { load() })
onPullDownRefresh(() => { load().finally(() => uni.stopPullDownRefresh()) })
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background: #f5f7fa;
}

/* .header { background: linear-gradient(135deg, #3b7cff, #5e9bff); padding: 40rpx 30rpx 60rpx; color: #fff;
  .header-title { font-size: 40rpx; font-weight: bold; }
  .header-sub { font-size: 26rpx; opacity: 0.85; margin-top: 10rpx; } } */
.content {
  padding: 0 24rpx 40rpx;
  margin-top: 30rpx;
}

.summary {
  font-size: 26rpx;
  color: #666;
  margin: 24rpx 8rpx 8rpx;
}

.elder-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}

.card-head {
  display: flex;
  align-items: center;
  margin-bottom: 28rpx;
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid #f0f2f5;
}

.avatar {
  width: 104rpx;
  height: 104rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b7cff, #5e9bff);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44rpx;
  font-weight: 600;
  margin-right: 24rpx;
  border: 4rpx solid #fff;
  box-shadow: 0 8rpx 18rpx rgba(59, 124, 255, 0.3);
}

.head-info {
  flex: 1;
  min-width: 0;
}

.card-arrow {
  color: #c5ccd6;
  font-size: 44rpx;
  line-height: 1;
  margin-left: 12rpx;
}

.name-line {
  display: flex;
  align-items: center;
}

.name {
  font-size: 36rpx;
  font-weight: bold;
  color: #1a1a1a;
  margin-right: 16rpx;
}

.badge {
  font-size: 22rpx;
  padding: 4rpx 14rpx;
  border-radius: 20rpx;
}

.status-in {
  background: #e6f7ed;
  color: #07c160;
}

.status-out {
  background: #f2f2f2;
  color: #999;
}

.status-wait {
  background: #fff5e6;
  color: #ff9900;
}

.meta {
  font-size: 26rpx;
  color: #666;
  margin-top: 8rpx;
}

.card-foot {
  margin-top: 26rpx;
  padding-top: 22rpx;
  border-top: 1rpx solid #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24rpx;
  color: #9aa0a6;

  .card-arrow {
    font-size: 36rpx;
  }
}

.info {
  &-grid {
    display: flex;
    flex-wrap: wrap;
  }

  &-item {
    width: 50%;
    padding: 16rpx 0;
    box-sizing: border-box;

    &:nth-child(odd) {
      padding-right: 16rpx;
    }
  }

  &-label {
    display: block;
    font-size: 24rpx;
    color: #999;
    margin-bottom: 6rpx;
  }

  &-value {
    display: block;
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
    word-break: break-all;
  }
}

.state-box {
  text-align: center;
  padding: 120rpx 40rpx;
}

.spinner {
  width: 60rpx;
  height: 60rpx;
  border: 4rpx solid #e6e6e6;
  border-top-color: #3b7cff;
  border-radius: 50%;
  margin: 0 auto 20rpx;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.state-text {
  display: block;
  font-size: 30rpx;
  color: #666;
}

.state-tip {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-top: 12rpx;
}
</style>
