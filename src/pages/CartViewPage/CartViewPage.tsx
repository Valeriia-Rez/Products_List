import axios from "axios";
import React, { useEffect } from "react";
import Button from "../../components/Button";
import { useStore } from "../../store/store";
import { IProduct, ICart } from "../../types";
import "./CartViewPage.scss";

const CartViewPage = () => {
  const [state, dispatch] = useStore();

  const fetchData = async () => {
    const products = await axios("http://localhost:8000/cart");
    console.log(products.data);
    dispatch("ADD_TO_CART", products.data);
  };

  useEffect(() => {
    if (!state.cart.length) {
      fetchData();
    }
  }, [state.cart.length]);

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
    if (quantity - 1 >= 1) {
      await axios.patch(`http://localhost:8000/cart/${id}`, {
        quantity: quantity - 1,
      });
      dispatch("DEACREASE_QUANTITY", id);
    }
  };

  const onIncreaseQuantity = async (id: number | string, quantity: number) => {
    await axios.patch(`http://localhost:8000/cart/${id}`, {
      quantity: quantity + 1,
    });
    dispatch("INCREASE_QUANTITY", id);
  };
  console.log(state.cart);
  return (
    <div className="cart">
      <div className="cart__wrapper">
        {state.cart.length ? (
          state.cart.map((product: ICart) => {
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
            Products quantity:
            <span className="cart__infoItem">
              {state.cart.reduce((acc: number, cur: ICart) => {
                acc += cur.quantity;
                return acc;
              }, 0)}
            </span>
          </div>
          <div>
            Total amount:
            <span className="cart__infoItem">
              {state.cart.length &&
                state.cart.reduce((acc: number, cur: ICart) => {
                  acc += cur.price * cur.quantity;
                  return acc;
                }, 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartViewPage;
