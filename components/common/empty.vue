<template>
    <view class="empty">
        <view>
            <image mode="widthFix" src="../../static/images/empty.png"></image>
        </view>
        <view class="empty-text">Sem dados</view>
    </view>
</template>

<script>
export default {
    name: "Empty"
}
</script>

<style lang="scss" scoped>
.empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    image {
        width: 280rpx;
    }
    .empty-text{
        font-size: 48rpx;
        color: #fff;
        margin-top: 20rpx;
    }
}
</style>