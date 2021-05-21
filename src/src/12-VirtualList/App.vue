<template>
	<div id="outer">
		<div id="top"></div>
		<ul>
			<li
				v-for="item of showList"
				:key="item.id"
				:style="{ background: 'yellow' }"
			>
				<div v-if="item.src"><img :src="item.src" /></div>
				<p>{{ item.id }}是{{ item.type }}</p>
			</li>
		</ul>
		<div id="bottom"></div>
	</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
export default {
	setup() {
		let list = [];
		for (let i = 0; i < 10000; i++) {
			if (i % 2 === 0) {
				list.push({
					id: i,
					type: '偶数',
					src: 'https://vue-docs-next-zh-cn.netlify.app/logo.png',
				});
			} else {
				list.push({
					id: i,
					type: '奇数',
					src: '',
				});
			}
		}
		let start = ref(0),
			end = ref(10);
		let showList = computed(() => {
			return list.slice(start.value, end.value);
		});
		onMounted(function () {
			let observer = new IntersectionObserver(
				function (entries, ob) {
					let entry0 = entries[0];
					console.log(entry0.isIntersecting);
					if (
						entry0.isIntersecting &&
						entry0.target.id === 'top' &&
						start.value > 0
					) {
						start.value--;
						end.value--;
						document.getElementById('outer').scrollTo({
							top: 1,
						});
					}
					if (
						entry0.isIntersecting &&
						entry0.target.id === 'bottom' &&
						end.value < list.length
					) {
						start.value += 2;
						end.value += 2;
					}
				},
				{
					root: document.getElementById('outer'),
					threshold: [1],
				}
			);
			observer.observe(document.getElementById('top'));
			observer.observe(document.getElementById('bottom'));
		});
		let totalHeight = list.length * 50;
		return { list, start, end, showList, totalHeight };
	},
};
</script>

<style>
#outer {
	height: 300px;
	overflow: auto;
}
img {
	width: 50px;
	height: 50px;
}
</style>
