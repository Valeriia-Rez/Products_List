import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useStore } from "../../store/store";
import axios from "axios";
import Input from "../../components/Input";
import { IProduct } from "../../types";
import "./MainViewPage.scss";

const MainViewPage = () => {
  const history = useHistory();
  const [state, dispatch] = useStore();
  const [searchTitle, setSearchTitle] = useState("");

  const fetchData = async () => {
    const products = await axios("http://localhost:8000/products");
    dispatch("SET_PRODUCTS", products.data);
  };

  useEffect(() => {
    if (!state.products.length) {
      fetchData();
    }
    console.log("render");
  }, [state.products.length]);

  const onSearchClickHandler = async (title: string) => {
    const products = await axios(
      `http://localhost:8000/products?title=${title}`
    );
    dispatch("SET_PRODUCTS", products.data);
  };

  const onDeleteHandler = async (id: string) => {
    await axios.delete(`http://localhost:8000/products/${id}`);
    dispatch("DELETE_PRODUCT", id);
  };

  const onAddToCartHandler = async ({
    id,
    title,
    price,
    description,
  }: IProduct) => {
    const addedProduct = {
      title,
      price,
      description,
      id,
      quantity: 1,
    };
    await axios.patch(`http://localhost:8000/products/${id}`, { inCart: true });
    const updatedProducts = state.products.map((product: IProduct) => {
      if (product.id === id) {
        product.inCart = true;
      }
      return product;
    });

    dispatch("SET_PRODUCTS", updatedProducts);
    const addedProductToCart = await axios.post(
      `http://localhost:8000/cart`,
      addedProduct
    );
    dispatch("ADD_TO_CART", [addedProductToCart.data]);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onSearchClickHandler(searchTitle);
    }
  };

  console.log(state);
  return (
    <div className="mainViewPage">
      <div className="mainViewPage__wrapper">
        <Input
          value={searchTitle}
          onChange={setSearchTitle}
          type="text"
          placeholder="Enter title to search product..."
          onKeyPress={onKeyPressHandler}
        />
        <div className="mainViewPage__buttons">
          <Button
            onClick={() => onSearchClickHandler(searchTitle)}
            buttonName="Search"
            className="button"
          />
          <Button
            onClick={() => fetchData()}
            buttonName="Get All"
            className="button"
          />
          <Button
            onClick={() => history.push("/create")}
            buttonName="Create"
            className="button"
          />
          <Button
            onClick={() => history.push("/cart")}
            buttonName={`Cart ${!!state.cart.length ? state.cart.length : ""}`}
            className="button"
          />
        </div>
      </div>
      <div className="mainViewPage__products">
        {state.products.map((product: IProduct) => {
          return (
            <Card
              onAddToCart={() => onAddToCartHandler(product)}
              onDelete={onDeleteHandler}
              key={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              id={product.id}
              inCart={product.inCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainViewPage;
