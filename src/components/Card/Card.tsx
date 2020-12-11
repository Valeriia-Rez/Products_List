import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import { useStore } from "../../store/store";
import Button from "../Button";
import "./Card.scss";

interface ICardProps {
  title: string;
  price: number;
  description: string;
  id: string;
  setRefetchProducts(isRefetch: boolean): void;
}
const Card = ({
  title,
  price,
  description,
  id,
  setRefetchProducts,
}: ICardProps) => {
  const history = useHistory();
  const onDeleteHandler = async (id: string) => {
    await axios.delete(`http://localhost:8000/products/${id}`);
    setRefetchProducts(true);
  };

  const onAddToCartHandler = () => {
    console.log("ff");
  };

  return (
    <div className="card">
      <h1>{title}</h1>
      <span>{price}</span>
      <p>{description}</p>
      <Button onClick={() => history.push("/edit")} buttonName="Edit" />
      <Button onClick={() => onDeleteHandler(id)} buttonName="Delete" />
      <Button onClick={onAddToCartHandler} buttonName="Add to Cart" />
    </div>
  );
};

export default Card;
