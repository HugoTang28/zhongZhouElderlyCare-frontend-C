<template>
  <view class="page">
    <view class="content">
      <view v-if="loading" class="state-box">
        <up-loading-icon text="正在加载探视记录..." textSize="15" color="#3b7cff" textColor="#666"></up-loading-icon>
      </view>

      <view v-else>
        <!-- 来访预约 -->
        <view class="section">
          <view class="section-title">
            <text class="dot blue"></text>
            <text>探视预约</text>
          </view>
          <up-empty v-if="!appointments.length" mode="list" text="暂无预约记录" marginTop="40"></up-empty>
          <view v-else class="card" v-for="(item, index) in appointments" :key="'a'+index">
            <view class="card-top">
              <view class="card-title">{{ item.visitorName }}</view>
              <up-tag :text="item.apptText" :bgColor="item.apptBg" :color="item.apptColor" :borderColor="item.apptBg" size="mini"></up-tag>
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
          <up-empty v-if="!registrations.length" mode="list" text="暂无登记记录" marginTop="40"></up-empty>
          <view v-else class="card" v-for="(item, index) in registrations" :key="'r'+index">
            <view class="card-top">
              <view class="card-title">{{ item.visitorName }}</view>
              <up-tag :text="item.relation || '家属'" bgColor="#f2f2f2" color="#666" borderColor="#f2f2f2" size="mini"></up-tag>
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
const apptBgMap = { 0: '#fff5e6', 1: '#e6f9f0', 2: '#ffebeb', 3: '#f2f2f2' }
const apptColorMap = { 0: '#ff9900', 1: '#07c160', 2: '#ff4d4f', 3: '#999' }

function load() {
  loading.value = true
  return getVisits().then(data => {
    appointments.value = ((data && data.appointments) || []).map(it => ({
      ...it,
      apptText: apptTextMap[it.status] || '未知',
      apptBg: apptBgMap[it.status] || '#f5f7fa',
      apptColor: apptColorMap[it.status] || '#999',
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
.section {
  margin-bottom: 30rpx;

  .section-title {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
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
  }
}

.card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .card-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #1a1a1a;
    }
  }

  .card-body {
    border-top: 1rpx solid #f5f5f5;
    padding-top: 16rpx;

    .row {
      display: flex;
      justify-content: space-between;
      padding: 12rpx 0;

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
    }
  }
}
.state-box {
  display: flex;
  justify-content: center;
  padding: 120rpx 40rpx;
}
</style>
