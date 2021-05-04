<template>
	<div>
		<h4>演示computed和watch</h4>
		<ul>
			<li id="priceItem">
				setup-computed--价格:{{ priceDes }}
				<button @click="price++">加价</button>
			</li>
			<li>setup-computed--价格:{{ priceDes }}</li>
			<!-- computed 写在setup外部 -->
			<li>setup外的computed--价格:{{ priceDes2 }}</li>
			<p>方法获取价格 多次调用 方法也会执行多次</p>
			<li>方法获取的价格:{{ getPrice() }}</li>
			<li>方法获取的价格:{{ getPrice() }}</li>
			<li>方法获取的价格:{{ getPrice() }}</li>
		</ul>
	</div>
</template>

<script>
import { computed, ref, watch, watchEffect } from 'vue';
export default {
	computed: {
		// 计算属性除了直接写出 xx(){}形式，还可以写出一个包含set和get的对象
		priceDes2: {
			get() {
				return this.price + '元';
			},
			set(newValue) {
				console.log(newValue);
			},
		},
	},
	setup() {
		let price = ref(0);
		// 方法获取价格
		function getPrice() {
			console.log('方法获取价格');
			return price.value + '元';
		}
		// 1.computed 计算属性 当依赖发生改变时 会触发页面更新(响应式)
		// 虽然使用方法 也能做到和computed一样的效果 但是 computed是有缓存的 因此 多次调用的时候 计算属性只会触发一次 而方法每次使用都会触发
		let priceDes = computed(() => {
			console.log('计算属性获取价格');
			return price.value + '元';
		});
		// 2.watchEffect 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它
		let stopWatchEffect = watchEffect(
			() => {
				console.log('price发生改变,现在的值为:', price.value);
				console.log(document.getElementById('priceItem'));
			},
			{
				// flush 决定watchEffect的函数\
				// 在DOM渲染前执行(pre)     首次渲染拿不到DOM元素
				// 在DOM渲染后执行(post)    首次渲染拿的到DOM元素
				// 和DOM渲染同步执行(sync)  首次渲染拿不到DOM元素
				flush: 'sync',
				onTrack() {
					console.log('跟踪依赖');
				},
				onTrigger() {
					console.log('触发更新');
				},
			}
		);
		// stopWatchEffect();  // 停止监听

		// 3.watch
		watch(
			() => price.value,
			(price, prePrice) => {
				console.log('新的价格:', price);
				console.log('之前价格:', prePrice);
			}
		);
		// 一次性可以监听多个数据源
		// let fooRef=ref('foo');
		// let barRef=ref('bar');
		// watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
		// })
		return { price, priceDes, getPrice };
	},
	// 和watch一样的效果
	watch: {},
};
</script>

<style></style>
