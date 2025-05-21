import React from 'react'
import allProductsData from "../Data/allProductsData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";

function DermotologyScreen() {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="homescreen">
        <div className="container text-center">
          <h1 className="mt-3">{allProductsData[0].title}</h1>
          <hr className="w-25 mx-auto" />
        </div>
        <div className="homescreen__products">
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            products.map((product) => (
              <Product
                key={product.id}
                imgsrc={product.imgsrc}
                title={product.title}
                indication={product.info}
                dosage="Please consult your doctor for dosage information"
                sideEffects="Please consult your doctor for side effects information"
                price={product.price || 360}
                productId={product.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DermotologyScreen
