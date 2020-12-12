import axios from "axios";
import React, { useEffect } from "react";
import Button from "../../components/Button";
import { useStore } from "../../store/store";
import { IProduct, ICart } from "../../types";

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

  const onDeleteHandler = async (id: string | number) => {
    await axios.patch(`http://localhost:8000/products/${id}`, {
      inCart: false,
    });

    const updatedProducts = state.products.map((product: IProduct) => {
      if (product.id === id) {
        product.inCart = false;
      }
      return product;
    });
    dispatch("SET_PRODUCTS", updatedProducts);
    await axios.delete(`http://localhost:8000/cart/${id}`);
    dispatch("REMOVE_FROM_CART", id);
  };

  const onDecreaseQuantity = async (id: string | number, quantity: number) => {
    await axios.patch(`http://localhost:8000/cart/${id}`, {
      quantity,
    });
    dispatch("DEACREASE_QUANTITY", id);
  };

  const onIncreaseQuantity = async (id: number | string, quantity: number) => {
    await axios.patch(`http://localhost:8000/cart/${id}`, {
      quantity,
    });
    dispatch("INCREASE_QUANTITY", id);
  };

  return (
    <>
      {state.cart.length ? (
        state.cart.map((product: ICart) => {
          return (
            <div key={product.id}>
              <h1>{product.title}</h1>
              <span>{product.price}</span>
              <p>{product.description}</p>
              <p>
                quantity:
                <Button
                  buttonName="-"
                  onClick={() =>
                    onDecreaseQuantity(product.id, product.quantity)
                  }
                />
                {product.quantity}
                <Button
                  buttonName="+"
                  onClick={() =>
                    onIncreaseQuantity(product.id, product.quantity)
                  }
                />
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
      {state.cart.length >= 1 && (
        <div>
          Products quantity:
          {state.cart.reduce((acc: number, cur: ICart) => {
            acc += cur.quantity;
            return acc;
          }, 0)}
        </div>
      )}
      <p>
        Total amount:
        {state.cart.length &&
          state.cart.reduce((acc: number, cur: ICart) => {
            acc += cur.price * cur.quantity;
            return acc;
          }, 0)}
      </p>
    </>
  );
};

export default CartViewPage;
