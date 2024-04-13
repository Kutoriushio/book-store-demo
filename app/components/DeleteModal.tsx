"use client";

import Button from "@/app/components/Button";
import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";
import Modal from "./Modal";
import { useAppDispatch } from "../redux/hooks";
import { BookState, remove } from "../redux/book/bookSlice";

interface DeleteModalProps {
  isOpen?: boolean;
  onClose: () => void;
  book: BookState;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, book }) => {
  const dispatch = useAppDispatch();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex justify-center items-center h-12 w-12 bg-red-100 rounded-full flex-shrink-0 sm:h-10 sm:w-10 sm:mx-0">
          <FiAlertTriangle size={24} className="text-red-600" />
        </div>

        <div className="text-center sm:text-left mt-3 sm:ml-4 sm:mt-0">
          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
            Delete book
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this book? This action cannot be
              undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 flex sm:justify-end justify-center gap-5 sm:gap-3">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          danger
          onClick={() => {
            dispatch(remove(book.id));
            onClose();
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
