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
    uni-image {
        width: 8.75rem;
    }
    .empty-text{
        font-size: 1.5rem;
        color: #fff;
        margin-top: 0.625rem;
    }
}
</style>