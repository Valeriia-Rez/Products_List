import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useStore } from "../../store/store";
import axios from "axios";
import Input from "../../components/Input";

const MainViewPage = () => {
  const history = useHistory();
  const [state, dispatch] = useStore();
  const [refetchProducts, setRefetchProducts] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const products = await axios("http://localhost:8000/products");
      dispatch("FETCH_PRODUCTS", products.data);
      setRefetchProducts(false);
    };
    fetchData();
  }, [refetchProducts]);

  const onSearchClickHandler = async (title: string) => {
    const products = await axios(
      `http://localhost:8000/products?title=${title}`
    );
    dispatch("FETCH_PRODUCTS", products.data);
  };

  return (
    <>
      <Input value={searchTitle} onChange={setSearchTitle} type="text" />
      <Button
        onClick={() => onSearchClickHandler(searchTitle)}
        buttonName="Search"
      />
      <Button onClick={() => setRefetchProducts(true)} buttonName="Get All" />
      <Button onClick={() => history.push("/create")} buttonName="Create" />
      <div>
        {state.products.map((product: any) => {
          return (
            <Card
              key={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              id={product.id}
              setRefetchProducts={setRefetchProducts}
            />
          );
        })}
      </div>
    </>
  );
};

export default MainViewPage;
