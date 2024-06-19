<template>
    <view class="sub-nav secondaryBgColor">
        <view class="left" @click="back">
            <image src="../../static/images/back.png"></image>
        </view>
        <view class="sub-nav-title">{{ title }}</view>
        <view class="right"></view>
    </view>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        back() {
            uni.navigateBack()
        }
    }
}
</script>

<style lang="scss" scoped>
.sub-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 82rpx;

    .left {
        width: 80rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        image {
            width: 28rpx;
            height: 46rpx;
        }
    }

    .right {
        width: 80rpx;
        height: 80rpx;
    }

    .sub-nav-title {
        flex: 1;
        font-size: 36rpx;
        font-weight: 500;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>