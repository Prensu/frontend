import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { products } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
  const currency = 'Rs ';
  const delivery_fee = 10;
  const userStorageKey = 'shikali-user';
  const directoryStorageKey = 'shikali-users';

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [userDirectory, setUserDirectory] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedDirectory = localStorage.getItem(directoryStorageKey);
      return savedDirectory ? JSON.parse(savedDirectory) : [];
    } catch (error) {
      console.error('Failed to parse stored users', error);
      return [];
    }
  });
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const savedUser = localStorage.getItem(userStorageKey);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to parse stored session', error);
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(userStorageKey, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to persist session', error);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(directoryStorageKey, JSON.stringify(userDirectory));
    } catch (error) {
      console.error('Failed to persist user directory', error);
    }
  }, [userDirectory]);

  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `user-${Date.now()}`;
  };

  const encodeSecret = (value) => {
    try {
      return btoa(value);
    } catch (error) {
      console.error('Failed to encode secret', error);
      return value;
    }
  };

  const normalizeEmail = (email) => email.trim().toLowerCase();

  const signupUser = ({ name, email, password }) => {
    const trimmedName = name.trim();
    const normalizedEmail = normalizeEmail(email);

    if (trimmedName.length < 2) {
      toast.error('Please enter your full name');
      return false;
    }

    if (password.length < 6) {
      toast.error('Password should be at least 6 characters');
      return false;
    }

    const existingUser = userDirectory.find(
      (entry) => entry.email === normalizedEmail
    );

    if (existingUser) {
      toast.error('An account with this email already exists');
      return false;
    }

    const newRecord = {
      id: generateId(),
      name: trimmedName,
      email: normalizedEmail,
      password: encodeSecret(password),
    };

    setUserDirectory([...userDirectory, newRecord]);
    setUser({ id: newRecord.id, name: trimmedName, email: normalizedEmail });
    toast.success('Account created successfully');
    return true;
  };

  const loginUser = ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const secret = encodeSecret(password);
    const matchingUser = userDirectory.find(
      (entry) => entry.email === normalizedEmail && entry.password === secret
    );

    if (!matchingUser) {
      toast.error('Invalid email or password');
      return false;
    }

    setUser({
      id: matchingUser.id,
      name: matchingUser.name,
      email: matchingUser.email,
    });
    toast.success(`Welcome back, ${matchingUser.name.split(' ')[0] || 'there'}!`);
    return true;
  };

  const logoutUser = () => {
    setUser(null);
    setOrders([]);
    setCartItems({});
    toast.info('Logged out');
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Please select a size');
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size]
        ? (cartData[itemId][size] += 1)
        : (cartData[itemId][size] = 1);
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const addOrder = (paymentMethod = 'cod') => {
    const newOrder = [];

    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          newOrder.push({
            _id: item,
            size,
            quantity: cartItems[item][size],
            paymentMethod,
            userId: user?.id,
          });
        }
      }
    }

    if (!newOrder.length) {
      toast.error('Your cart is empty');
      return false;
    }

    setOrders([...orders, ...newOrder]);
    setCartItems({});
    toast.success('Order placed successfully');
    return true;
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          totalCount += cartItems[item][size];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const productInfo = products.find((product) => product._id === item);
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalAmount += productInfo.price * cartItems[item][size];
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    addOrder,
    orders,
    navigate,
    user,
    loginUser,
    signupUser,
    logoutUser,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ShopContextProvider;
