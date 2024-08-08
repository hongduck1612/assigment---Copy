import React from "react";
import ProductCard from "./component/ProductCard";
import ProductList from "./component/ProductList";

export default async function Home()  {
  const res = await fetch("http://localhost:3000/products");
  const data = await res.json();
  return (
    <div className="container my-3">
      <div>
        <div className="row d-flex justify-content-between mx-1 ">
          <div className="p-1 w-auto">
            <h5 className="text-success">TẤT CẢ SẢN PHẨM</h5>
          </div>
        </div>
        <div className="row ">
          <ProductCard data={data} />
        </div>
      </div>
      <div>
        <div className="row d-flex justify-content-between mx-1 ">
          <div className="p-1 w-auto">
            <h5 className="text-success">SẢN PHẨM ĐANG GIẢM GIÁ</h5>
          </div>
        </div>
        <div className="row ">
          <ProductList data={data} />
        </div>
      </div>
    </div>
  );
};