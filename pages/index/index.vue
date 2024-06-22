<template>
	<view class="home-page">
		<navgation-bar :userInfo="userInfo" :channel="channelInfo" @openDrawer="openDrawer" :is-login="isLogin"
			@toLogin="toLogin" :is-open="isOpen"></navgation-bar>
		<left-menu ref="leftMenu" @toLogin="toLogin" @onDrawerChange="onDrawerChange"></left-menu>
		<scroll-view scroll-y class="scroll-view" @scrolltolower="loadMore">
			<view class="ad">
				<swiper class="swiper" circular :indicator-color="indicatorColor"
					:indicator-active-color="indicatorActiveColor" :indicator-dots="indicatorDots" :autoplay="autoplay">
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/images/bg.png"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/images/bg.png"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/images/bg.png"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="jackpot">
				<view class="jackpot-content">
					<!-- <text class="counter">{{ formattedNumber }}</text> -->
					<text ref="counter">{{ formattedNumber }}</text>

					<!-- <text id="counter">{{ initialNum }}</text> -->
				</view>
			</view>
			<view class="game-title">
				<view class="game-title-content">
					<view class="title-img">
						<image src="../../static/images/pg-left.png"></image>
					</view>
					<view class="pg-text">
						PG
					</view>
					<view class="title-img">
						<image src="../../static/images/pg-right.png"></image>
					</view>
				</view>
			</view>
			<view class="game-list">
				<view class="list-item" v-for="(item, index) in list" :key="index" @click="toGame(item)">
					<view class="game-cover">
						<image mode="widthFix" :src="item.img" alt="item.name"></image>
					</view>
					<view class="game-name">{{ item.name }}</view>
				</view>
			</view>
			<uv-load-more loadingText="Carregando..." loadmoreText="Cargando" nomoreText="Sem mais jogos"
				:status="status" />
			<view class="footer">
			</view>
		</scroll-view>
		<login ref="login" @login="finishLogin" :inv_code="inv_code"></login>
		<tab-bar :current-index="0" @needLogin='toLogin' :isLogin="isLogin"></tab-bar>
	</view>
</template>

<script>
import leftMenu from '../../components/common/leftMenu.vue'
import login from '../login/index.vue'
import { mapGetters } from "vuex";
export default {
	components: {
		leftMenu,
		login
	},
	data() {
		return {
			title: 'Hello',
			randomNumber: 17000200.07, // 初始随机数
			targetValue: null, // 目标值，初始化时未设定
			incrementValue: 0, // 递增值
			timer: null, // 定时器引用
			autoplay: true,
			indicatorDots: true,
			indicatorColor: 'rgba(255, 255, 255, 1)',
			indicatorActiveColor: 'rgba(0, 0, 0, 1)',
			list: [],
			isOpen: false,
			initialNum: '223,323,323.03',
			status: 'loadmore', // loadmore | loading | nomore
			gameParam: {
				page: 1,
				limit: 20,
				keyword: '',
				pid: ''
			},
			userInfo: uni.getStorageSync('userInfo') || {},
			cid: uni.getStorageSync('channelInfo').cid || '',
			channelInfo: uni.getStorageSync('channelInfo') || {},
			inv_code: '',
			isLogin: false,
			bannerList:[],
			currentPath: this.getBaseUrl() === 'http://localhost:8080/' ? 'https://test.rs6bot.com' : this.getBaseUrl()
		}
	},
	computed: {
		// 格式化数字，添加千分位并保留两位小数
		// 格式化数字
		formattedNumber() {
			return this.randomNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		},
	},

	onLoad(options) {
		//console.log(options, window.location.href)
		// 设置目标值为初始值加上一个100万到300万之间的随机数
		this.targetValue = this.randomNumber + Math.random() * (3000000 - 1000000) + 1000000;
		this.startGrowthTimer();
		this.loadChannelInfo()
		if (options.inv_code) {
			this.inv_code = options.inv_code
		}
	},
	onShow() {
		this.isLogin = uni.getStorageSync('isLogin') || false
		//console.log("isLogin", this.isLogin)
		if (this.isLogin) {
			this.getUserInfo()
		}
	},
	methods: {
		// 开始增长定时器
		startGrowthTimer() {
			this.timer = setInterval(() => {
				if (this.randomNumber >= this.targetValue) {
					// 达到或超过目标值时停止定时器
					clearInterval(this.timer);
					// //console.log("已达到目标值");
					return;
				}
				this.incrementRandomly();
			}, 5000);
		},
		// 递增随机1-10数值
		incrementRandomly() {
			const randomIncrement = Math.random() * 10 + 1;
			this.animateGrowth(randomIncrement);
		},
		// 数字增长动画逻辑
		animateGrowth(increment) {
			const endValue = Number(this.randomNumber) + Number(increment);
			this.animate(this.randomNumber, endValue, 500);
		},
		animate(startNum, endNum, duration) {
			let currentNum = parseFloat(startNum);
			const step = (endNum - startNum) / (duration / 100); // 假设每60ms更新一次
			const interval = setInterval(() => {
				currentNum += step;
				if (currentNum >= parseFloat(endNum)) {
					clearInterval(interval);
				} else {
					// 格式化为保留两位小数的字符串，用于显示
					const formattedNum = currentNum.toFixed(2);
					this.randomNumber = formattedNum;
				}
			}, 100);
		},

		getBaseUrl() {
			// 获取当前页面的完整URL
			let fullUrl = window.location.href;
			// 创建URL对象
			let urlObject = new URL(fullUrl);
			// 截取URL的origin（协议+域名+端口）和pathname（路径）
			let baseUrl = urlObject.origin + urlObject.pathname;
			return baseUrl;
		},
		getUserInfo() {
			this.$api.user.getUserInfo().then(res => {
				this.userInfo = res
				// //console.log("userInfo", this.userInfo)
			})
		},
		loadChannelInfo() {
			this.$api.home.getChannel({ url: this.currentPath }).then(res => {
				// //console.log(res)
				this.channelInfo = res
				uni.setNavigationBarTitle({ title: res.title });
				uni.setStorageSync('channelInfo', res)
				this.loadBanner()
				this.loadGame()
			})
		},
		loadBanner() {
			this.$api.home.getAd().then(res => {
				//console.log(res)
			})
		},
		loadGame() {
			this.$api.home.getGameList(this.gameParam).then(res => {
				//console.log(res)
				if (res.data.length < this.gameParam.limit) {
					this.status = 'nomore'
				}
				this.list = [...this.list, ...res.data]
			})
		},
		toGame(item) {
			if (this.isLogin) {
				this.$api.user.getGameUrl({ gid: item.gid }).then(res => {
					//console.log(res)
					if (res.code === 0) {
						this.$store.dispatch('setGamePath', res.url)
						uni.navigateTo({
							url: `/pages/game/index`,
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}
				})
			} else {
				this.$refs.login.openLogin()
				return
			}

		},
		openDrawer() {
			this.isOpen = !this.isOpen
			if (this.isOpen) {
				this.$refs.leftMenu.showDrawer()
			} else {
				this.$refs.leftMenu.closeDrawer()
			}
		},
		toLogin() {
			if (!this.isLogin) this.$refs.login.openLogin()
		},
		finishLogin(res) {
			//console.log(res)
		},
		loadMore() {
			this.gameParam.page++
			//console.log('loadMore', this.gameParam.page)
			if (this.status === 'loadmore') {
				this.loadGame()
			}
		},
		onDrawerChange(e) {
			this.isOpen = e
		}
	}
}
</script>

<style lang="scss" scoped>
.home-page {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: rgba(247, 201, 111, 1);
	height: 100vh;

	.scroll-view {
		height: 0;
		flex: 1;

		.ad {
			padding: 20rpx 24rpx;
			height: 325rpx;

			.swiper {
				width: 100%;
				height: 100%;

				.swiper-item {
					display: block;
					height: 100%;
					line-height: 100%;
					text-align: center;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.jackpot {
			padding: 0 22rpx;
			height: 205rpx;

			.jackpot-content {
				width: 100%;
				height: 100%;
				background-image: url('../../static/images/jackpot.png');
				background-size: 100% 100%;
				position: relative;

				text {
					position: absolute;
					top: 160rpx;
					left: 50%;
					transform: translate(-50%, -50%);
					color: rgba(255, 255, 255, 1);
					font-size: 36rpx;
					letter-spacing: 4rpx;

				}
			}
		}

		.game-title {
			.game-title-content {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title-img {
					height: 14rpx;
					width: 40%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.pg-text {
					color: #678633;
					font-size: 46rpx;
					letter-spacing: 4rpx;
					margin-top: 18rpx;
				}
			}
		}

		.game-list {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: row;
			flex-wrap: wrap;
			padding: 48rpx 36rpx;
			gap: 20rpx;
			box-sizing: border-box;

			.list-item {
				width: calc(25% - 20rpx);

				.game-cover {
					width: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.game-name {
					color: rgba(255, 255, 255, 1);
					text-align: center;
					font-size: 28rpx;
					color: #546a1d;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					margin-top: 10rpx;
				}
			}
		}

		.footer {
			margin-top: 40rpx;
			width: 100%;
			height: 756rpx;
			background-image: url('../../static/images/footer_bg.png');
			background-size: 100% 100%;
			background-position: center center;
			background-repeat: no-repeat;
		}
	}
}
</style>
