<template>
  <view class="page">
    <!-- <view class="header">
      <view class="header-title">探视记录</view>
      <view class="header-sub">预约与来访登记一目了然</view>
    </view> -->

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
          <view v-if="!appointments.length" class="empty-mini">暂无预约记录</view>
          <view v-else class="card" v-for="(item, index) in appointments" :key="'a'+index">
            <view class="card-top">
              <view class="card-title">{{ item.visitorName }}</view>
              <view class="tag" :class="item.apptCls">{{ item.apptText }}</view>
            </view>
            <view class="card-body">
              <view class="row"><text class="label">探望老人</text><text class="value">{{ item.elderName }}</text></view>
              <view class="row"><text class="label">预约时间</text><text class="value time">{{ item.visitTimeText }}</text></view>
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
          <view v-if="!registrations.length" class="empty-mini">暂无登记记录</view>
          <view v-else class="card" v-for="(item, index) in registrations" :key="'r'+index">
            <view class="card-top">
              <view class="card-title">{{ item.visitorName }}</view>
              <view class="tag grey">{{ item.relation || '家属' }}</view>
            </view>
            <view class="card-body">
              <view class="row"><text class="label">探望老人</text><text class="value">{{ item.elderName }}</text></view>
              <view class="row"><text class="label">到达时间</text><text class="value time">{{ item.arriveTimeText }}</text></view>
              <view class="row"><text class="label">离开时间</text><text class="value time">{{ item.leaveTimeText }}</text></view>
              <view class="row"><text class="label">身份证号</text><text class="value">{{ item.idCardMasked }}</text></view>
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
import { getVisits } from '@/api/family.js'
import { fmtTime, maskIdCard } from '@/utils/format.js'

const appointments = ref([])
const registrations = ref([])
const loading = ref(false)

const apptTextMap = { 0: '待审核', 1: '已通过', 2: '已拒绝', 3: '已取消' }
const apptClsMap = { 0: 'wait', 1: 'pass', 2: 'reject', 3: 'cancel' }

function load() {
  loading.value = true
  return getVisits().then(data => {
    appointments.value = ((data && data.appointments) || []).map(it => ({
      ...it,
      apptText: apptTextMap[it.status] || '未知',
      apptCls: apptClsMap[it.status] || 'grey',
      visitTimeText: fmtTime(it.visitTime)
    }))
    registrations.value = ((data && data.registrations) || []).map(it => ({
      ...it,
      arriveTimeText: fmtTime(it.arriveTime),
      leaveTimeText: it.leaveTime ? fmtTime(it.leaveTime) : '未离开',
      idCardMasked: maskIdCard(it.idCard)
    }))
  }).catch(err => {
    console.error('加载探视记录失败', err)
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

.header {
  background: linear-gradient(135deg, #3b7cff, #5e9bff);
  padding: 40rpx 30rpx 60rpx;
  color: #fff;

  &-title {
    font-size: 40rpx;
    font-weight: bold;
  }

  &-sub {
    font-size: 26rpx;
    opacity: 0.85;
    margin-top: 10rpx;
  }
}

.content {
  padding: 0 24rpx 40rpx;
  margin-top: 30rpx;
}

.section {
  margin-bottom: 30rpx;

  &-title {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  margin-right: 12rpx;

  &.blue {
    background: #3b7cff;
  }

  &.green {
    background: #07c160;
  }
}

.card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);

  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
  }

  &-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #1a1a1a;
  }

  &-body {
    border-top: 1rpx solid #f5f5f5;
    padding-top: 16rpx;
  }
}

.tag {
  font-size: 22rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
}

.wait {
  background: #fff5e6;
  color: #ff9900;
}

.pass {
  background: #e6f7ed;
  color: #07c160;
}

.reject {
  background: #ffebeb;
  color: #ff4d4f;
}

.cancel {
  background: #f2f2f2;
  color: #999;
}

.grey {
  background: #f2f2f2;
  color: #666;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 12rpx 0;
}

.label {
  color: #999;
  font-size: 26rpx;
}

.value {
  color: #333;
  font-size: 26rpx;
  font-weight: 500;

  &.time {
    color: #3b7cff;
  }
}

.empty-mini {
  text-align: center;
  color: #999;
  padding: 60rpx 0;
  font-size: 28rpx;
  background: #fff;
  border-radius: 24rpx;
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

.state-text {
  font-size: 30rpx;
  color: #666;
}
</style>
