import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useStore } from "../../store/store";
import axios from "axios";
import Input from "../../components/Input";
import { IProduct } from "../../types";
import "./MainViewPage.scss";
import Pagination from "../../components/Pagination";

const MainViewPage = () => {
  const history = useHistory();
  const [{ products, totalProductsCount, cart }, dispatch] = useStore();
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalProductsCount / 10);
  console.log(products);
  const fetchData = async (page: number, limit: number = 10) => {
    const products = await axios(
      `http://localhost:8000/products?_page=${page}&_limit=${limit}`
    );
    dispatch("SET_PRODUCTS", {
      products: products.data,
      totalProductsCount: products.headers["x-total-count"],
    });
  };

  useEffect(() => {
    if (!products.length) {
      fetchData(currentPage);
    }
  }, [products.length]);

  useEffect(() => {
    fetchData(currentPage);
  }, [history.action]);

  const onSearchClickHandler = async (title: string) => {
    const products = await axios(
      `http://localhost:8000/products?title=${title}`
    );
    dispatch("SET_PRODUCTS", {
      products: products.data,
      totalProductsCount: products.headers["x-total-count"],
    });
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
    const updatedProducts = products.map((product: IProduct) => {
      if (product.id === id) {
        product.inCart = true;
      }
      return product;
    });

    dispatch("SET_PRODUCTS", { products: updatedProducts });
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

  const onPageClickHandler = (selectedPage: number) => {
    fetchData(selectedPage);
    setCurrentPage(selectedPage);
  };

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
            onClick={() => fetchData(0, 10)}
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
            buttonName={`Cart ${!!cart.length ? cart.length : ""}`}
            className="button"
          />
        </div>
      </div>
      <div className="mainViewPage__products">
        {products.map((product: IProduct) => {
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
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageClick={onPageClickHandler}
      />
    </div>
  );
};

export default MainViewPage;
