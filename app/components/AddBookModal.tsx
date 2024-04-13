import Button from "@/app/components/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "./Input";
import { useAppDispatch } from "../redux/hooks";
import { add } from "../redux/book/bookSlice";

interface AddBookModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
    },
  });
  const onSubmit: SubmitHandler<any> = (data) => {
    dispatch(add(data));
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <div className="text-left">
        <div className="text-base font-semibold leading-7 text-gray-900">
          Add a new book
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Add a new book with details.
        </p>

        <form
          className="mt-5 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <Input id="name" register={register} />
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Price
          </label>
          <Input id="price" register={register} />
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Category
          </label>
          <Input id="category" register={register} />
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <Input id="description" register={register} />
          <hr className="mt-5" />
          <div className="flex mt-6 justify-end items-center gap-6">
            <Button
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button normal>Add</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddBookModal;
