<template>
	<div class="m-item">
		<div class="m-tit">
			<h1>省市县三级联动组件</h1>
			<h2>选择的地址是{{finalArea}}</h2>
		</div>
		<router-view :city="city"></router-view>
	</div>
</template>
<script>
	import city from '../api/cities.json'
	export default {
		data() {
			return {
				finalArea: '',
				city: city
			}
		},
		created() {
		},
		watch: {
		},
		methods: {

		},
		mounted() {
			// this.$nextTick(() => {
				window.eventBus.$on('getArea', (value) => {
					this.finalArea = value.join(',')
				})
			// })
		}
	}
</script>
<style lang="less">
	.m-tit{
		width: 50%;
		margin: 50px auto;
		text-align: center;
	}
</style>
