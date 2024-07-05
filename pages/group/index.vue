<template>
    <view class="group" :class="[currentTheme + '-theme']">
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
                                <view class="url">{{ channelInfo.url }}?cid={{ cid }}&inv_code={{ userInfo.inv_code }}</view>
                                <view class="copy" @click="copy(copyUrl)">
                                    <image mode="widthFix" src="../../static/images/copy.png"></image>
                                </view>
                            </view>
                        </view>
                        <view class="group-info-item">
                            <view class="label">Convide amigos</view>
                            <view class="invite-url">
                                <view class="code">{{ userInfo.inv_code }}</view>
                                <view class="copy" @click="copy(userInfo.inv_code.toString())">
                                    <image mode="widthFix" src="../../static/images/copy.png"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="line"></view>
                    <!-- <view class="bottom">
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
                    </view> -->
                </view>
                <view class="box-content" @click="toBox">
                    <view class="box-info">
                        <view class="box-title">Número efetivo de convidados: {{ invite }}</view>
                        <view class="box-title">Recarga de subordinados: R${{ channelInfo.cz_money }}</view>
                        <view class="box-title">Aposta subordinada: R${{ channelInfo.bet_money }}</view>
                    </view>
                    <view class="box-icon">
                        <image mode="widthFix" src="../../static/images/reward-box.png"></image>
                    </view>
                </view>
                <view class="get-content">
                    <view class="box-info">
                        <view class="box-title">Salário recebido：<text>R${{ wagesObj.money }}</text></view>
                        <view class="box-title">Pode receber salário：<text>R${{ wagesObj.un_money }}</text></view>
                    </view>
                    <view class="get">
                        <view class="get-btn" @click="receive">receber</view>
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
                        <view class="showSelectBtn" @click="onChangeType">
                            {{ currentLabel }}
                            <uv-icon name="arrow-down-fill" color="var(--primary-text-color)"></uv-icon>
                        </view>
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
                            <view class="list-item-item">{{ item.inv_code }}</view>
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
            invite: 0,
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
                    field: 'recharge',
                    value: 0
                },
                {
                    name: 'Depositantes válidos',
                    field: 'box_num',
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
            // channelInfo: uni.getStorageSync('channelInfo') || {},
            copyUrl: "",
            wagesObj: {
                money: 0,
                un_money: 0
            }
        }
    },
    computed: {
        ...mapGetters(['isLogin', 'userInfo', 'channelInfo', 'currentTheme'])
    },
    onLoad() {
        this.loadGroupTotal()
        this.loadingChargeList()
        this.getWages()
        this.copyUrl = `${this.channelInfo.url}#/?cid=${this.cid}&inv_code=${this.userInfo.inv_code}`
    },
    onShow() {
        console.log('团队onshow', this.$store.state.SystemStore.isLogin, this.isLogin, this.userInfo)
        if (this.isLogin) {
            this.getUserInfo()
        }
    },
    methods: {
        getWages() {
            this.$api.home.getWages().then(res => {
                console.log(res)
                this.wagesObj = res
            }) 
        },
        receive(){
            if(this.wagesObj.un_money <= 0){
                uni.showToast({
                    title: "Sem dinheiro disponível",
                    icon: 'none'
                })
                return
            }
            this.$api.home.getWagesApi().then(res => {
                this.getUserInfo()
                this.getWages()
                uni.showToast({
                    title: "obter sucesso",
                });
            })
        },
        toBox() {
          uni.navigateTo({ url: '/pages/rewards/index' })  
        },
        confirm(e) {
            //console.log('confirm', e);
            this.chargeObj.date = e.value[0].id
            this.currentLabel = e.value[0].label
            this.$refs.picker.close();
            this.loadingChargeList()
        },
        getUserInfo() {
            this.$api.user.getUserInfo().then(res => {
                this.$store.dispatch('setUserinfo', res)
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
                    if(this.currentIndex === 1){
                        this.invite = res.box_num
                    }
                    for (let i in res) {
                        if (element.field === i) {
                            element.value = res[i]
                        }
                    }
                });
                console.log(this.levelList)
            })
        },
        async loadingChargeList() {
            const res = await this.$api.user.getChargeList(this.chargeObj);
            this.dataList = res;
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
scroll-view ::v-deep ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
}
.group {
    display: flex;
    flex-direction: column;
    background-color: var(--primary-color);
    position: absolute;
    width: 100%;
	height: 100%;
	// aspect-ratio: 3 / 4;
    .group-content {
        height: 0;
        flex: 1;

        .content-box {
            padding: .5rem .75rem;

            .group-info {
                background-color: var(--primary-text-color);
                border-radius: .5rem;

                .top {
                    width: 100%;
                    padding: .75rem .75rem 0 .75rem;

                    .group-info-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: .75rem;

                        .label {
                            font-size: .75rem;
                            color: var(--text-color);
                            width: 40%;
                        }

                        .invite-url {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color: var(--text-color);
                            border: .1rem solid var(--text-color);
                            border-radius: .5rem;
                            padding: .25rem .75rem;
                            width: 60%;

                            .url {
                                font-size: .75rem;
                                width: 80%;
                                word-break: break-all;
                            }

                            .code {
                                font-size: 1rem;
                            }

                            .copy {
                                width: 20%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                uni-image {
                                    width: 1.5rem;
                                }
                            }
                        }
                    }
                }

                .line {
                    width: 100%;
                    height: .1rem;
                    background-color: var(--text-color);
                }

                .bottom {
                    padding: .75rem .75rem 0 .75rem;

                    .social-label {
                        font-size: .75rem;
                        color: var(--text-color);
                    }

                    .app-list {
                        margin-top: .75rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .app-item {
                            width: 1.5rem;
                            height: 1.5rem;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;

                            .app-icon {
                                width: 1.5rem;
                                height: 1.5rem;

                                uni-image {
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            .app-name {
                                font-size: .75rem;
                                color: var(--text-color);
                                text-align: center
                            }

                        }
                    }
                }
            }
            .get-content {
                background-color: var(--primary-text-color);
                border-radius: .75rem;
                margin-top: .5rem;
                padding: .5rem .75rem;
                .box-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 80%;
                    .box-title {
                        font-size: .75rem;
                        color: var(--text-color);
                        margin-bottom: .5rem;
                        font-weight: 600;
                    }
                }
                .get {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    width: 100%;
                    .get-btn {
                        font-size: 1rem;
                        padding: .25rem;
                        border: .1rem solid var(--text-color);
                        border-radius: .5rem;
                        background-color: var(--text-color);
                        color: var(--primary-text-color);
                    }
                }
            }
            .box-content {
                background-color: var(--primary-text-color);
                border-radius: .5rem;
                margin-top: .5rem;
                padding: .5rem .75rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .box-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 80%;
                    .box-title {
                        font-size: .75rem;
                        color: var(--text-color);
                        margin-bottom: .5rem;
                    }
                }
                .box-icon {
                    width: 20%;
                    uni-image {
                        width: 100%;
                    }
                }
            }
            .level-tab {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: .5rem;

                .level-tab-item {
                    width: 30%;
                    font-size: 1rem;
                    color: var(--text-color);
                    text-align: center;
                    background-color: var(--primary-text-color);
                    border-radius: .5rem;
                    padding: 0.25rem 0;
                }

                .level-tab-item.active {
                    background-color: var(--active-btn-color);
                    color: var(--active-btn-text-color);
                    font-weight: 600;
                }
            }

            .level-info {
                margin-top: .5rem;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-around;
                align-items: center;
                background-color: var(--primary-text-color);
                border-radius: .5rem;
                padding: 1rem .75rem;
                gap: 0.75rem;

                .level-item {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                    width: 30%;

                    .label {
                        font-size: .75rem;
                        color: var(--text-color);
                        text-align: center;
                    }

                    .value {
                        font-size: .75rem;
                        color: var(--text-color);
                    }
                }
            }

            .group-list {
                margin-top: .5rem;

                .group-list-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 1rem;
                    color: var(--primary-text-color);
                    padding: .75rem;
                    .showSelectBtn {
                        display: flex;
                        align-items: center;
                    }
                }

                .list-label {
                    font-size: 1rem;
                    color: var(--primary-text-color);
                    padding: .75rem;
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
                        font-size: 1rem;
                        color: var(--primary-text-color);
                        padding: .75rem;
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
                    font-size: 1.25rem;
                    color: var(--primary-text-color);
                    padding: .75rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 20rem;
                }
            }
        }
    }
}
</style>