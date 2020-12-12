import React from "react";
import "./Button.scss";

interface IButtonProps {
  buttonName: string;
  onClick(): void;
  disabled?: boolean;
  className: string;
}

const Button = ({ buttonName, onClick, disabled, className }: IButtonProps) => (
  <button
    onClick={onClick}
    type="button"
    disabled={disabled}
    className={className}
  >
    {buttonName}
  </button>
);

export default Button;
