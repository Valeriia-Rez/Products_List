import React from "react";
import Button from "../Button";

const Pagination = ({
  totalPages,
  currentPage,
  onPageClick,
}: {
  totalPages: number;
  currentPage: number;
  onPageClick: (currentPage: number) => void;
}) => {
  let pagination;
  if (totalPages > 0) {
    pagination = Array.from(Array(totalPages), (e, i) => {
      return (
        <Button
          key={i}
          buttonName={`Page ${i + 1}`}
          className={`button button-sm ${
            currentPage === i + 1 ? " active" : ""
          }`}
          onClick={() => onPageClick(i + 1)}
        />
      );
    });
  }
  return <div>{pagination}</div>;
};

export default Pagination;
