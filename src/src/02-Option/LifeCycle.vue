<template>
	<div>
		<h4>演示生命周期函数</h4>
		<!-- input是用来测试组件是否被缓了 -->
		<input type="text" />
		<p>{{ time }}</p>
		<!-- 改变time 用于观察 onRenderTracked和onRenderTriggered周期函数 -->
		<button @click="change()">改变time</button>
	</div>
</template>

<script>
import {
	nextTick,
	onActivated,
	onDeactivated,
	onBeforeMount,
	onBeforeUnmount,
	onBeforeUpdate,
	onErrorCaptured,
	onMounted,
	onRenderTracked,
	onRenderTriggered,
	onUnmounted,
	onUpdated,
} from 'vue';
export default {
	name: 'LifeCycle',
	data() {
		return { time: new Date() };
	},
	props: {
		pValue: String,
	},
	methods: {
		change() {
			this.time = new Date();
			console.log('method中的this:', this);
		},
	},
	// 写在setup外的生命周期函数 不使用箭头函数定义 否则this执行有问题
	// setup中的无所谓 因为setup中的this本身就是undefined

	// 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
	beforeCreate() {
		console.log('beforeCreate执行');
	},

	// 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。
	created() {
		console.log('created执行');
	},

	// setup在beforeCreate前执行 可以将原本beforeCreate和created的代码写入setup
	// setup中的生命周期函数接收的参数和setup函数保持一致 除了onErrorCaptured
	setup(props, context) {
		// 在挂载开始之前被调用
		onBeforeMount(() => {
			console.log('onBeforeMount执行,组件挂载前');
		});

		// 实例被挂载后调用
		// 注意：无法确保所有子组件都被挂载  可使用nextTick(()=>{})
		onMounted(() => {
			nextTick(() => {
				console.log('onMounted执行 加上nextTick确保子组件也已经挂载');
			});
		});

		// 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
		onBeforeUpdate(() => {
			console.log('onBeforeUpdate执行');
		});

		// 因数据更新后页面重新渲染后执行 不能确保所有子组件都渲染完成 因此可以配合nextTick(()=>{})使用
		onUpdated(() => {
			console.log('onUpdated执行');
		});

		// 跟踪虚拟 DOM 重新渲染时调用。钩子接收 debugger event 作为参数。此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键
		onRenderTracked((e) => {
			console.log('onRenderTracked执行', e);
		});

		// 当虚拟 DOM 重新渲染为 triggered.Similarly 为renderTracked，接收 debugger event 作为参数。此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键
		onRenderTriggered((e) => {
			console.log('onRenderTriggered执行', e);
		});

		// 在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的
		onBeforeUnmount(() => {
			console.log('onBeforeUnmount执行');
		});

		// 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。
		onUnmounted(() => {
			console.log('onUnmounted执行');
		});

		// 使用了keep-alive包裹 显示组件时触发 hidden隐藏后再显示不触发
		onActivated(() => {
			console.log('onActivated执行', arguments);
		});

		// 使用了keep-alive包裹 隐藏组件时触发 hidden隐藏不触发
		onDeactivated(() => {
			console.log('onDeactivated执行');
		});

		// 捕获子孙组件的异常 err异常对象 instance异常组件实例 info异常信息
		onErrorCaptured((err, instance, info) => {
			console.log('异常发生:', err, instance, info);
			return false;
		});
	},
};
</script>
