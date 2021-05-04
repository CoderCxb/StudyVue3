// main.ts中介绍了应用配置相关以及应用级别的API使用
import { createApp } from 'vue';
//@ts-ignore
// import App from './src/01-AppAndGlobalAPI/App.vue';
// import App from './src/02-Option/App.vue';
// import App from './src/03-Property/App.vue';
// import App from './src/04-InstanceMethod/App.vue';
// import App from './src/05-Directive/App.vue';
// import App from './src/06-BuildInComponent/App.vue';
import App from './src/07-ReactivityAPI/App.vue';
// import App from './src/08-CompositionAPI/App.vue';
//@ts-ignore
import CommonComponent from './components/CommonComponent.vue';
import router from './src/06-BuildInComponent/router';
import './index.css';

// 第一个参数为组件 第二个参数为props 需要组件中使用attrs接收
const app = createApp(App, {
	data: '传递给APP组件的setup的props',
});

// 一.APP级别配置(应用配置) APP级别 全局有效

// vm ViewModel
// 1.全局错误处理
// app.config.errorHandler = (err, vm, info) => {
//   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
//   // 用于全局处理错误
//   console.log(err, vm, info)
// }

// 2.全局警告处理
// app.config.warnHandler = (msg, vm, trace) => {
//   // `trace` 是组件的继承关系追踪
//   // 为 Vue 的运行时警告指定一个自定义处理函数。注意这只会在开发环境下生效，在生产环境下它会被忽略
//   console.log(msg, vm, trace)
// }

// 3.全局属性
// 添加可以在应用程序内的任何组件实例中访问的全局 property
// 注意:无法在setup中使用 因为setup是在beforeCreate前调用的
app.config.globalProperties.globalName = 'Global Name';

// 4.是否为自定义元素
// 用来识别在 Vue之外定义的自定义元素(自己写的Vue文件不能触发,外部导入的非Vue的可以) ,如果组件符合此条件(返回true)，则不需要本地或全局注册，并且 Vue 不会抛出关于 Unknown custom element 的警告。
app.config.isCustomElement = (tag) => {
	console.log('标签名', tag);
	return tag.startsWith('wq-');
};

// 5.性能
// 设置为 true 以在浏览器开发工具的 performance/timeline 面板中启用对组件初始化、编译、渲染和更新的性能追踪。只适用于开发模式和支持 performance.mark API 的浏览器。 默认 false
app.config.performance = false;

// 二.应用API

// 1.APP级别导入组件
// 在createApp()方法创建的实例上定义全局组件
// component(组件使用时的名称,组件)
// 若传递组件 则定义组件
// 若没有传递组件 则返回组件的定义
app.component('CommonComponent', CommonComponent);

// 2.APP级别指令
// el:绑定指令的元素
// binding:{
//   instance:使用指令的组件实例,
//   value:传递给指令的值,
//   oldValue:先前传递的值, // 仅在 beforeUpdate 和 updated 中可用
//   arg:参数传递给指令,例如在 v-my-directive:foo 中，arg 为 "foo",必须直接跟在指令后面  变量需要用[] 否则按照字符串处理
//   modifiers:包含修饰符 (如果有) 的对象。例如在 v-my-directive.foo.bar 中，修饰符对象为 {foo: true，bar: true},
//   dir:{生命周期函数} 整个对象就是dir 即directive接收的第二个参数就是dir
// }
// vNode:真实元素对应的虚拟节点
// 若传入第二个参数 则定义指令 若不传入 则获取指令
app.directive('AppDirective', {
	// 指令是具有一组生命周期的钩子：
	created(el, binding, vNode) {
		console.log('APP级别指令:组件创建时触发:', el, binding, vNode);
	},
	// 在绑定元素的父组件挂载之前调用
	beforeMount() {},
	// 绑定元素的父组件挂载时调用
	mounted() {},
	// 在包含组件的 VNode 更新之前调用
	beforeUpdate() {},
	// 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
	updated() {},
	// 在绑定元素的父组件卸载之前调用
	beforeUnmount() {},
	// 卸载绑定元素的父组件时调用
	unmounted() {},
});

// 3.APP级别的mixin(混入) 可以给每个组件添加生命周期的操作
app.mixin({
	// created(){
	//   console.log('mixin的created')
	// }
});

// 4.APP级别的provide向内注入数据 在组件中使用 inject接受 可以传递函数
const AppProvide = '使用Provide向内注射的数据';
app.provide('AppProvide', AppProvide);
app.use(router);
// 5.将Vue的应用挂载到指定的元素上
app.mount('#app');

// 6.使用插件 这个插件需要暴露一个install方法
// 如vue-router就是需要使用use  axios并没有定义install 则不能使用use
// app.use(VueRouter)  // 有问题

// 7.将Vue的应用从指定元素上卸载
// app.unmount('#app')
