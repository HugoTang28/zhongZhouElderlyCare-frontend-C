<template>
  <!-- 用时注入占位：真实组件注入前先渲染此轻量占位，避免布局抖动 -->
  <text class="zz-ph"></text>
</template>

<script setup></script>

<style scoped>
.zz-ph {
  display: inline-block;
  width: 104rpx;
  height: 36rpx;
  border-radius: 999rpx;
  background: #eceef2;
  vertical-align: middle;
}
</style>
