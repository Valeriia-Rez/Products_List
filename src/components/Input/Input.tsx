import React from "react";
import "./Input.scss";

interface IInputProps {
  value: string | number;
  onChange(term: any): void;
  type: string;
}

const Input = ({ value, onChange, type }: IInputProps) => {
  return (
    <input
      type={type}
      name="search-field"
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter title for search product.."
    ></input>
  );
};

export default Input;
