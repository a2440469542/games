<template>
    <view class="sub-nav" :class="[currentTheme + '-theme']">
        <view class="left" @click="back">
            <image src="../../static/images/back.png"></image>
        </view>
        <view class="sub-nav-title">{{ title }}</view>
        <view class="right"></view>
    </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapGetters(['currentTheme'])
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
    background-color: var(--secondary-color);
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
        color: var(--text-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>