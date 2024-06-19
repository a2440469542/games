<template>
    <view class="profile">
        <navgation-bar @openDrawer="openDrawer" :isLogin="isLogin" :is-open="isOpen"
            :userInfo="userInfo"></navgation-bar>
        <left-menu ref="leftMenu"></left-menu>
        <scroll-view scroll-y class="profile-content">
            <view class="content">
                <view class="profile-item">
                    <view class="profile-item-top">
                        <view class="avatar">
                            <uv-avatar size="140rpx" shape="square"
                                src="https://via.placeholder.com/200x200.png/2878ff"></uv-avatar>
                        </view>
                        <view class="user-info">
                            <view class="invite-code">
                                {{ userInfo.uid }}
                                <image @click="$copyToClipboard(userInfo.uid)" src="../../static/images/copy.png">
                                </image>
                            </view>
                            <view class="user-id">{{ userInfo.user }}</view>
                            <view class="user-money">
                                <image src="../../static/images/country.png"></image>
                                <view>{{ userInfo.money }}R$</view>
                            </view>
                        </view>
                    </view>
                    <view class="profile-item-bottom">
                        <view class="profile-item-bottom-item" @click="toRecharge(0)">
                            <view class="icon">
                                <image src="../../static/images/charge.png"></image>
                            </view>
                            <view class="text">
                                Recarregar
                            </view>
                        </view>
                        <view class="profile-item-bottom-item" @click="toRecharge(1)">
                            <view class="icon">
                                <image src="../../static/images/withdrawal.png"></image>
                            </view>
                            <view class="text">
                                Retirar
                            </view>
                        </view>
                        <view class="profile-item-bottom-item" @click="onBindBank">
                            <view class="icon">
                                <image src="../../static/images/gift.png"></image>
                            </view>
                            <view class="text">
                                Conta PIX
                            </view>
                        </view>
                    </view>
                </view>
                <view class="profile-item">
                    <view class="profile-item-menu" @click="toPage(item)" v-for="(item, index) in list" :key="index">
                        <view class="left-part">
                            <view class="icon">
                                <image :src="item.src"></image>
                            </view>
                            <view class="text">{{ item.name }}</view>
                        </view>
                        <view class="arrow" v-if="item.isRight">
                            <uv-icon color="#ffffff" name="arrow-right"></uv-icon>
                        </view>
                    </view>
                </view>
            </view>

        </scroll-view>
        <uv-popup ref="popup" round="20" mode="center">
            <view style="width: 600rpx;" class="logout-confirm">
                <view class="content-text">Tem certeza que deseja sair?</view>
                <view class="bottom-btn">
                    <view class="btn cancel">Cancelar</view>
                    <view class="btn confirm" @click="logout">Confirmar</view>
                </view>
            </view>
        </uv-popup>
		<tab-bar :current-index="3" @needLogin='toLogin' :isLogin="isLogin"></tab-bar>
    </view>
</template>
<script>
import leftMenu from '../../components/common/leftMenu.vue'
import { mapGetters } from "vuex";
export default {
    components: {
        leftMenu
    },
    data() {
        return {
            isOpen: false,
            list: [
                {
                    id: 1,
                    name: 'Registro de Recarga',
                    path: '/pages/record/index?index=1',
                    src: require('../../static/images/recharge_record.png'),
                    isRight: true
                },
                {
                    id: 2,
                    name: 'Registro de Retirada',
                    path: '/pages/record/index?index=2',
                    src: require('../../static/images/withdrawal_record.png'),
                    isRight: true
                },
                // {
                //     id: 3,
                //     name: 'Registro de Comissão',
                //     src: require('../../static/images/commission.png'),
                //     isRight: true
                // },
                {
                    id: 4,
                    name: 'Notícias',
                    src: require('../../static/images/notice.png'),
                    isRight: true
                },
                {
                    id: 6,
                    name: 'Servir',
                    src: require('../../static/images/service.png'),
                    isRight: true
                },
                // {
                //     id: 7,
                //     name: 'Regras da plataforma',
                //     src: require('../../static/images/rules.png'),
                //     isRight: true
                // },
                // {
                //     id: 8,
                //     name: 'Centro de Segurança',
                //     src: require('../../static/images/setting.png'),
                //     isRight: true
                // },
                {
                    id: 9,
                    name: 'Sair',
                    src: require('../../static/images/logout.png'),
                    isRight: false
                },
            ],
            userInfo: uni.getStorageSync('userInfo')
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    onLoad() {
        this.getUserInfo()
    },
    methods: {
        logout() {
            this.$api.user.logout().then(res => {
                this.$store.dispatch('setIsLogin', false)
                this.$store.dispatch('setUserinfo', {})
                uni.removeStorageSync('user')
                uni.removeStorageSync('token')
                uni.removeStorageSync('cid')
                this.$refs.popup.close()
                uni.reLaunch({
                    url: '/pages/index/index'
                });
            })
        },
        toPage(item) {
            if (!item.isRight) {
                console.log('退出')
                this.$refs.popup.open();
                return
            }
            uni.navigateTo({
                url: item.path
            })
        },
        toRecharge(type) {
            uni.setStorageSync('rechargeFlag', type)
            uni.switchTab({
                url: '/pages/recharge/index'
            });
        },
        getUserInfo() {
            this.$api.user.getUserInfo().then(res => {
                this.userInfo = res
            })
        },
        openDrawer() {
            this.isOpen = !this.isOpen
            if (this.isOpen) {
                this.$refs.leftMenu.showDrawer()
            } else {
                this.$refs.leftMenu.closeDrawer()
            }
        },
        onBindBank() {
            uni.navigateTo({
                url: '/pages/bind/index'
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.profile {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(247, 201, 111, 1);
    height: 100vh;

    .logout-confirm {
        background-color: #678633;

        .content-text {
            font-size: 36rpx;
            color: #fff;
            line-height: 196rpx;
            text-align: center;
            margin-bottom: 24rpx;
            padding: 24rpx;
        }

        .bottom-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 92rpx;

            .btn {
                width: 50%;
                height: 100%;
                font-size: 36rpx;
                color: #023217;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .btn.cancel {
                background-color: #fcc660;
            }

            .btn.confirm {
                background-color: #29965a;
            }
        }
    }

    .profile-content {
        height: 0;
        flex: 1;

        .content {
            padding: 40rpx 24rpx 90rpx 24rpx;

            .profile-item {
                width: 100%;
                background-color: #678633;
                border-radius: 24rpx;
                padding: 24rpx;
                margin-bottom: 24rpx;

                .profile-item-menu {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 32rpx;
                    color: #fff;
                    padding: 20rpx 28rpx;
                    border-bottom: 1rpx solid #126939;
                    width: 100%;

                    .left-part {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        flex: 1;

                        .icon {
                            width: 69rpx;
                            height: 69rpx;

                            image {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .text {
                            width: 70%;
                            text-align: left;
                            margin-left: 20rpx;
                        }
                    }
                }

                .profile-item-top {
                    display: flex;
                    justify-content: flex-start;

                    .avatar {
                        width: 140rpx;
                        display: flex;
                        align-items: center;
                        overflow: hidden;
                    }

                    .user-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-left: 30rpx;

                        .invite-code {
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            font-size: 37rpx;
                            color: #fff;

                            image {
                                width: 32rpx;
                                height: 32rpx;
                                margin-left: 24rpx;
                            }
                        }

                        .user-id {
                            font-size: 37rpx;
                            color: #fff;
                            margin-top: 10rpx;
                        }

                        .user-money {
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            font-size: 37rpx;
                            color: #fff;
                            padding-left: 8rpx;
                            margin-top: 10rpx;

                            image {
                                width: 44rpx;
                                height: 44rpx;
                                margin-right: 24rpx;
                            }
                        }
                    }
                }

                .profile-item-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 20rpx;

                    .profile-item-bottom-item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;

                        .icon {
                            width: 65rpx;
                            height: 65rpx;

                            image {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .text {
                            font-size: 24rpx;
                            color: #fff;
                            margin-top: 20rpx;
                        }
                    }
                }
            }
        }

    }
}
</style>
