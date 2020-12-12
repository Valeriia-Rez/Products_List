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
      <div className="card__wrapper">
        <h1 className="card__heading">{title}</h1>
        <span>Price: {price}</span>
        <p>{description}</p>
        <div className="card__buttons">
          <div className="card__buttonsLeft">
            <Button
              onClick={() => history.push(`/edit/${id}`)}
              buttonName="Edit"
              className="button"
            />
            <Button
              onClick={() => onDelete(id)}
              buttonName="Delete"
              className="button"
            />
          </div>
          <Button
            onClick={onAddToCart}
            buttonName="Add to Cart"
            disabled={inCart}
            className={inCart ? "button button-disabled" : "button"}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
