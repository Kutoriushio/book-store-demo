import clsx from "clsx";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  normal?: boolean;
  danger?: boolean;
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  normal,
  danger,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
      `,
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        normal && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
