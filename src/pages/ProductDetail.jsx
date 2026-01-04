// import React from "react";
import ProductsDetailsSlider from "./../components/ProductsDetailsSlider";
// import { IoMdHeartEmpty } from "react-icons/io";
import { useGetProductsQuery } from "../services/productsApi";
import { useParams } from "react-router-dom";
// import StarRatings from "react-star-ratings";
import LoadingSpiner from "../components/LoadingSpiner";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/addToCart/addCartSlice";
// import { addToWish } from "../features/addToWish/addWishSlice";

const ProductDetail = () => {
  const patch = useDispatch();

  const handleCart = (product) => {
    patch(addToCart(product));
  };
  // const handleWish = (product) => {
  //   patch(addToWish(product));
  // };

  const { error, data, isLoading } = useGetProductsQuery();
  const { title } = useParams();

  if (isLoading) return <LoadingSpiner />;

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error: {error.message}</div>;
  }

  const product = data.find(
    (item) =>
      item.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-") === title
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="w-full md:py-20">
        <div className="w-full h-full max-w-[1280px] px-5 md:px-10 mx-auto py-[100px]">
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]  ">
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <ProductsDetailsSlider product={product} />
            </div>
            <div className="flex-[1] py-3">
              <div className="text-[34px] font-semibold mb-2 capitalize">
                {product.title}
              </div>
              <div>PKR : Rs.{product.price}</div>
              <div className="text-md font-medium text-black/[0.5]">
                incl. of texes
              </div>
              <div className="text-md font-medium text-black/[0.5] mb-20">
                {`(Also includes all applicable duties)`}
              </div>
              <button                onClick={() => { handleCart(product); }}
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95  mb-3 hover:opacity-75"
              >
                Add to Cart
              </button>
              <div>
                <div className="capitalize text-lg font-bold mb-5">
                  product details
                </div>
                <div className="mb-5 capitalize">{product.description}</div>
              </div>
            </div>
            {/* right col end   */}
          </div>
          <RelatedProducts products={data} />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
