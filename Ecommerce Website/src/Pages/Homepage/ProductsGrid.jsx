import { formatMoney } from "../../utils/money";
import { Product } from "./Product";
import { useState } from "react";
import axios from "axios";

export function ProductsGrid({ products, cart, loadCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return(
           <Product key={product.id} product={product} loadCart={loadCart}/>
        );
      })}
    </div>
  );
}
