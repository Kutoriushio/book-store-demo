"use client";

import { useState } from "react";
import DeleteModal from "./components/DeleteModal";
import { useAppSelector } from "./redux/hooks";
import { BookState } from "./redux/book/bookSlice";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import BookModal from "./components/BookModal";

export default function Home() {
  const books = useAppSelector((state) => state.book.books);
  const [currentBook, setCurrentBook] = useState<BookState>();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <div className="flex justify-center bg-gray-300">
      <BookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        action="Add"
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        book={currentBook!}
      />
      {isEditModalOpen && (
        <BookModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          book={currentBook!}
          action="Edit"
        />
      )}
      <div className="flex justify-center border border-gray-200 bg-gray-200 rounded-lg h-screen">
        <div className="p-16">
          <div className="flex items-center gap-3 justify-center w-full">
            <h1 className="text-4xl font-bold">Bookstore</h1>
            <IoAdd
              onClick={() => setIsAddModalOpen(true)}
              className="border border-black rounded-full h-6 w-6 cursor-pointer mt-1 hover:opacity-50"
            />
          </div>
          <table className="min-w-full text-center text-sm font-light text-surface dark:text-white border border-neutral-400 mt-5">
            <thead className="border-b border-neutral-400 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {books.map((book) => (
                <tr key={book.id} className="border-b border-neutral-400">
                  <td
                    className="px-6 py-4 hover:text-sky-500 hover:cursor-pointer hover:underline"
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setCurrentBook(book);
                    }}
                  >
                    {book.name}
                  </td>
                  <td className="px-6 py-4">${book.price}</td>
                  <td className="px-6 py-4">{book.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center  gap-3">
                      <RiDeleteBinLine
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setCurrentBook(book);
                        }}
                        className="cursor-pointer text-red-500 hover:opacity-70"
                      />
                      <MdEdit
                        className="cursor-pointer hover:opacity-70"
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setCurrentBook(book);
                        }}
                      />
                    </div>
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
