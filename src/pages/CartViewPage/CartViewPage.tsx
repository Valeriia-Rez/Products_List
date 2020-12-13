import axios from "axios";
import React, { useEffect } from "react";
import Button from "../../components/Button";
import { useStore } from "../../store/store";
import { IProduct, ICartItem } from "../../types";
import "./CartViewPage.scss";

const totalQuantity = (cart: ICartItem[]) =>
  cart.reduce((acc: number, cur: ICartItem) => {
    acc += cur.quantity;
    return acc;
  }, 0);

const totalAmount = (cart: ICartItem[]) =>
  cart.reduce((acc: number, cur: ICartItem) => {
    acc += cur.price * cur.quantity;
    return acc;
  }, 0);

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
  }, [state.cart.length]);

  const onDeleteHandler = async (id: string) => {
    await axios.patch(`http://localhost:8000/products/${id}`, {
      inCart: false,
    });
    const updatedProducts = state.products.map((product: IProduct) => {
      if (product.id === id) {
        product.inCart = false;
      }
      return product;
    });
    dispatch("SET_PRODUCTS", { products: updatedProducts });
    await axios.delete(`http://localhost:8000/cart/${id}`);
    dispatch("REMOVE_FROM_CART", id);
  };

  const onDecreaseQuantity = async (id: string, quantity: number) => {
    if (quantity - 1 >= 1) {
      await axios.patch(`http://localhost:8000/cart/${id}`, {
        quantity: quantity - 1,
      });
      dispatch("DEACREASE_QUANTITY", id);
    }
  };

  const onIncreaseQuantity = async (id: string, quantity: number) => {
    await axios.patch(`http://localhost:8000/cart/${id}`, {
      quantity: quantity + 1,
    });
    dispatch("INCREASE_QUANTITY", id);
  };

  return (
    <div className="cart">
      <div className="cart__wrapper">
        {state.cart.length ? (
          state.cart.map((product: ICartItem) => {
            return (
              <div key={product.id} className="cart__product">
                <h1>{product.title}</h1>
                <span>Price: {product.price}</span>
                <p>Description: {product.description}</p>
                <p>
                  quantity:
                  <Button
                    buttonName="-"
                    onClick={() =>
                      onDecreaseQuantity(product.id, product.quantity)
                    }
                    className="button-sm"
                  />
                  {product.quantity}
                  <Button
                    buttonName="+"
                    onClick={() =>
                      onIncreaseQuantity(product.id, product.quantity)
                    }
                    className="button-sm"
                  />
                </p>
                <Button
                  onClick={() => onDeleteHandler(product.id)}
                  buttonName="Delete"
                  className="button"
                />
              </div>
            );
          })
        ) : (
          <p className="cart__message">Your cart is empty. </p>
        )}
      </div>
      {state.cart.length >= 1 && (
        <div className="cart__info">
          <div>
            Products quantity: {totalQuantity(state.cart)}
            <span className="cart__infoItem"></span>
          </div>
          <div>
            Total amount: {state.cart.length && totalAmount(state.cart)}
            <span className="cart__infoItem"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartViewPage;
