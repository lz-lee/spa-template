<template>
	<div class="m-item">
		<div class="star">
			<input type="checkbox" id="star1" name="star" value="1"></input>
			<label for="star1"></label>
			<input type="checkbox" id="star2" name="star" value="2"></input>
			<label for="star2"></label>
			<input type="checkbox" id="star3" name="star" value="3"></input>
			<label for="star3"></label>
			<input type="checkbox" id="star4" name="star" value="4"></input>
			<label for="star4"></label>
			<input type="checkbox" id="star5" name="star" value="5"></input>
			<label for="star5"></label>
		</div>
	</div>
</template>
<script>
	export default {

	}
</script>
<style lang="less" scoped>
	.star{
		width: 200px;
		margin: 100px auto;
		text-align: center;
		overflow: hidden;
		& > input{
			display: none;
		}
		& > label{
			color:#ddd;
			float: right;	
			//浮动将input对应的同胞label元素顺序导致,
			//“～”选择器为选择后面所有同胞元素,一个星则为第五个label focus
		}
		& > label:before{
			padding: 5px;
			font-size: 30px;
			line-height: 1em;
			display: inline-block;
			content: '★';
		}

		& > input:checked ~ label,	
		// 勾选的input 其后的label focus时变色
		& > input:not(:checked) ~ label:hover,
		// 	未勾选的input 其后的label hover时变色
		& > input:not(:checked) ~ label:hover ~ label
		// 	未勾选的input其后的label hover时后的label变色，保证hover到哪个星，其后（由于浮动，页面上为”之前“）的星都是变色的
		{
			color:#ffd700;
		}
	}
</style>
