import { state } from './state';
import { mutations, BookMutations } from './mutations';
import { actions, BookActions } from './actions';
import { getters, BookGetter } from './getters';

export const book = {
  state,
  mutations,
  actions,
  getters
}

export const BookConstants = {
  BookMutations, BookActions, BookGetter
}