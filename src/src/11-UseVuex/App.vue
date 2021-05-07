<template>
	<div>
		<button @click="initBooks()">初始化书架</button>
		<ul>
			<li v-for="book in books" :key="book.id">{{book.name}}</li>
		</ul>
		<div>总价格:{{totalPrice}}</div>
	</div>
</template>

<script lang='ts'>
import { reactive } from 'vue';
import { useStore,mapGetters } from 'vuex';
import { BookConstants} from '../../store/book/index';
import { Book } from '@/store/book/state';
export default {
	setup() {
		const store = useStore();
		let books:Array<Book> = reactive([]);
		store.dispatch(BookConstants.BookActions.GET_BOOKS).then(()=>{
			// books.push(...store.state.book.books);
			books=reactive(store.state.book.books);
			console.log(books);
		});
		function initBooks(){
			books = reactive([{
				id:'2',
				name:'Java',
				type:'Java',
				price:100
			}])
		}
		return { books,initBooks };
	},
	computed:{
		...mapGetters([BookConstants.BookGetter.TOTAL_PRICE])
	}
};
</script>

<style></style>
