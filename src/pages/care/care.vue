<template>
  <view class="page">

    <view class="content">
      <view v-if="loading" class="state-box">
        <view class="spinner"></view>
        <text class="state-text">正在加载护理动态...</text>
      </view>

      <view v-else>
        <!-- 护理计划 -->
        <view class="section">
          <view class="section-title">
            <text class="dot purple"></text>
            <text>护理计划</text>
          </view>
          <view v-if="!plans.length" class="empty-mini">暂无护理计划</view>
          <view v-else class="card" v-for="(item, index) in plans" :key="'p'+index">
            <view class="card-top">
              <view class="card-title">{{ item.planName }}</view>
              <view class="tag" :class="item.statusCls">{{ item.statusText }}</view>
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
          <view v-if="!tasks.length" class="empty-mini">暂无护理任务</view>
          <view v-else class="timeline">
            <view class="timeline-item" v-for="(item, index) in tasks" :key="'t'+index">
              <view class="timeline-dot" :class="item.statusCls"></view>
              <view class="timeline-content">
                <view class="task-title">{{ item.taskName }}</view>
                <view class="task-meta">{{ item.elderName }} · {{ item.executor || '未分配' }}</view>
                <view class="task-time">计划时间：{{ item.planTimeText }}</view>
                <view class="task-status" :class="item.statusCls">{{ item.statusText }}</view>
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
const planClsMap = { 0: 'doing', 1: 'done', 2: 'pause' }
const taskTextMap = { 0: '待执行', 1: '执行中', 2: '已完成', 3: '已取消' }
const taskClsMap = { 0: 'wait', 1: 'doing', 2: 'done', 3: 'cancel' }

function load() {
  loading.value = true
  return getCare().then(data => {
    plans.value = ((data && data.plans) || []).map(it => ({
      ...it,
      statusText: planTextMap[it.status] || '未知',
      statusCls: planClsMap[it.status] || 'wait',
      periodText: fmtTime(it.startDate) + ' 至 ' + fmtTime(it.endDate)
    }))
    tasks.value = ((data && data.tasks) || []).map(it => ({
      ...it,
      statusText: taskTextMap[it.status] || '未知',
      statusCls: taskClsMap[it.status] || 'grey',
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
.page {
  min-height: 100vh;
  background: #f5f7fa;
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

  &.purple {
    background: #8e44ad;
  }

  &.blue {
    background: #3b7cff;
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
    font-size: 30rpx;
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

.doing {
  background: #e6f0ff;
  color: #3b7cff;
}

.done {
  background: #e6f7ed;
  color: #07c160;
}

.pause {
  background: #fff5e6;
  color: #ff9900;
}

.wait {
  background: #f2f2f2;
  color: #666;
}

.cancel {
  background: #ffebeb;
  color: #ff4d4f;
}

.grey {
  background: #f2f2f2;
  color: #999;
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
  text-align: right;
  flex: 1;
  margin-left: 20rpx;
  word-break: break-all;
}

.timeline {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);

  &-item {
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
  }

  &-dot {
    width: 24rpx;
    height: 24rpx;
    border-radius: 50%;
    margin-right: 20rpx;
    margin-top: 6rpx;
    flex-shrink: 0;

    &.wait {
      background: #ccc;
    }

    &.doing {
      background: #3b7cff;
    }

    &.done {
      background: #07c160;
    }

    &.cancel {
      background: #ff4d4f;
    }
  }

  &-content {
    flex: 1;
  }
}

.task {
  &-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #1a1a1a;
  }

  &-meta {
    font-size: 24rpx;
    color: #666;
    margin-top: 8rpx;
  }

  &-time {
    font-size: 24rpx;
    color: #999;
    margin-top: 6rpx;
  }

  &-status {
    display: inline-block;
    font-size: 22rpx;
    padding: 4rpx 14rpx;
    border-radius: 20rpx;
    margin-top: 12rpx;
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
