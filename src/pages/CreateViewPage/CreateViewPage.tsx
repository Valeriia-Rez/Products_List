import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import Input from "../../components/Input";

interface ICreateViewPageProps {
  title?: string;
  price?: number;
  description?: string;
}

const CreateViewPage = (props: ICreateViewPageProps) => {
  const [title, setTitle] = useState<string>(props.title || "");
  const [price, setPrice] = useState<number>(props.price || 0);
  const [description, setDescription] = useState<string>(
    props.description || ""
  );
  const history = useHistory();
  const onSaveClickHandler = async () => {
    const product = {
      title,
      price,
      description,
    };
    await axios.post(`http://localhost:8000/products`, product);
    history.push("/");
  };

  return (
    <>
      <Input value={title} onChange={setTitle} type="text" />
      <Input value={price} onChange={setPrice} type="number" />
      <Input value={description} onChange={setDescription} type="text" />
      <Button onClick={onSaveClickHandler} buttonName="Save" />
    </>
  );
};

export default CreateViewPage;
