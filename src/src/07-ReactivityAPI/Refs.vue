<template>
	<div>
		<h3>Refs</h3>
		<ul>
			<li>
				refPerson.name : {{ refPerson.name }}
				<button @click="refPerson.name = 'polo'">改名</button>
			</li>
			<li>
				toRefs解构出来的属性name：{{ name }}
				<button @click="name = 'polo'">改名</button>
			</li>
			<li>
				shallowRefPerson.info.name:{{ shallowRefPerson.info.name }}
				<!-- 无法修改 因为name在嵌套的对象中 -->
				<button @click="shallowRefPerson.info.name = 'polo'">改名</button>
			</li>
			<li>
				<button @click="update()">
					使用triggerRef触发shallowRef嵌套对象属性更新
				</button>
			</li>
			<li></li>
		</ul>
	</div>
</template>

<script>
import {
	ref,
	unref,
	toRef,
	toRefs,
	isRef,
	customRef,
	shallowRef,
	triggerRef,
	reactive,
} from 'vue';
export default {
	setup() {
		// 1. ref
		// 可以传入任意类型 通过.value使用 在模板中可以直接使用
		// 注意：如果传入一个对象 则value是一个reactive对象 因为ref对 对象进行了封装
		let refPerson = ref({ name: 'marco' });
		console.log(refPerson.value);
		let refBoolean = ref(true);
		// 2. unref
		console.log(unref(refPerson));
		console.log(unref(refBoolean));

		// 3. toRef和toRefs
		// 在Reactive中说过 reactive中的基本数据类型解构出来的时候 是没有响应式的 如果希望解构出来以后 属性依旧具有响应式 则可以使用toRef和toRefs
		const person = reactive({ name: 'marco', age: 18 });
		const nothing = toRef(person, 'nothing');
		console.log('toRef解构的属性不存在时:', nothing);

		// toRefs本质上是将reactive转换成一个普通对象 对象上的属性都指向原始对象上相应的ref
		console.log(
			'toRefs将reactive转成普通对象:',
			toRefs(person, ['name', 'age'])
		);
		// 此时去解构这个对象 获取的属性都是ref对象 所以都具备响应式
		const { name, age } = toRefs(person, ['name', 'age']);
		console.log('解构toRefs后的普通对象:', name, age);

		// 4. isRef
		console.log('isRef判断是否为Ref对象:', isRef(refPerson));

		// 5. customRef
		// 自定义ref
		// 以下自定义ref的用途就是 防抖设置值
		function useDebounceRef(value, delay) {
			let timer;
			return customRef((track, trigger) => {
				return {
					get() {
						track();
						return value;
					},
					set(newValue) {
						clearTimeout(timer);
						timer = setTimeout(() => {
							value = newValue;
							trigger();
						}, delay);
					},
				};
			});
		}

		// 6. shallowRef
		// 和ref的区别是 传入对象(引用数据类型)时 ref会将对象转换成reactive作为value
		// 而shallowRef不会 即 shallowRef中嵌套的对象是没有响应式的
		const shallowRefPerson = shallowRef({ info: { name: 'marco' } });

		// 7. triggerRef 用于shallowRef中嵌套的对象中的属性改变时 触发更新
		function update() {
			triggerRef(shallowRefPerson);
		}
		return { refPerson, shallowRefPerson, name, age, update };
	},
};
</script>

<style></style>
