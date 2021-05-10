<template>
	<div>
		<button @click="test()">测试</button>
		<button @click="initBooks()">初始化书架</button>
		<ul>
			<li v-for="book in books" :key="book.id">{{ book }}</li>
		</ul>
		<div>总价格:{{ totalPrice }}</div>
	</div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useStore, mapGetters, mapMutations } from 'vuex';
import { BookConstants } from '@/store/book/index';
import { Book } from '@/store/book/state';
export default {
	setup() {
		const store = useStore();
		let books: Array<Book> = reactive(store.state.book.books);
		// 想要在setup中使用异步可以使用这个方式
		// async setup的话 需要在使用组件的时候包裹 <suspense><suspense/>
		(async function () {
			await store.dispatch(BookConstants.BookActions.GET_BOOKS);
		})();
		function initBooks() {
			// Object.assign(books, {});
			// books = reactive([]);
			// console.log(books);
		}
		return { books, initBooks };
	},
	computed: {
		...mapGetters([BookConstants.BookGetter.TOTAL_PRICE]),
	},
	methods: {
		...mapMutations(['test']),
	},
};
</script>

<style></style>
