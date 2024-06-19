<template>
    <view class="login" v-if="isLogin">
        <view class="login-part">
            <view class="login-content">
                <view class="login-header">
                    <view class="login-title">
                        <view class="login-icon">
                            <image
                                src="data:image/png;base64,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">
                            </image>
                        </view>
                        <view>{{ loginIndex === 0 ? 'Login' : 'Register' }}</view>
                    </view>
                    <view class="line"></view>
                </view>
                <view class="login-form">
                    <view class="form-item">
                        <view class="area">+55</view>
                        <input v-model="form.mobile" class="uni-input" placeholder-style="color: #ffd8ad" focus
                            placeholder="Tu número de celular" />
                    </view>
                    <view class="form-item" v-if="loginIndex === 1">
                        <view class="area">+55</view>
                        <input v-model="mobile" class="uni-input" placeholder-style="color: #ffd8ad" focus
                            placeholder="Confirme o número de celular" />
                    </view>
                    <view class="form-item">
                        <view class="area">
                            <image
                                src="data:image/png;base64,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">
                            </image>
                        </view>
                        <uv-input border="none" color="#ffd8ad" password="true" v-model="form.pwd" class="uni-input"
                            placeholder-style="color: #ffd8ad" focus placeholder="Senha (4-16 leras e números)" />

                    </view>
                    <!-- <view class="form-item" v-if="loginIndex === 1">
                        <view class="area">
                            <image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAABIRJREFUeF7t3E9oHFUcB/Dv7+3sZjcpgqBWBQmU3AIi1KOHUkk28c9FUKmg+dOqh96kHhTc3dmoBy14UBAP3a0FpQRPrbLZ1EMOlh4EDx7Ek4iHVkEkJG22s5l5v/I2iUaJln3zU3fCb06B7O87733ml5nNwHsEPUQFSDRNw6Cgwk2goAoqLCAcpx2qoMICwnHaoVkBrZ557GHO2QliHrNAkUAsPHavOCbLBPqFrfm5EyQfnn5h+YZX0N8UiXVotQoTH3rivpzdbBeH8+NJYmETBjMDA0H5hwC5WRMhCAzIANFGPA1rvw2PX7qaFlcC1GVw5Wz55B13Fj+4vhrB2gETvI1SoRgguhlvJgFG336+fS0NqgQoqo2pBSZ+HYBJM5gBqP2aNqKj4cmV675jSQ1aaUyVQXwBQMF3EINSly/k0I2SxYX59rO+Y0oFWrv45LD9tXuBDD3KGfsz3xOMwMVSQJ315NjCiaXzPqjpQJvl53KF3Ceb3cTn3INcc3V9ZG3svWeudPodZCrQytmpDQKX3IN8vx2Gzau1+dbpfueVCvSt849z1In7PefAf94YAidcD+fb1X4Hq6B7iJEDjW1YP75cU9B+BRRUQOw2EdqhwsYKqqDCAsJx2qEKKiwgHKcdqqDCAsJx2qEKKiwgHKcdqqDCAsJx2qEKKiwgHKcdqqDCAsJx2qEKKiwgHKcdqqDCAsJx2qEKKiwgHKcdqqDCAsJx2qEKKiwgHKcdqqDCAsJx2qEKKiwgHKcdqqDCAsJx2qEKKiwgHKcdqqB/FiCirUW2QJfBXgsp3GpnY6ggsc40yx3KpZE8dW7EFwF7CYTf2DKR6W8puKsBUUyghwDMEtHB7Qvk1buZBR0qBuh044mcjb4K51Zues3+L0XVMxP3szHfADjom5dZ0OJwgGg1Gg1f/vIn38nvVVdpln8EMOqbmV3QUoBow46H863v3JYAbt29L8Luukqz7C7QA75ZmQV1OyswY40IL4az7UVfgN111Wa5xaBJgL3X7mcWdAciyG/NPYmtt6n7kjBUCtx6d6Rdap550N8Vvb4w7boGIjcMYP+AevenbKGCynpqhwp7Kui+AQ3PTbPb8Gq/Hb17qLW1+txy2O/cUj1XK43yp/mh3LF9uIlLFwmeqp9of/GfglY/nnqQmS+DcaDfEw/q53tvvoDL9dmlR3zGmKpD3QnfaEyeMjnzbtov0z6Dl65x/7k50NrMkreLd+HOZF5rTN9dILuYy5sj8WaG76fbbxKsMU+/OdP6zPdipQZ1J37po8P5e4fuumIMHXY7MmbyYMQg80p9rvV+mvGLgLoB1M5N3mMT+h7AAWMov/UCnrdeHw2YcW+7S3ds/8DM18D0Q33O7765+wKIge6EVhpTM2TsGFuMg+hQ70UvIcCg3A3cM4ewBsY6EX/OjHh9ZP2d3rZs7je9Z5L/IQ66M5Rq80gRQLHLpfxQkPxr5/GZesRJUrBJEs6trPrU/1PNQE1UenL/R56CCqsrqIIKCwjHaYcqqLCAcJx2qIIKCwjHaYcKg94C4iFZgsmww3cAAAAASUVORK5CYII="></image>
                        </view>
                        <input class="uni-input" placeholder-style="color: #ffd8ad" focus placeholder="Insira o código de convite" />
                    </view> -->
                </view>
                <view class="login-footer">
                    <view class="login-btn" @click="submit">{{ loginIndex === 0 ? 'Login' : 'Register' }}</view>
                    <view class="register-btn" @click="switchIndex">{{ loginIndex === 0 ? 'Register' : 'Login' }}</view>
                </view>
            </view>
            <view class="login-close" @click="closeLogin">
                <image src="../../static/images/close.png"></image>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        inv_code: {}
    },
    data() {
        return {
            isLogin: false,
            loginIndex: 0, // 0 登录 1 注册
            form: {
                mobile: '',
                pwd: '',
                inv_code: ''
            },
            mobile: ''
        }
    },

    methods: {
        onLogin() {
            let param = {
                mobile: `55${this.form.mobile}`,
                pwd: this.form.pwd
            }
            this.$api.user.login(param).then(res => {
                this.$store.dispatch('setIsLogin', true)
                this.getUserInfo()
                console.log(res)
                this.$emit('login', res)
                this.closeLogin()
            })
        },

        setRegister() {
            let param = {
                mobile: `55${this.form.mobile}`,
                pwd: this.form.pwd,
                inv_code: this.form.inv_code
            }
            this.$api.user.register(param).then(res => {
                this.$store.dispatch('setIsLogin', true)
                this.getUserInfo()
                this.$emit('login', res)
                this.closeLogin()
            });
        },

        getUserInfo() {
            this.$api.user.getUserInfo().then(res => {
                this.$store.dispatch('setUserinfo', res)
            })
        },
        submit() {
            if (this.loginIndex === 0) {
                this.onLogin()
            } else {
                if (this.form.mobile === this.mobile) {
                    this.form.inv_code = this.inv_code
                    this.setRegister()
                } else {
                    uni.showToast({
                        title: 'Os números de telefone celular são inconsistentes',
                        icon: 'none'
                    })
                }
            }
        },
        switchIndex() {
            this.loginIndex = this.loginIndex === 0 ? 1 : 0
        },
        openLogin() {
            this.isLogin = true
        },
        closeLogin() {
            this.isLogin = false
        },
        login() {
            if (this.loginIndex === 0) {
                uni.showToast({
                    title: '登录成功',
                    icon: 'none'
                })
            } else {
                uni.showToast({
                    title: '注册成功',
                    icon: 'none'
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    overflow-y: scroll;
    position: fixed;
    top: 0;
    z-index: 999;
    background-color: #00000080;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .login-part {
        width: 640rpx;
        background-color: #678633;
        border-radius: 20rpx;
        padding: 0 28rpx 28rpx 28rpx;
        position: relative;

        .login-close {
            position: absolute;
            z-index: 1000;
            width: 65rpx;
            height: 65rpx;
            bottom: -120rpx;
            left: 50%;
            transform: translateX(-50%);

            image {
                width: 100%;
                height: 100%;
            }
        }

        .login-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            .login-header {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .login-title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48rpx;
                    font-weight: 600;
                    color: #fff;
                    margin-top: 30rpx;

                    .login-icon {
                        width: 65rpx;
                        height: 60rpx;
                        margin-right: 10rpx;

                        image {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                .line {
                    width: 360rpx;
                    height: 4rpx;
                    background-color: #fff;
                    margin-top: 20rpx;
                    border-radius: 4rpx;
                }
            }

            .login-form {
                width: 100%;
                margin-top: 30rpx;

                .form-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 28rpx;
                    color: #fff;
                    font-size: 600;
                    background-color: #678633;
                    border: 1rpx solid #FFD8AD;
                    border-radius: 20rpx;
                    height: 100rpx;
                    padding: 24rpx;
                    margin-top: 20rpx;

                    .area {
                        width: 74rpx;

                        image {
                            width: 60rpx;
                            height: 60rpx;
                        }
                    }

                    .uni-input {
                        font-size: 28rpx;
                        color: #fff;
                        flex: 1;
                    }
                }
            }

            .login-footer {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .login-btn {
                    width: 100%;
                    height: 100rpx;
                    line-height: 100rpx;
                    text-align: center;
                    font-size: 34rpx;
                    font-weight: 600;
                    border-radius: 20rpx;
                    background-color: #fff3f1;
                    color: #516d21;
                    margin-top: 40rpx;
                }

                .register-btn {
                    text-align: center;
                    font-size: 34rpx;
                    font-weight: 600;
                    color: #fcea7f;
                    margin-top: 20rpx;
                }
            }
        }
    }
}
</style>