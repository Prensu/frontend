import { useState } from 'react';
import { motion } from 'framer-motion'; // Framer Motion for smooth transitions

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Handle the form submission logic here (e.g., authentication, etc.)
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-lg m-auto mt-16 gap-6 bg-white p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title Section */}
      <div className="inline-flex items-center gap-2 mb-4">
        <motion.p
          className="font-semibold text-3xl text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {currentState}
        </motion.p>
        <motion.hr
          className="border-none h-[2px] w-16 bg-black"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Input Fields */}
      <motion.div
        className="w-full px-3 py-2 flex flex-col gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentState === 'Sign Up' && (
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Name"
            required
          />
        )}

        <input
          type="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email"
          required
        />

        <input
          type="password"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          required
        />

        {/* Forgot password / Create Account Link */}
        <div className="w-full flex justify-between text-sm mt-[-8px] text-gray-600">
          <p className="cursor-pointer hover:text-black">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className="cursor-pointer hover:text-black"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer hover:text-black"
            >
              Login Here
            </p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full py-3 text-white bg-black rounded-md hover:bg-gray-800 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default Login;
