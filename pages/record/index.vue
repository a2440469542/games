<template>
    <view class="record">
        <sub-nav :title="title"></sub-nav>
        <view class="tabs">
            <scroll-view scroll-x>
                <view class="tab-list" v-if="pageIndex == 1">
                    <view scroll-with-animation="true" :class="typeIndex == item.value ? 'tab-item active' : 'tab-item'"
                        v-for="(item, index) in list" :key="index" @click="click(index, item)">{{ item.name }}</view>
                </view>
                <view class="tab-list" v-if="pageIndex == 2">
                    <view scroll-with-animation="true"
                        :class="cashTypeIndex == item.value ? 'tab-item active' : 'tab-item'"
                        v-for="(item, index) in withdrawalTabList" :key="index" @click="click(index, item)">{{ item.name
                        }}</view>
                </view>
            </scroll-view>
        </view>
        <scroll-view scroll-y class="record-content" scroll-with-animation="true">
            <view class="box" v-if="records.length > 0">
                <view class="record-item" v-for="(item, index) in records" :key="index">
                    <view class="date">{{ item.add_time }}0</view>
                    <view class="amount">{{ item.money }}</view>
                </view>
            </view>
            <view v-else>
                <empty></empty>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import subNav from '../../components/navbar/subNav.vue'

const rechargeTab = [
    {
        name: 'Hoje', // 今天
        value: 1
    },
    {
        name: 'Esta semana', // 本周
        value: 2
    },
    {
        name: 'Este mês', // 本月
        value: 3
    },
    {
        name: 'Este ano', // 今年
        value: 4
    },
    {
        name: 'Todos', // 全部
        value: 5
    }
]

export default {
    components: {
        subNav
    },
    data() {
        return {
            title: 'Registro de Recarga',
            pageIndex: 0,
            typeIndex: 0,
            cashTypeIndex: '',
            chargeRecordParam: {
                page: 1,
                limit: 20,
                orderBy: '',
                date: 5
            },
            withdrawalRecordParam: {
                page: 1,
                limit: 20,
                orderBy: '',
                status: ''
            },
            list: [],
            records: [],
            withdrawalTabList: [{
                name: 'Todos', // 全部
                value: ''
            }, {
                name: 'Revisão pendente', //待审核
                value: '0'
            }, {
                name: 'Auditoria Aprovada', //审核通过
                value: '1'
            },{
                name: 'Retirada recusada', //拒绝提现
                value: '-1'
            },{
                name: 'Retiradas Concluídas', // 提现成功
                value: '2'
            }, {
                name: 'Auditoria Recusada', // 审核未通过
                value: '-2'
            }]
        }
    },
    onLoad(options) {
        this.loadApiByIndex(options.index)
    },
    methods: {
        loadApiByIndex(index) {
            if (index === '1') {
                this.title = 'Registro de Recarga'
                this.pageIndex = 1
                this.typeIndex = 1
                this.list = rechargeTab
                this.chargeRecord()
            } else if (index === '2') {
                this.title = 'Registro de Retirada'
                this.pageIndex = 2
                this.cashTypeIndex = ""
                this.getWithdrawalRecord()
            }
        },
        chargeRecord() {
            this.$api.user.chargeRecord(this.chargeRecordParam).then(res => {
                console.log(res)
                this.records = [...this.records, ...res.data]
            })
        },
        getWithdrawalRecord() {
            this.$api.user.cashRecord(this.withdrawalRecordParam).then(res => {
                console.log(res)
                this.records = [...this.records, ...res.data]
            })
        },

        click(index, item) {
            this.records = []
            if (this.pageIndex === 1) {
                this.typeIndex = item.value
                this.chargeRecordParam.date = item.value
                this.chargeRecord()
            } else if (this.pageIndex === 2) {
                this.cashTypeIndex = item.value
                this.withdrawalRecordParam.status = item.value
                this.getWithdrawalRecord()
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
.record {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: rgba(247, 201, 111, 1);

    .tabs {
        width: 100%;
        margin-top: 20rpx;

        .tab-list {
            width: 100%;
            line-height: 60rpx;
            padding: 10rpx 24rpx;
            box-sizing: border-box;
            white-space: nowrap;

            /* 保持文本不换行 */
            .tab-item {
                display: inline-block;
                font-size: 28rpx;
                font-weight: 400;
                color: #678633;
                padding: 0 20rpx;
                text-align: center;
                margin-right: 20rpx;
            }

            .tab-item.active {
                color: #013518;
                background: #FCEA7F;
                font-weight: 600;
                border-radius: 30rpx;
                padding: 0 20rpx;
            }
        }
    }

    .record-content {
        height: 0;
        flex: 1;

        .box {
            padding: 20rpx;

            .record-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20rpx;

                .date {
                    font-size: 28rpx;
                    font-weight: 400;
                    color: #678633;
                }

                .amount {
                    font-size: 48rpx;
                    font-weight: 500;
                    color: #678633;
                }
            }
        }
    }
}
</style>