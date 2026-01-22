import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

function Login() {
  const [currentState, setCurrentState] = useState('SIGN IN');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, signupUser, user } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const titleValue = useMemo(() => currentState.split(' '), [currentState]);
  const redirectTo = location.state?.from || '/';

  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, redirectTo, navigate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
    };

    const success =
      currentState === 'SIGN IN'
        ? loginUser(payload)
        : signupUser(payload);

    if (success) {
      setName('');
      setEmail('');
      setPassword('');
      navigate(redirectTo, { replace: true });
    }
  };

  const toggleMode = (mode) => {
    setCurrentState(mode);
    setPassword('');
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="mb-4 text-4xl sm:text-5xl">
        <Title text1={titleValue[0]} text2={titleValue[1]} />
      </div>
      {currentState === 'SIGN IN' ? null : (
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800 outline-none"
          placeholder="Full name"
          required
          autoComplete="name"
        />
      )}
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 outline-none"
        placeholder="Email"
        required
        autoComplete="email"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800 outline-none"
        placeholder="Password"
        required
        autoComplete={currentState === 'SIGN IN' ? 'current-password' : 'new-password'}
      />
      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="border-b border-white cursor-pointer hover:border-black ">
          Forgot Your Password?
        </p>
        {currentState === 'SIGN IN' ? (
          <p
            onClick={() => toggleMode('SIGN UP')}
            className="border-b border-white cursor-pointer hover:border-black "
          >
            Don&apos;t have an account? Sign Up.
          </p>
        ) : (
          <p
            onClick={() => toggleMode('SIGN IN')}
            className="border-b border-white cursor-pointer hover:border-black "
          >
            Already have an account? Sign In.
          </p>
        )}
      </div>
      <button className="w-full py-3 mt-6 font-light text-white bg-black" type="submit">
        {currentState === 'SIGN IN' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
}

export default Login;
