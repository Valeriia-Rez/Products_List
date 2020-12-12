import React from "react";
import "./Input.scss";

interface IInputProps {
  value: string | number | undefined;
  onChange(term: any): void;
  type: string;
  placeholder: string;
  onKeyPress?(e: React.SyntheticEvent): void;
}

const Input = ({
  value,
  onChange,
  type,
  placeholder,
  onKeyPress,
}: IInputProps) => {
  return (
    <input
      type={type}
      name="search-field"
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyPress={(e) => onKeyPress && onKeyPress(e)}
    ></input>
  );
};

export default Input;
