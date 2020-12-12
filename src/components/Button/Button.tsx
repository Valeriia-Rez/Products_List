import React from "react";
import "./Button.scss";

interface IButtonProps {
  buttonName: string;
  onClick(): void;
  disabled?: boolean;
}

const Button = ({ buttonName, onClick, disabled }: IButtonProps) => (
  <button
    onClick={onClick}
    type="button"
    disabled={disabled}
    className="button"
  >
    {buttonName}
  </button>
);

export default Button;
