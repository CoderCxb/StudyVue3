<template>
	<div>
		<div>{{ info }}</div>
		<div>
			<button @click="this.info.name = 'polo'">修改name，触发watch</button>
		</div>
		<div><button @click="addProperty()">给info添加属性</button></div>
		<div><button @click="emitEvent">发生自定义事件</button></div>
		<div><button @click="reload()">重新渲染页面</button></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			info: {
				name: 'marco',
				age: 20,
			},
		};
	},
	// 使用$forceUpdate会触发页面更新的生命周期钩子
	renderTracked() {
		console.log('renderTracked');
	},
	updated() {
		console.log('updated');
	},
	mounted() {
		console.log('mounted');
	},
	created() {
		// this.$data.info.name='not marco';
		console.log(this.info);
		this.$nextTick(() => {
			console.log(this.info.name);
			console.log(
				'使用nectTick 可以将回调函数中的内容延迟到DOM的下一个更新中,确保组件以及其子组件已经渲染完毕 可以进行相应的DOM操作'
			);
		});
		console.log('组件挂载');
		// 即便不修改 默认也会触发一次
		// 如果监听的是对象 如果没有deep:true 则修改对象的属性不会触发监听函数
		// 如果想监听对象中的属性 可以写成()=>this.info.name这种形式
		this.$watch(
			'info',
			function (newValue, oldValue) {
				console.log(newValue, oldValue);
			},
			{
				deep: false, // 是否监听引用数据类型属性的改变 (Object/Array)等 设置为true 则对象的属性发生改变时也会触发这个函数
				immediate: true, // immediate是否立刻执行
				flush: 'pre', // pre渲染前调用回调 post渲染后调用回调
			}
		);
	},
	methods: {
		emitEvent() {
			this.$emit('myEvent', {
				user: 'marco',
				password: '1234',
			});
		},
		reload() {
			console.log('重新渲染');
			this.$forceUpdate();
		},
		addProperty() {
			this.info.source = 100;
		},
	},
	// 也可以直接写数组['myEvent']
	// 不写 事件也可以发送  但是会有警告(warn) 并且可以在emits中进行校验
	emits: {
		myEvent(payload) {
			if (payload.user === 'marco' && payload.password === '123') return true;
			return false;
		},
	},
};
</script>

<style></style>
