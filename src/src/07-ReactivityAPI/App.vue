<template>
	<h3>演示响应式API</h3>
	<!-- 注意：修改非响应式数据默认是不会改变页面的 但是如果这时去修改响应式的数据 则会触发页面的更新 使得非响应式的数据在页面上也发生改变 -->
	<Reactive></Reactive>
	<Refs></Refs>
	<ComputedWatch></ComputedWatch>
	<div class="box">
		<img src="@/assets/where.svg" />
	</div>
</template>

<script lang="ts">
import Reactive from './Reactive.vue';
import Refs from './Refs.vue';
import ComputedWatch from './ComputedWatch.vue';
import Hero from '@/assets/hero.json';
export default {
	components: { Reactive, Refs, ComputedWatch },
	setup() {
		console.log(Hero);
		console.log(import.meta.env);
	},
};
</script>

<style lang="scss" scoped>
.box {
	img {
		width: 100px;
		height: 100px;
	}
}
</style>
