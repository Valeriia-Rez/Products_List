import React, { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import CreateViewPage from "../CreateViewPage";
import { RouteComponentProps } from "react-router";
import { ICreateViewPageProps } from "../CreateViewPage/CreateViewPage";
import axios from "axios";

interface IRouteInfo {
  id: string;
}

const EditViewPage = (props: RouteComponentProps<IRouteInfo>) => {
  const [state] = useStore();
  const [selectedProduct, setSelectedProduct] = useState<ICreateViewPageProps>(
    {}
  );

  useEffect(() => {
    const productId = props.match.params.id;
    const getEditedProduct = async (productId: string) => {
      let editedProduct;
      if (state.products.length) {
        editedProduct = state.products.find((product: any) => {
          return product.id === productId;
        });
      } else {
        const products = await axios(`http://localhost:8000/products`);
        editedProduct = products.data.find((product: any) => {
          return product.id === productId;
        });
      }
      setSelectedProduct(editedProduct);
    };
    getEditedProduct(productId);
  }, [props.match.params.id]);

  return (
    <>
      {selectedProduct ? (
        <CreateViewPage
          title={selectedProduct.title}
          price={selectedProduct.price}
          description={selectedProduct.description}
          id={selectedProduct.id}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default EditViewPage;
