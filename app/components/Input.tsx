import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({ id, register, errors }) => {
  return (
    <>
      <input
        id={id}
        {...register(id)}
        className="block rounded-md w-full border-0 ring-1 ring-inset ring-gray-300 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
      />
      <p className="text-red-500 text-sm pt-[2px]">
        {errors[id]?.message?.toString()}
      </p>
    </>
  );
};

export default Input;
