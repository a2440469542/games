<template>
    <view class="profile" :class="[currentTheme + '-theme']">
        <navgation-bar @openDrawer="openDrawer" :isLogin="isLogin" :is-open="isOpen"
            :userInfo="userInfo" :channel="channelInfo"></navgation-bar>
        <left-menu ref="leftMenu"></left-menu>
        <scroll-view scroll-y class="profile-content">
            <view class="content">
                <view class="profile-item">
                    <view class="profile-item-top">
                        <view class="avatar">
                            <uv-avatar size="5rem" shape="square"
                                :src="channelInfo.logo"></uv-avatar>
                        </view>
                        <view class="user-info">
                            <view class="invite-code">
                                {{ userInfo.inv_code }}
                                <image @click="$copyToClipboard(userInfo.inv_code.toString())" src="../../static/images/copy.png">
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
                            <uv-icon color="var(--text-color)" name="arrow-right"></uv-icon>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
        <uv-popup ref="popup" round="20" mode="center">
            <view style="width: 18.75rem;" class="logout-confirm">
                <view class="content-text">Tem certeza que deseja sair?</view>
                <view class="bottom-btn">
                    <view class="btn cancel" @click="$refs.popup.close()">Cancelar</view>
                    <view class="btn confirm" @click="logout">Confirmar</view>
                </view>
            </view>
        </uv-popup>
		<tab-bar :current-index="3" :isLogin="isLogin"></tab-bar>
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
                // {
                //     id: 4,
                //     name: 'Notícias',
                //     src: require('../../static/images/notice.png'),
                //     isRight: true
                // },
                {
                    id: 6,
                    name: 'Suporte',
                    path: '',
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
            ]
        }
    },
    computed: {
        ...mapGetters(['config', "isLogin", "userInfo", "channelInfo", "currentTheme"]),
    },
    onLoad() {
        const list = this.list.map(element => {
            if (element.name === 'Servir') {
                element.path = this.config.service_path
            }
        })
    },
    onShow() {
        console.log('个人页面onshow', this.$store.state.SystemStore.isLogin, this.isLogin, this.userInfo)
        if (this.isLogin) {
            this.getUserInfo()
        }
    },
    onTabItemTap(e) {
		//console.log('tabbar', e)
	},
    methods: {
        logout() {
            this.$api.user.logout().then(res => {
                this.$store.dispatch('setIsLogin', false)
                this.$store.dispatch('setUserinfo', {})
                uni.removeStorageSync('token')
                this.$refs.popup.close()
                uni.reLaunch({
                    url: '/pages/index/index'
                });
            })
        },
        toPage(item) {
            if (!item.isRight) {
                //console.log('退出')
                this.$refs.popup.open();
                return
            }
            if (item.name === 'Servir') {
                window.open('https://'+ item.path, '_blank');
                return
            }
            uni.navigateTo({
                url: item.path
            })
        },
        toRecharge(type) {
            uni.$emit('rechargeFlag', type)
            uni.switchTab({
                url: '/pages/recharge/index'
            });
        },
        getUserInfo() {
            this.$api.user.getUserInfo().then(res => {
                this.$store.dispatch('setUserinfo', res)
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
scroll-view ::v-deep ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
}
.profile {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--primary-color);
    position: absolute;
	height: 100%;
    .logout-confirm {
        background-color: var(--primary-text-color);

        .content-text {
            font-size: 1.125rem;
            color: var(--text-color);
            line-height: 6.125rem;
            text-align: center;
            margin-bottom: 0.75rem;
            padding: 0.75rem;
        }

        .bottom-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 2.875rem;

            .btn {
                width: 50%;
                height: 100%;
                font-size: 1.125rem;
                color: var(--text-color);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .btn.cancel {
                background-color: var(--cancel-bg-color);
            }

            .btn.confirm {
                background-color: var(--confirm-bg-color);
            }
        }
    }

    .profile-content {
        height: 0;
        flex: 1;

        .content {
            padding: 1.25rem 0.75rem 2.8125rem 0.75rem;

            .profile-item {
                width: 100%;
                background-color: var(--primary-text-color);
                border-radius: 0.75rem;
                padding: 0.75rem;
                margin-bottom: 0.75rem;

                .profile-item-menu {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 1rem;
                    color: var(--text-color);
                    padding: 0.625rem 0.875rem;
                    border-bottom: 0.0625rem solid #126939;
                    width: 100%;

                    .left-part {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        flex: 1;

                        .icon {
                            width: 2.16rem;
                            height: 2.16rem;

                            uni-image {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .text {
                            width: 70%;
                            text-align: left;
                            margin-left: 0.625rem;
                        }
                    }
                }

                .profile-item-top {
                    display: flex;
                    justify-content: flex-start;

                    .avatar {
                        width: 5rem;
                        display: flex;
                        align-items: center;
                        overflow: hidden;
                    }

                    .user-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-left: 0.94rem;

                        .invite-code {
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            font-size: 1.16rem;
                            color: var(--text-color);

                            uni-image {
                                width: 1rem;
                                height: 1rem;
                                margin-left: 0.75rem;
                            }
                        }

                        .user-id {
                            font-size: 1.16rem;
                            color: var(--text-color);
                            margin-top: 0.3125rem;
                        }

                        .user-money {
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            font-size: 1.16rem;
                            color: var(--text-color);
                            padding-left: 0.25rem;
                            margin-top: 0.3125rem;

                            uni-image {
                                width: 1.375rem;
                                height: 1.375rem;
                                margin-right: 0.75rem;
                            }
                        }
                    }
                }

                .profile-item-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 0.625rem;

                    .profile-item-bottom-item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;

                        .icon {
                            width: 2rem;
                            height: 2rem;

                            uni-image {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .text {
                            font-size: 0.75rem;
                            color: var(--text-color);
                            margin-top: 0.625rem;
                        }
                    }
                }
            }
        }

    }
}
</style>
