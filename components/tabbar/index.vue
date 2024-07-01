<template>
    <view class="tabbar secondaryBgColor">
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
        ...mapGetters(['isLogin', 'userInfo'])
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
        height: 102rpx;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .tabbar-item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            color: #fff;
            image{
                width: 55rpx;
                height: 55rpx;
            }
            .name {
                font-size: 24rpx;
                color: #fff;
            }
            .name.active {
                color: #f9f36d;
            }
        }
    }
</style>