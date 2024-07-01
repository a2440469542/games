<script>
import store from '@/store/index.js'
export default {
	onLaunch: function () {
		console.log('App Launch')
		uni.getSystemInfo({
			success: (res) => {
				const windowHeight = res.windowHeight;
				this.setPageHeight(windowHeight);
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

<style>
/*每个页面公共css */
</style>
