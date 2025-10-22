import { Link } from "react-router-dom";

function AddProduct() {
  return (
    <div>
      <Link to={"/seller/myproducts"}> My Products</Link>
    </div>
  );
}

export default AddProduct;
