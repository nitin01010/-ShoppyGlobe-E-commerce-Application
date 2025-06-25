import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { addToCart, setProducts } from "../features/cart/cartSlice";
import { toast } from 'react-toastify';
import BagAnimation from '../assets/shopping-bag.gif';

const Card = () => {
    const [filterQuery, setFilterQuery] = useState("");
    const products = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();
    const nagigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.productsInCart);
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(() => {
        if (products.length === 0) {
            const fetchData = async () => {
                const data = await axios.get("https://dummyjson.com/products");
                dispatch(setProducts(data.data.products));
            };
            fetchData();
        }
    }, []);

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
        toast(`Added to Cart`, { position: "bottom-right" });
    };

    const handleFilter = (e) => {
        const q = e.target.value;
        setFilterQuery(q);
    };

    const visibleProducts = useMemo(() => {
        let result = [...products];

        if (filterQuery.trim()) {
            const q = filterQuery.trim().toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q)
            );
        }

        if (sortOrder === "asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, filterQuery, sortOrder]);

    const handleSort = (order) => {
        if (sortOrder === order) {
            setSortOrder(null);
        } else {
            setSortOrder(order);
        }
    };

    return (
        <>
            <div className=" bg-[#f2f2f2]">
                <div className=" flex bg-[#f2f2f2] flex-wrap justify-end py-2 relative w-[83%] m-auto ">
                    <div className="flex text-sm gap-5 justify-between sm:justify-normal w-full mb-2 sm:absolute left-1 top-2 z-10">
                        <button
                            className={`bg-white text-xs md:text-base  px-2 py-2  md:py-4   md:px-4  rounded shadow ${sortOrder === 'asc' ? 'ring-2 ring-black' : ''
                                }`}
                            onClick={() => handleSort('asc')}
                        >
                            Price: Low to High
                        </button>
                        <button
                            className={`bg-white text-xs md:text-base  px-2 py-2  md:py-4   md:px-4  rounded shadow ${sortOrder === 'desc' ? 'ring-2 ring-black' : ''
                                }`}
                            onClick={() => handleSort('desc')}
                        >
                            Price: High to Low
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Search here ...."
                        className="rounded shadow p-3 outline-none border-none bg-white w-full md:w-[400px] z-20"
                        onChange={handleFilter}
                        value={filterQuery}
                    />
                </div>
            </div>

            <div className=' flex items-center flex-wrap  justify-center gap-10 bg-[#f2f2f2] sm:p-5'>
                {
                    visibleProducts?.map((item, idx) => {
                        const { description, images, price, rating, title, id } = item;
                        return (
                            <div key={idx} className=' rounded-lg w-[300px]  bg-white p-2' >
                                <img onClick={() => nagigate(`/product/${id}`)} className="h-48 bg-amber-300 cursor-pointer w-96 object-cover shadow rounded-t-lg" src={images[0]} />
                                <p onClick={() => nagigate(`/product/${id}`)} className=' hover:text-yellow-300 text-base  p-1 ' style={{ marginTop: "5px", padding: "3px" }}>{title}</p>
                                <p className=' text-xs  text-gray-400' style={{ padding: "3px" }}>{description}</p>
                                <div className=' flex justify-between mt-2 items-center'>
                                    <p className=' text-lg' style={{ padding: "3px" }}> ₹ {price}</p>
                                    <div className='flex items-center justify-center gap-1'>
                                        <p className='font-bold'>{rating}</p>
                                        <p>
                                            {'⭐'.repeat(Math.floor(rating))}
                                        </p>
                                    </div>
                                </div>

                                {cartItems.some((ci) => ci.id === item.id) ? (
                                    <button
                                        onClick={() => nagigate("/products/cart")}
                                        className="Btn flex items-center justify-center mt-5 h-[40px] w-full cursor-pointer rounded text-black bg-yellow-300 text-lg"
                                    >
                                        View in cart
                                        <img src={BagAnimation} className=" ml-2 w-[40px]" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="Btn mt-5 h-[40px] w-full cursor-pointer rounded bg-amber-300"
                                    >
                                        Add to cart
                                    </button>
                                )}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Card;
