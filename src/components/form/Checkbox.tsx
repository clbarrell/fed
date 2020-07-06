import React from "react";

export type CheckboxProps = {
  isChecked: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  checkedValue: string;
  labelLeft?: string;
  labelRight?: string;
};
export const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onChange,
  checkedValue,
  labelLeft = "",
  labelRight = "",
}) => {
  return (
    <label
      htmlFor="mainSideCheckBox"
      className="flex items-center justify-center cursor-pointer bg-indigo-100 px-4 py-4 rounded-lg w-64"
    >
      {/* <!-- label --> */}
      <div className={`ml-3 font-medium mr-3 text-lg ${!isChecked ? "font-bold text-pink-500" : "text-indigo-400"}`}>
        {labelLeft}
      </div>
      {/* <!-- toggle --> */}
      <div className="relative">
        {/* <!-- input, checked = left, unchecked = right --> */}
        <input
          id="mainSideCheckBox"
          type="checkbox"
          className="hidden"
          value={checkedValue}
          checked={isChecked}
          onChange={onChange}
        />
        {/* <!-- line --> */}
        <div className="toggle__line w-16 h-8 bg-indigo-200 rounded-full shadow-inner"></div>
        {/* <!-- dot --> */}
        <div className="toggle__dot absolute w-8 h-8 bg-pink-500 rounded-full shadow inset-y-0 left-0 transition-all ease-in-out duration-500"></div>
      </div>
      {/* <!-- label --> */}
      <div className={`ml-3 font-medium mr-3 text-lg ${isChecked ? "font-bold text-pink-500" : "text-indigo-500"}`}>
        {labelRight}
      </div>
    </label>
  );
};

export default Checkbox;
