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
                        <input type="number" @input="handleInput" style="direction: rtl;"
                            placeholder-style="color: var(--text-color)" placeholder="Número do cartão"
                            v-model="bankParams.pix" />
                    </view>
                </view>
                <view v-if="showError && bankParams.type === 'CPF'" class="error-tip">{{ errorMessage }}</view>

                <!--手机号码-->
                <view class="form-item" v-if="bankParams.type === 'PHONE'">
                    <view class="label">CPF do Titular</view>
                    <view class="value">
                        <input type="number" @input="handleInput" style="direction: rtl;"
                            placeholder-style="color: var(--text-color)" placeholder="Número do cartão"
                            v-model="bankParams.pix" />
                    </view>
                </view>
                <view v-if="showError && bankParams.type === 'PHONE'" class="error-tip">{{ errorMessage }}</view>

                <view class="form-item" v-if="bankParams.type === 'PHONE'">
                    <view class="label">Pix telefone <view class="area">+55</view>
                    </view>
                    <view class="value">
                        <input type="number" @input="checkPhone" style="direction: rtl;"
                            placeholder-style="color: var(--text-color)" placeholder="Número de telefone"
                            v-model="bankParams.mobile" />
                    </view>
                </view>
                <view v-if="isPhone && bankParams.type === 'PHONE'" class="error-tip">{{ phoneMsg }}</view>
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
            showError: false,
            errorMessage: 'Por favor insira o CPF correto',
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
            inputValue: '',
            isPhone: false,
            phoneMsg: 'Por favor insira o telefone correto'
        }
    },
    computed: {
        ...mapGetters(['currentTheme'])
    },
    onLoad() {
        this.getBankInfo()
    },
    watch: {},
    methods: {
        handleInput(event) {
            let value = event.target.value;
            // 使用正则表达式来检查是否为11位数字
            let regex = /^(\d{11})$/;
            if (!regex.test(value)) {
                this.showError = true;
                this.errorMessage = 'Por favor insira o CPF correto';
            } else {
                this.showError = false;
                this.errorMessage = '';
            }
        },
        checkPhone(event) {
            let value = event.target.value;
            // 使用正则表达式来检查是否为11位数字
            let regex = /^(\d{11})$/;
            if (!regex.test(value)) {
                this.isPhone = true;
                this.phoneMsg = 'Por favor insira o telefone correto';
            } else {
                this.isPhone = false;
                this.phoneMsg = '';
            }
        },
        getBankInfo() {
            this.$api.user.userBank().then(res => {
                console.log(res)
                if (res.length === 0) {
                    return
                } else {
                    this.bankParams.type = res.type
                    this.bankParams.mobile = this.removeLeading55(res.mobile)
                    this.bankParams.name = res.name
                    this.bankParams.pix = res.pix
                    if (this.bankParams.type === 'PHONE') {
                        this.$refs.picker.setIndexs([1], true)
                    } else {
                        this.$refs.picker.setIndexs([0], true)
                    }
                }
            })
        },
        confirm(e) {
            this.bankParams.type = e.value[0].value
        },
        cancel(e) {
            console.log(e)
        },
        removeLeading55(input) {
            // 将输入转换为字符串，以确保统一处理
            const strInput = String(input);

            // 检查前两个字符是否为"55"
            if (strInput.startsWith("55")) {
                // 如果是，返回除去前两个字符后的字符串
                return strInput.substring(2);
            }

            // 如果不是，返回原始输入
            return strInput;
        },
        submit() {
            if (this.showError) {
                return
            }
            let params = {
                type: this.bankParams.type,
                mobile: `55${this.bankParams.mobile}`,
                pix: this.bankParams.pix,
                name: this.bankParams.name
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

            .error-tip {
                color: red;
                font-size: 0.5rem;
                margin-left: 0.625rem;
                width: 100%;
                text-align: right;
                padding: 0 1rem;
            }

            .form-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.625rem;
                height: 2.5rem;

                .label {
                    color: var(--text-color);
                    font-size: 0.875rem;
                    margin-right: 1.25rem;
                    width: 40%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .area {}
                }

                .value {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    color: var(--text-color);
                    font-size: 1rem;
                    width: 60%;

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