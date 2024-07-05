<template>
    <view class="bind" :class="[currentTheme + '-theme']">
        <sub-nav :title="title"></sub-nav>
        <view class="bind-content">
            <view class="label-text">Retiradas</view>
            <view class="form">
                <view class="form-item">
                    <view class="label">Tipo de conta Pix</view>
                    <view class="value" @click="$refs.picker.open()">
                        {{ bankParams.type }}
                        <uv-icon name="arrow-down" color="var(--text-color)fff"></uv-icon>
                    </view>
                </view>
                <!--账户号码-->
                <view class="form-item" v-if="bankParams.type === 'CPF'">
                    <view class="label">Número da conta pix</view>
                    <view class="value">
                        <input type="number" style="direction: rtl;" placeholder-style="color: var(--text-color)" placeholder="Número do cartão"
                            v-model="bankParams.pix" />
                    </view>
                </view>
                <!--手机号码-->
                <view class="form-item" v-if="bankParams.type === 'PHONE'">
                    <view class="label">CPF do Titular</view>
                    <view class="value">
                        <input type="number" style="direction: rtl;" placeholder-style="color: var(--text-color)" placeholder="Número do cartão"
                            v-model="bankParams.pix" />
                    </view>
                </view>
                <view class="form-item" v-if="bankParams.type === 'PHONE'">
                    <view class="label">Pix telefone</view>
                    <view class="value">
                        <input type="number" style="direction: rtl;" placeholder-style="color: var(--text-color)" placeholder="Número de telefone"
                            v-model="bankParams.mobile" />
                    </view>
                </view>
                <!--账户持有人姓名-->
                <view class="form-item">
                    <view class="label">Nome do titular da conta</view>
                    <view class="value">
                        <input placeholder="Nome" placeholder-style="color: var(--text-color)" style="direction: rtl;"
                            v-model="bankParams.name" />
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
        <uv-picker ref="picker" keyName="label" confirmText="Confirmar" cancelText="Cancelar" :columns="columns"
            @confirm="confirm" @cancel="cancel">
        </uv-picker>
    </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            title: 'Vinculação de Saque',
            columns: [[
                {
                    label: 'CPF',
                    value: 'CPF'
                },
                {
                    label: 'Telefone',
                    value: 'PHONE'
                }
            ]],
            bankParams: {
                type: 'CPF',
                mobile: '',
                pix: '',
                name: ''
            },
            inputValue: ''
        }
    },
    computed:{
      ...mapGetters(['currentTheme'])
    },
    onLoad() {
        this.getBankInfo()
    },
    watch: {
        // 监听inputValue变化，更新bankParams.mobile  
        inputValue(newVal) {
            if (newVal.startsWith('55')) {
                this.bankParams.mobile = newVal;
            } else if (newVal.match(/^\d+$/)) { // 确保是数字  
                this.bankParams.mobile = '55' + newVal;
            } else {
                this.bankParams.mobile = ''; // 如果不是数字或已删除55，则显示为空  
            }
        }
    },
    methods: {
        phoneInput(e) {
            console.log(e)
            this.inputValue = e.detail.value   
        },
        getBankInfo() {
            this.$api.user.userBank().then(res => {
                console.log(res)
                if (res.length === 0) {
                    return
                } else {
                    this.bankParams.type = res.type
                    this.bankParams.mobile = res.mobile
                    this.bankParams.name = res.name
                    this.bankParams.pix = res.pix
                }
            })
        },
        confirm(e) {
            if (e.value[0].value === 'CPF') {
                this.bankParams.mobile = ""
            }
            this.bankParams.type = e.value[0].value
        },
        cancel(e) {
            console.log(e)
        },
        submit() {
            let params = {}
            params = this.bankParams
            if (this.bankParams.type === 'PHONE') {
                params.mobile = 55 + this.bankParams.mobile
            }
            this.$api.user.bindBank(params).then(res => {
                this.getBankInfo()
                uni.showToast({
                    title: 'Vinculação bem-sucedida',
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
    background-color: var(--primary-color);
    height: 100vh;

    .bind-content {
        padding: 1.25rem 0.9325rem;

        .label-text {
            color: var(--primary-text-color);
            font-size: 1rem;
            margin-bottom: 1.25rem;
            margin-left: 0.625rem;
        }

        .form {
            background-color: var(--primary-text-color);
            border-radius: 0.75rem;
            padding: 0.75rem;

            .form-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.625rem;
                height: 2.8125rem;

                .label {
                    color: var(--text-color);
                    font-size: 0.875rem;
                    margin-right: 1.25rem;
                }

                .value {
                    display: flex;
                    align-items: center;
                    color: var(--text-color);
                    font-size: 1rem;

                    .code {
                        width: 5.8125rem;
                        margin-right: 0.25rem;
                    }

                    .btn {
                        background-color: var(--text-color);
                        color: var(--primary-text-color);
                        border-radius: 0.75rem;
                        padding: 0.5rem 0.375rem;
                        font-size: 1rem;
                    }
                }
            }
        }

        .footer {
            margin-top: 1.25rem;

            .btn {
                background-color: var(--text-color);
                color: var(--primary-text-color);
                border-radius: 0.25rem;
                padding: 0.25rem 0.375rem;
                font-size: 1rem;
                text-align: center;
            }
        }
    }
}
</style>