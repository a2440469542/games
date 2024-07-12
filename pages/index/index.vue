<template>
	<view class="home-page" :class="[currentTheme + '-theme']">
		<navgation-bar :userInfo="userInfo" :channel="channelInfo" @openDrawer="openDrawer" :is-login="getIsLogin"
			@toLogin="toLogin" :is-open="isOpen"></navgation-bar>
		<left-menu ref="leftMenu" @toLogin="toLogin" @onDrawerChange="onDrawerChange"></left-menu>
		<scroll-view scroll-y class="scroll-view" @scrolltolower="loadMore">
			<view class="ad">
				<swiper class="swiper" circular :indicator-color="indicatorColor"
					:indicator-active-color="indicatorActiveColor" :indicator-dots="indicatorDots" :autoplay="autoplay">
					<swiper-item v-for="(item, index) in bannerList" :key="index">
						<view class="swiper-item">
							<image :src="item.img"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="jackpot" v-if="currentTheme === 'green'">
				<view class="jackpot-content">
					<!-- <text class="counter">{{ formattedNumber }}</text> -->
					<text ref="counter">{{ formattedNumber }}</text>

					<!-- <text id="counter">{{ initialNum }}</text> -->
				</view>
			</view>
			<view class="jackpot-purple" v-else>
				<view class="jackpot-content">
					<!-- <text class="counter">{{ formattedNumber }}</text> -->
					<text ref="counter">{{ formattedNumber }}</text>

					<!-- <text id="counter">{{ initialNum }}</text> -->
				</view>
			</view>
			<uv-sticky :customNavHeight="'3.5rem'" offset-top="0">
				<view class="game-types-tabs">
					<view class="game-types-tab" v-for="(item, index) in gameTypes" :key="index"
						:class="[currentGameType === item.id ? 'active' : '']" @click="changeGameType(item)">
						<view class="item-text">
							{{ item.name }}
						</view>
						<view class="line" :class="[currentGameType === item.id ? 'active' : '']"></view>
					</view>
				</view>
			</uv-sticky>
			<view class="game-title">
				<view class="game-title-content">
					<view class="title-img" v-if="currentTheme === 'green'">
						<image src="../../static/images/pg-left.png"></image>
					</view>
					<view class="title-svg" v-else>
						<svg width="58" height="16" viewBox="0 0 58 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path class="icon" fill-rule="evenodd" clip-rule="evenodd"
								d="M48.1171 1.19741C49.0717 0.242791 50.6195 0.242792 51.5741 1.19741L56.7595 6.38286C57.7142 7.33747 57.7142 8.88521 56.7595 9.83982L51.5741 15.0253C50.6195 15.9799 49.0717 15.9799 48.1171 15.0253L42.9317 9.83982C41.9771 8.88521 41.9771 7.33747 42.9317 6.38286L48.1171 1.19741ZM22.9741 3.29213C23.6395 2.62674 24.7184 2.62674 25.3837 3.29213L28.9981 6.90654C29.6635 7.57193 29.6635 8.65075 28.9982 9.31614L25.3837 12.9305C24.7184 13.5959 23.6395 13.5959 22.9741 12.9305L19.3597 9.31614C18.6943 8.65075 18.6943 7.57193 19.3597 6.90654L22.9741 3.29213ZM4.0648 5.10828C3.65017 4.69364 2.97791 4.69364 2.56327 5.10828L0.310977 7.36057C-0.103659 7.77521 -0.103659 8.44747 0.310977 8.8621L2.56327 11.1144C2.97791 11.529 3.65017 11.529 4.0648 11.1144L6.3171 8.8621C6.73173 8.44747 6.73173 7.77521 6.3171 7.36058L4.0648 5.10828Z"
								fill="#4D1A65" />
						</svg>
					</view>

					<view class="pg-text">
						{{ currentGameName }}
					</view>
					<view class="title-img" v-if="currentTheme === 'green'">
						<image src="../../static/images/pg-right.png"></image>
					</view>
					<view class="title-svg2" v-else>
						<svg width="58" height="16" viewBox="0 0 58 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path class="icon" fill-rule="evenodd" clip-rule="evenodd"
								d="M9.35943 1.19741C8.40482 0.242791 6.85708 0.242792 5.90247 1.19741L0.717014 6.38286C-0.237602 7.33747 -0.237602 8.88521 0.717014 9.83982L5.90247 15.0253C6.85708 15.9799 8.40482 15.9799 9.35943 15.0253L14.5449 9.83982C15.4995 8.88521 15.4995 7.33747 14.5449 6.38286L9.35943 1.19741ZM34.5024 3.29213C33.837 2.62674 32.7582 2.62674 32.0928 3.29213L28.4784 6.90654C27.813 7.57193 27.813 8.65075 28.4784 9.31614L32.0928 12.9305C32.7582 13.5959 33.837 13.5959 34.5024 12.9305L38.1168 9.31614C38.7822 8.65075 38.7822 7.57193 38.1168 6.90654L34.5024 3.29213ZM53.4118 5.10828C53.8264 4.69364 54.4987 4.69364 54.9133 5.10828L57.1656 7.36057C57.5802 7.77521 57.5802 8.44747 57.1656 8.8621L54.9133 11.1144C54.4987 11.529 53.8264 11.529 53.4118 11.1144L51.1595 8.8621C50.7448 8.44747 50.7448 7.77521 51.1595 7.36058L53.4118 5.10828Z"
								fill="#293562" />
						</svg>

					</view>
				</view>
			</view>
			<view class="game-list">
				<view class="list-item" v-for="(item, index) in list" :key="index" @click="toGame(item)">
					<view class="game-cover">
						<image mode="widthFix" :src="item.img || '../../static/images/null.png'" alt="item.name">
						</image>
					</view>
					<view class="game-name">{{ item.name }}</view>
				</view>
			</view>
			<uv-load-more loadingText="Carregando..." loadmoreText="Carregando" nomoreText="" :status="status" />
			<!-- <view class="footer">
			</view> -->
		</scroll-view>
		<login ref="login" @login="finishLogin" :inv_code="inv_code"></login>
		<tab-bar :current-index="0" @needLogin='toLogin' :isLogin="isLogin"></tab-bar>
	</view>
</template>

<script>
import { nextTick } from 'process';
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
			randomNumber: 0, // 初始随机数
			targetValue: null, // 目标值，初始化时未设定
			incrementValue: 0, // 递增值
			timer: null, // 定时器引用
			autoplay: true,
			indicatorDots: true,
			indicatorColor: 'var(--text-color)',
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
			inv_code: '',
			bannerList: [],
			currentGameType: 1,
			currentGameName: '',
			gameTypes: [

			]
		}
	},
	computed: {
		...mapGetters(["isLogin", "userInfo", "channelInfo", "currentTheme"]),
		getIsLogin: {
			get() {
				return this.isLogin;
			},
		},
		// 格式化数字，添加千分位并保留两位小数
		// 格式化数字
		formattedNumber() {
			return this.randomNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		},
	},

	onLoad(options) {

		//console.log(options, window.location.href)
		if (options.inv_code) {
			this.inv_code = options.inv_code
		}
		this.getChannelByUrl()
		nextTick(() => {
			if (this.isLogin === false) {
				this.$refs.login.openLogin()
			}
		})
	},
	onShow() {
		if (this.isLogin) {
			this.getUserInfo()
		}
	},
	methods: {
		// 获取渠道
		getChannelByUrl() {
			const { origin, pathname } = location;
			const baseUrl = origin + pathname;
			const currentPath = baseUrl === 'http://localhost:8080/' ? 'https://test.rs6bot.com' : baseUrl.slice(0, -1);
			this.$api.home.getChannel({ url: currentPath })
				.then(res => {
					this.$store.dispatch('setChannelInfo', res);
					this.$store.dispatch('setTheme', res.tema);
					uni.setStorage({
						key: 'cid',
						data: res.cid,
					});
					this.loadBanner()
					this.loadGamePlateList()
					this.getJackPot()
				});
		},
		changeGameType(item) {
			this.list = []
			this.gameParam.page = 1
			this.currentGameType = item.id
			this.currentGameName = item.name
			this.gameParam.pid = item.id
			this.loadGame()
		},
		// 获取总额
		getJackPot() {
			this.$api.home.getJackPot().then(res => {
				console.log("ssss", res)
				this.randomNumber = res;
				// 设置目标值为初始值加上一个100万到300万之间的随机数
				this.targetValue = this.randomNumber + Math.random() * (3000000 - 1000000) + 1000000;
				this.startGrowthTimer();
			})
		},
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

		getUserInfo() {
			this.$api.user.getUserInfo().then(res => {
				this.$store.dispatch('setUserinfo', res)
			})
		},

		async loadBanner() {
			console.log('loadBanner')
			this.bannerList = await this.$api.home.getAd();
		},
		async loadGamePlateList() {
			const res = await this.$api.home.getGamePlateList();
			this.gameTypes = res;
			this.gameTypes.unshift({ id: 0, name: 'HOT' })
			this.currentGameType = this.gameTypes[0].id
			this.currentGameName = this.gameTypes[0].name
			this.gameParam.pid = this.currentGameType
			this.loadGame()
		},
		async loadGame() {
			const res = await this.$api.home.getGameList(this.gameParam);
			console.log('loadGame', res)
			this.list = this.list.concat(res.data);
			this.status = res.data.length < this.gameParam.limit ? 'nomore' : '';
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
			console.log("用户已经登陆", this.userInfo, this.$store.state.SystemStore.userInfo)
			console.log('首页', this.$store.state.SystemStore.isLogin, this.isLogin, this.userInfo)
			// this.$store.dispatch('setIsLogin', true)
			// this.$store.dispatch('setUserinfo', res)

			// this.isLogin = true
			// this.userInfo = uni.getStorageSync('userInfo') || res
		},
		loadMore() {
			this.gameParam.page++
			console.log('loadMore', this.gameParam.page)
			if (this.status !== 'nomore') {
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
scroll-view ::v-deep ::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}

.home-page {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: var(--primary-color);
	position: absolute;
	height: 100%;
	// aspect-ratio: 3 / 5;

	.scroll-view {
		height: 0;
		flex: 1;

		.ad {
			padding: .5rem .75rem;
			// height: 325rpx;
			width: 100%;
			aspect-ratio: 29 / 16;

			.swiper {
				width: 100%;
				height: 100%;

				.swiper-item {
					display: block;
					height: 100%;
					line-height: 100%;
					text-align: center;

					uni-image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.jackpot {
			padding: 0 .75rem;
			// height: 205rpx;
			width: 100%;
			aspect-ratio: 1003/292;

			.jackpot-content {
				width: 100%;
				height: 100%;
				background-image: url('../../static/images/jackpot.png');
				background-size: 100% 100%;
				position: relative;

				uni-text {
					position: absolute;
					bottom: .35rem;
					left: 50%;
					transform: translate(-50%, 0);
					color: var(--jackpot-text-color);
					font-size: 1.75rem;
					letter-spacing: .1rem;

				}
			}
		}

		.jackpot-purple {
			padding: 0 .75rem;
			// height: 205rpx;
			width: 100%;
			aspect-ratio: 1003/292;

			.jackpot-content {
				width: 100%;
				height: 100%;
				background-image: url('../../static/images/jackpot-purple.png');
				background-size: 100% 100%;
				position: relative;

				uni-text {
					position: absolute;
					font-weight: 600;
					bottom: 0;
					left: 50%;
					transform: translate(-50%, -50%);
					color: var(--jackpot-text-color);
					font-size: 2rem;
					letter-spacing: .2rem;

				}
			}
		}

		.game-types-tabs {
			width: 100%;
			background-color: var(--secondary-color);
			color: var(--text-color);
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: row;
			flex-wrap: wrap;
			box-sizing: border-box;

			.game-types-tab.active {
				color: var(--light-text-color);

				.line.active {
					display: block;
					background-color: var(--light-text-color);
					width: 3rem;
					height: 0.2rem;
					border-radius: 0.25rem;

				}
			}

			.game-types-tab {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				.item-text {
					padding: .5rem .75rem;
				}

				.line {
					display: none;
				}

				uni-image {
					width: 2.5rem;
					height: 2.5rem;
				}

				uni-text {
					font-size: 1rem;
					margin-top: .5rem;
				}
			}
		}

		.game-title {
			.game-title-content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 1rem;

				.title-svg {
					width: 40%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					svg {
						width: 3.625rem;
						height: 1rem;
						.icon {
							fill: var(--pg-ttext-color);
						}
					}
				}
				.title-svg2 {
					width: 40%;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					svg {
						width: 3.625rem;
						height: 1rem;
						.icon {
							fill: var(--pg-ttext-color);
						}
					}
				}

				.title-img {
					height: .5rem;
					width: 40%;
					display: flex;
					align-items: center;
					uni-image {
						width: 100%;
						height: 100%;
					}
				}

				.pg-text {
					width: 20%;
					color: var(--pg-ttext-color);
					font-size: 1.75rem;
					letter-spacing: .1rem;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.game-list {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: row;
			flex-wrap: wrap;
			padding: .5rem .75rem;
			gap: .5rem;
			box-sizing: border-box;

			.list-item {
				width: calc(25% - .4rem);

				.game-cover {
					width: 100%;

					uni-image {
						width: 100%;
						height: 100%;
					}
				}

				.game-name {
					color: var(--text-color);
					// text-align: center;
					font-size: .75rem;
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
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
		}
	}
}
</style>
