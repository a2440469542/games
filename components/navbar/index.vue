<template>
  <view class="navgation-bar secondaryBgColor">
    <view class="nav-left">
      <view :class="isOpen ? 'menu open' : 'menu'" @click="openDrawer">
        <image mode="widthFix" src="../../static/images/menu.png"></image>
      </view>
      <view class="logo" @click="toIndex">
        <image mode="widthFix" :src="channel.logo"></image>
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
.navgation-bar {
  width: 100%;
  height: 3.5rem;
  display: flex;
  position: relative;
  padding: .5rem .75rem;
  justify-content: space-between;

  .nav-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 50%;

    .menu {
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      // height: 2rem;
      // background-image: url("../../static/images/menu.png");
      // background-size: 100% 100%;
      margin-right: .5rem;
      transition: transform 0.5s; 
      uni-image {
        width: 2rem;
      }   
    }

    .menu.open {
      transform: rotate(90deg);
    }

    .logo {
      width: 80%;
      height: 100%;
      display: flex;
      align-items: center;
      uni-image {
        width: 2rem;
      }
      .logo-text {
        max-width: 5rem;
        font-size: 1.25rem;
        color: #f9f36d;
        margin-left: 5px;
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
      width: 1.5rem;
      height: 1.5rem;
      background-image: url("../../static/images/country.png");
      background-size: 100% 105%;
      margin-right: 0.5rem;
    }

    .amount {
      font-size: 1rem;
      padding: .25rem .5rem;
      border: .1rem solid #F8C15A;
      border-radius: .5rem;
      color: #fbf68a;
    }
    .login-text {
      font-size: .75rem;
      color: #fff;
    }
  }
}
</style>