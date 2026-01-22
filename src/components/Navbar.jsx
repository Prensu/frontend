import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets/';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const { getCartCount, user, logoutUser, navigate } = useContext(ShopContext);
  const cartCount = getCartCount();

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="flex items-center justify-between font-medium px-5 sm:px-10">
          <h3 className="fs-5 mb-0 text-2xl">
            Shikali&nbsp;
            <span className="fw-medium text-pink-500 hover:text-pink-700 transition-colors duration-300">
              Threads
            </span>
          </h3>

          <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            <NavLink to="/" className="flex flex-col items-center gap-1">
              <p>Home</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/collection" className="flex flex-col items-center gap-1">
              <p>Collection</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
              <p>About</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
              <p>Contact</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/orders" className="flex flex-col items-center gap-1">
              <p>Orders</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </ul>

          <div className="flex items-center gap-6">
            <img src={assets.search_icon} className="w-5 cursor-pointer" alt="Search" />

            {user ? (
              <div className="group relative">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                    {userInitial}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs text-gray-500 leading-tight">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-800 leading-tight max-w-[140px] truncate">
                      {user.name || user.email}
                    </p>
                  </div>
                </div>
                <div className="hidden group-hover:block absolute right-0 pt-4">
                  <div className="flex flex-col gap-2 w-44 py-3 px-5 bg-slate-100 text-gray-700 rounded shadow-md border">
                    <button
                      onClick={() => navigate('/orders')}
                      className="text-left hover:text-black"
                    >
                      Orders
                    </button>
                    <button
                      onClick={() => navigate('/cart')}
                      className="text-left hover:text-black"
                    >
                      Cart
                    </button>
                    <button onClick={logoutUser} className="text-left hover:text-black">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hidden sm:block border border-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-200"
              >
                Login / Signup
              </button>
            )}

            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
              {cartCount > 0 && (
                <p className="absolute right-[-5px] bottom-[-5px] w-5 text-center leading-5 bg-black text-white aspect-square rounded-full text-[10px]">
                  {cartCount}
                </p>
              )}
            </Link>
            <img
              onClick={() => setVisible(true)}
              src={assets.menu_icon}
              className="w-5 cursor-pointer sm:hidden"
              alt="Menu"
            />
          </div>

          <div
            className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
              visible ? 'w-full' : 'w-0'
            }`}
          >
            <div className="flex flex-col text-gray-600">
              <div
                onClick={() => setVisible(false)}
                className="flex items-center gap-4 p-3 cursor-pointer"
              >
                <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Close" />
                <p>Back</p>
              </div>
              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
                Home
              </NavLink>
              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">
                About
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
                to="/collection"
              >
                Collection
              </NavLink>
              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">
                Contact
              </NavLink>
              <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/orders">
                Orders
              </NavLink>
              {user ? (
                <button
                  onClick={() => {
                    logoutUser();
                    setVisible(false);
                  }}
                  className="text-left py-2 pl-6 border"
                >
                  Logout
                </button>
              ) : (
                <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/login">
                  Login / Signup
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[80px] sm:h-[100px]"></div>
    </>
  );
};

export default Navbar;
