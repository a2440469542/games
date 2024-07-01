<template>
    <view class="webview">
        <view class="back-to" @click="backTo">
            <image src="../../static/images/back.png" />
        </view>
        <web-view :src="gamePath" style="inset: 0;"></web-view>
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
        console.log(options,this.gamePath)
        this.url = encodeURI(options.url)
    },
    computed: {
		...mapGetters(['gamePath'])
	},
    methods: {
        backTo() {
            uni.reLaunch({ url: '/pages/index/index' })
        }
    }
}
</script>
<style lang="scss" scoped>
.webview {
    width: 100%;
	display: flex;
	flex-direction: column;
	background-color: rgba(247, 201, 111, 1);
	height: 100vh;
    position: relative;
    .game {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
    }
    .back-to {
        position: absolute;
        top: 40rpx;
        left: 40rpx;
        z-index: 1000;
        width: 130rpx;
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 92rpx;
        background-color: #0000004d;
        image {
            width: 37rpx;
            height: 46rpx;
        }
    }
}
</style>