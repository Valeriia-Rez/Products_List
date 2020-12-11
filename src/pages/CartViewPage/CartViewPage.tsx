import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useStore } from "../../store/store";

const CartViewPage = () => {
  const [state, dispatch] = useStore();

  const fetchData = async () => {
    const products = await axios("http://localhost:8000/cart");
    dispatch("ADD_TO_CART", products.data);
  };

  useEffect(() => {
    if (!state.cart.length) {
      fetchData();
    }
  }, [state.cart]);

  const onDeleteHandler = async (id: string) => {
    await axios.patch(`http://localhost:8000/products/${id}`, {
      inCart: false,
    });

    const updatedProducts = state.products.map((product: any) => {
      if (product.id === id) {
        product.inCart = false;
      }
      return product;
    });
    dispatch("SET_PRODUCTS", updatedProducts);
    await axios.delete(`http://localhost:8000/cart/${id}`);
    dispatch("REMOVE_FROM_CART", id);
  };

  return (
    <>
      {state.cart.length ? (
        state.cart.map((product: any) => {
          return (
            <div key={product.id}>
              <h1>{product.title}</h1>
              <span>{product.price}</span>
              <p>{product.description}</p>
              <p>
                quantity:
                <Button buttonName="-" onClick={() => console.log("-")} />
                {product.quantity}
                <Button buttonName="+" onClick={() => console.log("+")} />
              </p>
              <Button
                onClick={() => onDeleteHandler(product.id)}
                buttonName="Delete"
              />
            </div>
          );
        })
      ) : (
        <p>Your cart is empty. </p>
      )}
      {/* {addToCartProducts.length >= 1 && <div>{addToCartProducts.length}</div>} */}
    </>
  );
};

export default CartViewPage;
