import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useStore } from "../../store/store";

export interface ICreateViewPageProps {
  title?: string;
  price?: number;
  description?: string;
  id?: string;
}

const CreateViewPage = ({
  title = "",
  price = 0,
  description = "",
  id = "",
}: ICreateViewPageProps) => {
  const [titleValue, setTitleValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<number>(0);
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const history = useHistory();
  const [state, dispatch] = useStore();

  useEffect(() => {
    setTitleValue(title);
    setPriceValue(price);
    setDescriptionValue(description);
  }, [title, price, description]);

  const onSaveClickHandler = async () => {
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
    <>
      <Input value={titleValue} onChange={setTitleValue} type="text" />
      <Input value={priceValue} onChange={setPriceValue} type="number" />
      <Input
        value={descriptionValue}
        onChange={setDescriptionValue}
        type="text"
      />
      <Button onClick={onSaveClickHandler} buttonName="Save" />
    </>
  );
};

export default CreateViewPage;
