import { createStore } from 'vuex';

// Vuex的store的子模块的state在被放在根store的state.moduleName下
// 但是 子模块的action、getter和mutation会被合并到根模块
let a = createStore({
	state: { name: 'xxx' },
});
export const store = createStore({
	strict: true,
	state: {},
	modules: {
		a,
	},
});
