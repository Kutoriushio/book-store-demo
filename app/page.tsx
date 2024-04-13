"use client";

import { useState } from "react";
import Button from "./components/Button";
import AddBookModal from "./components/AddBookModal";
import DeleteModal from "./components/DeleteModal";
import { useAppSelector } from "./redux/hooks";
import { BookState, remove } from "./redux/book/bookSlice";
import EditBookModal from "./components/EditBookModal";

export default function Home() {
  const books = useAppSelector((state) => state.book.books);
  const [currentBook, setCurrentBook] = useState<BookState>();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <div className="h-screen w-screen bg-red-200">
      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        book={currentBook!}
      />
      {isEditModalOpen && (
        <EditBookModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          book={currentBook!}
        />
      )}
      <div className="flex justify-center pt-10">
        <div>
          <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="text-3xl">Bookstore</h1>
            <Button normal onClick={() => setIsAddModalOpen(true)}>
              Add a new book
            </Button>
          </div>
          <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
            <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="border-b border-neutral-200 dark:border-white/10">
              {books.map((book) => (
                <tr key={book.id}>
                  <td
                    className="px-6 py-4 hover:text-sky-500 hover:cursor-pointer hover:underline"
                    onClick={() => {
                      setIsEditModalOpen(true);
                    }}
                    onMouseOver={() => setCurrentBook(book)}
                  >
                    {book.name}
                  </td>
                  <td className="px-6 py-4">${book.price}</td>
                  <td className="px-6 py-4">{book.category}</td>
                  <td className="px-6 py-4">
                    <Button
                      danger
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setCurrentBook(book);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
