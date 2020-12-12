import React from "react";
import { useHistory } from "react-router";
import Button from "../Button";
import "./Card.scss";

interface ICardProps {
  title: string;
  price: number;
  description: string;
  id: string | number;
  inCart: boolean | undefined;
  onDelete(id: string | number): void;
  onAddToCart(): void;
}
const Card = ({
  title,
  price,
  description,
  id,
  inCart,
  onDelete,
  onAddToCart,
}: ICardProps) => {
  const history = useHistory();

  return (
    <div className="card">
      <h1>{title}</h1>
      <span>{price}</span>
      <p>{description}</p>
      <Button onClick={() => history.push(`/edit/${id}`)} buttonName="Edit" />
      <Button onClick={() => onDelete(id)} buttonName="Delete" />
      <Button
        onClick={onAddToCart}
        buttonName="Add to Cart"
        disabled={inCart}
      />
    </div>
  );
};

export default Card;
