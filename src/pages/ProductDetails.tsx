import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { pid } = useParams<{ pid: string }>();
  return (
    <div>
      ProductDetails {pid}
    </div>
  )
}

export default ProductDetails