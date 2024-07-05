<template>
    <view class="webview">
        <view class="back-to" @click="backTo">
            <image src="../../static/images/back.png" />
        </view>
        <web-view :src="payPath"></web-view>
    </view>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    data() {
        return {
            url: '',
            title: 'webview'
        }
    },
    onLoad(options) {
        console.log(options)
        this.url = encodeURI(options.url)
    },
    computed: {
        ...mapGetters(['payPath'])
    },
    methods: {
        backTo() {
            uni.reLaunch({ url: '/pages/recharge/index' })
        }
    }
}
</script>
<style lang="scss" scoped>
web-view {
    left: 0 !important;
}
.webview {
    width: 100%;
	display: flex;
	flex-direction: column;
	background-color: rgba(247, 201, 111, 1);
	height: 100vh;
    position: relative;
    .back-to {
        position: absolute;
        top: 1.25rem;
        left: 1.25rem;
        z-index: 1000;
        width: 4.0625rem;
        height: 2.8125rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2.875rem;
    background-color: #0000004d;
        uni-image {
            width: 1.156rem;
            height: 1.4375rem;
        }
    }
}
</style>