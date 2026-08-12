<template>
  <view class="page">

    <view class="content">
      <view v-if="loading" class="state-box">
        <up-loading-icon text="正在加载护理动态..." textSize="15" color="#3b7cff" textColor="#666"></up-loading-icon>
      </view>

      <view v-else>
        <!-- 护理计划 -->
        <view class="section">
          <view class="section-title">
            <text class="dot purple"></text>
            <text>护理计划</text>
          </view>
          <up-empty v-if="!plans.length" mode="list" text="暂无护理计划" marginTop="40"></up-empty>
          <view v-else class="card" v-for="(item, index) in plans" :key="'p'+index">
            <view class="card-top">
              <view class="card-title">{{ item.planName }}</view>
              <up-tag :text="item.statusText" :bgColor="item.statusBg" :color="item.statusColor" :borderColor="item.statusBg" size="mini"></up-tag>
            </view>
            <view class="card-body">
              <view class="row"><text class="label">适用老人</text><text class="value">{{ item.elderName }}</text></view>
              <view class="row"><text class="label">计划周期</text><text class="value">{{ item.periodText }}</text></view>
              <view class="row"><text class="label">护理内容</text><text class="value">{{ item.content || '-' }}</text></view>
            </view>
          </view>
        </view>

        <!-- 护理任务时间线 -->
        <view class="section">
          <view class="section-title">
            <text class="dot blue"></text>
            <text>护理任务</text>
          </view>
          <up-empty v-if="!tasks.length" mode="list" text="暂无护理任务" marginTop="40"></up-empty>
          <view v-else class="timeline">
            <view class="timeline-item" v-for="(item, index) in tasks" :key="'t'+index">
              <view class="timeline-dot" :style="{ background: item.statusColor }"></view>
              <view class="timeline-content">
                <view class="task-title">{{ item.taskName }}</view>
                <view class="task-meta">{{ item.elderName }} · {{ item.executor || '未分配' }}</view>
                <view class="task-time">计划时间：{{ item.planTimeText }}</view>
                <up-tag :text="item.statusText" :bgColor="item.statusBg" :color="item.statusColor" :borderColor="item.statusBg" size="mini" customStyle="margin-top: 12rpx; display: inline-flex;"></up-tag>
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
import { getCare } from '@/api/family.js'
import { fmtTime } from '@/utils/format.js'

const plans = ref([])
const tasks = ref([])
const loading = ref(false)

const planTextMap = { 0: '执行中', 1: '已完成', 2: '已暂停' }
const planBgMap = { 0: '#e6f0ff', 1: '#e6f9f0', 2: '#fff5e6' }
const planColorMap = { 0: '#3b7cff', 1: '#07c160', 2: '#ff9900' }
const taskTextMap = { 0: '待执行', 1: '执行中', 2: '已完成', 3: '已取消' }
const taskBgMap = { 0: '#f2f2f2', 1: '#e6f0ff', 2: '#e6f9f0', 3: '#ffebeb' }
const taskColorMap = { 0: '#999', 1: '#3b7cff', 2: '#07c160', 3: '#ff4d4f' }

function load() {
  loading.value = true
  return getCare().then(data => {
    plans.value = ((data && data.plans) || []).map(it => ({
      ...it,
      statusText: planTextMap[it.status] || '未知',
      statusBg: planBgMap[it.status] || '#f5f7fa',
      statusColor: planColorMap[it.status] || '#999',
      periodText: fmtTime(it.startDate) + ' 至 ' + fmtTime(it.endDate)
    }))
    tasks.value = ((data && data.tasks) || []).map(it => ({
      ...it,
      statusText: taskTextMap[it.status] || '未知',
      statusBg: taskBgMap[it.status] || '#f5f7fa',
      statusColor: taskColorMap[it.status] || '#999',
      planTimeText: fmtTime(it.planTime)
    }))
  }).catch(err => {
    console.error('加载护理动态失败', err)
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
      &.purple {
        background: #8e44ad;
      }
      &.blue {
        background: #3b7cff;
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
        text-align: right;
        flex: 1;
        margin-left: 20rpx;
        word-break: break-all;
      }
    }
  }
}

.timeline {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);

  .timeline-item {
    display: flex;
    padding-bottom: 30rpx;
    position: relative;

    &:last-child {
      padding-bottom: 0;
    }

    &:not(:last-child)::before {
      content: '';
      position: absolute;
      left: 11rpx;
      top: 36rpx;
      bottom: 0;
      width: 2rpx;
      background: #e6e6e6;
    }

    .timeline-dot {
      width: 24rpx;
      height: 24rpx;
      border-radius: 50%;
      margin-right: 20rpx;
      margin-top: 6rpx;
      flex-shrink: 0;
    }

    .timeline-content {
      flex: 1;

      .task-title {
        font-size: 30rpx;
        font-weight: bold;
        color: #1a1a1a;
      }

      .task-meta {
        font-size: 24rpx;
        color: #666;
        margin-top: 8rpx;
      }

      .task-time {
        font-size: 24rpx;
        color: #999;
        margin-top: 6rpx;
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
