import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((s) => s.cart.productsInCart);
  const nav = useNavigate();

  return (
    <header className="bg-amber-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px] px-4">
        <p className="text-lg font-bold cursor-pointer" onClick={() => nav('/')}>ShoppyGlobe</p>
        <div className="md:flex hidden items-center gap-10 text-lg capitalize">
          <p className="cursor-pointer" onClick={() => nav('/')}>Home</p>
          <p className="cursor-pointer flex items-center gap-1" onClick={() => nav('/products/cart')}>
            <ShoppingCart size={20} /> {cart.length}
          </p>
          <button className="w-[100px] h-[40px] bg-white shadow hover:bg-black hover:text-white" onClick={() => nav('/login')}>Login</button>
          <button className="w-[100px] h-[40px] bg-white shadow hover:bg-black hover:text-white" onClick={() => nav('/signup')}>Create</button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-4 text-lg capitalize animate-slide-down">
          <p className="cursor-pointer" onClick={() => { nav('/'); setOpen(false); }}>Home</p>
          <p className="cursor-pointer flex items-center gap-1" onClick={() => { nav('/products/cart'); setOpen(false); }}>
            <ShoppingCart size={20} /> {cart.length}
          </p>
          <button className="w-full h-[40px] bg-white shadow hover:bg-black hover:text-white" onClick={() => { nav('/login'); setOpen(false); }}>Login</button>
          <button className="w-full h-[40px] bg-white shadow hover:bg-black hover:text-white" onClick={() => { nav('/signup'); setOpen(false); }}>Create</button>
        </div>
      )}
    </header>
  );
};

export default Header;
