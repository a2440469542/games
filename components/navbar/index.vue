<template>
  <view class="navgation-bar secondaryBgColor">
    <view class="nav-left">
      <view :class="isOpen ? 'menu open' : 'menu'" @click="openDrawer"></view>
      <view class="logo">
        <image mode="heightFix" src="channel.logo"></image>
      </view>
    </view>
    <view class="nav-right" @click="toLogin">
      <view class="cou"></view>
      <view class="amount" v-if="isLogin">R${{ userInfo.money || 0 }}</view>
      <view class="login-text" v-else>Login/Registar</view>
    </view>
  </view>
</template>
<script>

export default {
  name: "NavgationBar",
  data() {
    return {}
  },
  computed: {
    navStyle() {
      return {
      }
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => {}
    },
    channel: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    channel(n, o){
      // console.log("isLogin",n, o)
    }
  },
  methods: {
    openDrawer() {
      this.$emit('openDrawer')
    },
    toLogin() {
      this.$emit('toLogin')
    }
  }
}

</script>
<style scoped lang="scss">
.navgation-bar {
  width: 100%;
  height: 92rpx;
  display: flex;
  position: relative;
  padding: 0 26rpx;
  justify-content: space-between;

  .nav-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 50%;

    .menu {
      width: 46rpx;
      height: 46rpx;
      background-image: url("../../static/images/menu.png");
      background-size: 100% 100%;
      margin-right: 22rpx;
      transition: transform 0.5s;    
    }

    .menu.open {
      transform: rotate(90deg);
    }

    .logo {
      width: 208rpx;
      height: 100%;
      display: flex;
      align-items: center;
      image {
        height: 60rpx;
      }
    }
  }

  .nav-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
    .cou {
      width: 45rpx;
      height: 45rpx;
      background-image: url("../../static/images/country.png");
      background-size: 100% 105%;
      margin-right: 20rpx;
    }

    .amount {
      font-size: 28rpx;
      padding: 5rpx 23rpx;
      border: 1rpx solid #F8C15A;
      border-radius: 16rpx;
      font-size: 28rpx;
      color: #fbf68a;
    }
    .login-text {
      font-size: 28rpx;
      color: #fff;
    }
  }
}
</style>