"use client";

import { useState } from "react";
import Button from "./components/Button";
import AddBookModal from "./components/AddBookModal";
import DeleteModal from "./components/DeleteModal";

export default function Home() {
  const [books, setBooks] = useState([
    { id: 1, name: "Book 1", price: 10, category: "Fiction" },
    { id: 2, name: "Book 2", price: 15, category: "Non-Fiction" },
    // Add more books as needed
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div className="h-screen w-screen bg-red-200">
      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
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
                  <td className="px-6 py-4">{book.name}</td>
                  <td className="px-6 py-4">${book.price}</td>
                  <td className="px-6 py-4">{book.category}</td>
                  <td className="px-6 py-4">
                    <Button danger onClick={() => setIsDeleteModalOpen(true)}>
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
