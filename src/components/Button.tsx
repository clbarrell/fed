import React from "react";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};
export const Button: React.FC<ButtonProps> = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-5 rounded-lg text-lg h-20"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
