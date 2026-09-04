<template>
  <text class="zz-tag" :class="'zz-tag--' + type">{{ text }}</text>
</template>

<script setup>
// 统一状态标签：success 绿 / warning 橙 / danger 红 / info 灰 / primary 蓝
defineProps({
  text: { type: String, default: '' },
  type: { type: String, default: 'info' }
})
</script>

<style scoped>
.zz-tag {
  display: inline-flex;
  align-items: center;
  padding: 4rpx 18rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  line-height: 1.4;
  font-weight: 600;
  white-space: nowrap;
}
.zz-tag--success { color: #1a9e57; background: rgba(26, 158, 87, 0.12); }
.zz-tag--warning { color: #d98200; background: rgba(217, 130, 0, 0.12); }
.zz-tag--danger  { color: #e0483e; background: rgba(224, 72, 62, 0.12); }
.zz-tag--info    { color: #6b7280; background: rgba(107, 114, 128, 0.12); }
.zz-tag--primary { color: #3b7cff; background: rgba(59, 124, 255, 0.12); }
</style>
