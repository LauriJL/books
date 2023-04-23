import React from "react";
import { useState, useEffect } from "react";

const Pagination = (props) => {
  console.log("pagination props: ", props);
  return (
    <>
      <p>{props.pagecount}</p>
      <p>{props.next}</p>
      <p>{props.prev}</p>
    </>
  );
};

export default Pagination;
