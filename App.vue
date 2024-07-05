<script>
import store from '@/store/index.js'
export default {
	onLaunch: function () {
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
		this.getConfig()
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
		async getConfig() {
			const config = await this.$api.user.getConfig();
			store.dispatch('setConfig', config);
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
