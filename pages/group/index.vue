<template>
    <view class="group">
        <navgation-bar @openDrawer="openDrawer" :isLogin="isLogin" :is-open="isOpen"
            :userInfo="userInfo" :channel="channelInfo"></navgation-bar>
        <left-menu ref="leftMenu"></left-menu>
        <scroll-view scroll-y class="group-content">
            <view class="content-box">
                <view class="group-info">
                    <view class="top">
                        <view class="group-info-item">
                            <view class="label">Link do convite</view>
                            <view class="invite-url">
                                <view class="url">{{ channelInfo.url }}?cid={{ cid }}&inv_code={{ userInfo.uid }}</view>
                                <view class="copy" @click="copy(copyUrl)">
                                    <image src="../../static/images/copy.png"></image>
                                </view>
                            </view>
                        </view>
                        <view class="group-info-item">
                            <view class="label">Convide amigos</view>
                            <view class="invite-url">
                                <view class="code">{{ userInfo.uid }}</view>
                                <view class="copy" @click="copy(userInfo.uid.toString())">
                                    <image src="../../static/images/copy.png"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="line"></view>
                    <view class="bottom">
                        <view class="social-label">
                            Partilha rápida
                        </view>
                        <view class="app-list">
                            <view class="app-item" v-for="(item, index) in appList" :key="index">
                                <view class="app-icon">
                                    <image :src='item.icon'></image>
                                </view>
                                <view class="app-name">{{ item.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="level-tab">
                    <view :class="currentIndex === item.value ? 'level-tab-item active' : 'level-tab-item'"
                        v-for="(item, index) in tabList" :key="index" @click="tabSwitch(item.value)">{{ item.label }}
                    </view>
                </view>
                <view class="level-info">
                    <view class="level-item" v-for="(item, index) in levelList" :key="index">
                        <view class="value">{{ item.value }}</view>
                        <view class="label">{{ item.name }}</view>
                    </view>
                </view>
                <view class="group-list">
                    <view class="group-list-header">
                        <view>Equipe</view>
                        <view @click="onChangeType">{{ currentLabel }}</view>
                    </view>
                    <view class="list-label">
                        <view class="list-label-item">Data</view>
                        <view class="list-label-item">ID</view>
                        <view class="list-label-item">Aposta</view>
                        <view class="list-label-item">Deposit</view>
                    </view>
                    <view class="lists" v-if="dataList.length > 0">
                        <view class="list-item" v-for="(item, index) in dataList" :key="index">
                            <view class="list-item-item">{{ extractDate(item.date) }}</view>
                            <view class="list-item-item">{{ item.uid }}</view>
                            <view class="list-item-item">{{ item.bet_money }}</view>
                            <view class="list-item-item">{{ item.cz_money }}</view>
                        </view>
                    </view>
                    <view class="no-data" v-else>
                        <view class="text">Sem dados</view>
                    </view>
                </view>
            </view>
        </scroll-view>
        <uv-picker ref="picker" keyName="label" :columns="columns" @confirm="confirm" @cancel="cancel"></uv-picker>
        <tab-bar :current-index="1" @needLogin='toLogin' :isLogin="isLogin"></tab-bar>
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
            currentIndex: 1,
            currentLabel: 'Todos',
            cid: uni.getStorageSync('cid'),
            chargeObj: {
                type: 1,
                date: 5
            },
            columns: [[
                {
                    label: 'Hoje', // 今天
                    id: 1
                },
                {
                    label: 'Esta semana', // 本周
                    id: 2
                },
                {
                    label: 'Este mês', // 本月
                    id: 3
                },
                {
                    label: 'Este ano', // 今年
                    id: 4
                },
                {
                    label: 'Todos', // 全部
                    id: 5
                }
            ]],
            tabList: [
                {
                    label: 'Nível 1',
                    value: 1
                },
                {
                    label: 'Nível 2',
                    value: 2
                },
                {
                    label: 'Nível 3',
                    value: 3
                }
            ],
            appList: [
                {
                    name: 'Tiktok',
                    icon: require('../../static/images/Tiktok.png')
                },
                {
                    name: 'Facebook',
                    icon: require('../../static/images/facebook.png')
                },
                {
                    name: 'Instagram',
                    icon: require('../../static/images/Instagram.png')
                },
                {
                    name: 'Whatsapp',
                    icon: require('../../static/images/Whatsapp.png')
                },
                {
                    name: 'YouTube',
                    icon: require('../../static/images/youtube.png')
                }
            ],
            levelList: [
                {
                    name: 'Número de pessoas convidadas',
                    field: 'invite',
                    value: 0
                },
                {
                    name: 'Número de pessoas recarregando',
                    field: 'box_num',
                    value: 0
                },
                {
                    name: 'Depositantes válidos',
                    field: 'recharge',
                    value: 0
                },
                {
                    name: 'Depósito total',
                    field: 'cz_money',
                    value: 0
                },
                {
                    name: 'Aposta total',
                    field: 'bet_money',
                    value: 0
                }
                // {
                //     name: 'Comissão total',
                //     field: '',
                //     value: 0
                // }
            ],
            dataList: [],
            userInfo: uni.getStorageSync('userInfo') || {},
            channelInfo: uni.getStorageSync('channelInfo') || {},
            copyUrl: "",
            isLogin: false
        }
    },
    computed: {},
    onLoad() {
        //console.log(window.location.href);
        this.loadGroupTotal()
        this.loadingChargeList()
        this.copyUrl = `${this.channelInfo.url}#/?cid=${this.cid}&inv_code=${this.userInfo.uid}`
    },
    onShow() {
        this.isLogin = uni.getStorageSync('isLogin')
        if (this.isLogin) {
            this.getUserInfo()
        }
    },
    methods: {
        confirm(e) {
            //console.log('confirm', e);
            this.chargeObj.date = e.value[0].id
            this.currentLabel = e.value[0].label
            this.$refs.picker.close();
            this.loadingChargeList()
        },
        getUserInfo() {
            this.$api.user.getUserInfo().then(res => {
                this.userInfo = res
            })
        },
        cancel() {
            this.$refs.picker.close();
        },
        onChangeType() {
            this.$refs.picker.open();
        },
        loadGroupTotal() {
            this.$api.user.getTeamData({ type: this.currentIndex }).then(res => {
                this.levelList.forEach(element => {
                    for (let i in res) {
                        if (element.field === i) {
                            element.value = res[i]
                        }
                    }
                });
                //console.log(this.levelList)
            })
        },
        loadingChargeList() {
            this.$api.user.getChargeList(this.chargeObj).then(res => {
                //console.log(res)
                this.dataList = res
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
        tabSwitch(index) {
            this.chargeObj.type = index
            this.currentIndex = index
            this.loadGroupTotal()
            this.loadingChargeList()
        },
        copy(text) {
            this.$copyToClipboard(text);
        },
        extractDate(str) {
            if (str) {
                // 假设str是一个格式化的日期字符串，如"2023-08-09"
                var parts = str.split('-'); // 以'-'分割字符串
                return parts[1] + '-' + parts[2]; // 返回月份和日期部分
            }
            return ''; // 如果输入字符串无效，返回空字符串或其他默认值
        }
    }
}
</script>
<style lang="scss" scoped>
.group {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(247, 201, 111, 1);
    height: 100vh;

    .group-content {
        height: 0;
        flex: 1;

        .content-box {
            padding: 20rpx 24rpx;

            .group-info {
                background-color: #678633;
                border-radius: 18rpx;

                .top {
                    width: 100%;
                    padding: 28rpx 24rpx 0 24rpx;

                    .group-info-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 24rpx;

                        .label {
                            font-size: 24rpx;
                            color: #fff;
                            width: 209rpx;
                        }

                        .invite-url {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color: #fff;
                            border: 1rpx solid #fff;
                            border-radius: 14rpx;
                            padding: 16rpx 24rpx;
                            width: 420rpx;

                            .url {
                                font-size: 20rpx;
                                width: 280rpx;
                                word-break: break-all;
                            }

                            .code {
                                font-size: 32rpx;
                            }

                            .copy {
                                width: 46rpx;
                                height: 46rpx;

                                image {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                    }
                }

                .line {
                    width: 100%;
                    height: 1rpx;
                    background-color: #fff;
                }

                .bottom {
                    padding: 28rpx 24rpx 0 24rpx;

                    .social-label {
                        font-size: 28rpx;
                        color: #fff;
                    }

                    .app-list {
                        margin-top: 24rpx;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .app-item {
                            width: 120rpx;
                            height: 120rpx;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;

                            .app-icon {
                                width: 70rpx;
                                height: 70rpx;

                                image {
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            .app-name {
                                font-size: 20rpx;
                                color: #fff;
                                text-align: center
                            }

                        }
                    }
                }
            }

            .level-tab {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20rpx;

                .level-tab-item {
                    width: 30%;
                    font-size: 28rpx;
                    color: #fff;
                    text-align: center;
                    background-color: #678633;
                    border-radius: 18rpx;
                    padding: 16rpx 0;
                }

                .level-tab-item.active {
                    background-color: #fcea7f;
                    color: #064a25;
                    font-weight: 600;
                }
            }

            .level-info {
                margin-top: 20rpx;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-around;
                align-items: center;
                background-color: #678633;
                border-radius: 20rpx;
                padding: 48rpx 24rpx;
                gap: 28rpx;

                .level-item {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40rpx;
                    width: 30%;

                    .label {
                        font-size: 20rpx;
                        color: #fff;
                        text-align: center;
                    }

                    .value {
                        font-size: 28rpx;
                        color: #fff;
                    }
                }
            }

            .group-list {
                margin-top: 20rpx;

                .group-list-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 32rpx;
                    color: #678633;
                    padding: 24rpx;
                }

                .list-label {
                    font-size: 32rpx;
                    color: #678633;
                    padding: 24rpx;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .list-label-item {
                        width: 25%;
                    }

                    .list-label-item:nth-child(2) {
                        text-align: center;
                    }

                    .list-label-item:nth-child(3) {
                        text-align: center;
                    }

                    .list-label-item:nth-child(4) {
                        text-align: right;
                    }
                }

                .lists {
                    .list-item {
                        font-size: 32rpx;
                        color: #678633;
                        padding: 24rpx;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .list-item-item {
                            width: 25%;

                        }

                        .list-item-item:nth-child(2) {
                            text-align: center;
                        }

                        .list-item-item:nth-child(3) {
                            text-align: center;
                        }

                        .list-item-item:nth-child(4) {
                            text-align: right;
                        }
                    }
                }

                .no-data {
                    font-size: 48rpx;
                    color: #678633;
                    padding: 24rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 400rpx;
                }
            }
        }
    }
}
</style>