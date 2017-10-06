exports.install = function (Vue, options) {
	let weuserid = localStorage.getItem('weuserid')
	if (weuserid !== null) {
		return weuserid
	} else {
		// this.$router.push({
		// 	path: '/login'
		// })
	}
};