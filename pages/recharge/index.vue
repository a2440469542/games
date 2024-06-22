<template>
    <view class="recharge">
        <navgation-bar @openDrawer="openDrawer" :channel="channelInfo" :isLogin="isLogin" :is-open="isOpen" :userInfo="userInfo"></navgation-bar>
        <left-menu ref="leftMenu"></left-menu>
        <scroll-view scroll-y class="content">
            <view class="box">
                <view class="switch-tab">
                    <view :class="typeIndex === 0 ? 'tab-item active' : 'tab-item'" @click="switchTypeTab(0)">
                        Recarregar
                    </view>
                    <view :class="typeIndex === 1 ? 'tab-item active' : 'tab-item'" @click="switchTypeTab(1)">
                        Retirar
                    </view>
                </view>
                <view class="tab-content">
                    <view class="charge" v-if="typeIndex === 0">
                        <view class="amount-list">
                            <view v-for="(item, index) in amountList" :key="index"
                                :class="chargeItemIndex === item.id ? 'amount-item active' : 'amount-item'"
                                @click="onCharge(item)">
                                <view class="amount">{{ `R$${item.money}` }}</view>
                            </view>
                        </view>
                        <!-- <view class="recharge-channels">
                            <text>Canais de recarga :</text>
                            <text class="channel">hkppay</text>
                        </view> -->
                        <view class="recharge-amount">
                            <view class="recharge-amount-title">Por Favor, Insira o Valor da Recarga</view>
                            <view class="recharge-amount-value">
                                <input v-model="chargeValue" placeholder-style="color: #ffd8ad" class="uni-input" placeholder="(Mínimo 10)"/>
                            </view>
                        </view>
                        <view class="recharge-submit">
                            <view class="charge-btn" @click="submit">Recarregar</view>
                        </view>
                    </view>
                    <view v-if="typeIndex === 1" class="remove">
                        <view class="info-input">
                            <view class="label">Valor</view>
                            <view>
                                <input v-model="withdrawValue" class="uni-input" placeholder-style="color: #fff" focus
                                    placeholder="Insira o valor" />
                            </view>
                        </view>
                        <view class="btns">
                            <view class="remove-btn" @click="withdraw">Retirar Agora</view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
		<tab-bar :current-index="2" @needLogin='toLogin' :isLogin="isLogin"></tab-bar>
    </view>
</template>
<script>
import leftMenu from '../../components/common/leftMenu.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        leftMenu
    },
    data() {
        return {
            isOpen: false,
            typeIndex: 0,
            chargeItemIndex: 0,
            chargeValue: "",
            withdrawValue: '',
            amountList: [],
            userInfo: uni.getStorageSync('userInfo') || {},
            channelInfo: uni.getStorageSync('channelInfo') || {},
            isLogin: false
        }
    },
    computed: {},
    onShow() {
        // //console.log(uni.getStorageSync('rechargeFlag'))
        this.isLogin = uni.getStorageSync('isLogin');
        if(this.isLogin){
            this.getUserInfo() 
        }
        uni.$on('rechargeFlag', (e)=>{
            //console.log(e)
            this.typeIndex = e
        })
    },
    onLoad(options) {
        // //console.log(options, this.rechargeFlag)
        this.loadRechargeList()
    },
    onTabItemTap(e) {
		//console.log('tabbar', e)
        //console.log(this.rechargeFlag)
	},
    methods: {
        getUserInfo() {
		    this.$api.user.getUserInfo().then(res => {
		        this.userInfo = res
		    })
		},
        switchTypeTab(index) {
            this.typeIndex = index
            this.chargeValue = 0,
            this.withdrawValue = ''
        },
        async loadRechargeList() {
            const res = await this.$api.user.getRechargeList();
            this.amountList = res;
        },
        async setRecharge() {
            const { chargeItemIndex, chargeValue } = this;
            const res = await this.$api.user.recharge({ rid: chargeItemIndex, money: chargeValue });
            uni.navigateTo({
                url: `/pages/webview/index?url=${res.url}`
            });
        },
        openDrawer() {
            this.isOpen = !this.isOpen
            if (this.isOpen) {
                this.$refs.leftMenu.showDrawer()
            } else {
                this.$refs.leftMenu.closeDrawer()
            }
        },
        onCharge(item) {
            this.chargeItemIndex = item.id
            this.chargeValue = item.money
        },
        submit() {
            if(this.chargeValue < 10) {
                uni.showToast({
                    title: 'Mínimo de R$10',
                    icon: 'none'
                })
                return
            }
            this.setRecharge()
        },
        withdraw() {
            if(this.withdrawValue == '') {
                uni.showToast({
                    title: 'Mínimo de R$10',
                    icon: 'none'
                })
                return
            }
            this.$api.user.cash({ money: this.withdrawValue }).then(res => {
                //console.log(res)
                if (res.code === 102) {
                    uni.navigateTo({
                        url: '/pages/bind/index'
                    })
                }
                uni.showToast({
                    title: res.msg
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.recharge {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(247, 201, 111, 1);
    height: 100vh;

    .content {
        height: 0;
        flex: 1;
        .box {
            padding: 24rpx 30rpx;
            .switch-tab {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 90rpx;
            background-color: transparent;
            border: 1rpx solid #678633;
            border-radius: 14rpx;
            padding: 10rpx;
            box-sizing: border-box;

            .tab-item {
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 36rpx;
                color: #678633;
                font-size: 600;
                transition: .3s;
            }

            .tab-item.active {
                background-color: #678633;
                color: #fcea7f;
                border-radius: 14rpx;
                transition: .3s;
            }
        }

        .tab-content {
            margin-top: 20rpx;

            .charge {
                .amount-list {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    gap: 10rpx;

                    .amount-item {
                        box-sizing: border-box;
                        width: 32%;
                        height: 122rpx;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 36rpx;
                        color: #fff;
                        font-size: 600;
                        transition: .3s;
                        background-color: #678633;
                        border: 1rpx solid #fff;
                        border-radius: 20rpx;
                    }

                    .amount-item.active {
                        color: #4a661a;
                        transition: .3s;
                        background-color: #fcea7f;
                        border: .1rpx solid #4A661A;
                    }
                }

                .recharge-channels {
                    display: flex;
                    align-items: center;
                    font-size: 28rpx;
                    color: #fff;
                    font-size: 600;
                    background-color: #678633;
                    border: 1rpx solid #fff;
                    border-radius: 20rpx;
                    height: 100rpx;
                    padding: 24rpx;
                    margin-top: 40rpx;

                    .channel {
                        margin-left: 40rpx;
                        font-weight: 600;
                        font-size: 32rpx;
                    }
                }

                .recharge-amount {

                    margin-top: 40rpx;

                    .recharge-amount-title {
                        font-size: 28rpx;
                        color: #678633;
                        line-height: 40rpx;
                        margin-bottom: 24rpx;
                    }

                    .recharge-amount-value {
                        display: flex;
                        align-items: center;
                        font-size: 28rpx;
                        color: #fff;
                        font-size: 600;
                        background-color: #678633;
                        border: 1rpx solid #fff;
                        border-radius: 20rpx;
                        height: 84rpx;
                        padding: 24rpx;
                    }
                }

                .recharge-submit {
                    margin-top: 80rpx;
                    padding: 0 10rpx;

                    .charge-btn {
                        width: 100%;
                        height: 96rpx;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 36rpx;
                        font-size: 600;
                        background-color: #fff3f1;
                        color: #516d21;
                        border: 1rpx solid #fff;
                        border-radius: 20rpx;
                    }
                }
            }

            .remove {
                .info-input {
                    display: flex;
                    align-items: center;
                    height: 182rpx;
                    font-size: 28rpx;
                    color: #fff;
                    font-size: 600;
                    background-color: #547320;
                    border: 1rpx solid #fff;
                    border-radius: 20rpx;
                    padding: 24rpx;
                    margin-top: 40rpx;

                    .label {
                        margin-right: 40rpx;
                    }
                }

                .btns {
                    margin-top: 40rpx;

                    .remove-btn {
                        height: 96rpx;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 36rpx;
                        font-size: 600;
                        background-color: #fff3f1;
                        color: #516d21;
                        border: 1rpx solid #fff;
                        border-radius: 20rpx;
                    }
                }
            }
        }
        }
       
    }
}
</style>