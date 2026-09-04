<script>
// 标准 uni-app App.vue：不编写模板，页面由框架注入。
// 若写死封闭模板（如 <view id="app"></view>），H5 会出现空白页。
export default {
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style>
/* ============ 全局设计令牌（家属端统一视觉规范） ============ */
page {
  /* 品牌主色 */
  --brand: #3b7cff;
  --brand-2: #5e9bff;
  --brand-soft: #eaf1ff;
  /* 功能色 */
  --success: #07c160;
  --warning: #ff9900;
  --danger: #ff4d4f;
  --danger-soft: #ffebeb;
  /* 中性色 */
  --text-1: #1a1a1a;
  --text-2: #333333;
  --text-3: #666666;
  --text-4: #999999;
  --line: #f0f2f5;
  --bg: #f5f7fa;
  /* 圆角 / 阴影 */
  --radius-lg: 28rpx;
  --radius-md: 20rpx;
  --radius-sm: 14rpx;
  --shadow-card: 0 8rpx 30rpx rgba(20, 38, 80, 0.07);
  --shadow-brand: 0 12rpx 30rpx rgba(59, 124, 255, 0.28);

  background-color: var(--bg);
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: var(--text-2);
  -webkit-font-smoothing: antialiased;
}

view, text, input, button { box-sizing: border-box; }

/* 通用加载动画（全局可用，避免各页重复定义） */
.zz-spinner {
  width: 56rpx; height: 56rpx;
  border: 5rpx solid #e6ebf5;
  border-top-color: var(--brand);
  border-radius: 50%;
  margin: 0 auto 20rpx;
  animation: zz-spin 0.9s linear infinite;
}
@keyframes zz-spin { to { transform: rotate(360deg); } }
</style>
