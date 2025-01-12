import { useState } from 'react';
import { motion } from 'framer-motion';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Simple email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setIsValidEmail(false);
      return;
    }

    setIsSubmitted(true);
    setEmail('');
    setIsValidEmail(true);
    alert('Subscribed successfully!');
  };

  return (
    <motion.div
      className="text-center py-12 px-6 sm:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <p className="text-3xl font-extrabold text-gray-800">
        Subscribe Now & Get 10% Off
      </p>
      <p className="text-gray-600 mt-3 text-lg sm:text-xl">
        Be the first to know about new arrivals, sales & exclusive promos!
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-3/4 mx-auto mt-6 flex items-center gap-3 border-2 border-gray-300 rounded-xl p-3 transition-all duration-300 ease-in-out"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className={`w-full sm:flex-1 outline-none p-3 rounded-lg ${
            !isValidEmail ? 'border-2 border-red-500' : 'border-2 border-gray-300'
          } focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 ease-in-out`}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <motion.button
          type="submit"
          className="bg-black text-white text-xs sm:text-sm px-10 py-4 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe
        </motion.button>
      </form>

      {!isValidEmail && (
        <motion.p
          className="text-red-500 mt-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Please enter a valid email address.
        </motion.p>
      )}

      {isSubmitted && (
        <motion.p
          className="text-green-500 mt-3 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Thank you for subscribing! Check your inbox for a special offer.
        </motion.p>
      )}
    </motion.div>
  );
};

export default NewsLetterBox;
