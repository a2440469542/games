<template>
  <view class="navgation-bar secondaryBgColor">
    <view class="nav-left">
      <view :class="isOpen ? 'menu open' : 'menu'" @click="openDrawer"></view>
      <view class="logo" @click="toIndex">
        <image mode="heightFix" :src="channel.logo"></image>
        <text class="logo-text">{{channel.name}}</text>
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
  methods: {
    openDrawer() {
      this.$emit('openDrawer')
    },
    toIndex() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    },
    toLogin() {
      if(this.isLogin) {
        uni.switchTab({
          url: '/pages/recharge/index'
        })
      } else {
        this.$emit('toLogin')
      }
    }
  }
}

</script>
<style scoped lang="scss">
@media screen and (min-width: 680px) {
  .navgation-bar {
  width: 100%;
  height: 96px;
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
      width: 46px;
      height: 46px;
      background-image: url("../../static/images/menu.png");
      background-size: 100% 100%;
      margin-right: 22px;
      transition: transform 0.5s;    
    }

    .menu.open {
      transform: rotate(90deg);
    }

    .logo {
      width: calc(100% - 46px);
      height: 100%;
      display: flex;
      align-items: center;
      image {
        height: 60px;
      }
      .logo-text {
        max-width: 200px;
        font-size: 36px;
        color: #f9f36d;
        margin-left: 10px;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .nav-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
    .cou {
      width: 45px;
      height: 45px;
      background-image: url("../../static/images/country.png");
      background-size: 100% 105%;
      margin-right: 20px;
    }

    .amount {
      font-size: 28px;
      padding: 5px 23px;
      border: 1px solid #F8C15A;
      border-radius: 16px;
      font-size: 28px;
      color: #fbf68a;
    }
    .login-text {
      font-size: 28px;
      color: #fff;
    }
  }
}
}
@media screen and (max-width: 680px) {
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
      width: calc(100% - 46rpx);
      height: 100%;
      display: flex;
      align-items: center;
      image {
        height: 60rpx;
      }
      .logo-text {
        max-width: 200rpx;
        font-size: 36rpx;
        color: #f9f36d;
        margin-left: 10rpx;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
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
}

</style>