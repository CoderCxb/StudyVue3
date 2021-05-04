<template>
	<div>
		<!-- 演示指令 -->
		<Directive v-show="true" ref="directive">
			<!-- 如果传入的是template 则需要指定名称 -->
			<!-- <div>插槽</div> -->
			<template v-slot:default>
				<div>插槽</div>
			</template>
		</Directive>
		<!-- 演示diff算法  -->
		<!-- <Diff></Diff> -->
		<!-- <component :is="'Diff'"></component> -->
	</div>
</template>

<script>
import Directive from './Directive.vue';
import Diff from './Diff.vue';
import { onMounted, ref } from 'vue';
export default {
	setup() {
		//  注意：子组件或子元素被v-if隐藏时 ref无法获取到 并且如果元素还没被挂载 则会当成响应式变量处理
		let directive = ref(null);
		console.log(directive.value);
		onMounted(() => {
			console.log(directive.value);
		});
		return { directive };
	},
	components: {
		Directive,
		Diff,
	},
};
</script>
<style></style>
