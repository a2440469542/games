<template>
    <view class="tabbar" :class="[currentTheme + '-theme']">
        <view class="tabbar-item" v-for="(item,index) in tabbar" :key="index" @click="navigateTo(item.path)">
            <image :src="currentIndex === index ? item.active : item.icon"></image>
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
                    path: '/pages/index/index'
                },
                {
                    name: 'Equipe',
                    icon: require('../../static/images/tabbar/group.png'),
                    active: require('../../static/images/tabbar/group-active.png'),
                    path: '/pages/group/index'
                },
                {
                    name: 'Recarregar',
                    icon: require('../../static/images/tabbar/charge.png'),
                    active: require('../../static/images/tabbar/charge-active.png'),
                    path: '/pages/recharge/index'
                },
                {
                    name: 'Perfil',
                    icon: require('../../static/images/tabbar/profile.png'),
                    active: require('../../static/images/tabbar/profile-active.png'),
                    path: '/pages/profile/index'
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
            // width: 100%;
            flex: 1;
            height: 100%;
            color: var(--text-color);
            padding: .25rem .5rem;
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
        }
    }
</style>