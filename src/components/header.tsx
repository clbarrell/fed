import React from "react";
import { ReactComponent as BGV } from "../assets/Vector.svg";
import icon from "../assets/icon.png";
// import { ReactComponent as Wave } from "../assets/wave.svg";

export type HeaderProps = { babyName?: string };
export const Header: React.FC<HeaderProps> = ({ babyName = "" }: HeaderProps) => {
  return (
    <div className="relative">
      <div className="flex items-center absolute inset-x-0 top-0 mt-10 text-center">
        <div className="flex-1 text-indigo-100 text-xl">
          <span role="img" aria-label="baby emojy" className="pr-2">
            👶🏻
          </span>
          {babyName !== "" ? babyName : "Baby"}
        </div>
        <h1 className="flex-1 text-white font-bold text-5xl">
          <img src={icon} alt="Fed icon" className="inline w-12" /> Fed
        </h1>
      </div>
      <BGV />
      {/* <Wave /> */}
    </div>
  );
};

export default Header;
