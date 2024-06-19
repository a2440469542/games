<template>
    <view class="bind">
        <sub-nav :title="title"></sub-nav>
        <view class="bind-content">
            <view class="label-text">Retiradas</view>
            <view class="form">
                <view class="form-item">
                    <view class="label">Tipo de conta Pix</view>
                    <view class="value" @click="$refs.picker.open()">
                       {{bankParams.type}}
                    <uv-icon name="arrow-down" color="#ffffff"></uv-icon>
                    </view>
                </view>
                <!--账户号码-->
                <view class="form-item">
                    <view class="label">Número da conta pix</view>
                    <view class="value">
                       <input style="direction: rtl;" placeholder-style="color: #fff" placeholder="Número do cartão" v-model="bankParams.pix" />
                    </view>
                </view>
                <!--手机号码-->
                <view class="form-item" v-if="bankParams.type === 'PHONE'">
                    <view class="label">Número de telefone</view>
                    <view class="value">
                       <input style="direction: rtl;" placeholder-style="color: #fff" placeholder="Número de telefone" v-model="bankParams.mobile" />
                    </view>
                </view>
                <!--账户持有人姓名-->
                <view class="form-item">
                    <view class="label">Nome do titular da conta</view>
                    <view class="value">
                       <input placeholder="Nome" placeholder-style="color: #fff" style="direction: rtl;" v-model="bankParams.name" />
                    </view>
                </view>
                <!-- <view class="form-item">
                    <view class="label">Código de Verificação</view>
                    <view class="value">
                        <input class="code" />
                       <view class="btn">Obter</view>
                    </view>
                </view> -->
            </view>
            <view class="footer">
                <view class="btn" @click="submit">Enviar Agora</view>
            </view>
        </view>
        <uv-picker 
        ref="picker" 
        keyName="label"  
        confirmText="Confirmar" 
        cancelText="Cancelar" 
        :columns="columns" 
        @confirm="confirm" 
        @cancel="cancel">
    </uv-picker>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: 'Vinculação de Cartão Bancário',
            columns: [[
                {
                    label: 'CPF',
                    value: 'CPF'
                },
                {
                    label: 'PHONE',
                    value: 'PHONE'
                }
            ]],
            bankParams: {
                type: 'CPF',
                mobile: '',
                pix: '',
                name: ''
            }
        }
    },
    onLoad(){
        this.getBankInfo()
    },
    methods: {
        getBankInfo() {
            this.$api.user.userBank().then(res => {
                console.log(res)
                this.bankParams.type = res.type
                this.bankParams.mobile = res.mobile
                this.bankParams.name = res.name
                this.bankParams.pix = res.pix
            })
        },
        confirm(e) {
            console.log(e)
            this.bankParams.type = e.value[0].value
        },
        cancel(e) {
            console.log(e)
        },
        submit() {
            this.$api.user.bindBank(this.bankParams).then(res => {
                console.log(res)
                uni.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                })
            })
        }
    }

}
</script>

<style lang="scss" scoped>
.bind {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(247, 201, 111, 1);
    height: 100vh;

    .bind-content {
        padding: 40rpx 30rpx;
        .label-text {
            color: #678633;
            font-size: 32rpx;
            margin-bottom: 40rpx;
            margin-left: 20rpx;
        }
        .form {
            background-color: #678633;
            border-radius: 24rpx;
            padding: 24rpx; 
            .form-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20rpx;
                height: 90rpx;
                .label {
                    color: #fff;
                    font-size: 28rpx;
                    margin-right: 40rpx;
                }
                .value {
                    display: flex;
                    align-items: center;
                    color: #fff;
                    font-size: 32rpx;
                    .code{
                        width: 186rpx;
                        margin-right: 8rpx;
                    }
                    .btn{
                        background-color: #fff;
                        color: #678633;
                        border-radius: 24rpx;
                        padding: 16rpx 12rpx;
                        font-size: 32rpx;
                    }
                }
            }
        }
        .footer {
            margin-top: 40rpx;
            .btn{
                background-color: #fff;
                color: #678633;
                border-radius: 18rpx;
                padding: 18rpx 12rpx;
                font-size: 32rpx;
                text-align: center;
            }
        }
    }
}
</style>