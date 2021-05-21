<template>
	<!-- 
    diff算法的个人理解
    1.虚拟DOM中key的作用
      在虚拟DOM中 key作为一个标识，在数据发生改变时 vue会根据新的数据生成新的虚拟DOM 随后对新虚拟DOM和旧虚拟DOM进行diff比较
      a.存在相同的key，判断内容
        1)内容相同，直接使用旧的真实DOM元素
        2)内容不同，生成新的DOM元素
      b.不存在相同的key，则根据新的数据创建新的DOM元素 然后渲染到页面
    
    2.为什么推荐for循环时要使用key
      根据diff算法，当提供key的时候 不变的DOM元素避免了重新渲染的过程,默认情况下，使用v-for渲染更新时，如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

    3.为什么使用index作为key时 会出现问题 
      当数据发生改变 并且数据的顺序发生改变时(一般指数组), 由于index发生改变 导致元素对应的key也发生改变 因此并没有发挥应有的效果，导致该复用的元素也重新渲染。 
    
    4. 注意点：
      子组件在diff算法时,如果传入数据,如props、children,比较的时候会被认为是相同的
   -->
	<div>
		<button @click="addHero">添加英雄</button>
		<ul>
			<!-- 注意：diff算法针对的最小单位是元素(标签) 就比如下面这个列表 数据发生改变了 但是其中的子元素的数据并没有发生改变 那么子元素依旧是原本的元素 -->
			<!-- 注意：这里使用input，是为了观察元素是否重新渲染 -->
			<li v-for="hero of heros" :key="hero">
				{{ hero }} <input type="text" />
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			heros: [
				{ name: '马可波罗', profession: '射手' },
				{ name: '诸葛亮', profession: '法师' },
			],
		};
	},
	methods: {
		addHero() {
			this.heros.unshift({
				name: '太乙真人',
				profession: '辅助',
			});
		},
	},
};
</script>

<style></style>
