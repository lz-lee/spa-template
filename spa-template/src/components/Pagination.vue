<template>
	<div class="m-item">
		<div class="m-panigation" v-if="rowsTotal">
			<section class="m-sta">
				共<span>{{rowsTotal}}</span>条记录，<span>{{page}}/{{pageTotal}}</span>页
				<select class="select-page" v-model="mPageSize" @change="changePageSize">
					<option v-for="value in pageSizes" :value="value">{{value}}</option>
				</select>
			</section>
			<section class="m-pag" v-if="showPage">
				<ul>
					<li @click="first" :class="{'disabled': isFirst}">首页</li>
					<li @click="prev" :class="{'disabled': isFirst}">上一页</li>
						<!-- v-if是一个指令，需要添加到一个元素上，需要切换多个元素，应该用templat包裹起来 -->
					<template v-if="notEnoughPages">
						<li v-for="n in pageTotal" :class="{'active': mPage === n}" @click="nav(n)">{{n}}</li>
					</template>

					<template v-else>
						<li v-for="n in windowSize" :class="{'active': mPage === windowStart + n - 1}" @click="nav(windowStart + n - 1)">{{windowStart + n - 1}}</li>
					</template>

					<li @click="next" :class="{'disabled': isLast}">下一页</li>
					<li @click="last" :class="{'disabled': isLast}">尾页</li>
				</ul>
			</section>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			// 数据总数
			rowsTotal: {
				type: Number,
				required: true
			},
			// 每页显示的数量
			pageSize: {
				type: Number
			},
			// 当前第几页
			page: {
				type: Number,
				required: true,
				default: 1
			},
			pageSizes: {
				type: Array
			},
			showPage: {
				type: Boolean,
				default: true
			},
			// 当前页前后的页数
			onEachSide: {
				type: Number,
				default: 2
			}
		},
		data() {
			return {
				isFirst: false,
				isLast: true,
				mPageSize: this.pageSize,
				mPage: this.page
			}
		},
		methods: {
			first() {
				this.nav(1)
			},
			prev() {
				// 当前页大于第二页才允许上一页点击
				if (this.mPage - 1 >= 1) {
					this.nav(this.mPage - 1)
				}
			},
			next() {
				// 当前页小于倒数第二页才允许下一页点击
				if (this.mPage + 1 <= this.pageTotal) {
					this.nav(this.mPage + 1)
				}
			},
			last() {
				this.nav(this.pageTotal)
			},
			nav(n) {
				n === 1 ? this.isFirst = true : this.isFirst = false
				this.pageTotal === n ? this.isLast = true : this.isLast = false
				// 每次点击的页即为当前页
				this.mPage = n
			},
			changePageSize() {
				// 修改每页数据需要重新请求数据或者 绘制数据表格
				this.$emit('changePageSize', this.mPageSize)
			}
		},
		computed: {
			// 总共页数
			pageTotal() {
				let total = Math.ceil(this.rowsTotal / this.mPageSize)
				if (total === 1) {
					this.isLast = true
					this.isFirst = true
				}
				if (this.mPage < 0) {
					this.mPage = 1
					this.isFirst = true
				}
				if (this.mPage >= total) {
					this.mPage = total
					this.isLast = true
				}
				return total
			},
			notEnoughPages() {
				// 总页数小于最大展示页数，返回true，表示页数不足。
				return this.pageTotal < this.onEachSide * 2 + 4
			},
			// 展示的页数
			windowSize() {
				return this.onEachSide * 2 + 1
			},
			// 从哪页开始展示
			windowStart() {
				// 当前页小于前后页数，从第一页开始
				if (this.mPage <= this.onEachSide) {
					return 1
					// onEachSize表示的是当前页前后的页数，例如当其值为3的时候，总共展示7页，
					// 当点击的是前3页时，都是从第1页开始展示，第4页开始 从第4-3 = 1页开始展示，即保证当前页数前后都是3页，其实当前页也等于所展示页最后一页减3
					// 当点击到最后3页时，所展示页的最后一页为总页数， 当前页大于总共页数减3的时候，即点击的是最后3页，从总页数减2倍onEachSize开始展示。
					// 如果总共有8页，要展示7页，那么最后应该从第2页开始，8 - 2 * 3）
				} else if (this.mPage >= (this.pageTotal - this.onEachSide)) {
					return this.pageTotal - this.onEachSide * 2
				}
				// 当前页数大于两侧页数，从两者相差页数开始
				return this.mPage - this.onEachSide
			}
		}
	}
</script>
<style lang="less" scoped>
@import "../assets/less/var.less";
	.m-panigation{
		width: 60%;
		margin:0 auto;
		padding: 20px 10px;
		.clearfix();
		.m-sta{
			float: left;
			.select-page{
				height: 24px;
				vertical-align: middle;
			}
		}
		.m-pag{
			float: right;
			ul{
				.clearfix();
				li{
					float: left;
					margin-left: -1px;
					padding: 4px 10px;
					background: #fafafa;
					line-height: 24px;
					border: 1px solid @border-color;
					cursor: pointer;
					&:first-child{
						border-bottom-left-radius: 3px;
						border-top-left-radius: 3px;
					}
					&:last-child{
						border-bottom-right-radius: 3px;
						border-top-right-radius: 3px;
					}
					&:hover{
						background: #eee;
						color: #23527c;
					}
					&.active{
						color: #fff;
						cursor: default;
						background: #337ab7;
						border-color: #337ab7;
					}
					&.disabled{
						color:#bbb;
						cursor: not-allowed;
						background: #eee;
					}
				}
			}
		}
	}
</style>
