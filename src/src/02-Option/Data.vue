<template>
	<!-- 演示组件中属性  -->
	<div>data数据value: {{ value }}</div>
	<div>props数据str: {{ str }}</div>
	<div>computed数据cData: {{ cData }}</div>
	<div>
		<button @click="changeDataValue('新的value')">修改data中value的值</button>
	</div>
	<div><button @click="emitEvent">发送自定义事件</button></div>
	<div>--------------------</div>
</template>

<script>
export default {
	// 注意:data和method以及setup的返回值会绑定到this上
	// 数据 响应式
	data() {
		return {
			value: 'Data数据',
		};
	},

	// 外部传递的参数 响应式 外部改变 内部跟着改 内部不允许修改props
	props: {
		str: {
			type: String,
			default: '默认值',
			required: true,
			// 注意：validator只是会警告 但是并不会阻止值的传递
			validator(value) {
				// 这里的value是外部传递进来的值
				return true;
			},
		},
	},

	// 计算属性 可以依赖data和props 当依赖发生改变时 会重新计算值并返回
	// 可以接收一个对象 {getter(vm){},setter(value){}}
	// 这里的vm就是实例 当计算属性使用箭头函数时 可以用vm代替this
	// 计算属性的结果会被缓存，除非依赖的响应式 property 变化才会重新计算。注意，如果某个依赖 (比如非响应式 property) 在该实例范畴之外，则计算属性是不会被更新的
	computed: {
		cData(vm) {
			return '依赖' + vm.$data.value + '的computed属性';
		},
		// 当使用箭头函数时 this指向发生改变 这里可以使用参数vm
		// cData2:(vm)=>vm.$props.str
	},

	// 方法 不建议使用箭头函数 会产生意料之外的问题
	methods: {
		changeDataValue(value) {
			this.$data.value = value;
			console.log('修改data中value的值');
		},
		//发送自定义事件
		emitEvent() {
			this.$emit('login', { user: 'marco', password: '123' });
		},
	},

	// watch 监听 可以监听data和props的改变 尽量不使用箭头函数 接收一个对象
	// 对象的属性看可以是:函数、methods中的方法、对象{handler(){}}和数组[]
	// 注意：监听引用数据类型(Object)时 除非引用的地址发生改变 否则不会触发 即对象中属性发生改变  那么回调函数中的新旧value是相同的 因为是引用类型 所以修改完之后 新旧对象都指向同一个 也就是修改后的对象 所以不会触发
	watch: {
		// 也可以传递[{},{}] 会被按序触发
		value: {
			handler(value, oldValue) {
				console.log(`监听data中的value的值,从${oldValue}改为${value}`);
			},
			deep: true,
			immediate: true,
		},
		str() {
			console.log('监听props中str的值，值发生改变了');
		},
	},

	// 声明自定义事件 不声明会有警告
	// emits:['register','login'], // 无验证函数可以这样写
	emits: {
		register: null,
		// payload为传递的参数
		login(payload) {
			console.log(payload);
			// 返回true则通过验证 false验证失败 会有警告
			return true;
		},
	},
};
</script>

<style></style>
