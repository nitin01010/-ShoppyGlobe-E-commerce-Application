import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addToCart } from '../features/cart/cartSlice';

const ProductsDetails = () => {
  const products = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = products.find((item) => item.id.toString() === id.toString());
  const { description, images, price, rating, title } = product;
  const nav = useNavigate();

  const handleBuynow = (item) => {
    dispatch(addToCart(item));
    nav('/products/cart');
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-5 w-[90%] lg:w-[80%] mx-auto mt-4">
        <img src={images[0]} alt={title} className="w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded" />
        <div className="mt-5 lg:mt-20 w-full">
          <p className="text-2xl p-1">{title}</p>
          <p className="text-lg mt-3">{description}</p>

          <h2 className="font-semibold text-xl mt-5 underline decoration-wavy">About this item</h2>
          <ul className="mt-2">
            <li>{description}</li>
          </ul>

          <div className="flex flex-col sm:flex-row sm:justify-between mt-10 items-start sm:items-center">
            <p className="text-2xl font-bold mb-2 sm:mb-0">₹ {price}</p>
            <div className="flex items-center gap-1">
              <p className="font-bold">{rating}</p>
              <p>{'⭐'.repeat(Math.floor(rating))}</p>
            </div>
          </div>

          <div className="flex gap-5 mt-10">
            <button
              onClick={() => handleBuynow(product)}
              className="bg-amber-300 w-full h-[50px] text-lg font-semibold rounded"
            >
              Buy
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#f2f2f2] w-[90%] lg:w-[80%] mx-auto mt-6">
        <p className="text-2xl font-bold p-2">Related products</p>
      </div>
    </>
  );
};

export default ProductsDetails;