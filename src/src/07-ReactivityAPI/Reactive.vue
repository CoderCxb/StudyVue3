<template>
	<div>
		<h4>响应式基础API——reactive</h4>
		<ul>
			<li>
				reactivePerson.name:{{ reactivePerson.name }}
				<button @click="reactivePerson.name = 'polo'">改名</button>
			</li>
			<li>
				reactiveNum:{{ reactiveNum
				}}<button @click="reactiveNum++">Num++</button>
			</li>
			<li>
				reactivePerson解构出来的job.frame:{{ reactivePerson.job.frame }}
				<button @click="job.frame = 'vue3.0'">升级vue3</button>
			</li>
			<li>
				reactivePerson解构出来的name:{{ name }}
				<button @click="name = 'jack'">改名</button>
			</li>
			<li>
				readonlyPerson:{{ readonlyPerson.name }}
				<button @click="readonlyPerson.name = 'kitty'">改名</button>
			</li>
		</ul>
	</div>
</template>

<script>
import {
	ref,
	reactive,
	readonly,
	isProxy,
	isReactive,
	isReadonly,
	toRaw,
	markRaw,
	shallowReactive,
	shallowReadonly,
} from 'vue';
export default {
	setup() {
		const person = { name: 'marco', job: { frame: 'vue2.x', info: {} } };
		// 1. reactive
		// 1.1 接收对象 若接收的是基本数据类型 则其没有响应式
		// 不能直接对reactive进行赋值 哪怕赋值的也是reactive对象也不行 会失去响应式
		// 如果想对数组进行清空,可以使用 splice 或者 ref
		const reactivePerson = reactive(person);
		reactivePerson.working = ref(true);
		const reactiveNum = reactive(99);
		console.log(`reactivePerson`, reactivePerson);
		console.log(`reactiveNum`, reactiveNum);
		// 1.2 reactive中所有的对象(包括嵌套)都是响应式的(proxy) 而其中的基本数据类型还是非响应式的(包括ref对象) 因此如果直接解构reactive对象 则解构出来的对象依然具备响应式 而基本数据类型(包括ref对象)就没有响应式了
		const { name, job, working } = reactivePerson;
		console.log(`name`, name);
		console.log(`job`, job);
		console.log(`working`, working);

		// 2. readonly 只读对象 修改会警告
		// 注意：虽然readonly对象无法修改 但是 其原始对象的修改会影响到readonly对象
		// 如 上面的reactivePerson修改的时候 就会把person和readonlyPerson都改了
		// 因为是对象 所以都是同一个引用 改一个 则全改 直接改person没有响应式
		// readonly中的所有对象 都是readonly的
		const person2 = { name: 'marco', job: { frame: 'vue2.x', info: {} } };
		const readonlyPerson = readonly(person2);
		console.log('readonlyPerson:', readonlyPerson);
		console.log(
			'readonlyPerson.job.info是否只读:',
			isReadonly(readonlyPerson.job.info)
		);

		// 3. isProxy
		console.log('isProxy方法判断是否是Proxy对象:', isProxy(reactivePerson));

		// 4. isReactive
		console.log(
			'isReactive方法判断是否是Reactive对象:',
			isReactive(reactivePerson)
		);

		// 5. isReadonly
		console.log(
			'isReadonly方法判断是否是readonly对象:',
			isReadonly(readonlyPerson)
		);

		// 6. toRaw
		// 获取reactive,readonly的原始值
		let refData = ref('ref');
		console.log('toRaw(readonlyPerson):', toRaw(readonlyPerson));
		console.log('toRaw(refData):', toRaw(refData));
		console.log('toRaw(reactivePerson):', toRaw(reactivePerson));

		// 7. markRaw
		// 标记对象 使其永远无法转换为proxy
		// 标记其 __v_skip:true实现
		console.log('markRaw标记的对象无法转换为proxy:', reactive(markRaw({})));

		// 8. shallowReactive
		// 创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换(暴露原始值)
		const shallowReactivePerson = shallowReactive(person);
		console.log('shallowReactivePerson:', shallowReactivePerson);

		// 9. shallowReadonly
		// 创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值) 也就是说 其本身的readonly 但是其中的对象并不是只读的
		const shallowReadonlyPerson = shallowReadonly({ job: { info: {} } });
		console.log(`shallowReadonlyPerson:`, shallowReadonlyPerson);
		console.log(
			'shallowReadonlyPerson.job.info是否只读:',
			isReadonly(shallowReadonlyPerson.job)
		);
		return { person, reactivePerson, reactiveNum, job, name, readonlyPerson };
	},
};
</script>

<style></style>
