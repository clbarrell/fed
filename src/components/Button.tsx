import React from "react";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  secondary?: boolean;
};
export const Button: React.FC<ButtonProps> = ({ children, onClick, secondary = false }: ButtonProps) => {
  const buttonClasses = !secondary
    ? "bg-purple-500 hover:bg-purple-700 text-white"
    : "border-2 border-purple-500 hover:border-purple-700 text-purple-500 hover:text-purple-700 bg-white";
  return (
    <button className={`font-bold py-1 px-5 rounded-lg text-lg h-16 ${buttonClasses}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
