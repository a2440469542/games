<template>
    <view class="rewards">
        <sub-nav :title="title"></sub-nav>
        <scroll-view scroll-y class="rewards-content">
            <view v-if="rewardsList.length > 0" >
                <view class="rewards-item" v-for="(item, index) in rewardsList" :key="index">
                <view class="rewards-item-content">
                    <view class="treasure-icon"></view>
                    <view class="treasure-content">
                        <view class="treasure-desc">
                            Convite válido   {{ item.invite_num }} / {{ item.user_num }}
                            <view class="amount">R${{ item.money }}</view>
                        </view>
                        <view class="treasure-progress">
                            <uv-line-progress :percentage="(item.invite_num / item.user_num) * 100" activeColor="#FCEA7F"
                                inactiveColor="#89ab50" height="14rpx" :showText="false"></uv-line-progress>
                        </view>
                    </view>
                    <view class="complated">
                        <view class="cmp-btn disabled" v-if="item.status == 1">
                            completar
                        </view>
                        <view class="cmp-btn" @click="getReward(item)" v-else>
                            completar
                        </view>
                    </view>
                </view>
            </view>
            </view>
            <view v-else>
                <empty></empty>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import NavgationBar from '../../components/navbar/index.vue'
import empty from '../../components/common/empty.vue';
export default {
    components: { NavgationBar, empty },
    data() {
        return {
            title: 'Recompensas de convite',
            rewardsList: []
        }
    },
    onLoad() {
        this.loadBoxList()
    },
    methods: {
        loadBoxList() {
            this.$api.user.getBox().then(res => {
                this.rewardsList = res
            })
        },
        getReward(item) {
            console.log(item)
            if (item.is_get === 0) {
                uni.switchTab({
                    url: '/pages/group/index'
                })
            } else {
                this.$api.user.getReward().then(res => {
                    this.rewardsList = res
                    uni.showToast({
                        title: "Recebido com sucesso"
                    });
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
scroll-view ::v-deep ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
}
.rewards {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(247, 201, 111, 1);
    height: 100vh;

    .rewards-content {
        height: 0;
        flex: 1;
        padding: 1.25rem 0.75rem;

        .rewards-item {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.75rem;
            background-image: url('../../static/images/rewards-bg.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;

            .rewards-item-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 0.69rem 0.25rem 0.69rem 0.75rem;

                .treasure-content {
                    font-size: 0.75rem;
                    flex: 1;
                    color: #fff;

                    .treasure-desc {
                        width: 100%;
                        position: relative;
                        font-size: 0.75rem;
                        line-height: 0.94rem;
                        padding-bottom: 0.3125rem;

                        .amount {
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            color: #ffe2c1;
                            font-size: .75rem;
                        }
                    }
                }

                .treasure-progress {
                    padding-bottom: 0.3125rem;
                }

                .treasure-icon {
                    width: 5.25rem;
                    height: 6rem;
                }

                .complated {
                    width: 5rem;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 0.625rem;

                    .cmp-btn {
                        width: 100%;
                        height: 2.3125rem;
                        line-height: 2.3125rem;
                        text-align: center;
                        background-color: #ffe75f;
                        color: #678633;
                        border-radius: 0.3125rem;
                        font-size: 0.75rem;
                    }
                    .cmp-btn.disabled {
                        background-color: #89ab50;
                        color: #fff;
                    }
                }
            }
        }
    }
}
</style>