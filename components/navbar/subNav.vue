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
            // uni.navigateBack()
            history.back();
        }
    }
}
</script>

<style lang="scss" scoped>
.sub-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.5625rem;

    .left {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        uni-image {
            width: 0.875rem;
            height: 1.4375rem;
        }
    }

    .right {
        width: 2.5rem;
        height: 2.5rem;
    }

    .sub-nav-title {
        flex: 1;
        font-size: 1.125rem;
        font-weight: 500;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>