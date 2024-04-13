import Button from "@/app/components/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "./Input";
import { useAppDispatch } from "../redux/hooks";
import { BookState, edit } from "../redux/book/bookSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface EditBookModalProps {
  isOpen?: boolean;
  onClose: () => void;
  book: BookState;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  onClose,
  book,
}) => {
  const dispatch = useAppDispatch();
  const schema = yup.object({
    name: yup.string().required("Name is required."),
    price: yup
      .number()
      .typeError("Price must be a number.")
      .positive("The price should be positive.")
      .required("Price is required."),
    category: yup.string().required("Category is required."),
    description: yup.string().required("Description is required."),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
    defaultValues: {
      id: book.id,
      name: book.name,
      price: book.price,
      category: book.category,
      description: book.description,
    },
  });
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    dispatch(edit(data));
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
          Edit the book
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Edit the book with details.
        </p>

        <form
          className="mt-5 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <Input id="name" register={register} errors={errors} />
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Price
          </label>
          <Input id="price" register={register} errors={errors} />
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Category
          </label>
          <Input id="category" register={register} errors={errors} />
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            cols={10}
            className="block rounded-md w-full border-0 ring-1 ring-inset ring-gray-300 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />
          <hr className="mt-5" />
          <div className="flex mt-6 justify-end items-center gap-6">
            <Button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button normal type="submit">
              Edit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditBookModal;
