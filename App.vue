<script>
import store from '@/store/index.js'
export default {
	onLaunch: function (options) {
		console.log('App Launch')
		const windowResizeCallback = (res) => {
			this.updateBodyStyles(res.size.windowHeight * 3 / 5)
			const scale = (res.size.windowHeight * 3 / 5) / 480
			const baseSize = 16
			document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
		}
		uni.onWindowResize(windowResizeCallback)
		uni.getSystemInfo({
			success: (res) => {
				// const windowHeight = res.windowHeight;
				// this.setPageHeight(windowHeight);
			}
		});
		this.getConfig(options)
	},
	onShow: function () {
		console.log('App Show')
		uni.hideTabBar({
			animation: false,
			success: () => {
			},
			fail: () => {
			}
		})
	},
	onHide: function () {
		console.log('App Hide')
	},
	methods: {
		// 通过传入高度按照比例实时改变页面的width
		updateBodyStyles(width) {
			document.documentElement.style.setProperty('--body-width', `${width}px`);
			document.body.style.width = `${width}px`;
		},
		async getConfig(options) {
			console.log('options', options.query.isTest)
			const isTest = options.query.isTest
			const config = await this.$api.user.getConfig();
			store.dispatch('setConfig', config);
			if (isTest == 1) {
				return
			} 
			if (config.is_maintain === "1") {
					uni.redirectTo({
						url: '/pages/maintain/index'
					})
				} else {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}

		},
		setPageHeight(height) {
			const styleTag = document.createElement('style');
			styleTag.innerHTML = `
				html, body {
				height: ${height}px;
				}
			`;
			document.head.appendChild(styleTag);
		}
	}
}
</script>

<style lang="scss">
/*每个页面公共css */
@import '/static/css/theme.scss'
</style>
