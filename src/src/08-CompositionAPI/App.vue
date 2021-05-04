<template>
	<div>
		<h4>组合API</h4>
		<Child></Child>
	</div>
</template>

<script>
import { getCurrentInstance, onMounted, provide } from 'vue';
import Child from './Child.vue';
export default {
	components: { Child },
	// setup是在beforeCreate生命周期前执行 因此无法访问data等
	data() {
		return {
			name: 'marco',
		};
	},
	setup(props, { attrs, emit, slots }) {
		// props是外部传入的属性
		console.log(props);
		// context上有emit、slots、attrs
		// attrs  属性
		// emit   发送事件
		// slots  插槽
		// console.log(attrs,emit,slots);
		provide('hello', 'Hello World!');

		// setup中使用onXXX的方式定义生命周期函数
		// 无beforeCreate和created
		onMounted(() => {
			console.log('组件挂载');
		});

		// 获取当前组件实例 只能在setup中使用
		console.log(getCurrentInstance());
	},
};
</script>

<style></style>
