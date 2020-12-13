import React from "react";
import "./Input.scss";

interface IInputProps {
  value: string | number | undefined;
  onChange: Function;
  type: string;
  placeholder: string;
  onKeyPress?(e: React.SyntheticEvent): void;
  required?: boolean;
}

const Input = ({
  value,
  onChange,
  type,
  placeholder,
  onKeyPress,
  required,
}: IInputProps) => (
  <input
    type={type}
    name="search-field"
    className="input"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    onKeyPress={(e) => onKeyPress && onKeyPress(e)}
    required={required}
  ></input>
);

export default Input;
