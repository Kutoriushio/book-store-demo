import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface BookState {
  name: string;
  price: number;
  category: string;
  description: string;
}

// Define the initial state using that type
const initialState: { books: BookState[] } = {
  books: [
    {
      name: "Book 1",
      price: 10,
      category: "Fiction",
      description: "Fiction",
    },
    {
      name: "Book 2",
      price: 25,
      category: "Non-Fiction",
      description: "Non-Fiction",
    },
  ],
};
export const bookSlice = createSlice({
  name: "book",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action: PayloadAction<BookState>) => {
      state.books.push(action.payload); // Add the new book to the state's books array
    },
    remove: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.name != action.payload);
    },
  },
});

export const { add, remove } = bookSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBook = (state: RootState) => state.book.books;

export default bookSlice.reducer;
