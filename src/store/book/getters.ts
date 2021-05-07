import { BookState } from "./state";

export const getters = {
  totalPrice(state: BookState) {
    return state.books.reduce((pre, next) => pre + next.price, 0)
  }
};

export enum BookGetter {
  TOTAL_PRICE = 'totalPrice'
}