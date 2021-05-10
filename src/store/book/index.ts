import { state } from './state';
import { mutations, BookMutations } from './mutations';
import { actions, BookActions } from './actions';
import { getters, BookGetter } from './getters';

export const book = {
	state,
	mutations: {
		...mutations,
		async test() {
			Promise.reject().catch(() => {
				// state.books.pop();
				console.log(state.books);
			});
		},
	},
	actions,
	getters,
};

export const BookConstants = {
	BookMutations,
	BookActions,
	BookGetter,
};
