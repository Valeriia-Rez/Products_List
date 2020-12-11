import React from "react";
import "./Button.scss";

interface IButtonProps {
  buttonName: string;
  onClick(): void;
}

const Button = ({ buttonName, onClick }: IButtonProps) => (
  <button onClick={onClick} type="button">
    {buttonName}
  </button>
);

export default Button;
