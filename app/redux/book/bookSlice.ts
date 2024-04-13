import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface BookState {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

// Define the initial state using that type
const initialState: { books: BookState[] } = {
  books: [
    {
      id: 1,
      name: "Book 1",
      price: 10,
      category: "Fiction",
      description: "Fiction",
    },
    {
      id: 2,
      name: "Book 2",
      price: 25,
      category: "Non-Fiction",
      description: "Non-Fiction",
    },
  ],
};

let nextId = 3;
export const bookSlice = createSlice({
  name: "book",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action: PayloadAction<BookState>) => {
      const newBook = { ...action.payload, id: nextId++ };
      state.books.push(newBook); // Add the new book to the state's books array
    },
    remove: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id != action.payload);
    },
    edit: (state, action: PayloadAction<BookState>) => {
      const index = state.books.findIndex(
        (book) => book.id == action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
  },
});

export const { add, remove, edit } = bookSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBook = (state: RootState) => state.book.books;

export default bookSlice.reducer;
