import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '../assets/delete.png';
import AddIcons from '../assets/plus.png';
import { useState } from "react";
import { changeQty, incrementQty } from "../features/cart/cartSlice";
import productsCartAnimation from '../assets/productsCartAnimation.gif';

const ItamCart = ({ data }) => {
    const { id, images, price, title, qty } = data;
    const dispatch = useDispatch();

    return (
        <div className="bg-white flex flex-col sm:flex-row gap-2 border-b border-gray-200 p-2 mt-5">
            <img className="w-full sm:w-[200px] h-[200px] object-cover rounded" src={images[0]} />
            <div className="flex flex-col relative w-full p-1">
                <p className="text-base">{title}</p>
                <p className="text-xs py-2 text-green-400">In stock</p>
                <p className="text-sm text-gray-400">Eligible for FREE Shipping</p>
                <p className="text-xl sm:absolute right-4 top-10 font-semibold mt-2 sm:mt-0">₹ {price.toFixed(2)}</p>
                <p className="text-xs sm:absolute right-1 top-[6rem] sm:top-[4.5rem] line-through text-gray-400">
                    M.R.P.: ₹ {(price + 1000).toFixed(2)}
                </p>
                <div className="flex items-center bg-yellow-300 mt-4 rounded-full w-[130px] h-[32px]">
                    <img
                        src={DeleteIcon}
                        onClick={() => dispatch(changeQty({ id, qty: qty - 1 }))}
                        className="cursor-pointer h-[20px] ml-2"
                    />
                    <p className="flex-1 text-center font-semibold">{qty}</p>
                    <img
                        src={AddIcons}
                        onClick={() => dispatch(incrementQty({ id, qty: qty + 1 }))}
                        className="cursor-pointer h-[17px] mr-2"
                    />
                </div>
            </div>
        </div>
    );
};

const ProductCart = () => {
    const [qtyMap, setQtyMap] = useState({});
    const [coupon, setCoupon] = useState('');
    const [error, setError] = useState('');
    const [discounted, setDiscounted] = useState(false);

    const products = useSelector((state) => state.cart.productsInCart);
    const totalUnits = products.reduce((acc, item) => acc + item.qty, 0);
    const baseTotal = products.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalPrice = discounted ? (baseTotal * 0.9).toFixed(2) : baseTotal.toFixed(2);

    const handleQtyChange = (id, newQty) => {
        if (newQty <= 0) {
            setQtyMap(prev => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
        } else {
            setQtyMap(prev => ({ ...prev, [id]: newQty }));
        }
    };

    const handleApplyCoupon = () => {
        if (coupon.trim().toLowerCase() === 'save10') {
            setDiscounted(true);
            setError('');
        } else {
            setError('Invalid coupon code');
            setDiscounted(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-5 bg-[#f2f2f2] p-4 sm:p-8">
            {/* Left Side */}
            <div className="w-full lg:w-[70%] bg-white p-4">
                <p className="text-2xl font-semibold mb-2">Shopping Cart</p>
                <p className="text-sm text-right text-gray-800">Price</p>
                <div className="bg-gray-200 h-[1px] w-full my-2" />
                {products.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-[40vh]">
                        <p className="text-2xl text-gray-200 mb-5">No Products Selected</p>
                        <img className="object-contain m-auto max-h-[250px]" src={productsCartAnimation} />
                    </div>
                ) : (
                    <>
                        {products.map((item) => (
                            <ItamCart
                                key={item.id}
                                data={item}
                                qty={qtyMap[item.id] || 1}
                                setQty={(q) => handleQtyChange(item.id, q)}
                            />
                        ))}
                    </>
                )}
                <div className="flex justify-end border-t pt-4 mt-4">
                    <p className="text-lg font-semibold">
                        Subtotal ({totalUnits} items): ₹ {totalPrice}
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-[30%] bg-white p-4 space-y-4">
                
                {totalPrice > 0 && (
                    <div>
                    <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter coupon code"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                    <button
                        onClick={handleApplyCoupon}
                        className="w-full bg-black text-white mt-2 py-2 rounded hover:bg-gray-800"
                    >
                        Apply Coupon
                    </button>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    {discounted && <p className="text-green-500 text-sm mt-1">Coupon applied! 10% off</p>}
                </div>
                )}
                {Number(totalPrice) > 0 && (
                    <button className="w-full bg-amber-300 py-3 rounded shadow capitalize text-lg">
                        Pay Now ₹ {totalPrice}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCart;