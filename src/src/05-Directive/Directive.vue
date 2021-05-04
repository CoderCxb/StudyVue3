<template>
	<div style="text-align: center">
		<h3>演示 指令</h3>
		<!-- v-text 等价于{{vText}} -->
		<div v-text="vText"></div>
		<!-- v-html：无法使用{{}} 并且不会有scoped的样式-->
		<div v-html="vHtml"></div>

		<!-- hidden也是通过控制display 基本等价于v-show -->
		<!-- display:hidden和 visibility: hidden会隐藏元素 但是元素空间还是占着的 -->
		<!-- v-show 控制显示 通过控制css display:none-->
		<div v-show="vShow" class="show">v-show显示</div>
		<!-- v-if 控制显示 通过销毁和创建组件的方式进行渲染 因此会触发组件的生命周期函数 -->
		<br />
		<!--  -->
		<div v-if="vIf">v-if显示</div>
		<div v-else-if="false">v-else-if显示</div>
		<div v-else>v-else显示</div>

		<!-- v-for 遍历 数组(item,index) 对象(value,key,index)-->
		<h3>v-for</h3>
		<ul>
			<li v-for="(item, index) in list" :key="item">
				{{ index }}---{{ item }}
			</li>
		</ul>

		<!-- v-on 绑定事件 语法糖@-->
		<!--  .stop - 调用 event.stopPropagation()。
					.prevent - 调用 event.preventDefault()。
					.capture - 添加事件侦听器时使用 capture 模式。
					.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
					.{keyAlias} - 仅当事件是从特定键触发时才触发回调。
					.once - 只触发一次回调。
					.left - 只当点击鼠标左键时触发。
					.right - 只当点击鼠标右键时触发。
					.middle - 只当点击鼠标中键时触发。
					.passive - { passive: true } 模式添加侦听器 -->
		<!-- 可以通过$event传递event对象 -->
		<div><button v-on:click="click($event, 'data')">点击</button></div>
		<br />

		<!-- v-bind动态绑定attr属性 语法糖为: -->
		<div v-bind:title="'标题'" :class="{ show: true }">v-bind使用</div>

		<!-- v-model实现双向绑定 -->
		<h5>v-model 双向绑定：{{ inputValue }}</h5>
		<input type="text" v-model="inputValue" />

		<!-- 插槽 外部使用template传入插槽时 需要使用v-slot:xxx 传入 不写name属性 则默认是default -->
		<slot></slot>

		<!-- v-cloak 当编译完成时 会去除这个属性 当完成编译后 会去除v-cloak 配合[v-cloak] {
        display: none;
      } 在未编译时隐藏元素 -->
		<div v-cloak>v-cloak {{ inputValue }}</div>

		<div>
			<button @click="showMyComponent = !showMyComponent">
				切换自定义组件显示
			</button>
		</div>
		<!-- v-once 标记元素或组件为只能渲染一次  后续的渲染都会把组件标记为静态组件 渲染一次之后 v-if等等绑定的变量变化了 组件也不会在变化了 -->
		<div><myComponent v-if="showMyComponent" v-once></myComponent></div>

		<!-- is -->
		<div><component :is="'myComponent'"></component></div>

		<div v-copy>自定义指令</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default {
	setup() {
		let vText = 'v-text的文本内容';
		let vHtml = '<h5>v-html的文本内容</h5>';
		let vShow = true;
		let vIf = true;
		let list = ['王者荣耀', '和平精英', '英雄联盟'];
		let click = (e, data) => {
			console.log('按钮点击:', e, data);
		};
		let inputValue = ref('默认值');
		let showMyComponent = ref(true);
		return {
			vText,
			vHtml,
			vShow,
			vIf,
			list,
			click,
			inputValue,
			showMyComponent,
		};
	},
	components: {
		myComponent: defineComponent({
			created() {
				console.log('自定义组件创建');
			},
			render() {
				return '自定义组件';
			},
		}),
	},
	directives: {
		copy: {
			mounted(el) {
				el.onclick = () => {
					new Clipboard().writeText('hahhh');
				};
				console.log(el);
				console.log('???');
			},
		},
	},
};
</script>

<style scoped>
/* 加上scoped v-html就无法使用这里的样式 */
h5 {
	color: red;
}
.show {
	background: yellow;
	margin: 0 auto;
}
[v-cloak] {
	display: none;
}
</style>
