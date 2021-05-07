export type Book = {
  id: string;
  name: string;
  type: string;
  price: number;
}

export type BookState = {
  books: Array<Book>
}


export const state: BookState = {
  books: []
}