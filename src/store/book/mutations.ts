import { Book, BookState } from './state';

export enum BookMutations {
	ADD_BOOK = 'addBook',
	DELETE_BOOK = 'deleteBook',
	INIT_BOOK = 'initBook',
}

export function addBook(state: BookState, book: Book) {
	state.books.push(book);
}

export function deleteBook(state: BookState, id) {
	state.books = state.books.filter((book) => book.id != id);
}

export function initBook(state: BookState, books: Array<Book>) {
	state.books.splice(0);
	state.books.push(...books);
}

export const mutations = { addBook, deleteBook, initBook };
