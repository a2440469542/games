<template>
    <view class="recharge" :class="[currentTheme + '-theme']">
        <navgation-bar @openDrawer="openDrawer" :channel="channelInfo" :isLogin="isLogin" :is-open="isOpen"
            :userInfo="userInfo"></navgation-bar>
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
                                <input v-model="chargeValue" placeholder-style="color: #ffd8ad" class="uni-input"
                                    placeholder="(Mínimo 10)" />
                            </view>
                        </view>
                        <view class="recharge-submit">
                            <view class="charge-btn" @click="submit">Recarregar</view>
                        </view>
                    </view>
                    <view v-if="typeIndex === 1" class="remove">
                        <view class="info-input">
                            <view class="label">Valor</view>
                            <view class="withdraw-amount-value">
                                <input v-model="withdrawValue" class="uni-input withdraw-text"
                                    placeholder-style="color: var(--text-color)" focus placeholder="Insira o valor" />
                            </view>
                        </view>
                        <view class="tips">
                            Requisitos de apostas restantes <text>R${{ userInfo.water }}</text>
                        </view>
                        <view class="btns">
                            <view class="remove-btn" @click="withdraw">Retirar Agora</view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
        <tab-bar :current-index="2" :isLogin="isLogin"></tab-bar>
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
            withdrawFlag: false
        }
    },
    computed: {
        ...mapGetters(['isLogin', 'userInfo', 'channelInfo', 'currentTheme'])
    },
    onShow() {
        this.isOpen = false //从领取页面跳转后关闭侧边栏
        console.log('充值页面onshow', this.$store.state.SystemStore.isLogin, this.isLogin, this.userInfo)
        this.loadRechargeList()
        if (this.isLogin) {
            this.getUserInfo()
        }
    },
    onLoad(options) {
        // this.loadRechargeList()
    },
    onTabItemTap(e) {
        //console.log('tabbar', e)
        //console.log(this.rechargeFlag)
    },
    methods: {
        getUserInfo() {
            this.$api.user.getUserInfo().then(res => {
                this.$store.dispatch('setUserinfo', res)
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
            this.$store.dispatch('setPayPath', res.url)
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
            if (this.chargeValue < 10) {
                uni.showToast({
                    title: 'Mínimo de R$10',
                    icon: 'none'
                })
                return
            }
            this.setRecharge()
        },
        async withdraw() {
            if (this.withdrawValue === '') {
                uni.showToast({
                    title: 'Mínimo de R$10',
                    icon: 'none'
                })
                return
            }
            this.withdrawFlag = true
            try {
                await this.$api.user.cash({ money: this.withdrawValue })
                this.getUserInfo()
                this.withdrawValue = ''
                uni.showToast({
                    title: 'Retirada com sucesso'
                })
            } catch (error) {
                if (error.code === 102) {
                    uni.navigateTo({
                        url: '/pages/bind/index'
                    })
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.recharge {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--primary-color);
    position: absolute;
	height: 100%;
    .content {
        height: 0;
        flex: 1;

        .box {
            padding: .75rem 1rem;

            .switch-tab {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 2.8125rem;
                background-color: transparent;
                border: .1rem solid var(--primary-text-color);
                border-radius: .5rem;
                padding: 0.05rem;
                box-sizing: border-box;

                .tab-item {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1rem;
                    color: var(--primary-text-color);
                    font-size: 600;
                    transition: .3s;
                }

                .tab-item.active {
                    background-color: var(--primary-text-color);
                    color: var(--active-btn-color);
                    border-radius: .5rem;
                    transition: .3s;
                }
            }

            .tab-content {
                margin-top: 0.625rem;

                .withdraw-amount-value {
                    display: flex;
                    align-items: center;
                    color: var(--text-color);
                    font-size: 600;
                    height: 6rem;
                    padding: .5rem .75rem;

                    .withdraw-text {
                        font-size: 1.125rem;
                    }
                }

                .charge {
                    .amount-list {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        align-items: center;
                        box-sizing: border-box;
                        gap: 0.3125rem;

                        .amount-item {
                            box-sizing: border-box;
                            width: 32%;
                            height: 3.815rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 1.125rem;
                            color: var(--text-color);
                            font-size: 600;
                            transition: .3s;
                            background-color: var(--primary-text-color);
                            border: .1rem solid var(--text-color);
                            border-radius: 0.625rem;
                        }

                        .amount-item.active {
                            color: #4a661a;
                            transition: .3s;
                            background-color: var(--active-btn-color);
                            border: 0.0625rem solid #4A661A;
                        }
                    }

                    .recharge-channels {
                        display: flex;
                        align-items: center;
                        font-size: 0.875rem;
                        color: var(--text-color);
                        font-size: 600;
                        background-color: var(--primary-text-color);
                        border: .1rem solid var(--text-color);
                        border-radius: 0.625rem;
                        height: 3.125rem;
                        padding: .75rem;
                        margin-top: 1.25rem;

                        .channel {
                            margin-left: 1.25rem;
                            font-weight: 600;
                            font-size: 1rem;
                        }
                    }

                    .recharge-amount {

                        margin-top: 1.25rem;

                        .recharge-amount-title {
                            font-size: 0.875rem;
                            color: var(--primary-text-color);
                            line-height: 1.25rem;
                            margin-bottom: .75rem;
                        }

                        .recharge-amount-value {
                            display: flex;
                            align-items: center;
                            font-size: 1rem;
                            color: var(--text-color);
                            font-size: 600;
                            background-color: var(--primary-text-color);
                            border: .1rem solid var(--text-color);
                            border-radius: 0.625rem;
                            height: 3.375rem;
                            padding: 0.3125rem .75rem;
                        }
                    }

                    .recharge-submit {
                        margin-top: 2.5rem;
                        padding: 0 0.3125rem;

                        .charge-btn {
                            width: 100%;
                            height: 3rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 1.125rem;
                            font-weight: 600;
                            background-color: var(--text-color)3f1;
                            color: #516d21;
                            border: .1rem solid var(--text-color);
                            border-radius: 0.625rem;
                        }
                    }
                }

                .remove {
                    .info-input {
                        display: flex;
                        align-items: center;
                        height: 5.69rem;
                        font-size: 0.875rem;
                        color: var(--text-color);
                        font-size: 600;
                        background-color: #547320;
                        border: .1rem solid var(--text-color);
                        border-radius: 0.625rem;
                        padding: .75rem;
                        margin-top: 1.25rem;

                        .label {
                            margin-right: 1.25rem;
                        }
                    }

                    .tips {
                        font-size: .75rem;
                        color: #516d21;
                        margin-top: 0.625rem;
                        margin-left: 0.625rem;

                        text {
                            font-weight: 600;
                            margin-left: 0.3125rem;
                        }
                    }

                    .btns {
                        margin-top: 1.25rem;

                        .remove-btn {
                            height: 3rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 1.125rem;
                            font-size: 600;
                            background-color: var(--text-color)3f1;
                            color: #516d21;
                            border: .1rem solid var(--text-color);
                            border-radius: 0.625rem;
                        }
                    }
                }
            }
        }

    }
}
</style>