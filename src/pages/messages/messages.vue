<template>
  <view class="page">

    <view class="content">
      <view v-if="loading" class="state-box">
        <up-loading-icon text="正在加载消息..." textSize="15" color="#3b7cff" textColor="#666"></up-loading-icon>
      </view>

      <view v-else>
        <!-- 消息推送 -->
        <view class="section">
          <view class="section-title">
            <text class="dot blue"></text>
            <text>最新通知</text>
          </view>
          <up-empty v-if="!messages.length" mode="list" text="暂无消息" marginTop="40"></up-empty>
          <view v-else class="msg-list">
            <view class="msg-item" v-for="(item, index) in messages" :key="'m'+index">
              <view class="msg-icon" :class="item.cls">{{ item.icon }}</view>
              <view class="msg-body">
                <view class="msg-title">{{ item.title }}</view>
                <view class="msg-content">{{ item.content }}</view>
                <view class="msg-time">{{ item.timeText }}</view>
              </view>
            </view>
          </view>
        </view>

        <!-- 预警规则 -->
        <view class="section">
          <view class="section-title">
            <text class="dot red"></text>
            <text>预警规则</text>
          </view>
          <up-empty v-if="!alarmRules.length" mode="list" text="暂无预警规则" marginTop="40"></up-empty>
          <view v-else class="card" v-for="(item, index) in alarmRules" :key="'r'+index">
            <view class="card-top">
              <view class="card-title">{{ item.ruleName }}</view>
              <up-tag text="预警中" bgColor="#ffebeb" color="#ff4d4f" borderColor="#ffebeb" size="mini"></up-tag>
            </view>
            <view class="card-body">
              <view class="row"><text class="label">设备类型</text><text class="value">{{ item.deviceType }}</text></view>
              <view class="row"><text class="label">触发条件</text><text class="value">{{ item.alarmCondition }}</text></view>
            </view>
          </view>
        </view>

        <!-- 设备状态 -->
        <view class="section">
          <view class="section-title">
            <text class="dot green"></text>
            <text>设备状态</text>
          </view>
          <up-empty v-if="!devices.length" mode="list" text="暂无设备" marginTop="40"></up-empty>
          <view v-else class="device-grid">
            <view class="device-item" v-for="(item, index) in devices" :key="'d'+index">
              <view class="device-name">{{ item.deviceName }}</view>
              <view class="device-meta">
                <text class="device-type">{{ item.deviceType }}</text>
                <up-tag :text="item.statusText" :bgColor="item.statusBg" :color="item.statusColor" :borderColor="item.statusBg" size="mini"></up-tag>
              </view>
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
import { getMessages, getAlarms } from '@/api/family.js'
import { fmtTime } from '@/utils/format.js'

const messages = ref([])
const alarmRules = ref([])
const devices = ref([])
const loading = ref(false)

const msgIconMap = { '探视': '👋', '护理': '💊', '财务': '💰', '账单': '📄', '系统': '📢' }
const msgClsMap = { '探视': 'visit', '护理': 'care', '财务': 'finance', '账单': 'bill', '系统': 'system' }
const deviceTextMap = { 0: '离线', 1: '在线', 2: '故障' }
const deviceBgMap = { 0: '#f2f2f2', 1: '#e6f9f0', 2: '#ffebeb' }
const deviceColorMap = { 0: '#999', 1: '#07c160', 2: '#ff4d4f' }
const alarmTextMap = { 0: '停用', 1: '启用' }

function load() {
  loading.value = true
  const p1 = getMessages().then(data => {
    messages.value = (data || []).map(it => ({
      ...it,
      icon: msgIconMap[it.msgType] || '📢',
      cls: msgClsMap[it.msgType] || 'system',
      timeText: fmtTime(it.createTime)
    }))
  }).catch(err => console.error('加载消息失败', err))

  const p2 = getAlarms().then(data => {
    alarmRules.value = ((data && data.rules) || []).map(it => ({
      ...it,
      statusText: alarmTextMap[it.status] || '未知'
    }))
    devices.value = ((data && data.devices) || []).map(it => ({
      ...it,
      statusText: deviceTextMap[it.status] || '未知',
      statusBg: deviceBgMap[it.status] || '#f5f7fa',
      statusColor: deviceColorMap[it.status] || '#999'
    }))
  }).catch(err => console.error('加载预警失败', err))

  return Promise.all([p1, p2]).finally(() => { loading.value = false })
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

      &.red {
        background: #ff6b6b;
      }

      &.green {
        background: #07c160;
      }
    }
  }
}

.msg-list {
  background: #fff;
  border-radius: 24rpx;
  padding: 12rpx 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);

  .msg-item {
    display: flex;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .msg-icon {
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 34rpx;
      margin-right: 20rpx;
      flex-shrink: 0;

      &.visit {
        background: #e6f0ff;
      }

      &.care {
        background: #e6f7ed;
      }

      &.finance {
        background: #fff5e6;
      }

      &.bill {
        background: #f2f2f2;
      }

      &.system {
        background: #f0f0f0;
      }
    }

    .msg-body {
      flex: 1;

      .msg-title {
        font-size: 30rpx;
        font-weight: bold;
        color: #1a1a1a;
      }

      .msg-content {
        font-size: 26rpx;
        color: #666;
        margin-top: 8rpx;
        line-height: 1.5;
      }

      .msg-time {
        font-size: 22rpx;
        color: #999;
        margin-top: 10rpx;
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
      font-size: 30rpx;
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
      }
    }
  }
}

.device-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;

  .device-item {
    width: calc((100% - 20rpx) / 2);
    background: #fff;
    border-radius: 24rpx;
    padding: 28rpx;
    margin-bottom: 0;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
    box-sizing: border-box;

    .device-name {
      font-size: 30rpx;
      font-weight: bold;
      color: #1a1a1a;
    }

    .device-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8rpx;
    }

    .device-type {
      font-size: 24rpx;
      color: #999;
    }
  }
}

.state-box {
  display: flex;
  justify-content: center;
  padding: 120rpx 40rpx;
}
</style>
