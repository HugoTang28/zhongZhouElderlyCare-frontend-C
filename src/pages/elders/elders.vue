<template>
  <view class="page">
    <view class="content">
      <!-- 加载中 -->
      <view v-if="loading" class="state-box">
        <up-loading-icon text="正在加载家人信息..." textSize="15" color="#3b7cff" textColor="#666"></up-loading-icon>
      </view>

      <!-- 空状态 -->
      <view v-else-if="!list.length" class="state-box">
        <up-empty mode="list" text="暂无关联老人" marginTop="40">
          <template #bottom>
            <text class="state-tip">请联系养老院工作人员绑定家属手机号</text>
          </template>
        </up-empty>
      </view>

      <!-- 老人卡片列表 -->
      <view v-else>
        <view class="elder-card" v-for="(item, index) in list" :key="index">
          <view class="card-head">
            <view class="avatar">{{ item.elderName ? item.elderName.charAt(0) : '长' }}</view>
            <view class="head-info">
              <view class="name-line">
                <text class="name">{{ item.elderName }}</text>
                <up-tag :text="item.statusText" :bgColor="item.statusBg" :color="item.statusColor" :borderColor="item.statusBg" size="mini"></up-tag>
              </view>
              <view class="meta">{{ item.sexText }} · {{ item.age }}岁</view>
            </view>
            <up-icon name="arrow-right" color="#c5ccd6" size="22"></up-icon>
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
            <up-icon name="arrow-right" color="#9aa0a6" size="18"></up-icon>
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
const statusBgMap = { 0: '#e6f9f0', 1: '#f2f2f2', 2: '#fff5e6' }
const statusColorMap = { 0: '#07c160', 1: '#999', 2: '#ff9900' }
const sexTextMap = { 1: '男', 2: '女' }

function load() {
  loading.value = true
  return getElders().then(data => {
    list.value = (data || []).map(it => ({
      ...it,
      statusText: statusTextMap[it.status] || '未知',
      statusBg: statusBgMap[it.status] || '#f5f7fa',
      statusColor: statusColorMap[it.status] || '#999',
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
  display: flex;
  justify-content: center;
  padding: 120rpx 40rpx;
}

.state-tip {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-top: 12rpx;
}
</style>
