<template>
	<div class="m-item">
		<div class="m-block">
			<div class="m-tit">
				<h3>多重边框</h3>
				<h5>一、box-shadow方案</h5>
				<p>1、投影不影响布局，不会受到box-sizing的影响，通过额外的padding或者margin来模拟边框所需要占据的空间</p>
				<p>2、如果“假边框”出现在元素的外圈，不会响应鼠标事件；</p>
				<p>3、加上inset关键字，可使投影绘制在元素内圈，此时需要额外的padding</p>
				<p>4、box-shadow会跟着圆角走，outline不会</p>
			</div>
			<div class="m-cont cont-shadow">
			</div>
			<div class="m-tit">
				<h5>二、outline方案</h5>
				<p>1、两层边框，outline属性产生外层的边框，可设置虚线效果，而box-shadow只有实线。</p>
				<p>2、outline-offset属性，可以控制描边与元素边缘之间的间距，接受负值。</p>
				<p>3、不接受逗号分隔多个值，如果需要多层边框，只能使用box-shadow方案。</p>
				<p>4、描边框不一定会贴合圆角，被css工作组认定为bug。</p>
			</div>
			<div class="m-cont cont-outline"></div>
			<div class="m-cont cont-outline-offset-in"></div>
			<div class="m-cont cont-outline-offset-out"></div>
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h3>背景定位</h3>
				<h5>background-position</h5>
				<p>1、background-position:允许指定背景图片任意角的偏移量，在偏移量前加上指定关键字。	</p>
				<p>2、回退方案：在background中写入方位定位值。</p>
				<p>3、background-position默认以padding-box为准，这样，边框才不会遮住背景图片，使用background-origin可以改变此值。</p>
			</div>
			<div class="m-cont cont-bg"></div>
			<div class="m-tit">
				<h5>background-origin</h5>
				<p>1、背景图自动根据设定的padding走，不需额外设置偏移量值，content-box</p>
			</div>
			<div class="m-cont cont-bg-origin"></div>
			<div class="m-tit">
				<h5>calc</h5>
				<p>1、在background-position中使用calc函数，需要在函数内部的 -  + 运算符的两侧各加一个空白符</p>
			</div>
			<div class="m-cont cont-bg-calc"></div>		
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h3>边框内圆角</h3>
				<p>1、box-shadow会跟随圆角，outline不会，设置投影的扩张值小于描边宽度小，大于（根号2减1）倍border-radius，因此如果描边宽度不能比（根号2减1）倍border-radius小</p>
			</div>
			<div class="m-cont cont-inner-rounding"></div>
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h3>条纹背景</h3>
				<h5>一、水平条纹</h5>
				<p>1、原理：如果多个色标具有相同的位置，它们会产生一个无限小的过度区域，过度的起止色分别是第一个和最后一个指定值，从效果上看颜色会在那个位置突然变化，而不是一个平滑的渐变过程。</p>
			</div>
			<pre>background: linear-gradient(#fb3 20%, #58a 80%);</pre>
			<div class="m-cont cont-stripes1"></div>
			<pre>background: linear-gradient(#fb3 50%, #58a 50%);</pre>
			<div class="m-cont cont-stripes"></div>
			<div class="m-tit">
				<p>2、可以通过背景尺寸来调整尺寸，background-size: 100% 30p;(第一个值设置宽度，第二个值设置高度。)注意：背景在默认情况下是重复平铺的。</p>
				<p>3、创建不等高的条纹，只需要调整色标的位置值</p>
				<p>4、如果某个色标的位置值比在它之前的所有的值都要小，则该位置值会取它之前的所有位置值中的最大值。</p>
			</div>
			<div class="m-cont cont-stripes2"></div>
			<div class="m-tit">
				<p>5、多层水平条纹: 三色效果，需要四个色标（中间的颜色需要承上启下）</p>
				<pre>background: linear-gradient(#fb3 30%, #58a 0, #58a 70%, yellowgreen 0);</pre>	
			</div>
			<div class="m-cont cont-stripes-more"></div>
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h5>二、垂直条纹</h5>
				<p>1、与水平条纹的差别在于指定渐变的方向改为 to right，水平条纹中默认 为to bottom</p>
				<p>2、将background-size的值颠倒</p>
				<pre>
background: linear-gradient(to right /* 或90deg */, #fb3 50%, #58a 0);
background-size: 30px 100%;</pre>
			</div>
			<div class="m-cont cont-stripes-vertical"></div>
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h5>三、斜向条纹</h5>
				<p>1、重复线性渐变，色标示无限循环重复的，直到填满整个背景</p>
				<pre>background: repeating-linear-gradient(45deg, #fb3,#58a 30px);</pre>	
			</div>
			<div class="m-cont cont-repeat-stripes"></div>
			<p>2、创建双色条纹时，都需要用到四个色标，最好用前面的方法实现垂直或水平条纹，</p>
			<p>3、现在是在渐变的色标中指定长度，而不是原来的background-size</p>
			<pre>background: repeating-linear-gradient(45deg, #fb3, #fb3 15px, #58a 0, #58a 30px);</pre>
			<div class="m-cont cont-repeat-stripes-1"></div>
			<p>4、角度可随意更改</p>
			<pre>background: repeating-linear-gradient(60deg, #fb3, #fb3 15px, #58a 0, #58a 30px);</pre>
			<div class="m-cont cont-repeat-stripes-2"></div>
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h3></h3>
			</div>
			<div class="m-cont"></div>
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h3></h3>
			</div>
			<div class="m-cont"></div>
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h5>二、垂直条纹</h5>
				<p>1、与水平条纹的差别在于指定渐变的方向改为 to right，水平条纹中默认 为to bottom</p>
				<p>2、将background-size的值颠倒</p>
				<pre>
background: linear-gradient(to right /* 或90deg */, #fb3 50%, #58a 0);
background-size: 30px 100%;</pre>
			</div>
			<div class="m-cont cont-fringe-vertical"></div>
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h5>三、斜向条纹</h5>
				<p>1、重复线性渐变，色标示无限循环重复的，直到填满整个背景</p>
				<pre>background: repeating-linear-gradient(45deg, #fb3,#58a 30px);</pre>	
			</div>
			<div class="m-cont cont-repeat-fringe"></div>
			<p>2、创建双色条纹时，都需要用到四个色标，最好用前面的方法实现垂直或水平条纹，</p>
			<p>3、现在是在渐变的色标中指定长度，而不是原来的background-size</p>
			<pre>background: repeating-linear-gradient(45deg, #fb3, #fb3 15px, #58a 0, #58a 30px);</pre>
			<div class="m-cont cont-repeat-fringe-1"></div>
			<p>4、角度可随意更改</p>
			<pre>background: repeating-linear-gradient(60deg, #fb3, #fb3 15px, #58a 0, #58a 30px);</pre>
			<div class="m-cont cont-repeat-fringe-2"></div>
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h3></h3>
			</div>
			<div class="m-cont"></div>
		</div>
		<div class="m-block">
			<div class="m-tit">
				<h3></h3>
			</div>
			<div class="m-cont"></div>
		</div>
	</div>
</template>
<script>
	export default {

	}
</script>
<style lang="less" scoped>
	.m-block{
		width: 40%;
		margin: 0 auto;
		text-align: center;
		.m-tit{
			width: 100%;
			margin: 0 auto;
			padding: 30px 0;
		}
		.m-cont{
			height: 200px;
		}
		.cont-shadow{
			padding: 10px;
			background: yellowgreen;
			box-shadow: inset 0 0 0 10px #f9f3f6,
						0 0 0 10px #655,
						0 0 0 20px deeppink,
						0 2px 5px 20px rgba(0,0,0 ,.6);

		}
		.cont-outline{
			background: yellowgreen;	
			border: 10px solid #655;
			outline: 5px solid deeppink;
		}
		.cont-outline-offset-in{
			margin-top: 30px;
			background: #4a4548;
			border-radius: 10px;
			outline: 1px dashed #fff;
			outline-offset:-20px; 
		}
		.cont-outline-offset-out{
			margin-top: 30px;
			background: #4a4548;
			border-radius: 10px;
			outline: 5px solid yellowgreen;
			outline-offset:0px;
		}
		.cont-bg{
			background: #58a url(../assets/img/dota2.png) no-repeat bottom right;
			background-position: right 40px bottom 20px;
		}
		.cont-bg-origin{
			padding: 10px;
			background:#58a url(../assets/img/dota2.png) no-repeat bottom left;
			background-origin: content-box;
		}
		.cont-bg-calc{
			background: #58a url(../assets/img/dota2.png) no-repeat;
			background-position: calc(100% - 40px) calc(100% - 20px);
		}
		.cont-inner-rounding{
			background: tan;
			border-radius: .8em;
			padding: 1em;
			margin-bottom: 1em;
			box-shadow: 0 0 0 .3em #655;
			outline:.6em solid #655;
		}
		.cont-stripes1{
			background: linear-gradient(#fb3 20%, #58a 80%);
			margin-bottom: 30px;
		}
		.cont-stripes{
			background: linear-gradient(#fb3 50%, #58a 50%);
		}
		.cont-stripes2{
			background: linear-gradient(#fb3 30%, #58a 30%);
			background-size: 100% 30px;
		}
		.cont-stripes-more{
			background: linear-gradient(#fb3 30%, #58a 0, #58a 70%, yellowgreen 0);
			background-size: 100% 60px;
		}
		.cont-stripes-vertical{
			background: linear-gradient(to right, #fb3 50%, #58a 0);
			background-size: 30px 100%;
		}
		.cont-repeat-stripes{
			background: repeating-linear-gradient(45deg, #fb3,#58a 30px);
		}
		.cont-repeat-stripes-1{
			background: repeating-linear-gradient(45deg, #fb3, #fb3 15px, #58a 0, #58a 30px);
		}
		.cont-repeat-stripes-2{
			background: repeating-linear-gradient(60deg, #fb3, #fb3 15px, #58a 0, #58a 30px);
		}
	}
</style>
