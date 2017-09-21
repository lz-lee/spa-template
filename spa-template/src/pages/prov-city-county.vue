<template>
	<div class="m-tree">
		<div class="m-tit">
			<h2>查询的地址是{{finalArea}}</h2>
		</div>
		<div class="m-cont">
			<el-form :inline="true">
				<el-form-item>
					<el-select v-model="provinceCode" @change="resetContry">
						<el-option v-for="item in citys" 
							:label="item.name" 
							:value="item.id" 
							:key="item.id">{{item.name}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="cityCode">
						<el-option v-for="item in cities" 
						:label="item.name" 
						:value="item.id" 
						:key="item.id">{{item.name}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="countyCode">
						<el-option v-for="item in county" 
						:label="item.name" 
						:value="item.id" 
						:key="item.id">{{item.name}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.prevent="search">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			city: {
				type: Object
			}
		},
		data() {
			return {
				finalArea: '',
				provinceCode: '',
				cityCode: '',
				countyCode: ''
			}
		},
		methods: {
			resetContry(city) {
				this.countyCode = ''
			},
			queryCity(provinceId) {
				for (let i = 0; i < this.citys.length; i++) {
					if (!this.citys[i].id) {
						continue	// 跳过id为空的时候（咩有cities）
					}
					if (this.citys[i].id === provinceId) {
						return this.citys[i].cities
					}
				}
				return []
			},
			queryCounty(cityCode) {
				for (let i = 0; i < this.cities.length; i++) {
					if (!this.cities[i].id) {
						continue	// 跳过id为空的时候
					}
					if (this.cities[i].id === cityCode) {
						return this.cities[i].cities
					}
				}
				return []
			},
			search() {
				if (this.countyCode !== '') {
					this.finalArea = this.countyCode
				} else if (this.cityCode !== '') {
					this.finalArea = this.cityCode
				} else {
					this.finalArea = this.provinceCode
				}
			}
		},
		computed: {
			citys() {
				// slice()是浅拷贝，在这里没什么卵用
				let citys = this.city.cities.slice()
				if (citys[0].id !== '') {
					citys.unshift({id: '', name: '全国'})
				}
				return citys
			},
			cities() {
				let cities = this.queryCity(this.provinceCode).slice()
				let obj = {
					id: '',
					name: '全省'
				}
				if (this.provinceCode === '') {
					cities.unshift(obj)
				} else {
					if (cities.length !== 0 && cities[0].id !== '') {
						cities.unshift(obj)
					} else {
						cities.unshift(obj)
					}
				}
				this.cityCode = cities[0].id
				return cities
			},
			county() {
				let county = this.queryCounty(this.cityCode).slice()
				let obj = {
					id: '',
					name: '全市'
				}
				if (this.cityCode === '') {
					county.unshift(obj)
				} else {
					if (county.length !== 0 && county[0].id !== '') {
						county.unshift(obj)
					} else {
						county.unshift(obj)
					}
				}
				this.countyCode = county[0].id
				return county
			}
		}
	}
</script>
<style lang="less" scoped>
	.m-tree{
		margin: 0 auto;
		.m-cont{
			text-align: center;
		}
	}
</style>
