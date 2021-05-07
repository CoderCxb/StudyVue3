import { Store } from 'element-plus/lib/el-table/src/table.type';
import { createStore, Module } from 'vuex';
import { book } from './book/index';

// Vuex的store的子模块的state在被放在根store的state.moduleName下
// 但是 子模块的action、getter和mutation会被合并到根模块

export const store = createStore({
	// 改变state必须通过action和mutation
	modules: {
		book
	}
});
