import React from "react";
import "./Input.scss";

interface IInputProps {
  value: string | number;
  onChange: any;
  type: string;
}

const Input = ({ value, onChange, type }: IInputProps) => {
  return (
    <>
      <input
        type={type}
        name="search-field"
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </>
  );
};

export default Input;
