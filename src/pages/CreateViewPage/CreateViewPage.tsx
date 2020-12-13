import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useStore } from "../../store/store";
import "./CreateViewPage.scss";

export interface ICreateViewPageProps {
  title?: string;
  price?: number;
  description?: string;
  id?: string;
}

const CreateViewPage = ({
  title = "",
  price,
  description = "",
  id = "",
}: ICreateViewPageProps) => {
  const [titleValue, setTitleValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<number | undefined>(undefined);
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const history = useHistory();
  const [, dispatch] = useStore();

  useEffect(() => {
    setTitleValue(title);
    setPriceValue(price);
    setDescriptionValue(description);
  }, [title, price, description]);

  const onSaveHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      title: titleValue,
      price: priceValue,
      description: descriptionValue,
      inCart: false,
    };
    if (id) {
      const editedProduct = await axios.patch(
        `http://localhost:8000/products/${id}`,
        product
      );
      dispatch("EDIT_PRODUCT", editedProduct.data);
    } else {
      const createdProduct = await axios.post(
        `http://localhost:8000/products`,
        product
      );
      dispatch("SET_PRODUCT", createdProduct.data);
    }
    history.push("/");
  };

  return (
    <div className="createViewPage">
      <form className="createViewPage__form" onSubmit={onSaveHandler}>
        <Input
          value={titleValue}
          onChange={setTitleValue}
          type="text"
          placeholder="Enter product title..."
          required={true}
        />
        <Input
          value={priceValue}
          onChange={setPriceValue}
          type="number"
          placeholder="Enter product price..."
          required={true}
        />
        <Input
          value={descriptionValue}
          onChange={setDescriptionValue}
          type="text"
          placeholder="Enter product description..."
          required={true}
        />
        <Button
          type="submit"
          buttonName="Save"
          className="button button-save"
        />
      </form>
    </div>
  );
};

export default CreateViewPage;
