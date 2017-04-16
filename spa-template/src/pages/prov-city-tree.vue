<template>
	<div class="m-tree">
		<div class="m-cont">
			<ul class="tree-ul">
				<li class="tree-li">
					<input type="checkbox"  v-model="allCheck" @change="checkAll($event)">&nbsp;&nbsp;<b>全国</b>
				</li>
				<li class="tree-li" v-for="prov in cityData">
					<input type="checkbox" 
						:value="prov.id" 
						v-model="prov.selfCheck" 
						alt="p"
						@change="changeSel(prov, $event)">&nbsp;
					<span @click="toggleItem(prov)">{{prov.name}}&nbsp;&nbsp;
						<i class="icon el-icon-arrow-down" v-if="prov.cities.length > 0"></i>
					</span>
					<ul class="tree-ul" v-show="prov.show">
						<li class="tree-li" v-for="city in prov.cities">
							<input type="checkbox" 
								:value="city.id" 
								v-model="prov.checked"
								alt="c"
								@change="changeSel(city, $event, prov)">&nbsp;
							<span @click="toggleItem(city)">{{city.name}}&nbsp;&nbsp;
								<i class="icon el-icon-arrow-down" v-if="city.cities.length > 0"></i>
							</span>
							<ul class="tree-ul" v-show="city.show">
								<li class="tree-li" v-for="county in city.cities">
									<input type="checkbox" 
										:value="county.id" 
										v-model="city.checked"
										alt="o"
										@change="changeSel(county, $event, city, prov)">&nbsp;
									<span>{{county.name}}</span>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
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
				cityData: [],
				allCheck: false,
				finalArr: [],
				cities: this.city
			}
		},
		watch: {
			'cityData': {
				handler(val) {
					if (val) {
						var count = 0;
						for (let i in val) {
							if (val[i].selfCheck) count++
						}
						if (count === 34) this.allCheck = true
						this.finalArr = this.getFinalArea(val)
						this.getArea(this.finalArr)
					}
				},
				deep: true
			}
		},
		created() {
			this.generateCityData()
		},
		methods: {
			generateCityData() {
				for (let i = 0; i < this.cities.cities.length; i++) {
					this.cities.cities[i].show = false	// 给省级添加标识，是否查看市
					this.cities.cities[i].checked = []	// 存放已选的市级id
					this.cities.cities[i].selfCheck = false
					for (let j = 0; j < this.cities.cities[i].cities.length; j++) {
						this.cities.cities[i].cities[j].show = false	// 给市级添加标识，是否查看县
						this.cities.cities[i].cities[j].checked = []	// 存放已选的县级id
						this.cities.cities[i].cities[j].selfCheck = false
					}
				}
				this.cityData = this.cities.cities
			},
			toggleItem(item) {
				item.show = !item.show
			},
			changeSel(data, event, par, ppar) {
				if (event.target.alt === 'p' || event.target.alt === 'c') {
					if (event.target.checked) {	// 复选框的逻辑checked
						data.cities.forEach((item) => {
							// 市级id没有，则将其存入省级存放数组prov.checked，v-model绑定的对应的是动态value
							data.checked.indexOf(item.id) === -1 && data.checked.push(item.id)
							if (item.cities.length !== 0) {
								item.cities.forEach((jtem) => {
									// 存入的是city.checked， 与之对应的是band：value值 的逻辑值
									item.checked.indexOf(jtem.id) === -1 && item.checked.push(jtem.id)
								})
							}
						})
					} else {
						this.allCheck = false
						data.checked = []
						data.cities.forEach((item) => {
							item.checked = []
						})
					}
				}
				if (event.target.alt === 'c') {
					data.selfCheck = event.target.checked
				}
				if (event.target.alt === 'c' || event.target.alt === 'o') {
					if (!event.target.checked) {
						this.allCheck = false
						par.selfCheck = false
						if (ppar) {
							ppar.selfCheck = false
							// 由省级prov.checked控制市级是否checked
							this.removeItem(ppar.checked, par.id)
						}
					}
					if (par) {
						if (par.checked.length === par.cities.length) {	// 如果已选子元素数量等于子元素数量，则父元素应勾选
							par.selfCheck = true
							if (ppar) {
								// 往父父元素的checked里添加父元素id，则将父元素勾选
								ppar.checked.push(par.id)
								if (ppar.checked.length === ppar.cities.length) {
									// 父父元素的selfchecked 是v-model的
									ppar.selfCheck = true
								}
							}
						}
					}
				}
			},
			removeItem(arr, name) {
				arr.forEach((item, index, array) => {
					if (item === name) {
						array.splice(index, 1)
					}
				})
			},
			checkAll(event) {
				if (event.target.checked) {
					this.cityData.forEach((data) => {
						data.selfCheck = true
						data.cities.forEach((item) => {
							data.checked.indexOf(item.id) === -1 && data.checked.push(item.id)
							if (item.cities.length !== 0) {
								item.cities.forEach((jtem) => {
									item.checked.indexOf(jtem.id) === -1 && item.checked.push(jtem.id)
								})
							}
						})
					})
				} else {
					this.cityData.forEach((data) => {
						data.selfCheck = false
						data.cities.forEach((item) => {
							data.checked = []
							if (item.cities.length !== 0) {
								item.cities.forEach((jtem) => {
									item.checked = []
								})
							}
						})
					})
				}
			},
			getFinalArea(arr) {
				let temp = []
				if (this.allCheck) {
					temp.push(this.cities.id)
					return temp
				}
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].selfCheck) {	// 省级selfcheck 则返回省级id，并跳过此次循环，
						temp.push(arr[i].id)
						continue	// continue 跳过此次循环，继续下一次。
					} else {
						temp = temp.concat(arr[i].checked)// 否则返回省级checked里的已经勾选的市级id
						// break;
					}
					for (let j = 0; j < arr[i].cities.length; j++) {
						if (arr[i].cities[j].selfCheck) {
						// 市级selfcheck = event.target.checked ==> v-model的是prov.checked，为true，则跳过，前一轮已判断
							continue
						} else {
							temp = temp.concat(arr[i].cities[j].checked) // 否则返回市级checked里已勾选的县级id
						}
					}
				}
				return temp
			},
			getArea(value) {
				if (value.length > 0) {
					window.eventBus.$emit('getArea', value)
				} else {
					window.eventBus.$emit('getArea', [])
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.m-tree{
		width: 600px;
		margin: 0 auto;

		.tree-ul{
			padding-left: 40px;
			span{
				cursor: pointer;
			}
		}
		.icon{
			font-size: 12px;
		}
	}
</style>
