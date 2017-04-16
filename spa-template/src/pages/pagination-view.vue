<template>
	<div class="m-item">
		<div class="m-tit">
			<h1>分页组件</h1>
			<p>1、前端分页</p>
			<p>2、后端分页，需要的参数为: 默认每页展示的数量即pageSize
			、默认第几页即page</p>
			<p>3、v-if是一个指令，需要添加到一个元素上，需要切换多个元素，应该用templat包裹起来</p>
			<p>4、windowStart：从哪页开始展示，计算展示页时为windowStart + n -1</p>
		</div>
		<pagination :rows-total="rowsTotal" :page-sizes="pageSizes" :page="page" :on-each-side="onEachSide" :show-page="showPage" :page-size="pageSize" @changePageSize="getData"></pagination>
	</div>
</template>
<script>
	import pagination from '../components/Pagination.vue'
	export default {
		data() {
			return {
				rowsTotal: 230,
				pageSizes: [10, 25, 50, 75, 100],
				pageSize: 50,
				page: 1,
				onEachSide: 3,
				showPage: true
			}
		},
		methods: {
			getData(value) {
				console.log('每页展示数据量为' + value);
				// 后端分页，根据每页显示数量重新请求数据
			}
		},
		components: {
			pagination
		}
	}
</script>
<style lang="less" scoped>
	.m-item{
		.m-tit{
			text-align: center;
		}
	}
</style>
