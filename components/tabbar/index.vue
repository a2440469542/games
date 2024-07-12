<template>
    <view class="tabbar" :class="[currentTheme + '-theme']">
        <view class="tabbar-item" v-for="(item,index) in tabbar" :key="index" @click="navigateTo(item.path)">
            <svg :width="item.width" :height="item.height" :viewBox='item.vb' fill="none" xmlns="http://www.w3.org/2000/svg">
                <path :class="[currentIndex === index ? 'icon active' : 'icon']" :d="item.d" fill="#FFEF5F"/>
            </svg>
            <text :class="currentIndex === index ? 'name active' : 'name'">{{item.name}}</text>
        </view>
    </view>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'tabbar',
    props:{
        currentIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            tabbar: [
                {
                    name: 'Início',
                    icon: require('../../static/images/tabbar/home.png'),
                    active: require('../../static/images/tabbar/home-active.png'),
                    path: '/pages/index/index',
                    d: "M21.355 11.175H16.387C13.633 11.175 13.285 10.827 13.285 8.07V3.102C13.285 1.392 14.677 0 16.387 0H21.355C23.065 0 24.457 1.392 24.457 3.102V8.07C24.457 9.783 23.065 11.175 21.355 11.175ZM8.52703 11.175H3.55903C1.84903 11.175 0.457031 9.783 0.457031 8.07V3.102C0.457031 1.392 1.84903 0 3.55903 0H8.52703C10.237 0 11.629 1.392 11.629 3.102V8.07C11.629 10.827 11.281 11.175 8.52703 11.175ZM21.355 24H16.387C14.677 24 13.285 22.608 13.285 20.898V15.93C13.285 13.176 13.633 12.828 16.387 12.828H21.355C23.065 12.828 24.457 14.22 24.457 15.93V20.898C24.457 22.608 23.065 24 21.355 24ZM8.52703 24H3.55903C1.84903 24 0.457031 22.608 0.457031 20.898V15.93C0.457031 14.22 1.84903 12.828 3.55903 12.828H8.52703C11.281 12.828 11.629 13.176 11.629 15.93V20.898C11.629 22.608 10.237 24 8.52703 24Z",
                    vb: "0 0 25 24",
                    width: '1.5625rem',
                    height: '1.5rem'
                },
                {
                    name: 'Equipe',
                    icon: require('../../static/images/tabbar/group.png'),
                    active: require('../../static/images/tabbar/group-active.png'),
                    path: '/pages/group/index',
                    d: "M30.0104 19.2334C30.0104 20.7334 29.4104 21.0334 27.1104 21.0334C26.5104 15.2334 23.6104 12.4334 20.6104 11.0334C22.6104 8.33343 22.7104 4.43343 20.8104 1.53342C23.1104 0.833426 25.5104 2.43342 26.1104 4.93344C26.6104 7.13343 25.6104 9.53343 23.6104 10.4334C27.4104 11.4334 30.0104 15.0334 30.0104 19.2334ZM17.7104 11.5334C21.4104 12.3334 25.7104 14.9334 25.7104 22.4334C25.7104 24.4334 23.2104 24.4334 15.1104 24.4334C6.91042 24.4334 4.51042 24.4334 4.51042 22.4334C4.51042 15.0334 8.81041 12.3334 12.5104 11.5334C9.61042 9.93342 8.6104 6.23343 10.0104 3.23343C11.4105 0.233427 14.9104 -0.866583 17.6104 0.733436C20.3104 2.33346 21.4104 6.03342 19.9104 8.93343C19.4104 10.1334 18.6104 10.9334 17.7104 11.5334ZM9.41041 11.0334C6.41041 12.4334 3.5104 15.3334 2.9104 21.0334C0.610421 21.0334 0.0104208 20.7334 0.0104208 19.2334C-0.189589 15.0334 2.51041 11.3334 6.31042 10.4334C4.1104 9.33342 3.11041 6.63342 4.1104 4.23342C5.0104 2.13342 7.1104 1.03344 9.2104 1.63344C7.31041 4.43343 7.4104 8.23344 9.41041 11.0334Z",
                    vb: "0 0 30 25",
                    width: '1.875rem',
                    height: '1.5625rem'
                },
                {
                    name: 'Recarregar',
                    icon: require('../../static/images/tabbar/charge.png'),
                    active: require('../../static/images/tabbar/charge-active.png'),
                    path: '/pages/recharge/index',
                    d: "M5.21463 5.47684C4.88182 5.58681 4.96093 6.0784 5.31144 6.0784H24.4727C24.8932 6.0784 25.1906 5.66696 25.0586 5.26763L23.7108 1.18877C23.4108 0.280734 22.4315 -0.212141 21.5234 0.0879017L5.21463 5.47684ZM0 9.41149C0 8.30376 0.897989 7.40577 2.00571 7.40577H24.9943C26.102 7.40577 27 8.30376 27 9.41148V12.1886C27 12.5295 26.7237 12.8058 26.3829 12.8058H0.617144C0.276305 12.8058 0 12.5295 0 12.1886V9.41149ZM2.00571 26.6913C0.897989 26.6913 0 25.7933 0 24.6856V15.4285C0 15.0876 0.276305 14.8113 0.617144 14.8113H26.3829C26.7237 14.8113 27 15.0876 27 15.4285V24.6856C27 25.7933 26.102 26.6913 24.9943 26.6913H2.00571ZM4.47472 17.4342C3.79304 17.4342 3.24044 17.9868 3.24044 18.6684C3.24044 19.3501 3.79305 19.9027 4.47472 19.9027H11.109C11.7907 19.9027 12.3433 19.3501 12.3433 18.6684C12.3433 17.9868 11.7907 17.4342 11.109 17.4342H4.47472ZM3.24044 22.6799C3.24044 21.9982 3.79305 21.4456 4.47472 21.4456H8.64044C9.32211 21.4456 9.87472 21.9982 9.87472 22.6799C9.87472 23.3616 9.32211 23.9142 8.64044 23.9142H4.47472C3.79304 23.9142 3.24044 23.3616 3.24044 22.6799Z",
                    vb: "0 0 27 27",
                    width: '1.6875rem',
                    height: '1.6875rem'
                },
                {
                    name: 'Perfil',
                    icon: require('../../static/images/tabbar/profile.png'),
                    active: require('../../static/images/tabbar/profile-active.png'),
                    path: '/pages/profile/index',
                    d: "M21.7117 22.4334C21.7117 14.9334 17.4117 12.3334 13.7117 11.5334C14.6117 10.9334 15.4117 10.1334 15.9117 8.93343C17.4117 6.03342 16.3117 2.33346 13.6117 0.733436C10.9117 -0.866583 7.41178 0.233427 6.01174 3.23343C4.6117 6.23343 5.61172 9.93342 8.5117 11.5334C4.81171 12.3334 0.511719 15.0334 0.511719 22.4334C0.511719 24.4334 2.91172 24.4334 11.1117 24.4334C19.2117 24.4334 21.7117 24.4334 21.7117 22.4334ZM8.00098 19.2334C7.44869 19.2334 7.00098 19.6811 7.00098 20.2334C7.00098 20.7857 7.44869 21.2334 8.00098 21.2334H14.001C14.5533 21.2334 15.001 20.7857 15.001 20.2334C15.001 19.6811 14.5533 19.2334 14.001 19.2334H8.00098Z",
                    vb: "0 0 22 25",
                    width: '1.375rem',  
                    height: '1.5625rem'
                }
            ]
        }
    },
    computed: {
        ...mapGetters(['isLogin', 'userInfo', 'currentTheme'])
    },
    methods: {
        navigateTo(path) {
			if(this.isLogin){
				uni.switchTab({
				    url: path
				})
			}else {
				this.$emit('needLogin')
			}
        }
    }
}
</script>
<style lang="scss" scoped>
    .tabbar {
        // position: absolute;
        width: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        // height: 5rem;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: var(--secondary-color);
        .tabbar-item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            box-sizing: border-box;
            // width: 100%;
            flex: 1;
            height: 100%;
            color: var(--text-color);
            padding: .625rem 0;
            uni-image{
                width: 1.75rem;
                height: 1.75rem;
            }
            .name {
                font-size: 1rem;
                color: var(--text-color);
            }
            .name.active {
                color: var(--light-text-color);
            }
            .icon {
                fill: var(--text-color)
            }
            .icon.active {
                fill: var(--light-text-color)
            }
        }
    }
</style>