<template lang="html">
  <div class="modal-wrapper" transition="modal">
		<div class="modal-mask" @click="status = false"></div>
		<div class="modal-container">
			<div class="modal-btn-wrapper">
				<div class="btn" @click="status = false"></div>
				<div class="btn save" @click="saveDate"></div>
			</div>
			<div class="modal-content date">
				<div class="picker-date" @touchstart="touchstartYear" @touchmove="touchmoveYear" @touchend="touchendYear">
					<ul class="year" :style="{transform: 'translate3d(0, ' + initOffsetYear + 'px, 0)'}">
						<li></li>
						<li></li>
						<li v-for="year in years" v-text="year"></li>
						<li></li>
						<li></li>
					</ul>
				</div>
				<div class="picker-date" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
					<ul class="month" :style="{transform: 'translate3d(0, ' + initOffsetMonth + 'px, 0)'}">
						<li></li>
						<li></li>
						<li v-for="month in months" v-text="month"></li>
						<li></li>
						<li></li>
					</ul>
				</div>
				<div class="up"></div>
				<div class="down"></div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  export default {
		props: ["status", "yearValue", "monthValue"],
		data () {
			return {
				months: [],
				years: [],
				limitValue: false,
				limitValueYear: false,
				fontSize: parseFloat(document.querySelector("html").style.fontSize)
			}
		},
		computed: {
			initOffsetMonth() {
				let value = - this.months.indexOf(this.monthValue) * 0.8 * this.fontSize
				this.month && (this.month.offset = value)
				return value
			},
			initOffsetYear() {
				let value = - this.years.indexOf(this.yearValue) * 0.8 * this.fontSize
				this.year && (this.year.offset = value)
				return value
			}
		},
		events: {
			touchstart(e, type) {
				this[type].startY = e.touches[0].clientY
				this[type].speeds = []
				this[type].time = Date.now()
			},
			touchmove (e, type) {
				let offset = e.touches[0].clientY - this[type].startY
				let disance = this[type].offset + offset
				if (Math.abs(offset) % 3 === 0) {
					let time = Date.now()
					this[type].speeds.push((Math.abs(offset) / (time - this[type].time)).toFixed(2))
				}
				if (disance > 40) {
					disance = 40
					this[type].limit = true
					return
				}
				if (disance < - this[type].maxOffset) {
					disance = - this[type].maxOffset
					this[type].limit = true
					return
				}
				this[type].limit = false
				this[type].node.style.transition = "none"
				this[type].node.style.transform = `translate3d(0, ${disance}px, 0)`
			},
			touchend (e, type) {
				let currentOffset = e.changedTouches[0].clientY - this[type].startY
				let minScroll, maxScroll,
					//month = this.month,
					offset = this[type].offset,
					fontSize = this.fontSize
				this[type].speeds = this[type].speeds.map((v) => {
					if (v !== "Infinity" || ! v) {
						return v
					}
				})
				console.log(this[type].speeds)
				let scroll = false
				let max = 0
				for (let i of this[type].speeds.slice(-2)) {
					if (i * 1 > 1) {
						scroll = true
					}
				}
				if (scroll && ! this[type].limit) {
					max = ~~ Math.max.apply(null, this[type].speeds)
					maxScroll = Math.min(offset + (max * 10 * 0.8 * fontSize), 0)
					minScroll = Math.max(offset - (max * 10 * 0.8 * fontSize), - (this[type].maxOffset - 40))
					this[type].offset = currentOffset > 0 ? maxScroll : minScroll
					let speed = Math.min.apply(null, this[type].speeds)
					let speedTime = speed > 1 ? 0.2 : speed
					if (type === "year") {
						speedTime = speed > 2 ? speed / 2 : speed
					}
					this[type].node.style.transition = `all ${speedTime}s ease-out`
					this[type].node.style.transform = `translate3d(0, ${this[type].offset}px, 0)`
					return
				}
				this[type].node.style.transition = "all .15s ease-out"
				if (this[type].limit) {
					if (currentOffset > 0) {
						this[type].node.style.transform = `translate3d(0, 0, 0)`
						this[type].offset = 0
					} else {
						this[type].node.style.transform = `translate3d(0, -${this[type].maxOffset - 40}px, 0)`
						this[type].offset = - (this[type].maxOffset - 40)
					}
				} else {
					let perfect
					this[type].offset += currentOffset
					let next = 0
					let height = 0.8 * fontSize
					let index = ~~ (Math.abs(this[type].offset) / height)
					let step = index * height
					let nextStep = (index + 1) * height
					if (nextStep - Math.abs(this[type].offset) < Math.abs(this[type].offset) - step && index !== 11 && index !== 0) {
						next = 1
					}
					perfect = next ? nextStep : step
					this[type].offset = - perfect
					this[type].node.style.transform = `translate3d(0, -${perfect}px, 0)`
				}
			}
		},
		methods: {
			touchstart (e) {
				this.$emit("touchstart", e, "month")
			},
			touchmove (e) {
				this.$emit("touchmove", e, "month")
			},
			touchend (e) {
				this.$emit("touchend", e, "month")
			},
			saveDate () {
				let step = ~~ (0.8 * this.fontSize),
					yearTop =  Math.abs(this.year.offset),
					monthTop =  Math.abs(this.month.offset)
				this.yearValue = this.years[Math.min(99, ~~ (yearTop / step))]
				this.monthValue = this.months[~~ (monthTop / step)]
				this.status = false
			},
			touchstartYear (e) {
				this.$emit("touchstart", e, "year")
			},
			touchmoveYear (e) {
				this.$emit("touchmove", e, "year")
			},
			touchendYear (e) {
				this.$emit("touchend", e, "year")
			}
		},
		ready () {
			let year = 0, month = 0,
				fontSize = this.fontSize,
				currentYear = new Date().getFullYear()
			while (year < 100) {
				this.years.unshift(currentYear - year)
				year++
			}
			while (month < 12) {
				this.months.push(month + 1)
				month++
			}
			this.month = {
				node: document.querySelector(".month"),
				offset: 0,
				maxOffset: (~~ (16* 0.8 * fontSize) - ~~ (4 * fontSize)) + 40
			}
			this.year = {
				node: document.querySelector(".year"),
				offset: 0,
				maxOffset: (~~ (104* 0.8 * fontSize) - ~~ (4 * fontSize)) + 40
			}
		}
  }
}
</script>

<style lang="css" scoped>
.modal-wrapper {
	width: 7.5rem;
	height: 100%;
	position: fixed;
	top: 0;
	z-index: 21;
	transition: opacity .2s;
}
.modal-enter, .modal-leave {
	opacity: 0;
}
.modal-mask {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	background-color: rgba(0, 0, 0, .4);
}
.modal-content {
	position: relative;
}
.modal-content.sex {
	width: 100%;
	position: absolute;
	bottom: 0;
	transition: all .3s;
	background-color: #F0F0F0;

	& ul {
		padding: 0 .2rem;
		background-color: #FFF;
	}

	& li {
		text-align: center;
		font-size: .32rem;
		line-height: .9rem;
	}

	& li:first-child {
		border-bottom: 1px solid #EEE;
	}

	& .btn {
		height: .9rem;
		margin-top: .1rem;
		background: #FFF url(./images/close.png) no-repeat center;
		background-size: .3rem;
	}
}
.modal-enter .modal-content, .modal-leave .modal-content, .modal-enter .modal-container, .modal-leave .modal-container {
	transform: translateY(100%);
}

.modal-container {
	width: 100%;
	position: absolute;
	bottom: 0;
	background-color: #FFF;
	transition: all .2s;
}
.modal-btn-wrapper {
	display: flex;
	justify-content: space-between;

	& .btn {
		width: .8rem;
		height: .8rem;
		background: url(./images/close.png) no-repeat center;
		background-size: .32rem;
	}

	& .save {
		background-image: url(./images/save.png);
		background-size: .4rem;
	}
}

.modal-content.date {
	font-size: 0;

	& .picker-date {
		display: inline-block;
		width: 50%;
		height: 4rem;
		overflow: hidden;
	}

	& ul::-webkit-scrollbar {
		display: none;
	}

	& li {
		height: .8rem;
		text-align: center;
		font-size: .28rem;
		line-height: .8rem;
	}

	& .up, .down {
		width: 100%;
		height: 50%;
		position: absolute;
		pointer-events: none;
		background-image: linear-gradient(to bottom, #FFF, rgba(255, 255, 255, 0));
	}

	& .up {
		top: 0;
	}

	& .down {
		bottom: 0;
		background-image: linear-gradient(to top, #FFF, rgba(255, 255, 255, 0));
	}

	.line {
		width: 95%;
		height: .8rem;
		position: absolute;
		top: 50%;
		left: 50%;
		pointer-events: none;
		box-sizing: border-box;
		border-top: 1px solid #DCDCDC;
		border-bottom: 1px solid #DCDCDC;
		transform: translate(-50%, -50%);
	}
}
</style>
