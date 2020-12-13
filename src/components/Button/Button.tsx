import React from "react";
import "./Button.scss";

interface IButtonProps {
  buttonName: string;
  onClick?(): void;
  disabled?: boolean;
  className: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  buttonName,
  onClick,
  disabled,
  className,
  type = "button",
}: IButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={className}
    type={type}
  >
    {buttonName}
  </button>
);

export default Button;
