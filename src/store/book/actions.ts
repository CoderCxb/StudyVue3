import { ActionContext } from "vuex";
import { BookMutations } from './mutations';

export const actions = {
  async getBooks(context: ActionContext<string, any>) {
    let p = Promise.resolve([{
      id: '1',
      name: 'Javascript高级教程第四版',
      type: 'JS',
      price: 78
    }])
    const books = await p;
    console.log('actions的this:', this);
    context.commit(BookMutations.INIT_BOOK, books);
  }
};

export enum BookActions {
  GET_BOOKS = 'getBooks'
}